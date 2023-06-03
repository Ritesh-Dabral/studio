

import { Route, Routes as RouteWrapper } from "react-router-dom";
import Home from "../home/home";

function Routes() {
  return (
    <RouteWrapper>
        <Route path="/" element={<Home/>}/>
    </RouteWrapper>
  )
}

export default Routes;