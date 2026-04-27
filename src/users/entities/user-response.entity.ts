import { ApiProperty } from '@nestjs/swagger';
import { NoteResponseEntity } from '../../notes/entities/note-response.entity';

export class UserResponseEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  age!: number;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: () => [NoteResponseEntity], required: false })
  notes?: NoteResponseEntity[];
}