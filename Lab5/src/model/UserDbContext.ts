import User from './entity/User'
import UserDto from './entity/UserDto'

import TokenGenerator from './TokenGenerator'
import HashPasswordCreator from './HashPasswordCreator'

import mongoose from 'mongoose'

const userSchema = new mongoose.Schema<User>({
  name: { 
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true,
    index: true
  }
})

userSchema.set('toJSON', {
  transform: (doc: any, ret: any) => {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
  }
})


/*
1 - 1

Group { studentId: student._id }
Student {groupId: group._id }

Group { student: Student } Student const

1 - &

Group {}
Student {groupId: group._id }

Group {studentIds: [...student._id]}
Student {groupId: group._id  }

& - &

Group {studentIds: [...student._id]}
Student {groupId: [...group._id]  }
*/
export default class UserDataContext {
  private model : mongoose.Model<User>;

  constructor() {
    this.model = mongoose.model<User>('User', userSchema);
  }

  addNewUserAsync(user: UserDto) {
    return this.model.create({
      email:  user.email,
      passwordHash: HashPasswordCreator.create(user.password),
      name:  user.name,
      token: TokenGenerator.generate()
    });
  }

  getByEmailAsync(email: string) {
    return this.model.findOne({email: email});
  }
  
  async getByEmailAndPasswordAsync(email: string, passwordHash: string) {
    const userDb = await this.model.findOne({email: email, passwordHash: HashPasswordCreator.create(passwordHash)});
    if (userDb == null) {
      throw new Error(`Not found user with email ${email}`);
    }
    return userDb;
  }

  async getByToken(token: string) {
    const userDb = await this.model.findOne({token: token});
    if (userDb == null) {
      throw new Error(`Not found user with token ${token}`);
    }
    return userDb;
  }

  getAllAsync(offset: number, limit: number) {
    return this.model.find().skip(offset).limit(limit);
  }

  setNewPassword(email: string, newPassword: string) {
    return this.model.updateOne({email: email}, {passwordHash: HashPasswordCreator.create(newPassword)})
  }
}