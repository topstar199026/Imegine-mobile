export const CONTACTS_SCHEMA = 'contacts';

export const ContactsSchema = {
    name: CONTACTS_SCHEMA,
    primaryKey: 'ContactId',
    properties: {
        ContactId: 'uuid',
        ContactUserId: 'string',
        FirstName: 'string',
        LastName: 'string',
        JobTitle: 'string',
        NickName: 'string',
        Address: 'string',
        Active: 'bool',
        Birthday: 'date',
    }
};