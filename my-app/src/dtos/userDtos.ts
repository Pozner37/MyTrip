interface User {
    email : string,
    userName : string,
    password : string,
    iconUrl : string,
    isGoogleLogin? : boolean
}

interface BasicUserDto extends Omit<User, 'password'>{
    refreshToken : string,
    accessToken : string
}

interface LoginDto {
    userName : string;
    password : string;
}

export type { LoginDto, User, BasicUserDto}