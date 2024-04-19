import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    // 이건 클래스 프로퍼티 주입(Property Injection) 테스트할 때 모킹 어려움 
    // private readonly userService: UserService;
    constructor(
        /**
         * 클래스 인스턴스를 만들 때 생성자를 통해 외부에서 의존성을 주입받음
         */
        private readonly userService: UserService
    ) {}

    @Post('join')
    async createUser(@Body() data: {id: string, name: string, password: string}) {
        this.userService.createUser(data.id, data.name, data.password);
    }

}
