import axios from 'axios';
import React,{useState, useEffect, useCallback, useRef} from 'react'
import { toast } from 'react-toastify';
import styles from "../../styles/tools/tabs/Images.module.css"
import Button from "../../common/button/Button"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { convertBytesToKBOrMB } from '../../../utils/functions';
import Form from 'react-bootstrap/Form';
import { imageCategories } from './config';
import { localStorageKeys } from '../../../utils/storageKeys';

export default function Images() {

    const [images, setImages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [pageData, setPageData] = useState({'page':1, 'limit':10});
    const [fetchInProgress, setFetchInProgress] = useState(false);
    const [selectedImage, setSelectedImage] = useState({'showEditor':false, 'index':-1, 'image':null});
    const [addImage, setAddImage] = useState({'showAdder': false, 'category': '', 'preview': null, 'meta':{'name':'', 'size':0, 'type':''}})
    const [file, setFile] = useState(null);
    const imageInput = useRef(null)

    const handleImageClick = (e, index)=>{
        e.stopPropagation();
        setSelectedImage({'showEditor':true, 'index':index, 'image':images[index]})
    }

    const handleClearImageSelection = ()=>{
        setSelectedImage({'showEditor':false, 'index':-1, 'image':null})
    }

    const handleSelectedImageChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        if(name==="delete"){
            value = e.target.checked;
        }

        let tempSelectedImage = {...selectedImage}
        if(name==="delete"){
            tempSelectedImage.image.is_hidden = value;
        }else{
            tempSelectedImage.image.image_meta.category=value;
        }

        setSelectedImage(tempSelectedImage)
    }

    const handleSelectFile = (e)=>{
        try {
            let file = e.target.files[0];
            if(!file){
                imageInput.current.value = null;
                handleClearNewImageAddition(true);
                return;
            }
            if(file.size>5000000){
                showToast(`Image size should not be more than 5MB`, 'warn');
                imageInput.current.value = null;
                handleClearNewImageAddition(true);
                return;
            }
            let previewURL = URL.createObjectURL(file);
            setFile(file);
            setAddImage({...addImage, 'preview': previewURL, 'meta':{'name':file.name, 'size':file.size, 'type':file.type}});
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    const handleAddImage = ()=>{
        setAddImage({'category': imageCategories[0].key, 'preview': null, 'showAdder': true, 'meta':{'name':'', 'size':0, 'type':''}})
        setFile(null);
    }

    const handleClearNewImageAddition = (show=false)=>{
        if(addImage.preview && addImage.preview.match(/^blob/)){
            URL.revokeObjectURL(addImage.preview);
        }
        setAddImage({'category': null, 'preview': null, 'showAdder': show, 'meta':{'name':'', 'size':0, 'type':''}})
        setFile(null);
    }

    const addSelectedImage = async()=>{
        try {
            if(!file){
                showToast(`Choose image to upload`, 'warn');
                return;
            }
            setFetchInProgress(true);
            const fd = new FormData();
            fd.append('category', addImage.category);
            fd.append('image', file);

            const resp = await axios.post(`${process.env.REACT_APP_STUDIO_BE}/image/add`, fd, {
                timeout: 10000,
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem(localStorageKeys.TOKEN)}`
                }
            })
            const tempImages = [resp.data.data,...images]
            setImages(tempImages);
            handleClearNewImageAddition();
            showToast(`Image added successfully`, 'success');

        }catch (error) {
            showToast(error.message, 'error');
        }
        setFetchInProgress(false);
    }

    const updateSelectedImage = useCallback(async()=>{
        try {
            if(selectedImage.index<0){
                return;
            }
            setFetchInProgress(true);

            await axios.put(`${process.env.REACT_APP_STUDIO_BE}/image/update/${selectedImage.image.image_id}`,null,{
                params:{
                    'is_hidden': selectedImage.image.is_hidden,
                    'category': selectedImage.image.image_meta.category
                },
                timeout: 5000,
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem(localStorageKeys.TOKEN)}`
                }
            })

            // update the index
            let tempImages = [...images]
            images[selectedImage.index] = {...selectedImage.image}
            setImages(tempImages)

            showToast(`Image with id='${selectedImage.image.image_id}' updated successfully`, 'success');

        } catch (error) {
            showToast(error.message, 'error');
        }
        setFetchInProgress(false);
    }, [selectedImage])

    const fetchImages = async ()=>{
        try {
          if(!hasMore || fetchInProgress){
            return; // no more data to fetch or fetching data
          }
          setFetchInProgress(true)
          const resp = await axios.get(`${process.env.REACT_APP_STUDIO_BE}/image`,{
            params:{
              'pageData': JSON.stringify(pageData),
              'allow_hidden': true
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
            showToast(error.message, 'error');
        }
        setFetchInProgress(false)
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

    useEffect(()=>{
        fetchImages()
    }, [])

    return (
        <>

            <div className='w-100 h-auto my-2'>
                <Button text="Add Image" handleClick={handleAddImage} loading={fetchInProgress} customClassName="mx-2 w-auto" />
            </div>
            <div className={['w-100 h-100 row m-0 p-sm-2'].join(' ')}>
            {
                Array.isArray(images) && images.map((_img, index)=>{
                    return (
                        <div key={`images_${index}_home`} className={['col-sm-12 col-md-3 my-1 position-relative p-0', (_img.is_hidden ? 'opacity-50 border border-danger' : 'border border-black'), styles.image].join(' ')} onClick={e=>handleImageClick(e, index)}>
                            <img className='w-100 h-100 object-fit-cover' src={_img.image_url} alt={_img.image_meta.originalname}/>        
                        </div>
                    )
                })
            }
            </div>

            {
                hasMore && (
                    <div className="w-75 my-5 mx-auto">
                        <Button text="Load More" handleClick={fetchImages} loading={fetchInProgress} customClassName={[ 'mt-md-4 w-100' ,styles['load-more-btn']].join(' ')}/>
                    </div>
                )
            }

            {/* Off canvas image update*/}
            <>
                <Offcanvas show={selectedImage.showEditor} onHide={handleClearImageSelection} className="w-75">
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update Image</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='w-100 h-auto'>
                            <img src={selectedImage?.image?.image_url} alt="" className='w-100 h-75'/>
                        </div>
                        <div className='p-2 m-3'>
                            <h3>Details</h3>
                            <div className='d-flex align-items-baseline'>
                                <h5>Name:</h5> 
                                <p className='ms-2 mb-0'>{selectedImage?.image?.image_meta?.originalname}</p>
                            </div>
                            <div className='d-flex align-items-baseline'>
                                <h5>Size:</h5> 
                                <p className='ms-2 mb-0'>{convertBytesToKBOrMB(selectedImage?.image?.image_meta.size, 2)}</p>
                            </div>
                            <div className='d-flex align-items-baseline'>
                                <h5>Type:</h5> 
                                <p className='ms-2 mb-0'>{selectedImage?.image?.image_meta?.mimetype}</p>
                            </div>
                            <div className='d-flex align-items-baseline'>
                                <h5>Id:</h5> 
                                <p className='ms-2 mb-0'>{selectedImage?.image?.image_id}</p>
                            </div>
                            <div className="form-check form-switch">
                                <label className="form-check-label mx-2" for="flexSwitchCheckChecked">Delete</label>
                                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={selectedImage?.image?.is_hidden} name="delete" onChange={handleSelectedImageChange}/> 
                            </div>
                            <div className="dropdown">
                                <select value={selectedImage?.image?.image_meta?.category} name="category" onChange={handleSelectedImageChange}>
                                    {
                                        Array.isArray(imageCategories) && imageCategories.map((category, idx)=>{
                                            return <option key={`iamge_category_options_${idx}`} value={category.key} >{category.label.toUpperCase()}</option>
                                        })
                                    }
                                </select>
                                <label className='mx-2'>Category</label>
                            </div>
                            <Button text="Update Image" handleClick={updateSelectedImage} loading={fetchInProgress} customClassName="mt-3 w-100" />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>

            {/* Off canvas image add*/}
            <>
                <Offcanvas show={addImage.showAdder} onHide={handleClearNewImageAddition} className="w-75">
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add Image</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='w-100 h-auto'>
                            <img src={addImage.preview} alt="" className='w-100 h-75'/>
                        </div>
                        <div class="input-group mb-3">
                            <label class="input-group-text" for="imageUpload" >Upload</label>
                            <input type="file" accept=".png, .jpg, .jpeg" class="form-control" id="imageUpload" onChange={handleSelectFile} ref={imageInput}/>
                        </div>
                        <div className='p-2 m-3'>
                            <h3>Details</h3>
                            <div className='d-flex align-items-baseline'>
                                <h5>Name:</h5> 
                                <p className='ms-2 mb-0'>{addImage?.meta?.name}</p>
                            </div>
                            <div className='d-flex align-items-baseline'>
                                <h5>Size:</h5> 
                                <p className='ms-2 mb-0'>{convertBytesToKBOrMB(addImage?.meta?.size, 2)}</p>
                            </div>
                            <div className='d-flex align-items-baseline'>
                                <h5>Type:</h5> 
                                <p className='ms-2 mb-0'>{addImage?.meta?.type}</p>
                            </div>
                            <div className="dropdown">
                                <select value={addImage.category} name="category" onChange={(e)=>setAddImage({...addImage, category:e.target.value})}>
                                    {
                                        Array.isArray(imageCategories) && imageCategories.map((category, idx)=>{
                                            return <option key={`image_category_add_options_${idx}`} value={category.key} >{category.label.toUpperCase()}</option>
                                        })
                                    }
                                </select>
                                <label className='mx-2'>Category</label>
                            </div>
                            <Button text="Add Image" handleClick={addSelectedImage} loading={fetchInProgress} customClassName="mt-3 w-100" />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>

        </>
    )
}
