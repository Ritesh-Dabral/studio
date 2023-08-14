import React,{useLayoutEffect, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { localStorageKeys } from '../../utils/storageKeys';
import GlobalContext from '../../context/Global/GlobalContext';
import { UPDATE_SIDEBAR_VISIBILITY } from '../../context/Global/GlobalContextEvents';
import Leads from './tabs/Leads';
import Button from '../common/button/Button';
import Images from './tabs/Images';


export default function Tools() {

    const { globalDispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState('leads');

    const handleLogOut = ()=>{
        localStorage.removeItem(localStorageKeys.TOKEN);
        navigate("/login");
    }

    useLayoutEffect(()=>{
        // we don't want to show sidebar
        globalDispatch(
            UPDATE_SIDEBAR_VISIBILITY,
            {
                visibility: false
            }
        )
    },[])

    useEffect(()=>{
        if(!localStorage.getItem(localStorageKeys.TOKEN)){
            navigate('/login');
        }
    },[])

    const toolMenu = [
        {
            'label':'Leads',
            'component':<Leads />,
            'key': 'leads'
        },
        {
            'label':'Images',
            'component':<Images />,
            'key': 'images'
        }
    ]

    return (
        
        <div>
            <div className='m-3 d-flex justify-content-end align-items-center'>
                <Button text="Logout" handleClick={handleLogOut}/>
            </div>
            <ul class="nav nav-tabs">
                {
                    toolMenu.map((tool, index)=>{
                        return <li className="nav-item" key={`tool_menu_${index}`} onClick={()=>setCurrentTab(tool.key)}>
                        <h3 className={['nav-link', (currentTab===tool.key ? 'active' : '')].join(' ')} style={{'cursor':'pointer'}}>{tool.label}</h3>
                    </li>
                    })
                }
            </ul>
            {
                toolMenu.find(tool=>tool.key===currentTab)?.component
            }
        </div>
    )
}
