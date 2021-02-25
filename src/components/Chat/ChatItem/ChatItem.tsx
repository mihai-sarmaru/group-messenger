import React from 'react';
import './ChatItem.css';
import firebase from 'firebase';
import { Avatar } from '@material-ui/core';
import { IMessage } from '../../../utils/interfaces';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store/rootStore';
import { convertDate } from '../../../utils/dateConverter';

interface ChatItemProps {
    message: IMessage;
}

const ChatItem:React.FC<ChatItemProps> = (props) => {

    const user = useSelector((state: AppState) => state.userReducer.user);

    return (
        <div className={`chatItem ${user.uid === props.message.user.uid ? 'chatItem-user' : ''}`}>
            <Avatar src={props.message.user.avatar} alt={props.message.user.name} />
            <div className="chatItem__message">
                <div className="chatItem__messageInfo">
                    <h6>{props.message.user.name}</h6>
                    <p>{props.message.timestamp && convertDate((props.message.timestamp as firebase.firestore.Timestamp).toMillis())}</p>
                </div>
                <p>{props.message.message}</p>
            </div>
        </div>
    )
}

export default ChatItem;
