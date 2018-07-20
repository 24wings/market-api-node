
import { Sequelize, STRING, INTEGER, Instance, DATE, } from "sequelize";
import { EmployeeStatus } from '../constant';



type IEmployeeInstance = Instance<IEmployee> & IEmployee;

export let EMPLOYEE = (database: Sequelize) => {
    const employee = database.define<IEmployeeInstance, IEmployee>(
        "employee",
        {
            epId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            epName: { type: STRING, primaryKey: false, autoIncrement: false },
            roleIds:{type:STRING,
                get() {return (this as any).getDataValue('roleIds') ? (this as any).getDataValue('roleIds').split(',') : []},
                set(val) {if (Array.isArray(val)) {val = val.join(',');}
                    (this as any).setDataValue('roleIds', val);
                }},
            menuIds: {
                type: STRING, 
                defaultValue: '', get() {
                    return (this as any).getDataValue('menuIds') ? (this as any).getDataValue('menuIds').split(',') : []
                },
                set(val) {
                    if (Array.isArray(val)) {
                        val = val.join(',');
                    }
                    (this as any).setDataValue('menuIds', val);

                }
            },
            epUserName: { type: STRING, primaryKey: false, autoIncrement: false },
            password: { type: STRING, primaryKey: false, autoIncrement: false },
            passwordHash: { type: STRING, primaryKey: false, autoIncrement: false },
            createTime: { type: DATE, primaryKey: false, autoIncrement: false },
            updateTime: { type: DATE, },
            orgId: { type: INTEGER },

            employeeType: { type: INTEGER, },
            marketId: { type: INTEGER, comment:'市场id'},
            status:{type:INTEGER,defaultValue:EmployeeStatus.Active}

        }

    );

    // employee.sync({ force: true });


    return employee;
};
