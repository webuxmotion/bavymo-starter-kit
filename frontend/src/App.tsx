import './App.css'
import { useUserStore } from './store/useUserStore';
import { useSocket } from './socket/useSocket';
import { API_URL } from './config';
import { useEffect, useState } from 'react';
import type { ClientRoomCreate, OnlineUser } from '../../backend/src/types/shared/types';
import Room from './components/Room/Room';
import { useSocketStore } from './store/useSocketStore';

const fetchGeneratePersonalCode = async (): Promise<{ personalCode: string }> => {
  const res = await fetch(`${API_URL}/generate-personal-code`);
  return res.json();
};

const fetchIsPersonalCodeValid = async (personalCode: string): Promise<{ valid: boolean }> => {
  const res = await fetch(`${API_URL}/is-personal-code-valid?personalCode=${personalCode}`);
  return res.json();
}

function App() {
  useSocket(); // !!!-->  INIT WEB SOCKET ONCE <--!!!

  const users = useUserStore((state) => state.users);
  const user = useUserStore((state) => state.user);
  const postAddUser = useUserStore((state) => state.postAddUser);
  const socket = useSocketStore((state) => state.socket);

  const [availableUsers, setAvailableUsers] = useState<OnlineUser[]>([]);

  const handleClickCall = (personalCode: string) => {
    if (socket && user) {
      const data: ClientRoomCreate = {
        callerPersonalCode: user.personalCode,
        calleePersonalCode: personalCode
      }

      socket.emit('room-create', data);
    }
  }

  // Filter other users to show
  useEffect(() => {
    if (users && user) {
      const usersToShow = users.filter(u => u.personalCode !== user.personalCode);
      setAvailableUsers(usersToShow);
    }
  }, [users, user]);


  useEffect(() => {
    if (!socket?.id) return;

    const urlParams = new URLSearchParams(window.location.search);
    let personalCode = urlParams.get('personalCode');

    (async () => {
      if (!personalCode) {
        // Fetch from server if missing
        const data = await fetchGeneratePersonalCode();
        personalCode = data.personalCode;

        // Update URL without reloading
        urlParams.set('personalCode', personalCode);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
      } else {
        const { valid } = await fetchIsPersonalCodeValid(personalCode);

        if (!valid) {
          // Remove invalid personalCode and reload
          urlParams.delete('personalCode');
          const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
          window.history.replaceState({}, '', newUrl);
          window.location.reload(); // reload page to generate new code
          return;
        }
      }

      // Add user to store
      const newUser: OnlineUser = {
        socketId: socket.id!,
        personalCode,
      };

      postAddUser(newUser);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <div>
      <Room />
      {user ? (
        <>
          <h2>Users</h2>
          {availableUsers.map((u: OnlineUser) => (
            <div key={u.socketId}>
              <div>{u.personalCode} <button onClick={() => handleClickCall(u.personalCode)}>Call</button></div>
            </div>
          ))}

          <h2>User</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>

        </>
      ) : null}
    </div>
  );
}

export default App;