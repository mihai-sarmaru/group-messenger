import React from 'react';
import './ChatItem.css';
import { Avatar } from '@material-ui/core';

const ChatItem = () => {
    return (
        <div className='chatItem chatItem-user'>
            <Avatar>MS</Avatar>
            <div className="chatItem__message">
                <h6>Username</h6>
                <p>Chat Message from the database</p>
            </div>
        </div>
    )
}

export default ChatItem;
