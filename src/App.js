import './App.css';
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Header from './components/Header'
import MainContentContainer from './components/MainContentContainer'
import ImageComponent from './components/Image-details-component/ImageDetailsComponent'

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const scrollTop = window.addEventListener("scroll", toggleVisibility);
    return ()=>{
      window.removeEventListener('scroll',scrollTop)
    }
  }, []);

  return <>
  <div>
    <ImageComponent/>
    <Header/>
    <MainContentContainer/>
    <div className="scroll-to-top">
      {isVisible && 
        <div className='to_top_btn' onClick={scrollToTop}>
          <FaArrowUp/>
        </div>}
    </div>
  </div>
  </>
  ;
}

export default App;
