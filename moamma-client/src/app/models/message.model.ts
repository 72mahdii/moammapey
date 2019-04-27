export class Message {
  constructor(
    public text: string,
    public buttons : MessageButton[]
  ){}
}

export class MessageButton {
    constructor(
      public text: string,
      public value : number
    ){}
}
