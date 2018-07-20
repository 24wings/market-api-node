
import {
    Sequelize,
    INTEGER,
    Instance,
    STRING,

} from "sequelize";

interface Table {
    tableId: number;
    /** 表名 */
    name?: string

    /** 备注 */
    comment?: string

    /** 字段JSON数据格式字符串 */
    cols?: string;
    dbId?: number;

}

type TableInstance = Instance<Table> & Table;

/** comment */
export let TABLE = (database: Sequelize) => {
    const table = database.define<TableInstance, Table>(
        "table",
        {
            tableId: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
            name: {
                type: STRING,
            },

            comment: {
                type: STRING,
            },

            cols: {
                type: STRING,
            },
            dbId: { type: INTEGER }
        }

    );

    // table.sync({ force: true });
    return table;
};

