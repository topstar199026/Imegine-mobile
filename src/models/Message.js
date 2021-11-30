export const MESSAGES_SCHEMA = 'messages';

export const MailToSchema = {
    name: "mailTo",
    embedded: true,
    properties: {
        id: 'int',
        contactId: 'string',
    },
};

export const MessagesSchema = {
    name: MESSAGES_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        sender: '{}',
        receiver: '{}',
        mailTo: {
            type: 'list',
            objectType: 'mailTo',
        },
        subject: 'string',
        message: 'string',
        messageType: 'int',
        readAt: 'date',
        readAt2: 'int',
        readBy: 'bool',
        editAt: 'date',
        editBy: 'bool',
        deleteAt: 'date',
        deleteBy: 'bool',
        createdAt: 'date',
        createdAt2: 'int',
        updatedAt: 'date',
    }
};