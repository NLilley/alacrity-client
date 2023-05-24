import { useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../../app/api/authenticationApi';
import Button from '../../../controls/button/Button';
import TextInput from '../../../controls/text-input/TextInput';
import classes from './LoginPage.module.scss';

export interface LoginPageProps { }

// Unforutnately, the navigate hook gets corrupted during the login process
// (I suspect due to the hot-swapping of routes that we perform)
// Stash the most-recently created hook so we always have access to a working navigate function
let navigate: NavigateFunction;
const LoginPage = (props: LoginPageProps) => {
  navigate = useNavigate();

  const [userName, setUserName] = useState('MaxProfits');
  const [password, setPassword] = useState('ToTheMoon+1');
  const [errorMessage, setErrorMessage] = useState('');

  const [attemptLogin, loginResult] = useLoginMutation();

  const login = () => {
    attemptLogin({ userName, password })
      .then((res: any) => {
        if (res?.error?.error != null) {
          let errorMessage = res.error.error;
          setErrorMessage(errorMessage);
        }
        else {
          navigate('/');
        }
      })
  };

  return <section className={`page rotate-root ${classes.login}`}>
    <div className={`card ${classes.loginCard}`}>
      {
        errorMessage?.length > 0 && <div>
          {errorMessage}
        </div>
      }
      <h2>Login</h2>
      <TextInput label='Username' value={userName} onChange={e => setUserName(e)} autoFocus onKeyDown={e => e.key === "Enter" && login()} />
      <TextInput label='Password' value={password} onChange={e => setPassword(e)} isPassword onKeyDown={e => e.key === "Enter" && login()} />
      <div className="text-right"><Link to="/contact-us">Trouble logging in?</Link></div>
      <div className="card-footer">
        <Button text='Login' size="medium" onClick={login} disabled={loginResult.status == 'pending'} />
      </div>
    </div>
    <div className={`card ${classes.hintCard} right`}>
        <h3>Pssst!</h3> 
        <div>MaxProfits/ToTheMoon+1</div>
        <div>MiniLosses/ToTheMoon+1</div>
    </div>
  </section>
};

export default LoginPage;