import { Application } from "egg";

module.exports = (app: Application) => {
    let api={
        list:'/rest/:model/list',
        detail:'/rest/:model/detail',
        delete:'/rest/:model/delete',
        update:'/rest/:model/update',
        create:'/rest/:model/create'
    }
    
    let rest= app.controller.rest;
    app.router
    .get(api.list,rest.getList)
    .get(api.detail,rest.getDetail)
    .get(api.delete,rest.getDelete)
    .post(api.update,rest.postUpdate)
    .post(api.create,rest.postCreate)
};
