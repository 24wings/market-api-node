import { Sequelize, STRING, INTEGER, Instance } from "sequelize";


type IOssFileInstance = Instance<IOSSFile> & IOSSFile;

export let OSSFile = (database: Sequelize) => {
    const ossFile = database.define<IOssFileInstance, IOSSFile>(
        "ossfile",
        {
            ossFileId: { type: INTEGER, primaryKey: true, autoIncrement: true },
            prefix: STRING,
            name: STRING,
            url: STRING,
            requestUrls: STRING,
            remotePort: INTEGER,
            rt: INTEGER,
            statusCode: INTEGER,
            status: INTEGER,
            remoteAddress: STRING,
            size: INTEGER,
            shopId: INTEGER
        }

    );

    // ossFile.sync({ force: true });


    return ossFile;
};