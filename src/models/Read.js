export const READS_SCHEMA = 'reads';

export const ReadsSchema = {
    name: READS_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        messageId: 'int',
        groupId: 'int',
        groupUserId: 'int',
        userId: 'string',
        readAt: 'date',
        active: 'bool',
    }
};