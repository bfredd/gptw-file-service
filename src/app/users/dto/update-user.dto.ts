import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    
    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    @IsEmail()
    email: String;

}