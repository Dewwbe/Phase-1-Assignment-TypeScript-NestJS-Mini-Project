import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteResponseEntity } from './entities/note-response.entity';
import { NotesService } from './notes.service';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create note for logged-in user' })
  @SwaggerApiResponse({ status: 201, description: 'Note created successfully' })
  async create(
    @Body() createNoteDto: CreateNoteDto,
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<ApiResponse<NoteResponseEntity>> {
    const note = await this.notesService.create(createNoteDto, currentUser);

    return {
      success: true,
      message: 'Note created successfully',
      data: note,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  async findAll(): Promise<ApiResponse<NoteResponseEntity[]>> {
    const notes = await this.notesService.findAll();

    return {
      success: true,
      message: 'Notes retrieved successfully',
      data: notes,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get note by id' })
  async findOne(@Param('id') id: string): Promise<ApiResponse<NoteResponseEntity>> {
    const note = await this.notesService.findOne(id);

    return {
      success: true,
      message: 'Note retrieved successfully',
      data: note,
    };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notes by user id' })
  async findByUser(
    @Param('userId') userId: string,
  ): Promise<ApiResponse<NoteResponseEntity[]>> {
    const notes = await this.notesService.findByUser(userId);

    return {
      success: true,
      message: 'User notes retrieved successfully',
      data: notes,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update note' })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<ApiResponse<NoteResponseEntity>> {
    const note = await this.notesService.update(id, updateNoteDto, currentUser);

    return {
      success: true,
      message: 'Note updated successfully',
      data: note,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete note' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<ApiResponse<NoteResponseEntity>> {
    const note = await this.notesService.remove(id, currentUser);

    return {
      success: true,
      message: 'Note deleted successfully',
      data: note,
    };
  }
}