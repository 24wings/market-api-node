
import { Sequelize, STRING, INTEGER, Instance,BOOLEAN, } from "sequelize";


type IMetaFieldInstance = Instance<IMetaField> & IMetaField;

export let MetaField = (database: Sequelize) => {
    const metaField = database.define<IMetaFieldInstance, IMetaField>(
        "meta_field",
        {
            fieldId:{ type: INTEGER, primaryKey: true, autoIncrement: true },
            objectCode:{ type: STRING, allowNull:false }, 
            isAuto:{type:BOOLEAN},
            express:{type:STRING},
            isQuery:{type:BOOLEAN},
            isShow:{type:BOOLEAN},
            isUpdate:{type:BOOLEAN},
            config:{type:STRING, set(val){
                if (typeof val=='object') {
                    val = JSON.stringify(val)
                }
                (this as any).setDataValue('config', val);
            },get(){
             return   (this as any).getDataValue('config') ? JSON.parse((this as any).getDataValue('config')) : {};
            }},
            fieldType:{type:STRING,allowNull:false},
            fieldName:{type:STRING,allowNull:false},
            recno:{type:INTEGER},
            alias:{type:STRING},
            presetValue:{type:STRING,},
            displayWidth:{type:INTEGER,defaultValue:200,}
        }

    );

    // metaField.sync({ force: true });


    return metaField;
};
