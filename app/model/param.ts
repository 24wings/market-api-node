
import { Sequelize, STRING, INTEGER, Instance, BOOLEAN, } from "sequelize";


interface IParams {
    id?: number;
    paramName?: string;
    paramKey?: string;
    paramValue?: string;
    type?: number;
    mktId?: number;
    remark?: string;
    addition?: string;
    defaultValue?: string;
    isLocal?: undefined;

}


type IParamsInstance = Instance<IParams> & IParams;

export let PARAMS = (database: Sequelize) => {
    const params = database.define<IParamsInstance, IParams>(
        "params",
        {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            paramName: { type: STRING, primaryKey: false, autoIncrement: false },
            paramKey: { type: STRING, primaryKey: false, autoIncrement: false },
            paramValue: { type: STRING, primaryKey: false, autoIncrement: false },
            type: { type: INTEGER, primaryKey: false, autoIncrement: false },
            mktId: { type: INTEGER, primaryKey: false, autoIncrement: false },
            remark: { type: STRING, primaryKey: false, autoIncrement: false },
            addition: { type: STRING, primaryKey: false, autoIncrement: false },
            defaultValue: { type: STRING, primaryKey: false, autoIncrement: false },
            isLocal: { type: BOOLEAN, primaryKey: false, autoIncrement: false },

        }

    );

    // params.sync({ force: true });


    return params;
};
