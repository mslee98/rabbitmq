import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    @InjectRepository(Users)
    private userRepository: Repository<Users>

    createUser(id: string, name: string, password: string) {
        
        this.userRepository.save({
            id,
            name,
            password
        })
        
        return 'success';
        // throw new Error('Method not implemented.');
    }
}
