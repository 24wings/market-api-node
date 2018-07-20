
import { Sequelize, STRING, INTEGER, Instance, DATE, } from "sequelize";


interface IOrg {
    orgId?: number;
    orgName?: string;
    parentId?: number;
    marketId?: number;
    createBy?: number;
    createName?: string;
    createTime?: Date;

}


type IOrgInstance = Instance<IOrg> & IOrg;

export let ORG = (database: Sequelize) => {
    const org = database.define<IOrgInstance, IOrg>(
        "org",
        {
            orgId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            orgName: { type: STRING, primaryKey: false, autoIncrement: false },
            parentId: { type: INTEGER, primaryKey: false, autoIncrement: false },
            marketId: { type: INTEGER, primaryKey: false, autoIncrement: false },
            createBy: { type: INTEGER, primaryKey: false, autoIncrement: false },
            createName: { type: STRING, primaryKey: false, autoIncrement: false },
            createTime: { type: DATE, primaryKey: false, autoIncrement: false },

        }

    );

    // org.sync({ force: true });


    return org;
};
