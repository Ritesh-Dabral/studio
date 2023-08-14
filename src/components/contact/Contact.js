import React,{useLayoutEffect, useState} from 'react'
import styles from "../styles/contact/contact.module.css"
// import Sidebar from '../home/Sidebar'
import { toast } from 'react-toastify';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Lottie from '../common/lottie/Lottie';
import { sessionStorageKeys } from '../../utils/storageKeys';

function Contact() {

  // const SESSION_FORM_SUBMISSION_KEY = 'SESSION_FORM_SUBMISSION_KEY'
  
  const [formDetails, setFormDetails] = useState({'firstname':'', 'lastname':'', 'contact':'', 'message':''})
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const submitForm = async(e)=>{
    try {
      if(e){
        e.preventDefault();
      }
      const isInvalidEntryPresent = validateForm();
      if(isInvalidEntryPresent){
        return;
      }
      setLoading(true);
      let data = {
        'firstname': formDetails.firstname,
        'lastname': formDetails.lastname,
        'message': formDetails.message,
        'contact': formDetails.contact
      }
      const urlSearchParams = new URLSearchParams(data);
      await axios.post(`${process.env.REACT_APP_STUDIO_BE}/lead/add`, urlSearchParams.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      setIsFormSubmitted(true);
      showToast('Submission successful');
      sessionStorage.setItem(sessionStorageKeys.SESSION_FORM_SUBMISSION_KEY, JSON.stringify(true))
    }
     catch (error) {
      showToast(error.message, 'error');
    }
    setLoading(false);
  }

  const handleInputChange = (e)=>{
    e.stopPropagation();
    let name = e.target.name;
    let value = e.target.value;
    setFormDetails({...formDetails, [name]: value})
  }
  

  const handleInputValidation = (e)=>{
    e.stopPropagation();
    let fn = (msg)=>{
      showToast(msg, 'error');
    }

    let naming = {
      'firstname': {'label':'First Name', 'length': 50},
      'lastname': {'label':'Last Name', 'length': 50},
      'contact': {'label':'Contact Number', 'length': 10},
      'message': {'label':'Message', 'length': 500}
    }

    let value = e.target.value;
    if(['firstname','lastname', 'message'].includes(e.target.name)){
      if(!value || (value && !value.trim()) ||(value && value.trim().length > naming[e.target.name].length)){
        fn(`Please enter a valid ${naming[e.target.name].label} of maximum ${naming[e.target.name].length} characters`);
      }
    }else if(e.target.name === 'contact'){
      if(!value || (value && !value.match(/^[1-9]{1}[0-9]{9}$/))){
        fn(`Please enter a valid ${naming[e.target.name].label} of 10 digits`);
      }
    }

    if(value){
      setFormDetails({...formDetails, [e.target.name]: value.trim()})
    }
  }

  const validateForm = ()=>{
    let fn = (msg)=>{
      showToast(msg, 'error');
    }

    let naming = {
      'firstname': {'label':'First Name', 'length': 50},
      'lastname': {'label':'Last Name', 'length': 50},
      'contact': {'label':'Contact Number', 'length': 10},
      'message': {'label':'Message', 'length': 500}
    }

    let isInvalidEntryPresent = false;
    Object.keys(formDetails).forEach((key)=>{
      let value = formDetails[key];
      if(['firstname','lastname', 'message'].includes(key)){
        if(!value || (value && !value.trim()) ||(value && value.trim().length > naming[key].length)){
          fn(`Please enter a valid ${naming[key].label} of maximum ${naming[key].length} characters`);
          isInvalidEntryPresent = true;
        }
      }else if(key === 'contact'){
        if(!value || (value && !value.match(/^[1-9]{1}[0-9]{9}$/))){
          fn(`Please enter a valid ${naming[key]} of 10 digits`);
          isInvalidEntryPresent = true;
        }
      }
    })

    return isInvalidEntryPresent;
  }
  
  const showToast = (msg, type="success")=>{
    toast[type](msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  useLayoutEffect(()=>{
    window.scrollTo(0,0);
    let sessionFormSubmitted = sessionStorage.getItem(sessionStorageKeys.SESSION_FORM_SUBMISSION_KEY);
    if(sessionFormSubmitted && JSON.parse(sessionFormSubmitted)){
      sessionFormSubmitted = true;
    }else{
      sessionFormSubmitted = false;
    }
    setIsFormSubmitted(sessionFormSubmitted)
  }, [])

  return (
    <div className={['w-100 h-100', styles.contactContainer].join(' ')}>
      <div className={['row m-0 w-100'].join(' ')}>
        <div className='col-md-6 col-sm-12'><h1>Get in touch</h1></div>
        {
          isFormSubmitted ? 
          (
            <div className={['col-md-6 col-sm-12 d-flex justify-content-center align-items-center flex-column', styles.successContainer].join(' ')}>
              <div><Lottie/></div>
              <p>Thank you for submitting the form! Our team will be reaching out to you shortly</p>
            </div>
          )
          :
          (
          <div className='col-md-6 col-sm-12'>

            <div className='mb-4'>
              <p className='m-0'>Name *</p>
              <div className='d-flex align-items-center'>
                <input autoComplete='on' id="firstname" name="firstname" type="text" placeholder='First Name' className={['me-2',styles.input].join(' ')} value={formDetails.firstname} onChange={handleInputChange} onBlur={handleInputValidation}/>
                <input autoComplete='on' id="lastname" name="lastname" type="text" placeholder='Last Name' className={['ms-2',styles.input].join(' ')} value={formDetails.lastname} onChange={handleInputChange} onBlur={handleInputValidation}/>
              </div>
            </div>

            <div className='my-4'>
              <p className='m-0'>Contact Number *</p>
              <div>
                <input autoComplete='on' id="contact" name="contact" type="text" className={styles.input} value={formDetails.contact} onChange={handleInputChange} onBlur={handleInputValidation}/>
              </div>
            </div>

            <div className='my-4'>
              <p className='m-0'>Message *</p>
              <div>
                <textarea name='message' id='message' className={[styles.input, styles.textArea].join(' ')} value={formDetails.message} onChange={handleInputChange} onBlur={handleInputValidation}></textarea>
              </div>
            </div>

            <div className="">
              <button disabled={loading} className={styles['touch']} onClick={submitForm}>
                {
                  loading ? 
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  :'Submit'
                }
              </button>
            </div>

          </div>
          )
        }
      </div>
    </div>
  )
}

export default Contact