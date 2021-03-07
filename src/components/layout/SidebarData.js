import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [

    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'side-panel-text'
    },

    {
        title: 'Bookings',
        path: '/Bookings',
        icon: <IoIcons.IoIosPaper />,
        cName: 'side-panel-text'
    },

    {
        title: 'Add Booking',
        path: '/Bookings/add',
        icon: <FaIcons.FaUserPlus/>,
        cName: 'side-panel-text'
    },

    {
        title: 'About',
        path: '/about',
        icon: <IoIcons.IoMdHelpCircle />,
        cName: 'side-panel-text'
    },

    {
        title: 'Contact Us',
        path: '/contact',
        icon: <FaIcons.FaEnvelopeOpenText />,
        cName: 'side-panel-text'
    },
    
];