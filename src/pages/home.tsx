import { useAuthContext } from '../contexts/AuthContext';

export default function Home() {
  const { setIsAuthenticated } = useAuthContext();

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h2> HELLO! </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
