import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { login, LoginRequest } from '../services/api';

function Login() {
  const { setIsAuthenticated } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userData: LoginRequest = {
        username: username,
        password: password,
      };

      const response = await login(userData);

      if (response.token) {
        // Authentication was successful; set the isAuthenticated state
        setIsAuthenticated(true);
      } else {
        // Handle authentication error
        console.error('Authentication failed');
      }
    } catch (error) {
      // Handle any other errors (e.g., network issues)
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
