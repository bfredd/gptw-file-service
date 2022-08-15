import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ) {}

    async findAll(){
        return await this.usersRepository.find({
            select: ['id','name', 'email']
        })
    }

    async findById(id: string){
        try {
            return await this.usersRepository
            .createQueryBuilder('users')
            .where('users.id = :id', {id: id})
            .getOneOrFail();
        } catch(error) {
            throw new NotFoundException(error.message)
        }
    }

    async findByEmail(email: string){
        console.log(email)
        try {
            return await this.usersRepository
            .createQueryBuilder('users')
            .where('users.email = :email', {email: email})
            .getOneOrFail()
        } catch(error) {
            throw new NotFoundException(error.message)
        }
    }

    async store(data: CreateUserDto){
        const user = await this.usersRepository.create(data)
        return await this.usersRepository.save(user)
    }

    async update(id: string, data: UpdateUserDto){
        const user = await this.findById(id);
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user)
    }

    async destroy(id: string){
        await this.findById(id);
        await this.usersRepository
        .createQueryBuilder('users')
        .where('users.id = :id', {id: id})
        .delete()
        .execute()
    }
}

