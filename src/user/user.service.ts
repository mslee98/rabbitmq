import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    @InjectRepository(Users)
    private userRepository: Repository<Users>

    async createUser(email: string, nickname: string, password: string) {
        
        const user = await this.userRepository.findOne({
            where: { email },
        })

        if(user) {
            throw new ForbiddenException('이미 존재하는 사용자임')
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        try {
            this.userRepository.save({
                email,
                nickname,
                password: hashedPassword
            })
        } catch(error) {
            console.log(error)
        }

        
        return 'success';
        // throw new Error('Method not implemented.');
    }
}
