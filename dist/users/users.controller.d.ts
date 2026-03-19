import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './interfaces/user.interface';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): User;
    findAll(): User[];
}
