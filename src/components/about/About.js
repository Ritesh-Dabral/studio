import React from 'react'
import "../../components/styles/about/about.css"
import Sidebar from '../home/Sidebar'
import LandingSection from '../home/main/landingSection'
import profile from '../images/profile.jpg'
function About() {
  return (
   <div className='wrapper-dash'>
    <div className='side-bar-wrapper'>
        <Sidebar/>
    </div>
    <div className='wrapper-main'>
      <div className='heading'>
          <p className='about-title'>ABOUT</p>
          <p className='brand-name'>RK Studio</p>
      </div>
      <div className='image-section'>
         <img className="profile-image" src={profile}></img>
      </div>
      <div className='info-section'>
        <p>At RK STUDIO, we are passionate about capturing and preserving the special moments in your life. Whether you're looking for a professional headshot, a family portrait, or coverage for a special event, our talented team of photographers is here to exceed your expectations.</p>
      </div>
      <div className='button-wrapper'>
        <button className='touch'>Get in Touch</button>
      </div>
    </div>

   </div>
  )
}

export default About