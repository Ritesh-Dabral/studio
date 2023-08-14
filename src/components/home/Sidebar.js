// import React from 'react'
import { useEffect, useState, useRef, useContext, useCallback, useLayoutEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { sideTabs, connectOptions } from './homeConfig';
import styles from '../styles/home/sidebar.module.css'
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/Global/GlobalContext';
import { UPDATE_SIDEBAR_DIMENSIONS } from '../../context/Global/GlobalContextEvents';
import listIcon from '../../assets/svg/list.svg'
import { useLocation } from 'react-router-dom';


function Sidebar() {

  const location = useLocation();

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true)
  };
  
  const navigate = useNavigate();
  const containerRef = useRef(null)
  const navigatorRef = useRef(null)
  const { globalDispatch, isMobileSize, showSideBar=true } = useContext(GlobalContext);

  const [currentTab, setCurrentTab] = useState(sideTabs[0].key)


  function handleClick(route){
    if(route===currentTab){
      return; // if we are clicking the opened tab, return
    }
    setCurrentTab(route);
    if(isMobileSize){
      setShow(false); // automatically close the sidebar once any option is clicked on mobile deivces
    }
    return navigate(`/${route}`)
  }

  const handleDimensionChange = useCallback(() => {
      let offsetWidth = window.innerWidth;
      let offsetHeight = 0;
      if(show && containerRef.current){
        offsetWidth = containerRef.current.offsetWidth
        offsetHeight = containerRef.current.offsetHeight
      }
      globalDispatch(
        UPDATE_SIDEBAR_DIMENSIONS,
        {
          width: offsetWidth,
          height: offsetHeight
        }
      )
  },[show])


  const handleRedirection = (link)=>{
    window.open(link, '_blank');
  }

  
  useLayoutEffect(()=>{
    let path = window.location.pathname;
    let isKeySet = false;
    sideTabs.forEach(tab=>{
      if(tab.key===path.split('/')[1]){
        setCurrentTab(tab.key);
        isKeySet = true;
      }
    })
    if(!isKeySet){
      setCurrentTab(sideTabs[0].key)
    }
  }, [location]) // change this when the URL changes

  useEffect(()=>{
    setShow(!isMobileSize);
  }, [isMobileSize])

  return (

    <>
      {
        showSideBar ? 
        (    
          <>
            <div ref={navigatorRef} className={['w-100 h-100 mt-1 px-3', styles.stickyNavbar].join(' ')}>
              <p onClick={handleShow} className='m-0'> <img src={listIcon} alt='list'/></p>
            </div>
    
            <div>
              <Offcanvas className='border-0' show={show} scroll={!isMobileSize} onHide={handleClose} backdrop={false} onEntered={handleDimensionChange} onExited={handleDimensionChange} ref={containerRef}>
                <div ref={containerRef} className='h-100  w-100'>
                  <Offcanvas.Header closeButton className='d-md-none'>
                    <Offcanvas.Title></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
    
                    {/* Logo */}
                    <div className={styles['logo-container']}>
                      <img src='https://rkstudio.s3.ap-south-1.amazonaws.com/static/logo2.png' alt='logo'/>
                    </div>
    
                    {/* Pages */}
                    <div>
                      {
                        Array.isArray(sideTabs) && sideTabs.map((tab, index)=>{
                          return (
                          <div 
                            key={`home_sidebar_${index}`} 
                            className={['px-4 py-2 my-2', styles.tabBtn ,(currentTab===tab.key ? styles.active : styles.inactive)].join(' ')}
                            onClick={()=>handleClick(tab.key)}
                          >
                            <p className={styles['btn-link']}>{tab.label}</p>
                          </div>
                          )
                        })
                      }
                    </div>
    
                    {/* Connections */}
                    <div className={['mt-5', styles.connectOptions].join(' ')}>
                      {
                        Array.isArray(connectOptions) && connectOptions.map((option, index)=>{
                          return (
                          <span key={`connect_options_${index}`} onClick={ option.link ? ()=>handleRedirection(option.link) : option.fn }>
                            <img src={option.icon} alt='icon' className='' />
                          </span>
                          )
                        })
                      }
                    </div>
    
                    {/* Copyright */}
                    <div className={['my-4', styles.copyRight].join(' ')}> 
                      <p>rakeshdabral2@gmail.com</p>
                      <p>+91-9917081275, +91-8273328959</p>
                      <p>(Developed & designed by : riteshdabral1@gmail.com, +91-9911536608)</p>
                      <p> &#169; RK Digital Studio 2023</p>
                    </div>
                  </Offcanvas.Body>
                </div>
              </Offcanvas>
            </div>
          </>
        )
        :
        null
      }
    </>

  )
}

export default Sidebar;