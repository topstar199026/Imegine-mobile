const Realm = require('realm');
// import { v4 as UUID } from 'uuid';
const { UUID } = Realm.BSON;
import { now } from 'moment';
import { v4 as uuid } from 'uuid'
import { ChanelsSchema, CHANELS_SCHEMA } from './Chanel';

import { MessageActions } from 'src/actions';

// const UUID = require('bson').UUID;

const databaseOptions = {
    path: 'chanel.realm',
    schema: [ChanelsSchema],
    schemaVersion: 0
};

export const changeHandle = async () => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(CHANELS_SCHEMA);
        console.log(tasks);
        task.close();
        return null;
    } catch (error) {
        return null;
    }    
}

export const saveGroupId = async (userData) => {
    try {
        console.log('----------12-----------------------')
        const task =  await Realm.open(databaseOptions);
        await task.write(async () => {
            // @ts-ignore
            task.create(CHANELS_SCHEMA, {
                id: userData.id,
                groupName: userData.groupName,
                groupImage: userData.groupImage,
                lastMessage: userData.lastMessage,
                newMessage: userData.newMessage,
                lastDate: userData.updated_at,
                draft: userData.draft,
                hashKey: userData.hashKey,
                memberId: userData.memberId,
                member: userData.member,
                memberCount: userData.memberCount,
                private: userData.private,
                active: userData.active,
                status: userData.status,
                createdAt: userData.created_at,
                updatedAt: userData.updated_at,
            });
            console.log('----------13-----------------------')
        });
        console.log('----------14-----------------------')
    } catch (error) {
        console.log('save group error', error);
        return null;
    }    
}

export const getGroupId = async (groupId) => {
    try {
        const task =  await Realm.open(databaseOptions);
        const tasks = task.objects(CHANELS_SCHEMA);
        const data =  tasks.filtered(
            'id = ' + groupId
        );

        console.log('-------contact group filter data ',data);
        if(data && data.length === 1) {
            return data[0];
        } else {
            return null;
        }
        
    } catch (error) {
        console.log('Not group found', error);
        return null;
    }    
}

export const getGroupId2 = async (user, contactInfo) => {
    try {
        const task =  await Realm.open(databaseOptions);
        const tasks = task.objects(CHANELS_SCHEMA);
        const idArr = [
            user.userId,
            contactInfo.userId,
        ];
        idArr.sort();

        console.log(idArr);        
        
        const data =  tasks.filtered(
            'private = true && ' + 
            'memberCount = 2 && ' + 
            'member[\'user0\'] = \'' + idArr[0] + '\' && ' + 
            'member[\'user1\'] = \'' + idArr[1] + '\''
        );

        console.log('-------contact group filter data ',data);
        if(data && data.length === 1) {
            return data[0];
        } else {
            return null;
        }
        
    } catch (error) {
        console.log('Not group found', error);
        return null;
    }    
}

export const updateChanel = async (rsa, values, user) => {
    try {
        const task = await Realm.open(databaseOptions);

        let chanelData = task.objectForPrimaryKey(CHANELS_SCHEMA, values.group.id);
        
        if(!chanelData) {
            const groupId = await MessageActions.getGroupById2(rsa, values.group.id);
            if(groupId && groupId.status === true) {
                chanelData = task.objectForPrimaryKey(CHANELS_SCHEMA, values.group.id);
            }
        }

        chanelData && task.write(async () => { 
            var _newCount  = chanelData.newMessage ? chanelData.newMessage : 0;
            chanelData.lastMessage = values.message;
            chanelData.lastDate = values.date;
            chanelData.updatedAt = values.date;    
            chanelData.newMessage = values.sender.id !== user.id ? _newCount + 1 : _newCount;             
        });
    } catch (error) {
        console.log('chanel update error', error)
    }

}

export const updateChanelByPending = async (rsa, list, user, callBack) => {
    try {
        // realm.write() .then(() => { realm.create(data) .then((newObject) => {} });
        const task = await Realm.open(databaseOptions);

        for(var i=0; i<list.length; i++) {
            let values = list[i];
            let chanelData = task.objectForPrimaryKey(CHANELS_SCHEMA, values.group.id);
            console.log('----------2-----------------------')
            if(!chanelData) {
                console.log('----------3-----------------------')
                let groupId = await MessageActions.getGroupById4(rsa, values.group.id);
                console.log('----------4-----------------------')
                if(groupId && groupId.status === true) {
                    var userData = groupId.data;
                    console.log('----------5-2-----------------------')
                    await task.write(async () => {
                        // @ts-ignore
                        task.create(CHANELS_SCHEMA, {
                            id: userData.id,
                            groupName: userData.groupName,
                            groupImage: userData.groupImage,
                            lastMessage: values.message,
                            newMessage: 1,
                            lastDate: values.date,
                            draft: userData.draft,
                            hashKey: userData.hashKey,
                            memberId: userData.memberId,
                            member: userData.member,
                            memberCount: userData.memberCount,
                            private: userData.private,
                            active: userData.active,
                            status: userData.status,
                            createdAt: userData.created_at,
                            updatedAt: values.date,
                        });
                    });
                    
                }
            } else {
                console.log('----------6-----------------------', chanelData)
                await task.write(async () => {
                    console.log('----------6-0-----------------------', chanelData)
                    let _newCount  = chanelData.newMessage ? chanelData.newMessage : 0;
                    console.log('----------6-1-----------------------')
                    chanelData.lastMessage = values.message;
                    console.log('----------6-2-----------------------')
                    chanelData.lastDate = values.date;
                    console.log('----------6-3-----------------------')
                    chanelData.updatedAt = values.date;    
                    console.log('----------6-4-----------------------')
                    chanelData.newMessage = values.sender.id !== user.id ? _newCount + 1 : _newCount;  
                    console.log('----------7-----------------------')
                });
                console.log('----------7-1-----------------------')
            }
            console.log('----------8-----------------------')
        }




        // await task.write(async () => { 

        //     for(var i=0; i<list.length; i++) {
        //         let values = list[i];
        //         let chanelData = task.objectForPrimaryKey(CHANELS_SCHEMA, values.group.id);
        //         console.log('----------2-----------------------')
        //         if(!chanelData) {
        //             console.log('----------3-----------------------')
        //             let groupId = await MessageActions.getGroupById4(rsa, values.group.id);
        //             console.log('----------4-----------------------')
        //             if(groupId && groupId.status === true) {
        //                 var userData = groupId.data;
        //                 console.log('----------5-2-----------------------')
        //                 await task.write(async () => {
        //                     task.create(CHANELS_SCHEMA, {
        //                         id: userData.id,
        //                         groupName: userData.groupName,
        //                         groupImage: userData.groupImage,
        //                         lastMessage: userData.lastMessage,
        //                         newMessage: userData.newMessage,
        //                         lastDate: userData.updated_at,
        //                         draft: userData.draft,
        //                         hashKey: userData.hashKey,
        //                         memberId: userData.memberId,
        //                         member: userData.member,
        //                         memberCount: userData.memberCount,
        //                         private: userData.private,
        //                         active: userData.active,
        //                         status: userData.status,
        //                         createdAt: userData.created_at,
        //                         updatedAt: userData.updated_at,
        //                     });
        //                 });
                        
        //             }
        //         } else {
        //             console.log('----------6-----------------------', chanelData)
        //             let _newCount  = chanelData.newMessage ? chanelData.newMessage : 0;
        //             console.log('----------6-1-----------------------')
        //             chanelData.lastMessage = values.message;
        //             console.log('----------6-2-----------------------')
        //             chanelData.lastDate = values.date;
        //             console.log('----------6-3-----------------------')
        //             chanelData.updatedAt = values.date;    
        //             console.log('----------6-4-----------------------')
        //             chanelData.newMessage = values.sender.id !== user.id ? _newCount + 1 : _newCount;  
        //             console.log('----------7-----------------------')
        //         }
        //         console.log('----------8-----------------------')
        //     }

        // });

        callBack();
    } catch (error) {
        console.log('chanel update error', error)
        callBack();
    }

}

export const markAsReadChanel = async (groupId) => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(CHANELS_SCHEMA);
        var chanelData = tasks.filtered(
            'id = ' + groupId
        );

        chanelData.length === 1 && task.write(async () => { 
            var updateHistory = chanelData[0];
            updateHistory.newMessage = 0;             
        });
    } catch (error) {
        console.log('chanel update error', error)
    }

}

export const loadChanelList = async (values) => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(CHANELS_SCHEMA);
        const historyData = tasks.filtered('id > 0').sorted('createdAt');
        
        let data = historyData.map((data, index) => {
            return {
                id: data.id,
                groupName: data.groupName,
                groupImage: data.groupImage,
                lastMessage: data.lastMessage,
                lastDate: data.lastDate,
                newMessage: data.newMessage,
                draft: data.draft,
                hashKey: data.hashKey,
                memberId: data.memberId,
                member: data.member,
                memberCount: data.memberCount,
                private: data.private,
                active: data.active,
                status: data.status,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            }
        })
        return data;
    } catch (error) {
        return [];
    }    
}

export const deleteHistory = async (values) => {
    console.log('delete message group id', values);
    const task = await Realm.open(databaseOptions);
    task.write(async () => {
        const myTask = task.objectForPrimaryKey(CHANELS_SCHEMA, values.id);
        if(myTask) {
            task.delete(myTask);
        }
        
    });    
}
