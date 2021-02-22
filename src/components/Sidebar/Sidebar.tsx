import React from 'react';
import './Sidebar.css';
import { Avatar, Tooltip, IconButton } from '@material-ui/core';
import * as MdIcons from 'react-icons/md';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="sidebar__header">
                <Avatar />
                <h1>Group Messenger</h1>
                <Tooltip title='Add channel'>
                    <IconButton>
                        <MdIcons.MdAddCircleOutline />
                    </IconButton>
                </Tooltip>
            </div>
            <div className="sidebar__search">

            </div>
            <div className="sidebar__items">

            </div>
        </div>
    )
}

export default Sidebar;
