interface User {
    email : string,
    userName : string,
    password : string,
    image : string,
    isGoogleLogin? : boolean
}

interface BasicUserDto extends Omit<User, 'password'>{}

interface LoginDto {
    userName : string;
    password : string;
}

interface ChangePasswordDto {
    oldPassword : string;
    newPassword : string;
}

export type { LoginDto, User, BasicUserDto, ChangePasswordDto}