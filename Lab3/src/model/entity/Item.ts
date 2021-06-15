export default class Item {
  public constructor(
    public id: string, 
    public name: string, 
    public value: string) {}

    isValid() : boolean {
      return this.id !== '' && this.name != '' && this.value != '';
    }
}