"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
    }
    create(createUserDto) {
        const normalizedEmail = createUserDto.email.toLowerCase();
        const existingUser = this.users.find((user) => user.email === normalizedEmail);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const now = new Date();
        const newUser = {
            id: (0, crypto_1.randomUUID)(),
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: normalizedEmail,
            age: createUserDto.age,
            isActive: createUserDto.isActive ?? true,
            createdAt: now,
            updatedAt: now,
        };
        this.users.push(newUser);
        return newUser;
    }
    findAll(page = 1, limit = 10) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        return this.users.slice(startIndex, endIndex);
    }
    findOne(id) {
        const user = this.users.find((existingUser) => existingUser.id === id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id "${id}" not found`);
        }
        return user;
    }
    update(id, updateUserDto) {
        const user = this.findOne(id);
        if (updateUserDto.email !== undefined) {
            const normalizedEmail = updateUserDto.email.toLowerCase();
            const emailTaken = this.users.some((existingUser) => existingUser.email === normalizedEmail && existingUser.id !== id);
            if (emailTaken) {
                throw new common_1.BadRequestException('Email already exists');
            }
            updateUserDto.email = normalizedEmail;
        }
        Object.assign(user, {
            ...updateUserDto,
            updatedAt: new Date(),
        });
        return user;
    }
    remove(id) {
        const user = this.findOne(id);
        const userIndex = this.users.findIndex((existingUser) => existingUser.id === user.id);
        this.users.splice(userIndex, 1);
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map