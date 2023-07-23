

import { Route, Routes as RouteWrapper } from "react-router-dom";
import Home from "../home/home";
import About from "../about/About"
import Contact from "../contact/Contact";

function Routes() {
  return (
    <RouteWrapper>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route path="*"  element={<Home/>}/>
    </RouteWrapper>
  )
}

export default Routes;