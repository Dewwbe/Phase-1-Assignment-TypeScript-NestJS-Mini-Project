import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../src/users/users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('should create a user', () => {
    const user = service.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      age: 25,
      isActive: true,
    });

    expect(user.id).toBeDefined();
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john@example.com');
    expect(user.age).toBe(25);
    expect(user.isActive).toBe(true);
  });

  it('should default isActive to true when not provided', () => {
    const user = service.create({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      age: 28,
    });

    expect(user.isActive).toBe(true);
  });

  it('should throw error when email already exists', () => {
    service.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      age: 25,
      isActive: true,
    });

    expect(() =>
      service.create({
        firstName: 'Johnny',
        lastName: 'Doe',
        email: 'JOHN@example.com',
        age: 30,
        isActive: true,
      }),
    ).toThrow(BadRequestException);
  });

  it('should return all users', () => {
    service.create({
      firstName: 'Alicia',
      lastName: 'Perera',
      email: 'alicia@example.com',
      age: 24,
      isActive: true,
    });

    service.create({
      firstName: 'Brian',
      lastName: 'Fernando',
      email: 'brian@example.com',
      age: 27,
      isActive: true,
    });

    const users = service.findAll();

    expect(users).toHaveLength(2);
  });

  it('should return one user by id', () => {
    const createdUser = service.create({
      firstName: 'Carl',
      lastName: 'Silva',
      email: 'carl@example.com',
      age: 29,
      isActive: true,
    });

    const user = service.findOne(createdUser.id);

    expect(user.id).toBe(createdUser.id);
  });

  it('should throw NotFoundException when user is not found', () => {
    expect(() =>
      service.findOne('550e8400-e29b-41d4-a716-446655440000'),
    ).toThrow(NotFoundException);
  });

  it('should update a user', () => {
    const createdUser = service.create({
      firstName: 'Dina',
      lastName: 'Paul',
      email: 'dina@example.com',
      age: 26,
      isActive: true,
    });

    const updatedUser = service.update(createdUser.id, {
      firstName: 'Dina Updated',
      isActive: false,
    });

    expect(updatedUser.firstName).toBe('Dina Updated');
    expect(updatedUser.isActive).toBe(false);
  });

  it('should delete a user', () => {
    const createdUser = service.create({
      firstName: 'Evan',
      lastName: 'Jay',
      email: 'evan@example.com',
      age: 31,
      isActive: true,
    });

    const deletedUser = service.remove(createdUser.id);

    expect(deletedUser.id).toBe(createdUser.id);
    expect(service.findAll()).toHaveLength(0);
  });

  it('should paginate users', () => {
    service.create({
      firstName: 'User1',
      lastName: 'One',
      email: 'user1@example.com',
      age: 22,
      isActive: true,
    });

    service.create({
      firstName: 'User2',
      lastName: 'Two',
      email: 'user2@example.com',
      age: 23,
      isActive: true,
    });

    service.create({
      firstName: 'User3',
      lastName: 'Three',
      email: 'user3@example.com',
      age: 24,
      isActive: true,
    });

    const page2 = service.findAll(2, 2);

    expect(page2).toHaveLength(1);
    expect(page2[0].email).toBe('user3@example.com');
  });
});
