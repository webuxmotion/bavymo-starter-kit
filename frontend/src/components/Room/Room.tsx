import { CallStatus } from "../../../../backend/src/types/shared/types";
import { useRoomStore } from "../../store/useRoomStore";
import { useSocketStore } from "../../store/useSocketStore";
import { useUserStore } from "../../store/useUserStore";

function Room() {
    const room = useRoomStore((state) => state.room);
    const user = useUserStore((state) => state.user);
    const socket = useSocketStore((state) => state.socket);

    if (!room || !user) return <div>No active room</div>;

    let role: "caller" | "callee" | "unknown" = "unknown";

    if (room.caller.personalCode === user.personalCode) {
        role = "caller";
    } else if (room.callee.personalCode === user.personalCode) {
        role = "callee";
    }

    if (room.callStatus === CallStatus.Calling) {
        if (role === "caller") {
            return <h1>Calling...</h1>
        } else if (role === "callee") {
            return (
                <h1>Incoming call...
                    <button onClick={() => { socket?.emit('call-accept', { roomId: room.roomId }) }}>Accept</button>
                </h1>
            )
        }
    } else if (room.callStatus === CallStatus.Connecting) {
        if (role === "caller") {
            return <h1>Load video...</h1>
        } else if (role === "callee") {
            return (
                <h1>Load video...</h1>
            )
        }
    }

    return (
        <div>
            <h2>Room</h2>
            <p>Role: {role}</p>
            <pre>{JSON.stringify(room, null, 2)}</pre>
        </div>
    );
}

export default Room;