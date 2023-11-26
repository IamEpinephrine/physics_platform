import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Our Models',
        path: '/models',
        icon: <GiIcons.GiAtom/>,
        cName: 'nav-text'
    },
    {
        title: 'Community',
        path: '/communitymodels',
        icon: <GiIcons.GiArtificialHive/>,
        cName: 'nav-text'
    },
    {
        title: 'Add Model',
        path: '/addmodel',
        icon: <AiIcons.AiOutlinePlusCircle/>,
        cName: 'nav-text'
    },
    {
        title: 'Account',
        path: '/myaccount',
        icon: <MdIcons.MdManageAccounts/>,
        cName: 'nav-text'
    },
    {
        title: 'Admin Panel',
        path: '/admin',
        icon: <MdIcons.MdAdminPanelSettings/>,
        cName: 'nav-text'
    }
]