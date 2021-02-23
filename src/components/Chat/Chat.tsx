import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import db from '../../firebase/firebase';
import { IFirebaseRoom } from '../../utils/interfaces';
import env from '../../utils/env';
import { ChatParamTypes } from '../../utils/interfaces';
import ChatItem from './ChatItem/ChatItem';

const Chat = () => {

    const { roomId } = useParams<ChatParamTypes>();

    const [currentRoom, setCurrentRoom] = useState<IFirebaseRoom>();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setCurrentRoom({
                    id: snapshot.id,
                    data: snapshot.data()!
                });
            });
        }
    }, [roomId]);

    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`${env.getAvatarAPI()}${currentRoom?.data.name}.svg`} />
                <h1>{currentRoom?.data.name}</h1>
            </div>

            <div className="chat__content">
                <ChatItem />
                <ChatItem />
                <ChatItem />
            </div>

            <div className="chat__footer">

            </div>
        </div>
    )
}

export default Chat;
