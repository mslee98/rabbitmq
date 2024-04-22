import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log("Login요청시 최초로 LocalAuthGuard 동작")
        
        const can = await super.canActivate(context);

        console.log("canActivate : ", can)

        if(can) {
            const request = context.switchToHttp().getRequest();
            console.log('login for cookie');
            await super.logIn(request);
        }

        return true;
    }
}