import React,{useLayoutEffect} from 'react'
import style from "../../components/styles/about/about.module.css"
import { useNavigate } from 'react-router-dom'
import Lottie from '../common/lottie/Lottie';

function About() {
    const navigate = useNavigate();

    function handleClick(){
      navigate("/contact")
    }

    useLayoutEffect(()=>{
      window.scrollTo(0,0);
    }, [])


  return (
    <div className={style['wrapper-dash']}>
      <span className="">

      </span>
      <div className={style['wrapper-main']}>
        <div className="">
            <p className={style['about-title']}>ABOUT</p>
            <p className={style['brand-name']}>RK Studio</p>
        </div>
        <div className='row'>
          <div className="col-md-6 col-sm-12 my-5">
            <img className={style["profile-image"]} src="https://rkstudio.s3.ap-south-1.amazonaws.com/static/profile.jpg" alt=""></img>
          </div>
          <div className=" col-md-6 col-sm-12 d-md-flex flex-md-column justify-content-md-evenly my-5 ">
            <p>At RK DIGITAL STUDIO, we are passionate about capturing and preserving the special moments in your life. Whether you're looking for a professional headshot, a family portrait, or coverage for a special event, our talented team of photographers and videographers are here to exceed your expectations.
            </p>
            <div className={['d-sm-none d-md-block w-100', style.lottie].join(' ')}>
              <Lottie animationName="downPointer"/>
            </div>
            <div className="">
              <button className={style['touch']} onClick={handleClick}>Get in Touch</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About