import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../../static/SidePanel.css';
import { Grid } from '@material-ui/core';

const SidePanel=({handleLogout})=> {
    return (
        <>
        <Grid container>
            <div className='side-panel-menu'>
                <ul className='side-panel-items'>
                    {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                        </li>
                    );
                    })}
                    <li>
                    <button className="Sidebar-logout-button" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </div>
        </Grid>
        </>
    );
}

export default SidePanel;
