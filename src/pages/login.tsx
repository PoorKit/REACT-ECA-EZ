import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { useUserContext } from '../contexts/UserContext';
import { login, LoginRequest, findMe } from '../services/api';

function Login() {
  const { setIsAuthenticated, setToken } = useAuthContext();
  const { setUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (username !== null && password !== null && username !== '' && password !== '') {
      try {
        const userData: LoginRequest = {
          username: username,
          password: password,
        };

        const response = await login(userData);

        if (response.token) {
          setIsAuthenticated(true);
          setToken(response.token);
          const user = await findMe(username);
          if (user) {
            setUser(user);
          }
        } else {
          // Handle authentication error
          setError('Authentication failed');
        }
      } catch (error) {
        // Handle any other errors (e.g., network issues)
        setError(error.response.data);
      }
    }
  };

  // Sample credentials list
  const credentials = [
    { username: 'johnd', password: 'm38rmF$' },
    { username: 'mor_2314', password: '83r5^_' },
    // Add more credentials as needed
  ];

  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/4">
        {/* Can be extracted to Components */}
        <div>
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          {error && (
            <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 rounded border border-gray-300 shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Login
          </button>
        </div>
        {/* Can be extracted to Components */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Sample Credentials:</h2>
          <ul className="list-disc list-inside">
            {credentials.map((credential, index) => (
              <li key={index}>
                Username: {credential.username}, Password: {credential.password}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
