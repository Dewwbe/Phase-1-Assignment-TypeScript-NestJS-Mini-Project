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
        const existingUser = this.users.find((user) => user.email === createUserDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const now = new Date();
        const newUser = {
            id: (0, crypto_1.randomUUID)(),
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            email: createUserDto.email,
            age: createUserDto.age,
            isActive: createUserDto.isActive ?? true,
            createdAt: now,
            updatedAt: now,
        };
        this.users.push(newUser);
        return newUser;
    }
    findAll() {
        return this.users;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map