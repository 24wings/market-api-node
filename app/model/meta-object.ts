
import { Sequelize, STRING, INTEGER, Instance, BOOLEAN, } from "sequelize";



type IMetaObjectInstance = Instance<IMetaObject> & IMetaObject;

export let MetaObject = (database: Sequelize) => {
    const metaObject = database.define<IMetaObjectInstance, IMetaObject>(
        "meta_object",
        {
            metaId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            objectCode: { type: STRING, allowNull:false,unique:true },
            objectName: { type: STRING, allowNull: false },
            tableName: { type: STRING, allowNull: false },
            isSingle: { type: BOOLEAN },
            isCelledit: { type: BOOLEAN },
            isShowNum: { type: BOOLEAN },
            isFirstLoad: { type: BOOLEAN },
            filter: { type: BOOLEAN, },
            querySql: { type: STRING, allowNull: false, },
            defaultOrder: { type: STRING },
            bizIntercept: { type: STRING },
            config: {
                type: STRING, set(val) {
                    if (typeof val == 'object') {
                        val = JSON.stringify(val)
                    }
                    (this as any).setDataValue('config', val);
                }
            },
            groupName: { type: STRING, allowNull: false },
            pkKey: { type: STRING, allowNull: false },
            parentKey: { type: STRING }
        }

    );

    // metaObject.sync({ force: true });


    return metaObject;
};
