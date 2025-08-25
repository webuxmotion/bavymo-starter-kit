import './App.css';
import { useUserStore } from './store/useUserStore';
import { useSocket } from './socket/useSocket';
import { useSocketStore } from './store/useSocketStore';
import { useMemo } from 'react';
import Room from './components/Room/Room';
import { usePersonalCode } from './hooks/usePersonalCode';
import { UsersList } from './components/UsersList.tsx/UsersList';

function App() {
  // Initialize socket once
  useSocket();

  const socket = useSocketStore((state) => state.socket);
  const users = useUserStore((state) => state.users);
  const user = useUserStore((state) => state.user);
  const postAddUser = useUserStore((state) => state.postAddUser);

  // Handle personalCode
  usePersonalCode(socket?.id, postAddUser);

  // Filter users for display
  const availableUsers = useMemo(() => {
    if (!users || !user) return [];
    return users.filter(u => u.personalCode !== user.personalCode);
  }, [users, user]);

  return (
    <div>
      <Room />
      {user && <UsersList availableUsers={availableUsers} />}
      {user && (
        <>
          <h2>User</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;