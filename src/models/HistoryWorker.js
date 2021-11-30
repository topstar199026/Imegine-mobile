const Realm = require('realm');
// import { v4 as UUID } from 'uuid';
const { UUID } = Realm.BSON;
import { now } from 'moment';
import { v4 as uuid } from 'uuid'
import { HistoriesSchema, HISTORIES_SCHEMA } from './History';
// const UUID = require('bson').UUID;

const databaseOptions = {
    path: 'history.realm',
    schema: [HistoriesSchema],
    schemaVersion: 0
};

export const changeHandle = async () => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(HISTORIES_SCHEMA);
        console.log(tasks);
        task.close();
        return null;
    } catch (error) {
        return null;
    }    
}

export const loadHistory = async (values) => {
    // try {
    //     const task = await Realm.open(databaseOptions);
    //     const tasks = task.objects(HISTORIES_SCHEMA);
    //     const historyData = tasks.filtered(
    //         '(sender[\'id\'] = ' + values.senderId + ' && ' +
    //         'receiver[\'id\'] = ' + values.receiverId + ' ) || ('+
    //         'sender[\'id\'] = ' + values.receiverId + ' && ' +
    //         'receiver[\'id\'] = ' + values.senderId + ' )'
    //     ).sorted('createdAt');
    //     return historyData;
    // } catch (error) {
    //     return [];
    // }    
}

export const loadHistoryList = async (values) => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(HISTORIES_SCHEMA);
        const historyData = tasks.sorted('createdAt');
        return historyData;
    } catch (error) {
        return [];
    }    
}

export const saveHistory = async (values) => {
    let newHistory;
    const task = await Realm.open(databaseOptions);
    const tasks = task.objects(HISTORIES_SCHEMA);
    const historyData = tasks.filtered(
        'contact[\'id\'] = ' + values.sender.id
    ).sorted('createdAt');    
  
    task.write(() => {
        if(historyData.length === 0) {
            // @ts-ignore
            var newHistory = task.create(HISTORIES_SCHEMA, {
                id: values.messageId ,
                messageId: values.messageId ,
                contact: {
                    id: values.sender.id,
                    userId: values.sender.userId,
                    nickName: values.sender.nickName,
                    avatar: values.sender.avatar,
                },
                message: values.message,
                messageType: values.messageType,
                readAt: values.date,
                readBy: false,
                editAt: values.date,
                editBy: false,
                deleteAt: values.date,
                deleteBy: false,
                createdAt: values.date,
                updatedAt: values.date,
            });
        }else{
            var updateHistory = tasks[0];
            updateHistory.messageId = values.messageId;
            updateHistory.message = values.message;
            updateHistory.messageType = values.messageType;
            updateHistory.readAt = values.date;
            updateHistory.readBy = false;
            updateHistory.editAt = values.date;
            updateHistory.editBy = false;
            updateHistory.deleteAt = values.date;
            updateHistory.deleteBy = false;
            updateHistory.createdAt = values.date;
            updateHistory.updatedAt = values.date;
        }        
    });


}

