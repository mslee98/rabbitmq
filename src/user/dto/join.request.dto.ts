// import { ApiProperty, PickType } from "@nestjs/swagger";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "../../entities/Users.entity";
// import { IsEmail } from "class-validator";

export class JoinRequestDto extends PickType(Users, ['email', 'nickname', 'password'] as const) {

}