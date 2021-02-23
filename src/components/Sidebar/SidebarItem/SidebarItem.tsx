import React from 'react';
import './SidebarItem.css';
import env from '../../../utils/env';
import { IFirebaseRoom } from '../../../utils/interfaces';
import { Avatar } from '@material-ui/core';

const SidebarItem:React.FC<IFirebaseRoom> = (props) => {
    return (
        <div className='sidebarItem'>
            <Avatar src={`${env.getAvatarAPI()}${props.data.name}.svg`} />
            <div className="sidebarItem__content">
                <h6>{props.data.name}</h6>
                <p>Room latest content should appear here and shortened to fit.</p>
            </div>
        </div>
    )
}

export default SidebarItem;
