import React from 'react';
import './Sidebar.css';
import { Avatar, Tooltip, IconButton } from '@material-ui/core';
import db from '../../firebase/firebase';
import { IRoom } from '../../utils/interfaces';
import { validateRoomName } from '../../utils/validation';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem/SidebarItem';

const Sidebar = () => {

    const addNewRoom = () => {
        const roomName = prompt('New room name');

        if (roomName && validateRoomName(roomName)) {
            const room: IRoom = {
                name: roomName.trim()
            }

            db.collection('rooms').add(room);
        }
    }

    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Avatar />
                <h1>Group Messenger</h1>
                <Tooltip title='Add Channel'>
                    <IconButton onClick={addNewRoom}>
                        <MdIcons.MdAddCircleOutline />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="sidebar__search">
                <form>
                    <input type='text' placeholder='Search' />
                    <MdIcons.MdSearch />
                </form>
            </div>

            <div className="sidebar__items">
                <SidebarItem />
                <SidebarItem />
                <SidebarItem />
            </div>
        </div>
    )
}

export default Sidebar;
