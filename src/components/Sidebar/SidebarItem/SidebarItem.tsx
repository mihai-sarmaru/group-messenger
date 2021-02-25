import React, { useEffect, useState } from 'react';
import './SidebarItem.css';
import env from '../../../utils/env';
import db from '../../../firebase/firebase';
import { IFirebaseRoom, IMessage } from '../../../utils/interfaces';
import { Avatar } from '@material-ui/core';

const SidebarItem:React.FC<IFirebaseRoom> = (props) => {

    const [latestMessage, setLatestMessage] = useState<IMessage>();

    useEffect(() => {
        db.collection('rooms')
            .doc(props.id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot(snapshot => {
                snapshot.docs.map(doc => setLatestMessage(doc.data() as IMessage));
            });
    }, [props.id]);

    return (
        <div className='sidebarItem'>
            <Avatar src={`${env.getAvatarAPI()}${props.data.name}.svg`} />
            <div className="sidebarItem__content">
                <h6>{props.data.name}</h6>
                <p>{latestMessage ? latestMessage.message : ''}</p>
            </div>
        </div>
    )
}

export default SidebarItem;
