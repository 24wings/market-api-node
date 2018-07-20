// cimport { and, or } from "sequelize";
import { Controller } from "egg";
// import { request } from 'https';
// import { RewardRecordType } from "../../constant";
// import Sequelize = require("sequelize");
// import db = require("../model");

export default class extends Controller {
    // async home() {
    //     await this.ctx.render('page/index.html');
    // }
    async index() {
        await this.ctx.render('page/index.html');
    }
}
