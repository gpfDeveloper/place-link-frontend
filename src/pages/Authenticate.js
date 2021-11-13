import { useAuth } from "../contexts/auth-context";
const Authenticate = () => {
  const { login } = useAuth();
  return <button className='btn' onClick={() => login()}>Authenticate</button>;
};

export default Authenticate;
