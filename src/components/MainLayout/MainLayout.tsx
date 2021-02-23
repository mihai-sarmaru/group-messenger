import React, { useState } from 'react';
import './MainLayout.css';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/User/UserActions';
import Login from '../Login/Login';
import firebase from 'firebase';
import { auth, provider } from '../../firebase/firebase';

const MainLayout = () => {

    const [user, setUser] = useState<firebase.User>();

    const dispatch = useDispatch();

    const onLogin = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                setUser(result.user!);

                dispatch(loginUser({
                    uid: result.user!.uid,
                    name: result.user!.displayName,
                    email: result.user!.email,
                    avatar: result.user!.photoURL
                }));

                // connectToDatabase();
            })
            .catch(error => alert(error.message));
    }

    return (
        <div>
            {!user ? <Login onLoginClick={onLogin} /> :
                <div className='mainLayout'>
                    <div className="mainLayout__header">
                    </div>
                    <div className="mainLayout__content">
                        <div className="mainLayout__sidebar">
                            <Sidebar />
                        </div>
                        <div className="mainLayout__chat">
                        <Switch>
                            <Route path='/room/:roomId' component={Chat} />
                            <Route to='/' component={Chat}/>
                        </Switch>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default withRouter(MainLayout);
