import {
    Sequelize, Instance,
    STRING,
    INTEGER,
} from "sequelize";

interface IDb {

    /** 数据库Id */
    dbId?: number;

    /** 开发者Id */
    devId?: number;

    /** 数据库名称 */
    name?: string;

    /** 注释 */
    comment?: string;

}

type IDbInstance = Instance<IDb> & IDb;

/** comment */
export let DB = (database: Sequelize) => {
    const db = database.define<IDbInstance, IDb>(
        "db",
        {

            dbId: {
                type: INTEGER, primaryKey: true, allowNull: false,
                autoIncrement: true,
            },

            devId: {
                type: INTEGER,
            },

            name: {
                type: STRING, allowNull: false,
            },

            comment: {
                type: STRING,
            }


        }

    );

    // db.sync({ force: true });


    return db;
};
