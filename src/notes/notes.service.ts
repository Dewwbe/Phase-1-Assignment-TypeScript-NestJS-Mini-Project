import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteResponseEntity } from './entities/note-response.entity';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createNoteDto: CreateNoteDto,
    currentUser: AuthenticatedUser,
  ): Promise<NoteResponseEntity> {
    const note = await this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        userId: currentUser.userId,
      },
    });

    return this.toNoteResponse(note);
  }

  async findAll(): Promise<NoteResponseEntity[]> {
    const notes = await this.prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return notes.map((note) => this.toNoteResponse(note));
  }

  async findOne(id: string): Promise<NoteResponseEntity> {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note) {
      throw new NotFoundException(`Note with id "${id}" not found`);
    }

    return this.toNoteResponse(note);
  }

  async findByUser(userId: string): Promise<NoteResponseEntity[]> {
    const notes = await this.prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return notes.map((note) => this.toNoteResponse(note));
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    currentUser: AuthenticatedUser,
  ): Promise<NoteResponseEntity> {
    await this.ensureOwnership(id, currentUser.userId);

    const updatedNote = await this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });

    return this.toNoteResponse(updatedNote);
  }

  async remove(id: string, currentUser: AuthenticatedUser): Promise<NoteResponseEntity> {
    await this.ensureOwnership(id, currentUser.userId);

    const deletedNote = await this.prisma.note.delete({
      where: { id },
    });

    return this.toNoteResponse(deletedNote);
  }

  private async ensureOwnership(noteId: string, userId: string): Promise<void> {
    const note = await this.prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) {
      throw new NotFoundException(`Note with id "${noteId}" not found`);
    }

    if (note.userId !== userId) {
      throw new NotFoundException(`Note with id "${noteId}" not found`);
    }
  }

  private toNoteResponse(note: Note): NoteResponseEntity {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      userId: note.userId,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }
}