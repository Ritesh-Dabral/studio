// import React from 'react'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { sideTabs } from './homeConfig';
import styles from '../styles/home/sidebar.module.css'
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  function handleClick(route){
      return navigate(`/${route}`)
  }
  return (

    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={true} scroll={true} backdrop={false}>
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
      </Offcanvas>
    </div>
  )
}

export default Sidebar;