import React from 'react';
import './SidebarItem.css';
import { Avatar } from '@material-ui/core';

const SidebarItem = () => {
    return (
        <div className='sidebarItem'>
            <Avatar />
            <div className="sidebarItem__content">
                <h6>Channel Title</h6>
                <p>Channel latest content should appear here and shortened to fit.</p>
            </div>
        </div>
    )
}

export default SidebarItem;
