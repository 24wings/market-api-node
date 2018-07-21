import { Controller } from "egg";
import db = require('../../model');
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
    async fetchUnassignedLinks() {
        let { num, } = this.ctx.query;
        if (!num) num = 10;
        let data = await db.link.findAndCountAll({ where: { status: 'unassigned', }, limit: 10 });
        this.ctx.body = { ok: true, data };

    }
}