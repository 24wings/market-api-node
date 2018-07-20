import { Application } from "egg";

module.exports = (app: Application) => {
  let devApi = {
    subjectCreate: '/api/subject/create',
    subjectUpdate: '/api/subject/update',
    subjectDelete: '/api/subject/delete',
    subjectList: '/api/subject/list',
    categoryCreate: '/api/category/create',
    categoryList: '/api/category/list',
    categoryUpdate: '/api/category/update',
    categoryDelete: '/api/category/delete',
    /**
     * 元数据 的更新表 的数据更新
     * post
     * body{ metaObject,dataItem }
     */
    metaObjectDataUpdate: '/api/metaObject/data/update',
    /**
     *  interface FieldQueryOption {
                  field: string;
                  value: any;
                  compare: string;
        }
     * 获取元数据sql查询出来的数据,分页模式 
     * post 
     * body:{ page,pageSize,objectCode,query:FieldQueryOption[]}
     * return {results:[]}
     */
    metaObjectDataPage: '/api/metaObject/data/page',
    /**
     * 获取元数据列表
     * get
     * 
     * return {metaObjects}
     */
    metaObjectList: '/api/metaObject/list',
    /**
     * get 
     * ?objectCode
     * return {metaObject,fields}
     */
    metaObjectDetail: '/api/metaObject/detail',
    /** 
     * 元数据对象创建
     * post
     * body:{metaObject,fields}
    */
    metaObjectCreate: '/api/metaObject/create',
    /** 
     * 删除元数据 
     * get
     * ?objectCode
    */
    metaObjectDelete: '/api/metaObject/delete',
    /** 元数据更新 
     * post
     * body:{metaObject,fields}
     */
    metaObjectUpdate: '/api/metaObject/update',
    /**
     * 获取sql元数据
     * post
     * body:{sql}
     * {meta:[{field,type}]}
     **/
    sqlDetail: '/api/design/field',
    employeeDisabled: '/api/employee/disabled',
    employeeActive: '/api/employee/active',
    marketDisabled: '/api/market/disabled',
    marketActive: '/api/market/active',

    devCreate: '/api/dev/create',
    devUpdate: '/api/dev/update',
    devDelete: '/api/dev/delete',
    devPage: '/api/dev/page',
    /**
       * 
       * 
       */
    dbList: '/api/db/list',
    dbCreate: '/api/db/create',
    dbUpdate: '/api/db/update',
    dbDelete: '/api/db/delete',
    tableList: '/api/table/list',
    tableCreate: '/api/table/create',
    tableUpdate: '/api/table/update',
    tableDelete: '/api/table/delete',
    tableDetail: "/api/table/detail",
    tableListByDbId: "/api/table/listByDbId",
    templateList: '/api/template/list',
    templateCreate: '/api/template/create',
    templateUpdate: '/api/template/update',
    templateDelete: '/api/template/delete',
    groupCompanyEmployeeDetail: '/api/employee/gc-detail',
    /**
     * marketId=1&parentId=0
     */
    orgList: '/api/org/list',
    orgCreate: '/api/org/create',
    roleList: '/api/role/list',


    /**
   * 开发者登录接口
   * 
   * post
   * 
   * {username,password}
   * 
   * 
   * res:
   * {
   * dev:IDeveloper,
   * menus:IMenu[];
   * }
   */
    login: '/dev/login',
    menuList: '/api/menu/list',
    menuCreate: "/api/menu/create",
    menuUpdate: '/api/menu/update',
    menuDelete: '/api/menu/delete',
    menuDetail: '/api/menu/detail',
    /**
     *  根据menuCode获取菜单详细信息
     * get 
     * ?menuCode
     */
    menuDetailByMenuCode: '/api/menu/getByMenuCode',
    groupCompanyCreate: '/api/group-company/create',
    groupCompanyPage: '/api/group-company/page',
    groupCompanyDelete: '/api/group-company/delete',
    groupCompanyUpdate: '/api/group-company/update',
    marketCreate: '/api/market/create',
    marketPage: '/api/market/page',
    marketDelete: '/api/market/delete',
    marketUpdate: '/api/market/update',
    orgDetail: '/api/org/detail',
    orgDelete: '/api/org/delete',
    orgUpdate: '/api/org/update',
    /** ?mktId */
    marketDetail: '/api/market/detail',


    /* 集团的菜单列表  ?gcId*/
    groupCompanyMenu: "/api/group-company/menus",


    roleGcRoleChildren: '/api/role/gc-role-children',
    /** marketId */
    marketMenus: '/api/market/menus',
    roleCreate: '/api/role/create',
    roleUpdate: '/api/role/update',
    roleDelete: '/api/role/delete',
    employeeList: '/api/employee/list',
    employeeUpdate: '/api/employee/update',
    employeeDelete: '/api/employee/delete',
    employeeCreate: '/api/employee/create',
    paramList: '/api/param/list',
    paramCreate: '/api/param/create',
    paramDelete: '/api/param/delete',
    paramUpdate: '/api/param/update',

  }
  let devCtrl = app.controller.dev;

  app.router
    .post(devApi.login, devCtrl.devLogin)
    .get(devApi.menuList, devCtrl.menuList)
    .post(devApi.menuCreate, devCtrl.menuCreate)
    .post(devApi.menuUpdate, devCtrl.menuUpdate)

    .post(devApi.marketCreate, devCtrl.marketCreate)
    .get(devApi.marketPage, devCtrl.marketPage)
    .get(devApi.marketDelete, devCtrl.marketDelete)
    .post(devApi.marketUpdate, devCtrl.marketUpdate)
    .get(devApi.dbList, devCtrl.userList)
    .post(devApi.dbCreate, devCtrl.userCreate)
    .post(devApi.dbUpdate, devCtrl.userUpdate)
    .get(devApi.tableList, devCtrl.tableList)
    .post(devApi.tableCreate, devCtrl.tableCreate)
    .post(devApi.tableUpdate, devCtrl.tableUpdate)
    .get(devApi.tableDelete, devCtrl.tableDeleete)
    .get(devApi.tableDetail, devCtrl.tableDetail)
    .get(devApi.tableListByDbId, devCtrl.tableListByDbId)
    .get(devApi.templateList, devCtrl.templateList)
    .post(devApi.templateCreate, devCtrl.templateCreate)
    .post(devApi.templateUpdate, devCtrl.templateUpdate)
    .get(devApi.templateDelete, devCtrl.templateDelete)
    .get(devApi.menuDelete, devCtrl.menuDelete)
    .get(devApi.marketDetail, devCtrl.marketDetail)
    .get(devApi.orgList, devCtrl.orgList)
    .post(devApi.orgUpdate, devCtrl.orgUpdate)
    .post(devApi.orgCreate, devCtrl.orgCreate)
    .get(devApi.orgDetail, devCtrl.orgDetail)
    .get(devApi.orgDelete, devCtrl.orgDelete)
    .get(devApi.roleList, devCtrl.roleList)
    .get(devApi.marketMenus, devCtrl.marketMenus)
    .post(devApi.roleCreate, devCtrl.roleCreate)
    .post(devApi.roleUpdate, devCtrl.roleUpdate)
    .get(devApi.roleDelete, devCtrl.roleDelete)
    .get(devApi.employeeList, devCtrl.employeeList)
    .post(devApi.employeeCreate, devCtrl.employeeCreate)
    .post(devApi.employeeUpdate, devCtrl.employeeUpdate)
    .get(devApi.employeeDelete, devCtrl.employeeDelete)
    .get(devApi.paramList, devCtrl.paramList)
    .get(devApi.paramDelete, devCtrl.paramDelete)
    .post(devApi.paramCreate, devCtrl.paramCreate)
    .post(devApi.paramUpdate, devCtrl.paramUpdate)
    .get('/api/employee/detail', devCtrl.employeeDetail)
    .get(devApi.devPage, devCtrl.devPage)
    .post(devApi.devCreate, devCtrl.devCreate)
    .post(devApi.devUpdate, devCtrl.devUpdate)
    .get(devApi.devDelete, devCtrl.devDelete)
    .get(devApi.marketDisabled, devCtrl.marketDisabled)
    .get(devApi.marketActive, devCtrl.marketActive)
    .get(devApi.employeeDisabled, devCtrl.employeeDisabled)
    .get(devApi.employeeActive, devCtrl.employeeActive)
    .post(devApi.sqlDetail, devCtrl.sqlDetail)
    .post(devApi.metaObjectCreate, devCtrl.metaObjectCreate)
    .get(devApi.metaObjectList, devCtrl.metaObjectList)
    .get(devApi.metaObjectDetail, devCtrl.metaObjectDetail)
    .post(devApi.metaObjectDataPage, devCtrl.metaObjectDataPage)
    .get(devApi.metaObjectDelete, devCtrl.metaObjectDelete)
    .post(devApi.metaObjectUpdate, devCtrl.metaObjectUpdate)
    .post(devApi.metaObjectDataUpdate, devCtrl.metaObjectDataUpdate)
    .get(devApi.menuDetail, devCtrl.menuDetail)
    .get(devApi.menuDetailByMenuCode, devCtrl.menuDetailByMenuCode)
    .post(devApi.categoryCreate, devCtrl.categoryCreate)
    .get(devApi.categoryList, devCtrl.categoryList)
    .get(devApi.categoryDelete, devCtrl.categoryDelete)
    .post(devApi.categoryUpdate, devCtrl.categoryUpdate)
    .post(devApi.subjectCreate, devCtrl.subjectCreate)
    .get(devApi.subjectList, devCtrl.subjectList)
    .get(devApi.subjectDelete, devCtrl.subjectDelete)
    .post(devApi.subjectUpdate, devCtrl.subjectUpdate)
};
