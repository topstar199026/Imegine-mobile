const Realm = require('realm');
const { UUID } = Realm.BSON;
import { now } from 'moment';
import { v4 as uuid } from 'uuid'
import { READS_SCHEMA, ReadsSchema } from './Read';
// const UUID = require('bson').UUID;

const databaseOptions = {
    path: 'read.realm',
    schema: [ReadsSchema],
    schemaVersion: 1
};

export const openRead = async () => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(READS_SCHEMA);
        return null;
    } catch (error) {
        return null;
    }    
}

// {"ReadPendings.id": 21, "active": true, "created_at": "2021-11-23T00:57:28.237Z", "groupId": 21, "groupUserId": 39, "id": 7, "messageId": 467, "readAt": "2021-11-23T00:57:28.157Z", "updated_at": "2021-11-23T00:57:28.237Z", "userId": "RUQNCRGI6NN"}
export const savePendingRead = async (list) => {
    const task = await Realm.open(databaseOptions);
    task.write(() => {
        for(var i = 0; i < list.length; i++) {
            let values = list[i]; 
            console.log('values', values)
            // @ts-ignore
            task.create(READS_SCHEMA, {
                id: values['ReadPendings.id'] ,
                messageId: values.messageId,
                groupId: values.groupId,
                groupUserId: values.groupUserId,
                userId: values.userId,
                readAt: values.readAt,
                active: values.active
            });
            
        }   
    });
}