import React from 'react'
import "../styles/contact/contact.css"
import Sidebar from '../home/Sidebar'

function Contact() {
  return (
    <div className='contact-main-wrapper'>
        <div className='sidebar-wrapper'>
            <Sidebar/>
        </div>
        <div className='content-wrapper'>
                <div className='content-body'>
                    <div className='title-wrapper'>
                        <p>Get in touch</p>
                    </div>
                    <div className='contact-section'>
                        <div className='name'>
                        <label>
                            Name:
                        </label>
                        </div>
                        <div className='label1'>
                           <div className='label3'>
                           <input type="text" name="name" />
                           </div>
                           <div className='label4'>
                            <label>First Name</label>
                           </div>
                        </div>
                        <div className='label2'>
                        <div className='label5'>
                           <input type="text" name="name" />
                           </div>
                           <div className='label6'>
                            <label>Last Name</label>
                           </div>
                        </div>
                        <div className='email'>
                            <div className='label7'>
                                <label>Email:</label>
                            </div>
                            <div className='label8'>
                                <input type="text" name="email" />
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Contact