import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users.entity";
import { Repository } from "typeorm";
import bcrypt from 'bcrypt';
/**
 * Constructor에 의존성을 주입해야 Nest.js에서 자동으로 해당 서비스의 인스턴스를 생성하여 주입
 * 그렇지 않을 경우 직접적으로 의존성을 생성하며 단위 테스트나 특정 상황에서만 사용
 */
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) 
        private usersRepository: Repository<Users>
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ['id', 'email', 'password']
        });

        console.log(email, password, user)

        if(!user) {
            return null;
        }

        const result = await bcrypt.compare(password, user.password);
        if(result) {
            const {password, ... userWithoutPassword} = user;
            return userWithoutPassword;
        }

        return null;
    }
}