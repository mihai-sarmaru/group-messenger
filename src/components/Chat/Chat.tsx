import React, { useEffect, useState } from 'react';
import './Chat.css';
import firebase from 'firebase';
import { useParams } from 'react-router-dom';
import { Avatar, Button, IconButton, Tooltip } from '@material-ui/core';
import db from '../../firebase/firebase';
import { IFirebaseRoom, IMessage, IRoom } from '../../utils/interfaces';
import env from '../../utils/env';
import { ChatParamTypes } from '../../utils/interfaces';
import ChatItem from './ChatItem/ChatItem';
import * as MdIcons from 'react-icons/md';
import { validateRoomName } from '../../utils/validation';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/rootStore';

const Chat = () => {

    const { roomId } = useParams<ChatParamTypes>();

    const user = useSelector((state: AppState) => state.userReducer.user);

    const [currentRoom, setCurrentRoom] = useState<IFirebaseRoom>();
    const [dbMessages, setDbMessages] = useState<IMessage[]>();
    const [messageToSend, setMessageToSend] = useState('');

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setCurrentRoom({
                    id: snapshot.id,
                    data: snapshot.data()!
                });
            });

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setDbMessages( snapshot.docs.map(doc => {
                    const msg: IMessage = {
                        id: doc.id,
                        message: doc.data().message,
                        timestamp: doc.data().timestamp,
                        user: {
                            uid: doc.data().user.uid,
                            name: doc.data().user.name,
                            email: doc.data().user.email,
                            avatar: doc.data().user.avatar
                        }
                    }
                    return msg;
                }));
            });
        }
    }, [roomId]);

    const addNewRoom = () => {
        const roomName = prompt('New room name');

        if (roomName && validateRoomName(roomName)) {
            const room: IRoom = {
                name: roomName.trim()
            }

            db.collection('rooms').add(room);
        }
    }

    const onSendMessage = (e: React.FormEvent) => {
        e.preventDefault();

        const msg: IMessage = {
            user: {
                uid: user.uid,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            },
            message: messageToSend,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        db.collection('rooms').doc(roomId).collection('messages').add(msg);
        
        setMessageToSend('');
    }

    return (
        <div className='chat'>
            {!roomId ? 
                <div className="chat__noRoom">
                    <img src='/icons/chat-icon.png' alt='Group Messenger' />
                    <h1>Select or create a room to begin...</h1>
                    <Button color='primary' variant='outlined'
                        onClick={addNewRoom}>Add new room</Button>
                </div> :

                <div className='chat__container'>
                    <div className="chat__header">
                        <Avatar src={`${env.getAvatarAPI()}${currentRoom?.data.name}.svg`} />
                        <h1>{currentRoom?.data.name}</h1>
                    </div>

                    <div className="chat__content">
                        {dbMessages?.map(mess => <ChatItem key={mess.id} message={mess} />)}
                    </div>

                    <div className="chat__footer">
                        <form onSubmit={onSendMessage}>
                            <input type='text' placeholder='Type a message...'
                                onChange={(e: React.FormEvent<HTMLInputElement>) => setMessageToSend(e.currentTarget.value)}
                                value={messageToSend} />
                            <Tooltip title='Send Message'>
                                <IconButton type='submit'>
                                    <MdIcons.MdSend />
                                </IconButton>
                            </Tooltip>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default Chat;
