export enum MessageTag {
    URGENT = 'URGENT',
    REMINDER = 'REMINDER',
    EMERGENCY = 'EMERGENCY',
    SNOWMOBILE = 'SNOWMOBILE',
    TRAINING = 'TRAINING',
    DUTY = 'DUTY',
    FYI = 'FYI',
    HELP_WANTED = 'HELP_WANTED',
}

export interface ReceivedMessage {
    title: String
    received_at: number
    body: String
    tags: String[]
    reminder: boolean
    read: boolean
    from: String
    patroller: number
}
