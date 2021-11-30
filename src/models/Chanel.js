export const CHANELS_SCHEMA = 'chanels';

export const ChanelsSchema = {
    name: CHANELS_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        groupName: 'string',
        groupImage: 'string',
        lastMessage: 'string',
        lastDate: 'date',
        newMessage: 'int',
        draft: 'string',
        hashKey: 'int',
        memberId: 'string',
        member: '{}',
        memberCount: 'int',
        private: 'bool',
        active: 'bool',
        status: 'int',
        createdAt: 'date',
        updatedAt: 'date',
    }
};
