import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { MessagesHelper } from 'src//helpers/messages.helper';
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateUserDto {
    
    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    @IsEmail()
    email: String;

    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: String;
}