import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ description: 'User name', required: true})
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'User email', required: true })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'User password', required: true })
  @IsNotEmpty()
  readonly password: string;

}