import { Service } from "egg";
import os = require('os');
export default class Alidayu extends Service {
  regexp = {
    phone: /^1[3-9]\d{9}$/g
  };
  getComputerInfo() {
    let cpus = os.cpus();
    return { cpus };
  }
}
