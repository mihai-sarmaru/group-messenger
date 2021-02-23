import React from 'react';
import './MainLayout.css';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import { Switch, Route, withRouter } from 'react-router-dom';

const MainLayout = () => {
    return (
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
    )
}

export default withRouter(MainLayout);
