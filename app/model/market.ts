import { Sequelize, STRING, INTEGER, Instance, } from "sequelize";
import { MarketStatus } from '../constant';



type IMarketInstance = Instance<IMarket> & IMarket;

export let MARKET = (database: Sequelize) => {
    const market = database.define<IMarketInstance, IMarket>(
        "market",
        {
            mktId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            mktName: { type: STRING, primaryKey: false, autoIncrement: false },
            telephone: { type: STRING, primaryKey: false, autoIncrement: false },
            province: { type: STRING, primaryKey: false, autoIncrement: false },
            city: { type: STRING, primaryKey: false, autoIncrement: false },
            area: { type: STRING, primaryKey: false, autoIncrement: false },
            lat: { type: INTEGER, primaryKey: false, autoIncrement: false },
            lng: { type: INTEGER, primaryKey: false, autoIncrement: false },
            status: { type: INTEGER, defaultValue:MarketStatus.Active},
            licenseUrl: { type: STRING, primaryKey: false, autoIncrement: false },
            legalPeson: { type: STRING, primaryKey: false, autoIncrement: false },
            legalPhone: { type: STRING, primaryKey: false, autoIncrement: false },
            gcId: { type: INTEGER, primaryKey: false, autoIncrement: false },
            menuIds: {
                type: STRING, primaryKey: false, autoIncrement: false,
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
         
        }

    );

    // market.sync({ force: true });


    return market;
};
