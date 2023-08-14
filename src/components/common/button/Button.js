import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
import styles from '../../styles/common/button/Button.module.css'

export default function Button(props) {

    const {type="primary",  handleClick=()=>{}, text="Click Me", loading=false, customClassName=""} = props;

    return (
        <button disabled={loading} className={[styles.btn, styles[type], customClassName].join(' ')} onClick={handleClick}>
        {
          loading ? 
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          :<>{text}</>
        }
      </button>    
    )
}
