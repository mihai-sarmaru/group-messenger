import React from 'react';
import './Sidebar.css';
import { Avatar, Tooltip, IconButton } from '@material-ui/core';
import * as MdIcons from 'react-icons/md';
import SidebarItem from './SidebarItem/SidebarItem';

const Sidebar = () => {
    return (
        <div className='sidebar'>

            <div className="sidebar__header">
                <Avatar />
                <h1>Group Messenger</h1>
                <Tooltip title='Add Channel'>
                    <IconButton>
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
