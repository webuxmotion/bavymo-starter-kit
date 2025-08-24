import './App.css'
import { useUserStore } from './store/useUserStore';
import { useSocket } from './hooks/useSocket';
import { API_URL } from './config';
import { useEffect, useState } from 'react';
import type { OnlineUser } from '../../backend/src/types/shared/types';

const fetchGeneratePersonalCode = async (): Promise<{ personalCode: string }> => {
  const res = await fetch(`${API_URL}/generate-personal-code`);
  return res.json();
};

function App() {
  const users = useUserStore((state) => state.users);
  const user = useUserStore((state) => state.user);
  const postAddUser = useUserStore((state) => state.postAddUser);
  const { sendMessage, socket } = useSocket();
  const [availableUsers, setAvailableUsers] = useState<OnlineUser[]>([]);

  // Filter other users to show
  useEffect(() => {
    if (users && user) {
      const usersToShow = users.filter(u => u.personalCode !== user.personalCode);
      setAvailableUsers(usersToShow);
    }
  }, [users, user]);

  // Handle personalCode from URL or server
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
      }

      // Add user to store
      const newUser: OnlineUser = {
        socketId: socket.id!,
        personalCode,
      };

      postAddUser(newUser);
    })();
  }, [socket]);

  return (
    <div>
      {user ? (
        <>
          <h2>Users</h2>
          {availableUsers.map((u: OnlineUser) => (
            <div key={u.socketId}>
              <div>{u.personalCode} <button>Call</button></div>
            </div>
          ))}

          <h2>User</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <button onClick={() => sendMessage("Hello server!")}>
            Send Socket Message
          </button>
        </>
      ) : null}
    </div>
  );
}

export default App;