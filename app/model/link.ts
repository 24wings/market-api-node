import {
    Sequelize, Instance,
    STRING,
    INTEGER,
    DATE,
    TEXT
} from "sequelize";


type ILinkInstance = Instance<ILink> & ILink;

/** comment */
export let LINK = (database: Sequelize) => {
    const link = database.define<ILinkInstance, ILink>(
        "link",
        {
            linkId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            link: { type: STRING, allowNull: false, unique: true },
            lastmod: { type: DATE },
            priority: { type: INTEGER, defaultValue: 0 },
            status: { type: STRING, defaultValue: 'unassigned' },
            html: { type: TEXT, },
            code: { type: STRING, }
        }

    );

    // link.sync({ force: true });


    return link;
};
