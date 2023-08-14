import React,{useContext, useEffect, useLayoutEffect, useState} from 'react'
import { UPDATE_SIDEBAR_VISIBILITY } from '../../context/Global/GlobalContextEvents';
import GlobalContext from '../../context/Global/GlobalContext';
import Lottie from '../common/lottie/Lottie';
import styles from '../styles/login/Login.module.css';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { toast } from 'react-toastify';
import { localStorageKeys } from '../../utils/storageKeys';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { globalDispatch } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [formObj, setFormObj] = useState({
        'username': '',
        'password': ''
    })
    const [loading, setLoading] = useState(false)


    const handleInputChange = (e)=>{
        setFormObj({...formObj, [e.target.name]: e.target.value})
    }

    const handleFormSubmission = async(e)=>{
        try {
            e.preventDefault();
            setLoading(true);
            let data = {
              'username': formObj.username,
              'password': formObj.password
            }
            const urlSearchParams = new URLSearchParams(data);
            const resp = await axios.post(`${process.env.REACT_APP_STUDIO_BE}/auth/login`, urlSearchParams.toString(), {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })

            localStorage.setItem(localStorageKeys.TOKEN, resp.data.data.token);
            toast['success']('Login Successful', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

            navigate("/tool");
        } catch (error) {
            toast['error'](`Login Error: ${error.message}`, {
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
        setLoading(false);
    }

    useLayoutEffect(()=>{
        // we don't want to show sidebar
        globalDispatch(
            UPDATE_SIDEBAR_VISIBILITY,
            {
              visibility: false
            }
        )
    }, [])

    useEffect(()=>{
        if(localStorage.getItem(localStorageKeys.TOKEN)){
            navigate("/tool");
        }
    },[])

    return (
        <div className='w-100 h-100 px-4 d-flex justify-content-center'>
            <form className='w-75 m-4'>
                <div className={['w-100', styles.lottieContainer].join(' ')}>
                    <Lottie animationName="formFill" />
                </div>
                <div class="mb-3">
                    <label for="username" class="form-label">User Name</label>
                    <input type="text" class="form-control" id="username" aria-describedby="username" name='username' value={formObj.name}  onChange={handleInputChange}/>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" value={formObj.password} onChange={handleInputChange}/>
                </div>
                <button onClick={handleFormSubmission} class="btn btn-primary">
                {
                  loading ? 
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  :'Submit'
                }
                </button>
            </form>
        </div>
    )
}
