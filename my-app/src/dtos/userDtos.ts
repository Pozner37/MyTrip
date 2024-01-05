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

interface LoginResponseDto {
    userName : string;
    accessToken : string;
    refreshToken : string;
}

export type { LoginDto, LoginResponseDto, User, BasicUserDto}