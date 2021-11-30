import { markAsReadChanel } from './ChanelWorker';
const Realm = require('realm');
// import { v4 as UUID } from 'uuid';
const { UUID } = Realm.BSON;
import { now } from 'moment';
import { v4 as uuid } from 'uuid'
import { MailToSchema, MessagesSchema, MESSAGES_SCHEMA } from './Message';
// const UUID = require('bson').UUID;

// https://docs.mongodb.com/realm-legacy/docs/javascript/latest/api/tutorial-query-language.html

const databaseOptions = {
    path: 'message.realm',
    schema: [MessagesSchema, MailToSchema],
    schemaVersion: 1
};

export const openMessage = async () => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(MESSAGES_SCHEMA);
        return null;
    } catch (error) {
        return null;
    }    
}

export const loadMessage = async (values) => {
    console.log('load history query', values)
    try {
        markAsReadChanel(values.groupId);
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(MESSAGES_SCHEMA);
        const messageData = 
            values.activeType === 'all'?
            tasks.filtered(
                // 'receiver[\'id\'] = ' + values.groupId + ' LIMIT(10)'
                'receiver[\'id\'] = ' + values.groupId + ''
            ).sorted('createdAt')
            :
            values.activeType === 'messages'?
            tasks.filtered(
                'receiver[\'id\'] = ' + values.groupId + ' && ' +
                'messageType = 0'
            ).sorted('createdAt')
            :
            tasks.filtered(
                'receiver[\'id\'] = ' + values.groupId + ' && ' +
                'messageType = 5'
            ).sorted('createdAt')
            ;
        return messageData;
    } catch (error) {
        return [];
    }    
}

export const loadMessageList = async (values) => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(MESSAGES_SCHEMA);
        const messageData = tasks.filtered(
            '(sender[\'id\'] = ' + values.senderId + ' && ' +
            'receiver[\'id\'] = ' + values.receiverId + ' ) || ('+
            'sender[\'id\'] = ' + values.receiverId + ' && ' +
            'receiver[\'id\'] = ' + values.senderId + ' )'
        ).sorted('createdAt');
        return messageData;
    } catch (error) {
        return [];
    }    
}

export const saveMessage = async (values) => {
    console.log(uuid());
    const task = await Realm.open(databaseOptions);
    var _msec = new Date(values.date).getTime();
    task.write(() => {
        // @ts-ignore
        task.create(MESSAGES_SCHEMA, {
            id: values.messageId ,
            sender: {
                id: values.sender.id,
                userId: values.sender.userId,
                nickName: values.sender.nickName,
                avatar: values.sender.avatar,
            },
            receiver: {
                id: values.group.id,
            },
            message: values.message,
            messageType: values.messageType,
            subject: values.subject ? values.subject : '',
            mailTo: values.receiver ? values.receiver : [],
            readAt: values.date,
            readAt2: _msec,
            readBy: false,
            editAt: values.date,
            editBy: false,
            deleteAt: values.date,
            deleteBy: false,
            createdAt: values.date,
            createdAt2: _msec,
            updatedAt: values.date,
        });
    });

}

export const saveReadState = async (values, user) => {
    // let newMessage;
    const task = await Realm.open(databaseOptions);
      
    task.write(() => {
        const tasks = task.objects(MESSAGES_SCHEMA); 
        var _msec = new Date(values.date).getTime();
        for(var i=0; i<values.messageList.length; i++){
            let _rData = values.messageList[i];
            
            const myTask = task.objectForPrimaryKey(MESSAGES_SCHEMA, _rData.messageId);

            console.log('messageData read state', _rData, myTask)
            if(myTask && myTask.readBy === false) {
                myTask.readBy = true;
                myTask.readAt = values.date;
                myTask.readAt2 = _msec;
            }

        }
        

        // console.log('message data ssssssss', values, messageData)
        // var _msec = new Date(values.date).getTime();
        // var _arr = [];
        // for(var i=0; i<messageData.length; i++)_arr.push(messageData[i].id);
        // _arr.forEach((j) => {
        //     const myTask = task.objectForPrimaryKey(MESSAGES_SCHEMA, j);
        //     if(myTask) {
        //         myTask.readBy = true;
        //         myTask.readAt = values.date;
        //         myTask.readAt2 = _msec;
        //     }
            
        // });
    });

}

export const saveReadMeState = async (list) => {
    // let newMessage;
    const task = await Realm.open(databaseOptions);
      
    task.write(() => {
        const tasks = task.objects(MESSAGES_SCHEMA); 
        // var _msec = new Date(values.date).getTime();
        for(var i=0; i<list.length; i++){
            let _rData = list[i];
            
            const myTask = task.objectForPrimaryKey(MESSAGES_SCHEMA, _rData.messageId);

            console.log('messageData me read state', _rData, myTask)
            if(myTask && myTask.readBy === false) {
                myTask.readBy = true;
                // myTask.readAt = values.date;
                // myTask.readAt2 = _msec;
            }

        }
    });

}

export const savePendingMessage = async (list, readList) => {
    const task = await Realm.open(databaseOptions);

    task.write(() => {
        for(var i = 0; i < list.length; i++) {
            let values = list[i]; 
            let _msec = new Date(values.date).getTime();

            console.log('values', values)
            // @ts-ignore
            task.create(MESSAGES_SCHEMA, {
                id: values.messageId ,
                sender: {
                    id: values.sender.id,
                    userId: values.sender.userId,
                    nickName: values.sender.nickName,
                    avatar: values.sender.avatar,
                },
                receiver: {
                    id: values.group.id,
                },
                message: values.message,
                messageType: values.messageType,
                subject: values.subject ? values.subject : '',
                mailTo: values.receiver ? values.receiver : [],
                readAt: values.date,
                readAt2: _msec,
                readBy: false,
                editAt: values.date,
                editBy: false,
                deleteAt: values.date,
                deleteBy: false,
                createdAt: values.date,
                createdAt2: _msec,
                updatedAt: values.date,
            });
            
        }   

        for(var j = 0; j < readList.length; j++) {
            let values = readList[j]; 
            console.log('values', values)
            const myTask = task.objectForPrimaryKey(MESSAGES_SCHEMA, values.messageId);
            if(myTask && myTask.readBy === false) {
                var _msec = new Date(values.readAt).getTime();

                myTask.readBy = true;
                myTask.readAt = values.readAt;
                myTask.readAt2 = _msec;
            }
            
        } 
    });
}

export const deleteHistory = async (values) => {
    console.log('delete message group id', values);
    const task = await Realm.open(databaseOptions);
    const tasks = task.objects(MESSAGES_SCHEMA);
    var data = tasks.filtered(
        'receiver[\'id\'] = ' + values.id + ''
    ).sorted('createdAt');

    var _arr = [];
    for(var i=0; i<data.length; i++)_arr.push(data[i].id);
    
        
    task.write(async () => {
        _arr.forEach((j) => {
            const myTask = task.objectForPrimaryKey(MESSAGES_SCHEMA, j);
            if(myTask) {
                task.delete(myTask);
            }
            
        });
        
    });
    task.close();
}

export const deleteMessageByIdArr = async (arr) => {
    const task = await Realm.open(databaseOptions);
    const tasks = task.objects(MESSAGES_SCHEMA);
     
        
    task.write(async () => {
        arr.forEach((id) => {
            const myTask = task.objectForPrimaryKey(MESSAGES_SCHEMA, id);
            if(myTask) {
                task.delete(myTask);
            }
            
        });
        
    });
    task.close();
}

