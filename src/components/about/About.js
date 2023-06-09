import React from 'react'
import style from "../../components/styles/about/about.module.css"
import Sidebar from '../home/Sidebar'
import LandingSection from '../home/main/landingSection'
import profile from '../images/profile.jpg'
import { useNavigate } from 'react-router-dom'

function About() {
    const navigate = useNavigate();

    function handleClick(){
      navigate("/contact")
    }
  return (
   <div className={style['wrapper-dash']}>
    <span className={style['side-bar-wrapper']}>

    </span>
    <div className={style['wrapper-main']}>
      <div className={style['heading']}>
          <p className={style['about-title']}>ABOUT</p>
          <p className={style['brand-name']}>RK Studio</p>
      </div>
      <div className={style['image-section']}>
         <img className={style["profile-image"]} src={profile}></img>
      </div>
      <div className={style['info-section']}>
        <p>At RK STUDIO, we are passionate about capturing and preserving the special moments in your life. Whether you're looking for a professional headshot, a family portrait, or coverage for a special event, our talented team of photographers is here to exceed your expectations.</p>
      </div>
      <div className={style['button-wrapper']}>
        <button className={style['touch']} onClick={handleClick}>Get in Touch</button>
      </div>
    </div>

   </div>
  )
}

export default About