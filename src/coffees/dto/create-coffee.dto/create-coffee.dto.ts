import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({
    example: 'Café Tradicional',
    description: 'The name of the coffee',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Starbucks', description: 'The brand of the coffee' })
  @IsString()
  readonly brand: string;

  @ApiProperty({
    example: 'An Exceptional taste that everyone will like',
    description: 'The description of the coffee',
  })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    example: ['chocolate', 'vanilla'],
    description: 'The flavors of the coffee',
    isArray: true,
  })
  @IsString({ each: true })
  readonly flavors: string[];
}
