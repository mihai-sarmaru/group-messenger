import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Avatar, Tooltip, IconButton } from '@material-ui/core';
import db from '../../firebase/firebase';
import { IRoom, IFirebaseRoom } from '../../utils/interfaces';
import { validateRoomName } from '../../utils/validation';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem/SidebarItem';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/rootStore';

interface SidebarProps {
    logout: () => void;
}

const Sidebar:React.FC<SidebarProps> = (props) => {

    const [originalRooms, setOriginalRooms] = useState<IFirebaseRoom[]>();
    const [rooms, setRooms] = useState<IFirebaseRoom[]>();
    const [search, setSearch] = useState('');

    const user = useSelector((state: AppState) => state.userReducer.user);

    useEffect(() => {
        db.collection('rooms').orderBy('name', 'asc').onSnapshot(snapshot => {
            setOriginalRooms(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    data: doc.data()
                }
            }));
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

    const onSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearch(e.currentTarget.value);
        if (e.currentTarget.value === '') {
            setRooms(originalRooms);
        } else {
            setRooms(originalRooms?.filter(room => (room.data.name as string).toLowerCase().includes(e.currentTarget.value)));
        }
    }

    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Tooltip title={`Logout ${user.name}`}>
                    <IconButton onClick={props.logout}>
                        <Avatar src={user.avatar} alt={user.name} />
                    </IconButton>
                </Tooltip>
                <h1>Group Messenger</h1>
                <Tooltip title='Add Room'>
                    <IconButton onClick={addNewRoom}>
                        <MdIcons.MdAddCircleOutline />
                    </IconButton>
                </Tooltip>
            </div>

            <div className="sidebar__search">
                <form>
                    <input type='text' placeholder='Search'
                    onChange={(e: React.FormEvent<HTMLInputElement>) => onSearch(e)}
                    value={search} />
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