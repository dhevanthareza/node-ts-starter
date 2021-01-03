class AppController {
  public static get TypeName(): string {
    return (this as any).$typeName;
  }

  public static StaticBaseMethod(): string {
    return (this as any).$typeName;
  }
  public static get() {
    console.log(this.TypeName);
  }
}
class MasterBarangController extends AppController {
  public static $typeName: string = 'CoolChildType1';
  // TODO: create some function if needed, below is example
  // public static async someFunction(req: any, res: any) {
  //   const data = ''
  //   res.json(data)
  // }
}

MasterBarangController.get()