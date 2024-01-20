interface User {
    email : string,
    userName : string,
    password : string,
    iconUrl : string,
    isGoogleLogin? : boolean
}

interface BasicUserDto extends Omit<User, 'password'>, CookiesProps {}

interface CookiesProps {
    accessToken : string,
    refreshToken : string
}

interface LoginDto {
    userName : string;
    password : string;
}

interface ChangePasswordDto {
    oldPassword : string;
    newPassword : string;
}

export type { LoginDto, User, BasicUserDto, ChangePasswordDto}