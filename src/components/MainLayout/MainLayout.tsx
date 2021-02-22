import React from 'react';
import './MainLayout.css';
import Sidebar from '../Sidebar/Sidebar';

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
                    <h1>Chat</h1>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;
