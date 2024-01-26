export interface Country extends BaseCountry{
    capital: string;
    continents: Array<string>
    borders : Array<string>
    map : string,
    population : number,
    area : number
}

export interface BaseCountry {
    name: string;
    flag: string;
}

export interface PostType {
    postId: string;
    description: string;
    userName: string;
    country: string;
    photo: string;
}

export interface EditPostType {
    postId: string;
    description: string;
    userName: string;
    country: string;
    photo: string;
}

export interface CommentType {
    _id: string;
    commentContent: string;
    postId: string;
    user: string;
}

export interface MessageType {
  fromUser: string;
  toUser: string;
  messageContent: string;
  sendTime: Date;
}