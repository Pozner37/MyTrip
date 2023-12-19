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