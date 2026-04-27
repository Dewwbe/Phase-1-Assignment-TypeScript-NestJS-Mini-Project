import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My first note' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  title!: string;

  @ApiProperty({ example: 'This is the note content.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(1000)
  content!: string;
}