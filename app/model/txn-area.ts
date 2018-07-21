import { Sequelize, Instance, INTEGER, STRING } from 'sequelize'


type ITxnAreaInstance = Instance<ITxnArea> & ITxnArea;

export var TxnArea = (database: Sequelize) => {
    var txnArea = database.define<ITxnAreaInstance, ITxnArea>('txn-area', {
        txnId: { type: INTEGER, primaryKey: true, autoIncrement: true },
        mktId: { type: INTEGER, allowNull: true },
        txnCode: { type: STRING, allowNull: false, unique: true },
        txnName: { type: STRING, allowNull: false },

    })
    // txnArea.sync({ force: true });
    return txnArea;
}