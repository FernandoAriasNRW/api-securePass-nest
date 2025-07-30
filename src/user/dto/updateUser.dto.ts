import { ApiSchema } from "@nestjs/swagger";
import { CreateUserDto } from "./createUser.dto";

@ApiSchema({
    description: 'Data Transfer Object for updating a user, extending CreateUserDto',
})
export class UserUpdateDto implements Partial<CreateUserDto> {
}