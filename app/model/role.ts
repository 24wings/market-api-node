
import { Sequelize, STRING, INTEGER, Instance, DATE, } from "sequelize";


type IRoleInstance = Instance<IRole> & IRole;

export let ROLE = (database: Sequelize) => {
    const role = database.define<IRoleInstance, IRole>(
        "role",
        {
            roleId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            roleName: { type: STRING, },
         
            marketId: { type: INTEGER, },
            createTime: { type: DATE, },
            updateTime: { type: DATE, },
           
            menuIds: {
                type: STRING, primaryKey: false, autoIncrement: false,
                defaultValue: '',
                get() {
                    return (this as any).getDataValue('menuIds') ? (this as any).getDataValue('menuIds').split(',') : []
                },
                set(val) {
                    if (Array.isArray(val)) {
                        val = val.join(',');
                    }
                    (this as any).setDataValue('menuIds', val);
                }

            }
        }

    );

    // role.sync({ force: true });


    return role;
};