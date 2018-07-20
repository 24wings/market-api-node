import { Application } from "egg";




module.exports = (app: Application) => {
    let web = app.controller.web;
    let api = {
        // home: '/home',
        index: "/index",

    };
    app.router
        // .get(api.home, web.home)
        .get(api.index, web.index)


};
