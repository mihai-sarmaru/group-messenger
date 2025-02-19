import React from 'react';
import './Login.css';
import { Button } from '@material-ui/core';

interface LoginProps {
    onLoginClick: () => void;
}

const Login:React.FC<LoginProps> = (props) => {
    return (
        <div className='login'>
            <div className="login__container">
                <img src='/icons/chat-icon.png' alt='Group Messenger' />
                <h1>Group Messenger</h1>
                <Button color='primary' variant='outlined'
                    onClick={props.onLoginClick}>Login with Google</Button>
            </div>
        </div>
    )
}

export default Login;
