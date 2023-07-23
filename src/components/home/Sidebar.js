// import React from 'react'
import { useEffect, useState, useRef, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { sideTabs } from './homeConfig';
import styles from '../styles/home/sidebar.module.css'
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/Global/GlobalContext';
import { UPDATE_SIDEBAR_DIMENSIONS } from '../../context/Global/GlobalContextEvents';

function Sidebar() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const containerRef = useRef(null)
  const { globalDispatch } = useContext(GlobalContext);
  function handleClick(route){
      return navigate(`/${route}`)
  }

  const handleDimensionChange = () => {
    if(containerRef.current){
      const {offsetWidth, offsetHeight} = containerRef.current
      globalDispatch(
        UPDATE_SIDEBAR_DIMENSIONS,
        {
          width: offsetWidth,
          height: offsetHeight
        }
      )
    }
  }
  

  useEffect(()=>{
    // handleDimensionChange()
    // window.addEventListener('resize', handleDimensionChange)
    // return ()=>{
    //   window.removeEventListener('resize', handleDimensionChange)
    // }
  }, [])

  return (

    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={true} scroll={true} backdrop={false} onEntered={handleDimensionChange} onExited={handleDimensionChange} ref={containerRef}>
        <div ref={containerRef} className='h-100  w-100'>
          <Offcanvas.Header closeButton className='d-md-none'>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className={styles['logo-container']}>
              <img src='https://rkstudio.s3.ap-south-1.amazonaws.com/static/logo.png' alt='logo'/>
            </div>
            {
              Array.isArray(sideTabs) && sideTabs.map((tab, index)=>{
                return <div key={`home_sidebar_${index}`}><button className={styles['btn-link']} onClick={()=>handleClick(tab.key)}>{tab.label}</button></div>
              })
            }
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </div>
  )
}

export default Sidebar;