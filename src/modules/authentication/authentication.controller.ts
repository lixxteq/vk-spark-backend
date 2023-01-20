import { Body, CACHE_MANAGER, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { TokenDto, CredentialsDto } from './authentication.dto';

@Controller('authentication')
export class AuthenticationController {

    constructor (
        private authenticationService: AuthenticationService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
        ) {}

    @Post('/login')
    authenticateUser(@Body() credentials: CredentialsDto) {
        console.log(credentials);
        return this.authenticationService.runAuthorization(credentials);
    }



    // @Post('/token')
    // getToken(@Body() token: TokenDto) {
    //     console.log(token);
    // }
}
