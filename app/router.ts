import { Application } from "egg";

export default (app: Application) => {
  require("./route/dev.route")(app);
  require("./route/employee.route")(app);
  require('./route/rest.route')(app);
  require("./route/web.route")(app);
  require('./route/crawl.route')(app);
};
