export class Message {
  public text: string;
  public responses?: [[string, (string) => void]];

  constructor(text?: string, responses?: [[string, (string) => void]]) {
    this.text = text;
    this.responses = responses;
  }
}

//#region
/*
export class Message {
  constructor(
    public text: string,
    public buttons : MessageButton[]
  ){}
}

export class MessageButton {
    constructor(
      public text: string,
      public value : string
    ){}
}
*/
//#endregion
