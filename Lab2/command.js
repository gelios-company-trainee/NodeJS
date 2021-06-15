class ICommand {
  exec(arg) {

  }
}

class MyCommand extends ICommand{
  exec(arg) {
    console.log(arg)
  }
}

class CommandContext {
  exec(pkg) {
    const command = factory.create(pkg.type)
    command.exec(pkg.arg)
  }
}