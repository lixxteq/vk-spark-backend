import { Injectable } from '@nestjs/common';
import {
  DirectAuthorization,
  officialAppCredentials,
} from '@vk-io/authorization';
import { VK, CallbackService } from 'vk-io';
import { CredentialsDto } from './authentication.dto';

@Injectable()
export class AuthenticationService {

  async runAuthorization(credentials: CredentialsDto) {
    const cbHandler = new CallbackService();

    const auth = new DirectAuthorization({
      callbackService: cbHandler,
      ...officialAppCredentials.vkMe,
      apiVersion: '5.131',

      login: credentials.login,
      password: credentials.password,
      scope: process.env.VK_SCOPE,
    });

    // todo: captcha/twofactor handler
    cbHandler.onCaptcha(({ type, sid, src, request }, retry) => {
      console.log(src, type, sid, request)
    })

    cbHandler.onTwoFactor((payload, retry) => {
      console.log(payload);
    })

    const authResponse = await auth.run();
    return authResponse;
  }
}