const Realm = require('realm');
// import { v4 as UUID } from 'uuid';
const { UUID } = Realm.BSON;
import { now } from 'moment';
import { v4 as uuid } from 'uuid'
import { ContactsSchema, CONTACTS_SCHEMA } from './Contact';
// const UUID = require('bson').UUID;

const databaseOptions = {
    path: 'realmT4.realm',
    schema: [ContactsSchema],
    schemaVersion: 0
};

export const openContact = async () => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(CONTACTS_SCHEMA);
        task.close();
        return null;
    } catch (error) {
        return null;
    }    
}

export const getContactList = async (str) => {
    try {
        const task = await Realm.open(databaseOptions);
        const tasks = task.objects(CONTACTS_SCHEMA);
        const data =  await tasks.filtered(
            'FirstName CONTAINS \'' + str + '\' ||' +
            'LastName CONTAINS \'' + str + '\' ||' +
            'JobTitle CONTAINS \'' + str + '\' ||' +
            'NickName CONTAINS \'' + str + '\' ||' +
            'Address CONTAINS \'' + str + '\''
        );
        task.close();
        return data;
    } catch (error) {
        return [];
    } 
}

export const saveContact = async (values) => {
    console.log(uuid());
    let newContact;
    const task = await Realm.open(databaseOptions);
    task.write(() => {
        // @ts-ignore
        newContact = task.create(CONTACTS_SCHEMA, {
            ContactId: new UUID(uuid()) ,
            ContactUserId: 'string',
            FirstName: 'string',
            LastName: 'string',
            JobTitle: 'string',
            NickName: 'string',
            Address: 'string',
            Active: true,
            Birthday: new Date(),
        });
    });
    task.close();

}