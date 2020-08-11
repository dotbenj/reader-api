import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User email', required: true })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'User password', required: true })
  @IsNotEmpty()
  readonly password: string;
}