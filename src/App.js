import './App.css';
import Sidebar from './components/home/Sidebar';
import Routes from './components/routes/routes';
import GlobalContext from './context/Global/GlobalContext';
import { useEffect, useLayoutEffect, useState } from 'react';
import { UPDATE_SIDEBAR_DIMENSIONS } from './context/Global/GlobalContextEvents';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [sideBarDimensions, setSideBarDimensions] = useState({'width':0, 'height':0})
  const [isMobileSize, setIsMobileSize] = useState(false)

  const globalDispatch = (actionType, actionPayload)=>{
    switch(actionType){
      case UPDATE_SIDEBAR_DIMENSIONS: {
        const {width, height} = actionPayload
        setSideBarDimensions({width, height})
        break;
      }

      default: {
        break;
      }

    }
  }

  const calculateDeviceSize = ()=>{
    if(window.innerWidth <= 768){
      setIsMobileSize(true)
    }else{
      setIsMobileSize(false)
    }
  }

  useLayoutEffect(()=>{
    calculateDeviceSize()
  },[])

  useEffect(()=>{},[setSideBarDimensions])

  return (
    <GlobalContext.Provider value={{isMobileSize, globalDispatch}}>
      <div className={["App d-flex", (isMobileSize ? 'flex-column' : '')].join(' ')}>
        <div className={[(isMobileSize ? 'stickyBar' : '')].join(' ')} style={{maxWidth: `${sideBarDimensions.width}px`, minWidth: `${sideBarDimensions.width}px`}}>
          <Sidebar/>
        </div>
        <div className='w-100'>
          <Routes/>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </GlobalContext.Provider>
  );
}


export default App;
