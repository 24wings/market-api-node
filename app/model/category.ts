

import {
    Sequelize, Instance,
    STRING,
    INTEGER,
    BOOLEAN
} from "sequelize";


type ICategoryInstance = Instance<ICategory> & ICategory;

/** comment */
export let Category = (database: Sequelize) => {
    const category = database.define<ICategoryInstance, ICategory>(
        "category",
        {
            cateId: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
            cateName: {
                type: STRING, allowNull: false,
            },
            cateCode: {
                type: STRING, allowNull: false, unique: true
            },
            parentId: {
                type: STRING
            },
            isShow: {
                type: BOOLEAN,
            },

            orderNo: {
                type: INTEGER,
            },
            linkCateCode: { type: STRING, },
            mktId: { type: INTEGER },
            txnId: { type: INTEGER }
        }
    );
    // category.sync({ force: true });
    return category;
};
