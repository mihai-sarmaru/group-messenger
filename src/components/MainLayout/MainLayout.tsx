import React from 'react';
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div className='mainLayout'>
            <div className="mainLayout__header">
                <h1>Hello Group Messenger App</h1>
            </div>
            <div className="mainLayout__content">
                <div className="mainLayout__sidebar">
                    {/* SIDEBAR */}
                </div>
                <div className="mainLayout__chat">
                    {/* CHAT */}
                </div>
            </div>
        </div>
    )
}

export default MainLayout;
