

import { Route, Routes as RouteWrapper } from "react-router-dom";
import Home from "../home/home";
import About from "../about/About"
import Contact from "../contact/Contact";

function Routes() {
  return (
    <RouteWrapper>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
    </RouteWrapper>
  )
}

export default Routes;