export type OnlineUser = {
    socketId: string;
    personalCode: string;
};

export enum CallStatus {
    Idle = "idle",
    Calling = "calling",
    InProgress = "in-progress",
    Ended = "ended",
    Rejected = "rejected",
}

export type Room = {
    caller: OnlineUser;
    callee: OnlineUser;
    callStatus: CallStatus;
};