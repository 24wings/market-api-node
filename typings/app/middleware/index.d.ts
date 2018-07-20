// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Cors from '../../../app/middleware/cors';
import Responsetime from '../../../app/middleware/responsetime';
import WechatOauth from '../../../app/middleware/wechat-oauth';

declare module 'egg' {
  interface IMiddleware {
    cors: typeof Cors;
    responsetime: typeof Responsetime;
    wechatOauth: typeof WechatOauth;
  }
}
