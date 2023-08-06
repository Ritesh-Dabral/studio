import axios from 'axios';
import styles from '../../styles/home/main/landingSection.module.css'
import { useState, useEffect } from 'react';
import Image from '../../images/image';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';


export default function LandingSection() {

  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageData, setPageData] = useState({'page':1, 'limit':12});
  const [fetchInProgress, setFetchInProgress] = useState(false);
  const [gallery, setGallery] = useState({'show':false, 'index':0});

  const generateDynamicGridItemCss = (index, row)=>{

    let rem = index%6;

    row  = (row*8)+1; // beacuse in css we have row repeat of 8 and column repeat of 8

    let styleObj = {
      gridColumnStart: 0,
      gridColumnEnd: 0,
      gridRowStart: 0,
      gridRowEnd: 0,
      // maxWidth: '100%', // Set the desired max width for the images
      // width: 'max-content'
    }
    if(rem===0){
      styleObj.gridColumnStart =  1;
      styleObj.gridColumnEnd = 3;
      styleObj.gridRowStart = row;
      styleObj.gridRowEnd =  row+2;
    }else if(rem===1){
      styleObj.gridColumnStart =  3;
      styleObj.gridColumnEnd =  5;
      styleObj.gridRowStart =  row;
      styleObj.gridRowEnd =  row+2;
    }else if(rem===2){
      styleObj.gridColumnStart =  5;
      styleObj.gridColumnEnd =  9;
      styleObj.gridRowStart =  row;
      styleObj.gridRowEnd =  row+5;
    }else if(rem===3){
      styleObj.gridColumnStart =  1;
      styleObj.gridColumnEnd =  5;
      styleObj.gridRowStart =  row+2;
      styleObj.gridRowEnd =  row+5;
    }else if(rem===4){
      styleObj.gridColumnStart =  1;
      styleObj.gridColumnEnd =  5;
      styleObj.gridRowStart =  row+5;
      styleObj.gridRowEnd =  row+8;
    }else{
      styleObj.gridColumnStart =  5;
      styleObj.gridColumnEnd =  9;
      styleObj.gridRowStart =  row+5;
      styleObj.gridRowEnd =  row+8;
    }

    return styleObj;
  }

  const fetchImages = async ()=>{
    try {
      if(!hasMore || fetchInProgress){
        return; // no more data to fetch or fetching data
      }
      setFetchInProgress(true)
      const resp = await axios.get(`${process.env.REACT_APP_STUDIO_BE}/image`,{
        params:{
          'pageData': JSON.stringify(pageData)
        },
        timeout: 5000
      })

      let tempImages = [...images]
      if(resp.data.data.images){
        tempImages = [...tempImages, ...resp.data.data.images];
      }
      if(resp.data.data.pagination.nextPage){
        setPageData({...pageData, 'page': resp.data.data.pagination.nextPage})
        setHasMore(true)
      }else{
        setHasMore(false)
      }
      setImages(tempImages)

    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setFetchInProgress(false)
  }

  const handleGalleryView = async(e, index)=>{
    setGallery({'show':true, 'index':index})
  }

  useEffect(()=>{
    fetchImages()
  }, [])


  return (
    <>
      <div className={styles['landing-section-container']}>
        <div className={styles['gallery']} >
          {
            Array.isArray(images) && images.map((_img, index)=>{
              return (
                <div key={`images_${index}_home`} style={generateDynamicGridItemCss(index, Math.floor(index/6))}>
                  <Image source={_img.image_url} name={_img.image_meta.originalname} base64={_img.image_base64} meta={_img.image_meta}/>
                  {/* <img className={styles['gallery__img']} src={imgSrc} alt=""/> */}
                </div>
              )
            })
          }
        </div>
      </div>
      
        {
          hasMore && (
            <div className={styles['load-more-container']}>
              <button disabled={fetchInProgress} className={[ 'mt-md-4 w-100' ,styles['load-more-btn']].join(' ')} onClick={fetchImages}>
                { 
                  fetchInProgress ? 
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  : 'Load More'
                }
               </button>
            </div>
          )
        }
    </>
  )
}
