export const HISTORIES_SCHEMA = 'histories';

export const HistoriesSchema = {
    name: HISTORIES_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        messageId: 'int',
        contact: '{}',
        message: 'string',
        messageType: 'int',
        readAt: 'date',
        readBy: 'bool',
        editAt: 'date',
        editBy: 'bool',
        deleteAt: 'date',
        deleteBy: 'bool',
        createdAt: 'date',
        updatedAt: 'date',
    }
};