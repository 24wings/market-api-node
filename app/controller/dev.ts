import { Controller } from "egg";
// import { RoleType, } from '../constant';

import db = require('../model');
import { MarketStatus, EmployeeStatus } from '../constant';
import { QueryTypes, Model, } from 'sequelize';


export default class extends Controller {


    async subjectUpdate() {
        let subject = this.ctx.request.body;
        let updateAction = await db.subject.update(subject, { where: { subId: subject.subId } });
        this.ctx.body = { ok: true, data: updateAction };
    }
    async subjectDelete() {
        let delAction = await db.subject.destroy({ where: { subId: this.ctx.query.subId } });
        this.ctx.body = { ok: true, data: delAction };
    }
    async subjectCreate() {
        let newSubject: ISubject = this.ctx.request.body;
        if (newSubject.marketId) delete newSubject.marketId;
        newSubject = await db.subject.create(newSubject);
        this.ctx.body = { ok: true, data: { subject: newSubject } };
    }
    async   subjectList() {
        let { parentId } = this.ctx.query;
        if (parentId) {
            let subjects = await db.subject.findAll({ where: { parentId } });
            this.ctx.body = { ok: true, data: { subjects } }
        } else {
            let subjects = await db.subject.findAll({ where: { parentId: null } });
            this.ctx.body = { ok: true, data: { subjects } }
        }
    }


    async categoryList() {
        let { parentId } = this.ctx.query;
        if (parentId) {
            let categorys = await db.category.findAndCountAll({ where: { parentId } });
            this.ctx.body = { ok: true, data: { categorys } }
        } else {
            let categorys = await db.category.findAndCountAll({ where: { parentId: null } });
            this.ctx.body = { ok: true, data: { categorys } };
        }

    }
    async categoryCreate() {
        let newCategory = this.ctx.request.body;
        delete newCategory.mktId;
        newCategory = await db.category.create(newCategory);
        this.ctx.body = { ok: true, data: newCategory };
    }
    async categoryUpdate() {
        let category: ICategory = this.ctx.request.body;
        let cateupdateAction = await db.category.update(category, { where: { cateId: category.cateId as any } });
        this.ctx.body = { ok: true, data: { cateupdateAction } }
    }
    async categoryDelete() {
        let delAction = await db.category.destroy({ where: { cateId: this.ctx.query.cateId } });
        this.ctx.body = { ok: true, data: delAction };
    }

    async  menuDetailByMenuCode() {
        let menu = await db.menu.findOne({ where: { menuCode: this.ctx.query.menuCode } });
        this.ctx.body = { ok: true, data: { menus: [menu] } };
    }
    async menuDetail() {
        let menu = await db.menu.findOne({ where: { menuId: this.ctx.query.menuId } });
        this.ctx.body = { ok: true, data: { menu } };
    }
    async metaObjectDataUpdate() {
        let { metaObject, dataItem } = this.ctx.request.body;
        if (metaObject) {
            let { pkKey, tableName } = (metaObject as IMetaObject);

            let table: Model<any, any> = db[tableName as string];
            if (table) {
                let where = {};
                where[pkKey] = dataItem[pkKey];
                let updateResult = await table.update(dataItem, { where });
                this.ctx.body = { ok: true, data: { updateResult } };
            } else {
                this.ctx.body = { ok: false, msg: 'undefined table name' }
            }


            // if (typeof dataItem == 'object') {
            //   let keys =  Object.keys(dataItem);
            //   let str=`update ${tableName} set`;  
            //   for(let key of keys){
            //       if(dataItem[key])
            //         str+=`${key}=${dataItem[key]} `
            //     }
            //     str+=` where ${pkKey}=${dataItem[pkKey]}`;

            // let updateResult=    await db.marketDb.query(str,{type:QueryTypes.UPDATE});

        } else {
            this.ctx.body = { ok: false, msg: 'error dataItem type' }
        }

    }


    async metaObjectUpdate() {
        let metaObject = this.ctx.request.body;
        let fields = metaObject.metaFields;
        let objectUpdate = await db.metaObject.update(metaObject, { where: { objectCode: metaObject.objectCode } });
        await db.metaField.destroy({ where: { objectCode: metaObject.objectCode } });
        /** 删除原有的,添加当前的 */
        (fields as IMetaField[]).forEach(field => {
            field.objectCode = metaObject.objectCode;
        })

        let newFields = await db.metaField.bulkCreate(fields);
        this.ctx.body = { ok: true, data: { objectUpdate, newFields }, }
    }
    async metaObjectDelete() {
        let { objectCode } = this.ctx.query;
        let remove = await db.metaObject.destroy({ where: { objectCode } });
        if (remove) {
            await db.metaField.destroy({ where: { objectCode } });
            this.ctx.body = { ok: true, data: {} }
        } else {
            this.ctx.body = { ok: false, msg: '视图不存在' }
        }
    }
    async  metaObjectDataPage() {
        let { objectCode, fieldArr, page, pageSize } = this.ctx.request.body;
        let conditions: FieldQueryOption[] = fieldArr as FieldQueryOption[];
        let conditionStr = ''
        if (conditions) {
            if (conditions.length > 0) {
                conditionStr = `where `;
                conditions.forEach((condition, i) => {
                    if (i != 0) conditionStr += ' and ';
                    if (condition.compare == 'like') conditionStr += `${condition.field} ${condition.compare} "%${condition.value}%" `;
                    else {
                        conditionStr += `${condition.field} ${condition.compare}  "${condition.value}" `;
                    }
                })


            }
        }

        if (!page) page = 0;
        if (!pageSize) pageSize = 10;

        let metaObject = await db.metaObject.findOne({ where: { objectCode } });
        if (metaObject) {
            let sql = metaObject.querySql + ` ${conditionStr} limit ${page * pageSize},${pageSize} `;
            console.log(sql);
            let results = await db.marketDb.query(sql as string, { type: QueryTypes.SELECT });
            this.ctx.body = { ok: true, data: { paging: { rows: results } } }
        } else {
            this.ctx.body = { ok: false, msg: '不存在的视图' }
        }
    }
    async metaObjectDetail() {
        let metaObject = await db.metaObject.findOne({ where: { objectCode: this.ctx.query.objectCode } });
        if (metaObject) {
            let fields = await db.metaField.findAll({ where: { objectCode: metaObject.objectCode } });

            this.ctx.body = { ok: true, data: { metaObject, fields } };
        } else {
            this.ctx.body = { ok: false, msg: '视图表不存在' };
        }
    }
    async  metaObjectList() {
        let metaObjects = await db.metaObject.findAll();
        this.ctx.body = { ok: true, data: { metaObjects } };

    }
    async  metaObjectCreate() {
        let metaObject = this.ctx.request.body;
        let fields = metaObject.metaFields;
        metaObject = await db.metaObject.create(metaObject);
        console.log(metaObject);
        (fields as IMetaField[]).forEach(field => field.objectCode = metaObject.objectCode)
        fields = await db.metaField.bulkCreate(fields);
        this.ctx.body = { ok: true, data: { metaObject, fields } }
    }

    async sqlDetail() {
        let { sql } = this.ctx.request.body;
        //   let meta;
        // Sequelize
        let result = await new Promise<any>(resolve => {
            db.connection
                .execute(
                    sql,
                    function (err, results, fields) {
                        resolve({
                            err, data: results, fields: fields.map((field: MysqlMetaFieldType) => {
                                let type: string = '';
                                /**解析 type */
                                switch (field.columnType) {
                                    case 3:
                                        type = 'int';
                                        break;
                                    case 253:
                                        type = 'varchar'
                                        break;
                                    case 12:
                                        type = 'datetime'
                                        break;
                                }
                                console.log(field);
                                return { type, field: field.name, pure: field }
                            })
                        }); // results contains rows returned by server
                    }
                );
        });

        this.ctx.body = { ok: true, data: result };
    }
    async  tbList() {
        let res = await db.marketDb.query(`show tables;`, { type: QueryTypes.DESCRIBE });
        let tables: string[] = [];
        let database: string = '';
        res.forEach(tb => {

            console.log(tb)
        })
        this.ctx.body = { ok: true, data: { database, res, tables } };

    }
    async employeeDisabled() {
        let update = await db.employee.update({ status: EmployeeStatus.Disabled }, { where: { epId: this.ctx.query.epId } });
        this.ctx.body = { ok: true, data: update };
    }
    async employeeActive() {
        let update = await db.employee.update({ status: EmployeeStatus.Active }, { where: { epId: this.ctx.query.epId } });
        this.ctx.body = { ok: true, data: update };
    }
    async marketDisabled() {
        let mkt = await db.market.update({ status: MarketStatus.Disabled }, { where: { mktId: this.ctx.query.mktId } });
        this.ctx.body = { ok: true, data: mkt }

    }
    async marketActive() {
        let mkt = await db.market.update({ status: MarketStatus.Active }, { where: { mktId: this.ctx.query.mktId } });
        this.ctx.body = { ok: true, data: mkt }

    }
    async  devCreate() {
        let dev = this.ctx.request.body;
        let newDev = await db.developer.create(dev);
        this.ctx.body = { ok: true, data: newDev };
    }

    async    devUpdate() {
        let dev = this.ctx.request.body;
        let updateAction = await db.developer.update(dev, { where: { devId: dev.devId } });
        this.ctx.body = { ok: true, data: updateAction };
    }
    async devDelete() {
        let { devId } = this.ctx.query;
        let deleteAction = await db.developer.destroy({ where: { devId } });
        this.ctx.body = { ok: true, data: deleteAction };
    }
    async   devPage() {
        let { page, pageSize } = this.ctx.query;
        if (!page) page = 0;
        if (!pageSize) pageSize = 0;
        if (typeof page == 'string') page = parseInt(page);
        if (typeof pageSize == 'string') pageSize = parseInt(pageSize);
        let result = await db.developer.findAndCountAll({ limit: pageSize, offset: page * pageSize });
        this.ctx.body = { ok: true, data: { developers: result } }
    }
    async employeeDetail() {
        let { epId } = this.ctx.query;
        let employee = await db.employee.findOne({ where: { epId } });
        this.ctx.body = { ok: true, data: { employee } };
    }
    async paramList() {
        let { mktId, isLocal } = this.ctx.query;
        let params = await db.param.findAndCountAll({ where: { mktId, isLocal } });
        this.ctx.body = { ok: true, data: { params } };

    }
    async paramCreate() {
        let newParam = this.ctx.request.body;
        newParam = await db.param.create(newParam);
        this.ctx.body = { ok: true, data: newParam };

    }
    async paramUpdate() {
        let updateParam = this.ctx.request.body;
        let result = await db.param.update(updateParam, { where: { id: updateParam.id } });
        this.ctx.body = { ok: true, data: result };
    }
    async paramDelete() {
        let { id } = this.ctx.query;
        await db.param.destroy({ where: { id } });
        this.ctx.body = { ok: true, data: '' };
    }
    async    employeeList() {
        let { marketId, orgId } = this.ctx.query;
        let employees = await db.employee.findAll({ where: { marketId, orgId } });
        this.ctx.body = { ok: true, data: { employees } }
    }
    async employeeCreate() {
        let newEmployee = this.ctx.request.body;
        newEmployee = await db.employee.create(newEmployee);
        this.ctx.body = { ok: true, data: newEmployee }
    }
    async employeeDelete() {
        let { epId } = this.ctx.query;
        await db.employee.destroy({ where: { epId } });
        this.ctx.body = { ok: true, data: '' }

    }
    async employeeUpdate() {
        let newEmployee = this.ctx.request.body;
        await db.employee.update(newEmployee, { where: { epId: newEmployee.epId } });
        this.ctx.body = { ok: true, data: '' }
    }


    async roleCreate() {
        let newRole = await db.role.create(this.ctx.request.body);
        this.ctx.body = { ok: true, data: newRole };

    }
    async roleUpdate() {
        let newRole = await db.role.update(this.ctx.request.body, { where: { roleId: this.ctx.request.body.roleId } });
        this.ctx.body = { ok: true, data: newRole };

    }
    async  marketMenus() {
        let { mktId } = this.ctx.query;
        let market = await db.market.findOne({ where: { mktId } });
        if (market) {
            let menus = await db.menu.findAll({ where: { menuId: { $in: market.menuIds as number[] } } });
            this.ctx.body = { ok: true, data: { menus } };
        } else {
            this.ctx.body = { ok: false, msg: '市场不存在' }
        }
    }
    async roleDelete() {
        let { roleId } = this.ctx.query;
        await db.role.destroy({ where: { roleId } });
        this.ctx.body = { ok: true, data: '' };
    }
    async roleList() {
        let { marketId } = this.ctx.query;
        let roles = await db.role.findAll({ where: { marketId } });
        this.ctx.body = { ok: true, data: { roles } };
    }
    async templateList() {
        let templates = await db.template.findAll();
        this.ctx.body = { ok: true, data: templates }
    }
    async templateCreate() {
        let newtemplate = this.ctx.request.body;
        newtemplate = await db.template.create(newtemplate);
        this.ctx.body = { ok: true, data: newtemplate }
    }
    async templateUpdate() {
        let template = this.ctx.request.body;
        template = await db.template.update(template, { where: { templateId: template.templateId }, });
        this.ctx.body = { ok: true, data: template }
    }
    async templateDelete() {
        let { templateId } = this.ctx.query;
        await db.template.destroy({ where: { templateId } })
        this.ctx.body = { ok: true, data: '' }
    }

    async tableListByDbId() {
        let { dbId } = this.ctx.query;
        let tables = await db.table.findAll({ where: { dbId } });
        this.ctx.body = { ok: true, data: tables };
    }
    async tableList() {
        let tables = await db.table.findAll();
        this.ctx.body = { ok: true, data: tables }
    }
    async tableCreate() {
        let newtable = this.ctx.request.body;
        newtable = await db.table.create(newtable);
        this.ctx.body = { ok: true, data: newtable }
    }
    async tableUpdate() {
        let table = this.ctx.request.body;
        table = await db.table.update(table, { where: { tableId: table.tableId }, });
        this.ctx.body = { ok: true, data: table }

    }
    async tableDeleete() {
        let { tableId } = this.ctx.query;
        await db.table.destroy({ where: { tableId }, });
        this.ctx.body = { ok: true, data: tableId }
    }
    async tableDetail() {
        let { tableId } = this.ctx.query;
        let table = await db.table.findOne({ where: { tableId } })
        this.ctx.body = { ok: true, data: table }
    }



    async userList() {
        let dbs = await db.db.findAll();
        this.ctx.body = { ok: true, data: dbs }
    }
    async userCreate() {
        let newDb = this.ctx.request.body;
        newDb = await db.db.create(newDb);
        this.ctx.body = { ok: true, data: newDb }
    }
    async userUpdate() {
        let db = this.ctx.request.body;
        db = await db.db.update(db, { where: { dbId: db.dbId }, });
        this.ctx.body = { ok: true, data: db }
    }





    async marketCreate() {
        let newMarket = this.ctx.request.body;
        newMarket = await db.market.create(newMarket);
        this.ctx.body = { ok: true, data: newMarket };
    }
    async marketPage() {
        let { page, pageSize, } = this.ctx.query;
        if (!page) page = 0
        if (!pageSize) pageSize = 10;
        if (typeof page == 'string') page = parseInt(page);
        if (typeof pageSize == 'string') pageSize = parseInt(pageSize);
        let markets = await db.market.findAndCount({ limit: pageSize, offset: page * pageSize, where: {} });
        this.ctx.body = { ok: true, data: { markets } };
    }
    async marketUpdate() {
        let updateMarket = this.ctx.request.body;
        let mktId;
        if (updateMarket.mktId) mktId = updateMarket.mktId;
        let updateAction = await db.market.update(updateMarket, { where: { mktId } });
        this.ctx.body = { ok: true, data: updateAction };

    }
    async marketDelete() {
        let { mktId } = this.ctx.query;
        let delAction = await db.market.destroy({ where: { mktId } });
        this.ctx.body = { ok: true, data: delAction };
    }
    async marketDetail() {
        let { mktId } = this.ctx.query;
        let market = await db.market.findOne({ where: { mktId } });
        this.ctx.body = { ok: true, data: { market } };
    }
    async orgList() {
        let { marketId, parentId } = this.ctx.query;
        let orgs = await db.org.findAll({ where: { marketId, parentId } });
        this.ctx.body = { ok: true, data: { orgs } };
    }
    async orgDelete() {
        let { orgId } = this.ctx.query;
        let org = await db.org.destroy({ where: { orgId } });
        this.ctx.body = { ok: true, data: { org } };

    }
    async orgDetail() {
        let { orgId, marketId } = this.ctx.query;

        let org = await db.org.findOne({ where: { orgId } });
        if (!org) {

            if (marketId) {
                org = await db.market.findOne({ where: { mktId: marketId } }) as any;
            }

        }
        this.ctx.body = { ok: true, data: { org } };

    }
    async devLogin() {
        let { userName, password } = this.ctx.request.body;

        let correct = await db.developer.findOne({ where: { devUserName: userName, password } });

        if (correct) {
            let menus = await db.menu.findAll({ where: { menuType: 3 } });
            this.ctx.body = { ok: true, data: { dev: correct, menus } }
        } else {
            this.ctx.body = { ok: false, msg: '密码错误' }
        }

    }
    async orgCreate() {
        let newOrg = await this.ctx.request.body;
        newOrg = await db.org.create(newOrg);
        this.ctx.body = { ok: true, data: newOrg };

    }
    async orgUpdate() {
        let org = this.ctx.request.body;
        await db.org.update(org, { where: { orgId: org.orgId } });
        this.ctx.body = { ok: true, data: {} };
    }

    async menuList() {
        let { menuType, devId } = this.ctx.query;
        console.log(devId)
        let menus = await db.menu.findAll({ where: { menuType } });
        this.ctx.body = { ok: true, data: { menus } };
    }
    async menuCreate() {
        let newMenu = this.ctx.request.body;
        if (newMenu.menuId) delete newMenu.menuId;
        if (!newMenu.parentId) delete newMenu.parentId;
        let newMenuRes = await db.menu.create(newMenu);
        this.ctx.body = { ok: true, data: newMenuRes }
    }
    async menuUpdate() {
        let updateMenu = this.ctx.request.body;
        let menuId;
        if (updateMenu.menuId) {
            menuId = updateMenu.menuId;
            delete updateMenu.menuId;
        }
        let updateAction = await db.menu.update(updateMenu, { where: { menuId } });
        this.ctx.body = { ok: true, data: updateAction }
    }
    async menuDelete() {
        let { menuId } = this.ctx.query;
        await db.menu.destroy({ where: { menuId } });
        this.ctx.body = { ok: true, data: '删除成功' }
    }

} 