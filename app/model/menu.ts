
import { Sequelize, STRING, INTEGER, Instance, BOOLEAN } from "sequelize";


interface IMenu {
    text?: string;
    i18n?: string;
    parentId?: number;
    link?: string;
    externalink?: string;
    target?: string;
    icon?: string;
    badge?: number;
    badgeDot?: undefined;
    badgeStatus?: string;
    hide?: undefined;
    hideInBreadcrumb?: undefined;
    acl?: string;
    shortcut?: undefined;
    shortcutRoot?: undefined;
    reuse?: undefined;
    menuId?: number;
    menuType?: number;
    creatorId?: number;
    menuCode?:string;

}


type IMenuInstance = Instance<IMenu> & IMenu;

export let MENU = (database: Sequelize) => {
    const menu = database.define<IMenuInstance, IMenu>(
        "menu",
        {
            menuId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            text: { type: STRING, allowNull:false},
            i18n: { type: STRING, },
            parentId: { type: INTEGER, },
            link: { type: STRING, },
            externalink: { type: STRING, },
            target: { type: STRING,  },
            icon: { type: STRING,  },
            hide: { type: BOOLEAN, },
            hideInBreadcrumb: { type: BOOLEAN },
            acl: { type: STRING,},
            shortcut: { type: BOOLEAN, },
            shortcutRoot: { type: BOOLEAN, },
            reuse: { type: BOOLEAN, },
            menuType: { type: INTEGER ,comment:'菜单类型,1是市场菜单3是开发者id'},
            creatorId: { type: INTEGER, comment:'创建者Id' },
            menuCode:{type:STRING,comment:'菜单编码',unique:true,allowNull:false},
            config:{type:STRING,defaultValue:'{}',
            comment:'配置文件',
             get() {
                return (this as any).getDataValue('config') ? JSON.parse((this as any).getDataValue('config')) : {}
            },
            set(val) {
                if(typeof val=='object'){
                    (this as any).setDataValue('config',JSON.stringify(val));
                }else{
                    (this as any).setDataValue('config',val);
                }
            }}

        }

    );

    // menu.sync({ force: true });


    return menu;
};