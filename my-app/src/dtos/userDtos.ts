interface User {
    email : string,
    userName : string,
    password : string,
    iconUrl : string
}

interface BasicUserDto {
    userName : string,
    iconUrl : string
}

interface LoginDto {
    userName : string;
    password : string;
}

export type { LoginDto, User, BasicUserDto}