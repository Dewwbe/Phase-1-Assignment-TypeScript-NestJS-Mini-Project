import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './interfaces/user.interface';
export declare class UsersService {
    private readonly users;
    create(createUserDto: CreateUserDto): User;
    findAll(): User[];
}
