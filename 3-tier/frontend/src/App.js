import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://<EC2_PUBLIC_IP>/api/users')  // Replace with your EC2 IP or domain
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <h1>Users from Backend + DB</h1>
      {users.length === 0 ? <p>Loading...</p> : (
        <ul>
          {users.map(user => <li key={user.id}>{user.name}</li>)}
        </ul>
      )}
    </div>
  );
}

export default App;
