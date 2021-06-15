export default class ItemDto {
  public constructor(
    public name: string, 
    public value: string) {}

    isValid() : boolean {
      return this.name != '' && this.value != '';
    }
}