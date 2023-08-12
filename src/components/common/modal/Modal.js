import React from 'react'
import styles from "../../styles/common/modal/modal.module.css"
import closeIcon from '../../../assets/svg/x-circle-light.svg'

export default function Modal(props) {

    const {handleClose=()=>{}, children, headerText=""} = props;
    return (
        <div className={['w-100 h-100', styles.modalContainer].join(' ')}>
            <div className={[styles.wrapper, 'w-100 h-100'].join(' ')}>
                {/* Header */}
                <div className={[styles.header, "d-flex justify-content-between align-items-center"].join(' ')}>
                    <p>{headerText}</p>
                    <img src={closeIcon} onClick={handleClose} alt="close" />
                </div>
                {/* <hr className="border" /> */}
                {/* Body */}
                <div className={['w-100', styles.body].join(' ')}>
                {children}
                </div>
            </div>
        </div>
    )
}
