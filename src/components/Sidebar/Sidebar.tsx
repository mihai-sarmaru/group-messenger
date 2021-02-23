import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip, IconButton } from '@material-ui/core';
import db from '../../firebase/firebase';
import { IRoom, IFirebaseRoom } from '../../utils/interfaces';
import { validateRoomName } from '../../utils/validation';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem/SidebarItem';

const Sidebar = () => {

    const [rooms, setRooms] = useState<IFirebaseRoom[]>();

    useEffect(() => {
        db.collection('rooms').orderBy('name', 'asc').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }));
        });
    }, []);

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
                {rooms?.map(room => <Link key={room.id} to={`/room/${room.id}`}>
                    <SidebarItem id={room.id} data={room.data} />
                </Link>)}
            </div>
        </div>
    )
}

export default Sidebar;