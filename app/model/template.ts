
import {
    Sequelize, Instance,
    STRING,
    INTEGER,
} from "sequelize";

interface Template {

    /** 模板Id */
    templateId?: number;

    /** 模板名称 */
    name?: string

    /** 模板描述 */
    comment?: string

    /** 开发者Id */
    devId?: number;
    template?: string;

}

type TemplateInstance = Instance<Template> & Template;

/** comment */
export let TEMPLATE = (database: Sequelize) => {
    const template = database.define<TemplateInstance, Template>(
        "template",
        {

            templateId: {
                type: INTEGER, primaryKey: true, allowNull: false,
                autoIncrement: true,
            },

            name: {
                type: STRING,
            },

            comment: {
                type: STRING,
            },

            devId: {
                type: INTEGER,
            },
            template: {
                type: STRING
            }


        }

    );
    // template.sync({ force: true });
    return template;
};

