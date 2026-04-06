import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './interfaces/user.interface';
export declare class UsersService {
    private readonly users;
    create(createUserDto: CreateUserDto): User;
    findAll(): User[];
    findOne(id: string): User;
    update(id: string, updateUserDto: UpdateUserDto): User;
    remove(id: string): User;
}
