import Sequlize = require("sequelize");
import { OSSFile } from './ossFile';
import { MENU } from './menu';
import { DEVELOPER } from './developer';
import { MARKET } from './market';

import { SHOP } from './shop';
import { EMPLOYEE } from './employee';
import { ROLE } from './role';
import { DB } from './db';
import { TABLE } from './table';
import { TEMPLATE } from './template';
import { ORG } from './org';
import { PARAMS } from './param';
import { MetaObject } from './meta-object';
import { MetaField } from './meta-field';
import { Category } from './category';
import { Subject } from './subject';
import { LINK } from './link';
import { TxnArea } from './txn-area';

// get the client
const mysql = require('mysql2');
// const dbConfig={host:'127.0.0.1',user:'root',database:'market',password:'root'}
const dbConfig = { host: '47.106.131.159', user: 'root', database: 'market', password: 'root' }
// create the connection to database
export const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});
export let marketDb = new Sequlize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: "mysql",
  pool: {
    max: 5
  },
  define: {
    underscored: false,
    freezeTableName: true,
    // charset:'utf8'
  },
});

export let ossFile = OSSFile(marketDb);
export let menu = MENU(marketDb);
export let developer = DEVELOPER(marketDb);
export let market = MARKET(marketDb);

export let shop = SHOP(marketDb);
export let employee = EMPLOYEE(marketDb);
export let role = ROLE(marketDb);
export let db = DB(marketDb);
export let table = TABLE(marketDb);
export let template = TEMPLATE(marketDb);
export let org = ORG(marketDb);
export let param = PARAMS(marketDb);
export let metaObject = MetaObject(marketDb);
export let metaField = MetaField(marketDb);
export let category = Category(marketDb);
export let subject = Subject(marketDb)
export let link = LINK(marketDb);
export let txnArea = TxnArea(marketDb);
// market.update({status:MarketStatus.Active},{where:{}});