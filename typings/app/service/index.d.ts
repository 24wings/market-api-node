// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Alidayu from '../../../app/service/alidayu';
import Common from '../../../app/service/common';
import Mns from '../../../app/service/mns';
import Oss from '../../../app/service/oss';
import Qrcode from '../../../app/service/qrcode';
import Wechat from '../../../app/service/wechat';

declare module 'egg' {
  interface IService {
    alidayu: Alidayu;
    common: Common;
    mns: Mns;
    oss: Oss;
    qrcode: Qrcode;
    wechat: Wechat;
  }
}
