import { Sequelize, STRING, INTEGER, Instance, DATE, } from "sequelize";


interface IShop {
    shopId?: number;
    shopName?: string;
    shopType?: number;
    shopStatus?: number;
    createTime?: Date;
    updateTime?: Date;
    walletStatus?: number;
    phone?: string;
    cardNum?: string;
    password?: string;
    passwordHash?: string;

}


type IShopInstance = Instance<IShop> & IShop;

export let SHOP = (database: Sequelize) => {
    const shop = database.define<IShopInstance, IShop>(
        "shop",
        {
            shopId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            shopName: { type: STRING, primaryKey: false, autoIncrement: false },
            shopType: { type: INTEGER, primaryKey: false, autoIncrement: false },
            shopStatus: { type: INTEGER, primaryKey: false, autoIncrement: false },
            createTime: { type: DATE, primaryKey: false, autoIncrement: false },
            updateTime: { type: DATE, primaryKey: false, autoIncrement: false },
            walletStatus: { type: INTEGER, primaryKey: false, autoIncrement: false },
            phone: { type: STRING, primaryKey: false, autoIncrement: false },
            cardNum: { type: STRING, primaryKey: false, autoIncrement: false },
            password: { type: STRING, primaryKey: false, autoIncrement: false },
            passwordHash: { type: STRING, primaryKey: false, autoIncrement: false },

        }

    );

    // shop.sync({ force: true });


    return shop;
};
