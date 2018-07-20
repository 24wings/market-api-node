

import {
    Sequelize, Instance,
    STRING,
    INTEGER,
} from "sequelize";


type ISubjectInstance = Instance<ISubject> & ISubject;

/** comment */
export let Subject = (database: Sequelize) => {
    const subject = database.define<ISubjectInstance, ISubject>(
        "subject",
        {
            subId: { type: INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
            subName: { type: STRING, allowNull: false, unique: true },
            subCode: { type: STRING, allowNull: false, unique: true, comment: '' },
            parentId: { type: INTEGER, },
            subLinkId: { type: INTEGER, comment: '实际链接科目' },
            marketId: { type: INTEGER, allowNull: true, comment: '市场id' }
        }
    );
    // subject.sync({ force: true });
    return subject;
};
