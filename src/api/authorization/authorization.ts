import { DirectAuthorization, officialAppCredentials } from "@vk-io/authorization";
import { CallbackService } from "vk-io";

// replace with env!!!
async function runAuthorization(login: string, password: string) {
    const cbHandler = new CallbackService();

    const auth = new DirectAuthorization({
      callbackService: cbHandler,
      ...officialAppCredentials.android,
      apiVersion: '5.131',

      login: login,
      password: password,
      scope: process.env.VK_SCOPE,
    });

    const authResponse = await auth.run();
    return authResponse;
  }