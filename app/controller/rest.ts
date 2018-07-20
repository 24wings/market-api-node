import { Controller } from "egg";
// import { RoleType, } from '../constant';
import db = require('../model');
import {  Model } from 'sequelize';

export default class extends Controller {
   async  getList(){
       let model=  this.ctx.params.model
        if(db[model]){
           let table =await (db[model] as Model<any,any>).describe()
            console.log(table)
           let data= await (db[model] as Model<any,any>).findAll();
            this.ctx.body={ok:true,data};
        }else{
            this.ctx.body={ok:false,msg:'不存在的数据'}
        }
    
    }
    async postUpdate(){
        let model=  this.ctx.params.model
        let {body}=this.ctx.request;
        let key=model+'Id';
        let where={};
        where[key]=this.ctx.query[key];
        let updateAction= await (db[model] as Model<any,any>).update(body,{where});
        this.ctx.body={ok:true,data:updateAction,}
    }
    async postCreate(){
        let model=  this.ctx.params.model
        let {body}=this.ctx.request;
        let newItem= await (db[model] as Model<any,any>).create(body);
        this.ctx.body={ok:true,data:newItem,}
    }

    async getDetail(){
        let {model} = this.ctx.params;
        // menu表 传入 menuId   
        let key=model+'Id';
        let where={};
        where[key]=this.ctx.query[key];
       let data= await (db[model] as Model<any,any>).findOne({where });
        this.ctx.body={ok:true,data:{key:data}};
    }
    async getDelete(){
        let {model} = this.ctx.params;
        // menu表 传入 menuId   
        let key=model+'Id';
        let where={};
        where[key]=this.ctx.query[key];
       let data= await (db[model] as Model<any,any>).destroy({where });
        this.ctx.body={ok:true,data:{key:data}};
    
    }

}