// cimport { and, or } from "sequelize";
import { Controller } from "egg";
// import { RewardRecordType } from "../../constant";
// import Sequelize = require("sequelize");

import db = require("../model");

export default class extends Controller {
    async txnAreaList() {
        let { mktId, page, pageSize } = this.ctx.request.body;
        if (!page) page = 0;
        if (!pageSize) pageSize = 10;
        let result = await db.txnArea.findAndCountAll({ limit: pageSize, offset: page * pageSize, where: { mktId } });
        this.ctx.body = { ok: true, data: { txnAreas: result } };
    }
    async txnAreaCreate() {
        let newTxnArea = this.ctx.request.body;
        newTxnArea = await db.txnArea.create(newTxnArea);
        this.ctx.body = { ok: true, data: { txnArea: newTxnArea } };
    }
    async txnAreaUpdate() {
        let newTxnArea: ITxnArea = this.ctx.request.body;
        let result = await db.txnArea.update(newTxnArea, { where: { txnId: newTxnArea.txnId } });
        this.ctx.body = { ok: true, data: result };
    }
    async txnAreaDelete() {
        let del = await db.txnArea.destroy({ where: { txnId: this.ctx.query.txnId } });
        this.ctx.body = { ok: true, data: del };
    }

    async categoryList() {
        let { mktId, pageSize, page } = this.ctx.request.body;
        if (!pageSize) pageSize = 10;
        if (!page) page = 0;
        if (!mktId) {
            return this.ctx.body = { ok: false, msg: '参数缺省' }
        }
        let categorys = await db.category.findAndCountAll({ limit: pageSize, offset: page * pageSize, where: { mktId: mktId as any } });
        this.ctx.body = { ok: true, data: { categorys } }
    }
    async categoryCreate() {
        let newCategory: ICategory = this.ctx.request.body;
        if (!newCategory.parentId) {
            this.ctx.body = { ok: false, msg: '市场人员不能创建顶级分类' }
        } else {
            newCategory = await db.category.create(newCategory);
            this.ctx.body = { ok: true, data: { category: newCategory } };
        }


    }
    async listRoleEmployees() {
        let { roleId, marketId } = this.ctx.query;
        let employees = await db.employee.findAll({ where: { marketId } });
        employees = employees.filter(emp => (emp.roleIds as number[]).indexOf(roleId) != -1);
        this.ctx.body = { ok: true, data: employees };
    }
    async batRoleAdd() {
        let { roleId, employeeIds } = this.ctx.request.body;
        let employees = await db.employee.findAll({ where: { epId: { $in: employeeIds } } });
        console.log(employees);
        employees.forEach(async employee => {
            if ((employee.roleIds as number[]).indexOf(roleId) == -1) {
                let roleIds = (employee.roleIds as number[]);
                roleIds.push(roleId);
                console.log(employee.roleIds, roleIds);
                await db.employee.update({ roleIds: roleIds }, { where: { epId: employee.epId as number } })
                console.log(`更新员工`, employee.epName);
            }
        });
        this.ctx.body = { ok: true, data: '更新成功' }
    }
    async noRoleEmployees() {
        let { marketId, roleId } = this.ctx.query;
        let employees = await db.employee.findAll({ where: { marketId, } });
        if (employees) {
            employees = employees.filter(employee => (employee.roleIds as number[]).indexOf(roleId) == -1);
            this.ctx.body = { ok: true, data: employees }
        } else {
            this.ctx.body = { ok: false, msg: '没有员工' }
        }
    }
    async login() {
        let { userName, password } = this.ctx.request.body;
        let employee = await db.employee.findOne({ where: { epUserName: userName, password } });

        if (employee) {
            console.log(employee);
            let roles = await db.role.findAll({ where: { roleId: { $in: employee.roleIds as number[] } } });
            let menuIds: number[] = [];
            roles.forEach(role => {
                (role.menuIds as number[]).forEach(id => {
                    let exist = menuIds.find(menuId => menuId == id);
                    if (!exist) menuIds.push(id);
                });
            })
            let menus = await db.menu.findAll({ where: { menuId: { $in: menuIds } } });
            this.ctx.body = { ok: true, data: { menus, employee } };
        } else {
            this.ctx.body = { ok: false, msg: '用户名或密码错误' }
        }
    }
    async forgotPassword() {
        let { epId, password } = this.ctx.request.body;
        let update = await db.employee.update({ password }, { where: { epId } });
        this.ctx.body = { ok: true, data: update };
    }
}
