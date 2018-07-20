import { Controller } from "egg";
// import xml = require('xml2js');

// import { RoleType, } from '../constant';

// import db = require('../../model');


export default class extends Controller {
    listHosts() {
        // console.log(xml)

    }
    getHostDetail() {
        let info = this.service.common.getComputerInfo();
        this.ctx.body = { ok: true, data: info };
        // this.ctx
    }
}