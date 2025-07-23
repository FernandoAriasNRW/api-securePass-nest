import { IsString, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from "src/user/dto/createUser.dto";

export class RegisterDto extends CreateUserDto {
}

