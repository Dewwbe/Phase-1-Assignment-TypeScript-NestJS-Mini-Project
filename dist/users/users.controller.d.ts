import type { ApiResponse } from '../common/interfaces/api-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): ApiResponse<User>;
    findAll(page: number, limit: number): ApiResponse<User[]>;
    findOne(id: string): ApiResponse<User>;
    update(id: string, updateUserDto: UpdateUserDto): ApiResponse<User>;
    remove(id: string): ApiResponse<User>;
}
