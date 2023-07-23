import './App.css';
import Sidebar from './components/home/Sidebar';
import Routes from './components/routes/routes';
import GlobalContext from './context/Global/GlobalContext';
import { useEffect, useState } from 'react';
import { UPDATE_SIDEBAR_DIMENSIONS } from './context/Global/GlobalContextEvents';


function App() {

  const [sideBarDimensions, setSideBarDimensions] = useState({'width':0, 'height':0})

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

  useEffect(()=>{},[setSideBarDimensions])

  return (
    <GlobalContext.Provider value={{globalDispatch}}>
      <div className="App d-flex">
        <div className='' style={{maxWidth: `${sideBarDimensions.width}px`, minWidth: `${sideBarDimensions.width}px`}}>
          <Sidebar/>
        </div>
        <div className=''>
          <Routes/>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}


export default App;
