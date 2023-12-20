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
    id: string;
    description: string;
    username: string;
    country: string;
    comments: Array<Comment>
}

export interface Comment {
    id: string;
    comment: string;
    postId: string;
    username: string;
}