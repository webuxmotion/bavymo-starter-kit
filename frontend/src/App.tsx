import './App.css'
import { useUserStore } from './store/useUserStore';
import { useSocket } from './hooks/useSocket';

function App() {
  const users = useUserStore((state) => state.users);
  const fetchPersonalCode = useUserStore((state) => state.fetchPersonalCode);
  const { sendMessage } = useSocket();

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => fetchPersonalCode(Date.now(), "New User")}>
        Add User with Personal Code
      </button>

      <button onClick={() => sendMessage("Hello server!")}>
        Send Socket Message
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} — {u.personalCode}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;