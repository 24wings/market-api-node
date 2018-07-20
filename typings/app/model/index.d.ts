// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Db from '../../../app/model/db';
import Developer from '../../../app/model/developer';
import Employee from '../../../app/model/employee';
import GroupCompany from '../../../app/model/groupCompany';
import Index from '../../../app/model';
import Market from '../../../app/model/market';
import Menu from '../../../app/model/menu';
import Org from '../../../app/model/org';
import OssFile from '../../../app/model/ossFile';
import Param from '../../../app/model/param';
import Role from '../../../app/model/role';
import Shop from '../../../app/model/shop';
import Table from '../../../app/model/table';
import Template from '../../../app/model/template';

declare module 'sequelize' {
  interface Sequelize {
    Db: ReturnType<typeof Db>;
    Developer: ReturnType<typeof Developer>;
    Employee: ReturnType<typeof Employee>;
    GroupCompany: ReturnType<typeof GroupCompany>;
    Index: ReturnType<typeof Index>;
    Market: ReturnType<typeof Market>;
    Menu: ReturnType<typeof Menu>;
    Org: ReturnType<typeof Org>;
    OssFile: ReturnType<typeof OssFile>;
    Param: ReturnType<typeof Param>;
    Role: ReturnType<typeof Role>;
    Shop: ReturnType<typeof Shop>;
    Table: ReturnType<typeof Table>;
    Template: ReturnType<typeof Template>;
  }
}
