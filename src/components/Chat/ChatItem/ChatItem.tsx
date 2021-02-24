import React from 'react';
import './ChatItem.css';
import { Avatar } from '@material-ui/core';
import { IMessage } from '../../../utils/interfaces';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/rootStore';

interface ChatItemProps {
    message: IMessage;
}

const ChatItem:React.FC<ChatItemProps> = (props) => {

    const user = useSelector((state: AppState) => state.userReducer.user);

    return (
        <div className={`chatItem ${user.uid === props.message.user.uid ? 'chatItem-user' : ''}`}>
            <Avatar src={props.message.user.avatar} alt={props.message.user.name} />
            <div className="chatItem__message">
                <h6>{props.message.user.name}</h6>
                <p>{props.message.message}</p>
            </div>
        </div>
    )
}

export default ChatItem;
