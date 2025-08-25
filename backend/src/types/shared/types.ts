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
    Connecting = "connecting"
}

export type Room = {
    roomId: string;
    caller: OnlineUser;
    callee: OnlineUser;
    callStatus: CallStatus;
};

export type ClientRoomCreate = {
    callerPersonalCode: string;
    calleePersonalCode: string;
};