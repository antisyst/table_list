import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice';
import Loader from '../components/loader';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    dispatch(loginStart());
    setError(null); // Clear any previous error messages
    setLoading(true); // Show loading element

    try {
      // Simulate an API request (replace this with your actual login logic)
      setTimeout(() => {
        if (username === 'testuser' && password === 'testpassword123') {
          dispatch(loginSuccess({ username }));
          history('/table');
        } else {
          dispatch(loginFailure('Invalid username or password'));
          setError('Invalid username or password');
        }
        setLoading(false); // Hide loading element
      }, 3000); // 3 seconds
    } catch (error) {
      dispatch(loginFailure('An error occurred during login'));
      setError('An error occurred during login');
      setLoading(false); // Hide loading element
    }
  };

  return (
    <main className='main_action'>
      <h1>Sign to Github</h1>
      <div className='form_container'>
        <div>
          <p>Username or email address</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <div className='title_cont'>
            <p>Password</p>
            <p>Forgot Password?</p>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleLogin}
          className='button_action'
          disabled={loading} // Disable the button during loading
        >
          {loading ? <Loader/> : 'Sign in'}
        </button>
        {error && <p>{error}</p>}
      </div>
    </main>
  );
}

export default LoginPage;
