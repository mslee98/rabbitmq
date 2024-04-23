import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        
        @InjectRepository(Users)
        private usresRepository: Repository<Users>
    ) {
        super()
    }

    serializeUser(user: Users, done: CallableFunction) {
        console.log(user);
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: CallableFunction) {
        return await this.usresRepository.findOneOrFail({
            where: { id: +userId},
            select: ['id', 'email', 'nickname'],
            // relations: ['Workspace'],
        })
        .then((user) => {
            console.log("user", user);
            done(null, user)
        })
        .catch((error) => done(error))
    }
}