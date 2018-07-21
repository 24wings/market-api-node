import { Application } from "egg";




module.exports = (app: Application) => {
  let emp = app.controller.employee;
  let api = {
    /** get ? */
    categoryInternalList: '/employee/category/internal-list',

    /**
     * method post 
     * body:{mktId,page,pageSize}
     */
    txnAreaList: '/employee/txnArea/list',
    txnAreaDelete: '/employee/txnArea/delete',
    txnAreaUpdate: '/employee/txnArea/update',
    txnAreaCreate: '/employee/txnArea/create',
    /** get ?txnId */
    txnAreaDetail: '/employee/txnArea/detail',


    categoryCreate: '/employee/category/create',
    categoryList: '/employee/category/list',
    categoryUpdate: '/employee/category/update',
    categoryDelete: '/employee/category/delete',
    login: '/employee/login',
    modifyPassword: "/api/modify-password",
    /**
     * 获取没有该角色的员工 
     * 
     * get ?marketId&employeeId
    */
    noRoleEmployee: '/employee/employee/no-role',
    /**
     * 批量添加角色
     * Post ?marketId&roleId&employeeIds
     */
    batAddRole: '/employee/role/bat-add-employee',
    /**
     * 列出角色下的所有员工
     * Get ?roleId&marketId
     */
    roleEmployees: '/employee/role/employees',

  };
  app.router.post(api.login, emp.login)
    .post(api.modifyPassword, emp.forgotPassword)
    .get(api.noRoleEmployee, emp.noRoleEmployees)
    .post(api.batAddRole, emp.batRoleAdd)
    .get(api.roleEmployees, emp.listRoleEmployees)
    .post(api.categoryList, emp.categoryList)
    .post(api.categoryCreate, emp.categoryCreate)
    .post(api.categoryUpdate, emp.txnAreaCreate)
    .post(api.txnAreaList, emp.txnAreaList)
    .get(api.txnAreaDelete, emp.txnAreaDelete)
    .post(api.txnAreaCreate, emp.txnAreaCreate)
    .post(api.txnAreaUpdate, emp.txnAreaUpdate)
    .get(api.txnAreaDetail, emp.txnAreaDetail)
    .get(api.categoryInternalList, emp.categoryInternalList)

};
