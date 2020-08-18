import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFavDto {

  @ApiProperty({ description: 'Display name of the favorite', required: true})
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Url of thumb', required: true})
  @IsNotEmpty()
  readonly img: string;

  @ApiProperty({ description: 'Author name', required: true})
  @IsNotEmpty()
  readonly author: string;

  @ApiProperty({ description: 'Url of the favorite', required: true})
  @IsNotEmpty()
  readonly url: string;

  @ApiProperty({ description: 'Last chapter read' })
  readonly cursor: number;

}