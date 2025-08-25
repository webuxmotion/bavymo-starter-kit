import type { OnlineUser } from '../../../../backend/src/types/shared/types';
import type { ClientRoomCreate } from '../../../../backend/src/types/shared/types';
import { useUserStore } from '../../store/useUserStore';
import { useSocketStore } from '../../store/useSocketStore';

type UsersListProps = {
    availableUsers: OnlineUser[];
};

export function UsersList({ availableUsers }: UsersListProps) {
    const socket = useSocketStore((state) => state.socket);
    const user = useUserStore((state) => state.user);

    const handleClickCall = (calleePersonalCode: string) => {
        if (!socket || !user) return;

        const data: ClientRoomCreate = {
            callerPersonalCode: user.personalCode,
            calleePersonalCode,
        };

        socket.emit('room-create', data);
    };

    return (
        <>
            <h2>Users</h2>
            {availableUsers.map(u => (
                <div key={u.socketId}>
                    <div>
                        {u.personalCode} <button onClick={() => handleClickCall(u.personalCode)}>Call</button>
                    </div>
                </div>
            ))}
        </>
    );
}