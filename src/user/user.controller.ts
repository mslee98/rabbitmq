import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { NotloggedInGuard } from 'src/auth/not-logged-in.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from '../common/decorators/user.decorator';
import { EventsGateway } from 'src/events/events.gateway';
import { onlineMap } from 'src/events/onlineMap';

@Controller('user')
export class UserController {
    // 이건 클래스 프로퍼티 주입(Property Injection) 테스트할 때 모킹 어려움 
    // private readonly userService: UserService;
    constructor(
        /**
         * 클래스 인스턴스를 만들 때 생성자를 통해 외부에서 의존성을 주입받음
         */
        private readonly userService: UserService,
        private readonly eventsGateway: EventsGateway
    ) {}

    @UseGuards(new NotloggedInGuard())
    @Post('join')
    async createUser(@Body() data: {email: string, nickname: string, password: string}) {

        console.log("1.요청 Body 데이터 : ",data)

        await this.userService.createUser(data.email, data.nickname, data.password);
    }

    @Post('login')
    @UseGuards(new LocalAuthGuard())
    login(@User() user) {
        console.log('Login 요청 : ',user)


        if(user) {
            console.log("??")
            // this.eventsGateway.server.to('ws-test-test').emit('login',user)
            // this.eventsGateway.server.to().emit('login','ssss')
        }
        return user;
    }



}
 