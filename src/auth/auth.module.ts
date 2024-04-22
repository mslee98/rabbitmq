import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/Users.entity";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { LocalSerializer } from "./local.serializer";


/**
 * @Module 에서 forRoot() - 전역 서비스 / forFeature - 특정 모듈에서 사용할 모듈을 설정
 */
@Module({
    imports: [
        PassportModule.register({session:true}),
        TypeOrmModule.forFeature([Users]),
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer],
    exports: [AuthModule]
})

export class AuthModule {}