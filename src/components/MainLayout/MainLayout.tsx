import React, { useEffect, useState } from 'react';
import './MainLayout.css';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import { Switch, Route, withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/User/UserActions';
import Login from '../Login/Login';
import firebase from 'firebase';
import { auth, provider } from '../../firebase/firebase';
import { IUser } from '../../store/User/User';

const MainLayout = () => {

    const [user, setUser] = useState<firebase.User | IUser>();

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const localUser = localStorage.getItem('logged_user');
        if (localUser !== null) {
            const parsedUser = JSON.parse(localUser);
            setUser(parsedUser);
            dispatch(loginUser(parsedUser));
        }
    }, []);

    const onLogin = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                setUser(result.user!);

                const loggedUser: IUser = {
                    uid: result.user!.uid,
                    name: result.user!.displayName ? result.user!.displayName : 'Unknown',
                    email: result.user!.email ? result.user!.email : 'Unknown email',
                    avatar: result.user!.photoURL ? result.user!.photoURL : '',
                }

                dispatch(loginUser(loggedUser));
                localStorage.setItem('logged_user', JSON.stringify(loggedUser));
            })
            .catch(error => alert(error.message));
    }

    const onLogout = () => {
        auth.signOut();
        localStorage.removeItem('logged_user');
        setUser(undefined);
        history.push('/');
    }

    return (
        <div>
            {!user ? <Login onLoginClick={onLogin} /> :
                <div className='mainLayout'>
                    <div className="mainLayout__header">
                    </div>
                    <div className="mainLayout__content">
                        <div className="mainLayout__sidebar">
                            <Sidebar logout={onLogout}/>
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
