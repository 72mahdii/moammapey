import { ReplyComment } from './reply.model';
import { Article } from './article.model';

export class Comment {
  constructor(
    public name: string,
    public text: string,
    public email: string,
    public approved: boolean,
    public id?: number,
    public articleId?: number,
    public replyComments?: ReplyComment[],
    public article?: Article
  ){
      replyComments = [];
      article = null;
  }
}
