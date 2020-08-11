import { ApiProperty } from '@nestjs/swagger';

export class SearchQueryDto {
  @ApiProperty({description: 'Search query'})
  readonly query: string;
}