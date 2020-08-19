import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ModifyFavDto {

  @ApiProperty({ description: 'Last chapter read', required: true })
  @IsNotEmpty()
  readonly cursor: string;

}
