import React,{useLayoutEffect} from 'react'
import styles from "../styles/contact/contact.module.css"
// import Sidebar from '../home/Sidebar'

function Contact() {


  const submitForm = (e)=>{
    try {
      if(e){
        e.preventDefault();
      }
      console.log('submit')
    } catch (error) {
      console.log({error})
    }
  }

  useLayoutEffect(()=>{
    window.scrollTo(0,0);
  }, [])

  return (
    <div className={['w-100 h-100', styles.contactContainer].join(' ')}>
      <div className={['row m-0 w-100'].join(' ')}>
        <div className='col-md-6 col-sm-12'><h1>Get in touch</h1></div>

        {/* Form */}
        <div className='col-md-6 col-sm-12'>

          <div className='mb-4'>
            <p className='m-0'>Name *</p>
            <div className='d-flex align-items-center'>
              <input autoFocus={true} autoComplete='on' id="fname" name="fname" type="text" placeholder='First Name' className={['me-2',styles.input].join(' ')}/>
              <input autoComplete='on' id="lname" name="lname" type="text" placeholder='Last Name' className={['ms-2',styles.input].join(' ')}/>
            </div>
          </div>

          <div className='my-4'>
            <p className='m-0'>Email *</p>
            <div>
              <input autoComplete='on' id="email" name="email" type="text" className={styles.input}/>
            </div>
          </div>

          <div className='my-4'>
            <p className='m-0'>Contact Number *</p>
            <div>
              <input autoComplete='on' id="phone" name="phone" type="text" className={styles.input}/>
            </div>
          </div>

          <div className='my-4'>
            <p className='m-0'>Message *</p>
            <div>
              <textarea name='message' id='message' className={[styles.input, styles.textArea].join(' ')}></textarea>
            </div>
          </div>

          <div className="">
            <button className={styles['touch']} onClick={submitForm}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact