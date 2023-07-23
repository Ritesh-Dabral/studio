import React, { useState } from 'react'
import styles from '../styles/images/image.module.css'

export default function Image(props) {

    const [loading, setLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const { source, base64, name, loadType="lazy", meta, handleClick=()=>{} } = props;
    const [isHovering, setIsHovering] = useState(false)

    const handleMouseEnter = (e) => {
        e.stopPropagation()
        setIsHovering(true)
    }

    const handleMouseLeave = (e) => {
        e.stopPropagation()
        setIsHovering(false)
    }

    const handleLoad = () => {
        setLoading(false)
    }

    const handleError = () => {
        setIsError(true)
        setLoading(false)
    }
    
    return (
        <span 
            className={['d-block h-100 w-100 position-relative', styles.container, (isHovering ? styles['container-hover'] : '')].join(' ')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}

        >
            {
                (loading && base64) ? (
                    <img src={base64} alt={name} className={["img-fluid", styles.base64].join(' ')}/>
                ): null
            }
            {
                <img 
                    loading={loadType} 
                    src={source} 
                    alt={name} 
                    className={["img-fluid", (loading ? 'invisible' : ( isError ? 'd-none' : 'visible'))].join(' ')} 
                    onError={handleError}
                    onLoad={handleLoad}
                />
            }
            {
                isError && <img alt="error" className='img-fluid' src='https://rkstudio.s3.ap-south-1.amazonaws.com/static/error.svg'/>
            }
            {
                isHovering && (
                <span 
                    className={['position-absolute', styles.hoverContainer].join(' ')}
                >
                    <span>
                        {meta.category}
                        {/* <p>Click to view in gallery</p> */}
                    </span>
                </span>
                )
            }
        </span>
    )
}
