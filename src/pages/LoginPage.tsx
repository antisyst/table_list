
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      if (username === 'testuser' && password === 'testpassword123') {
        dispatch(loginSuccess({ username }));
        history('/table');
      } else {
        dispatch(loginFailure('Invalid username or password'));
        setError('Invalid username or password');
      }
    } catch (error) {
      dispatch(loginFailure('An error occurred during login'));
      setError('An error occurred during login');
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
        <button onClick={handleLogin} className='button_action'>Sign in</button>
        {error && <p>{error}</p>}
        </div>
    </main>
  );
}

export default LoginPage;
