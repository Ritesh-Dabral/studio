import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
import React from 'react'
import styles from '../../styles/common/gallery/galley.module.css'

export default function Gallery(props) {

    const {images=[], startIndex=0, infinite=true, lazyLoad=true, showNav=true, showThumbnails=false, showIndex=true, onErrorImageURL="https://rkstudio.s3.ap-south-1.amazonaws.com/static/error.svg", showFullscreenButton=false} = props

    return (
        <div className={["w-100", styles.galleryContainer].join(' ')}>
            <ImageGallery items={images} startIndex={startIndex} infinite={infinite} lazyLoad={lazyLoad} showNav={showNav} showThumbnails={showThumbnails} showIndex={showIndex} onErrorImageURL={onErrorImageURL} showFullscreenButton={showFullscreenButton} onScreenChange={(e)=>console.log({e})}/>
        </div>
    )
}


