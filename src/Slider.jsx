import React, {useState, useEffect} from 'react'
import VerticalCarousel from "./carousel/VerticalCarousel";

const Slider = ({ getData, idd, clickAction, displayTitle, displayCarousel, displayBg, children }) => {
   const [dataSlider, setDataSlider] = useState([]);
   const [displayTitleState, setDisplayTitleState] = useState(true);
   const [displayCarouselState, setDisplayCarouselState] = useState(true);
   const [displayBgState, setdisplayBgState] = useState(false);


   
const [currentIndex, setCurrentIndex] = useState(0)
const [length, setLength] = useState(children.length)


   const handleSlideClick = () => {
      if (currentIndex < (length - 1)) {
         setCurrentIndex(prevState => prevState + 1)
     }

      // setDisplayTitleState(displayTitle=false);
      // setDisplayCarouselState(displayCarousel=false);
      // setdisplayBgState(displayBg=false);

      // hide the current slider  
      // setTimeout(() => { 
      //    setdisplayBgState(displayBg=false);
      //    console.log("displayBg ::: ", displayBg)
      // }, 2000); 
      // clickAction();
      // console.log("first ::::",  clickAction())
      // setTimeout(() => { 
      //    setDisplayCarouselState(displayCarousel=false);
      // }, 1000);
      // setTimeout(() => { 
      //    setdisplayBgState(displayBg=true);
      // }, 3000); 

      // setTimeout(() => { 
      //    setdisplayBgState(displayBg=false);
      // }, 4000); 

      // setTimeout(() => { 
      // setDisplayTitleState(displayTitle=false);
      // }, 3000);
      
      setDisplayCarouselState(displayCarousel=false);
      setdisplayBgState(displayBg=true);
      setTimeout(() => {
         setDisplayTitleState(displayTitle=false);
         // setdisplayBgState(displayBg=false);
      }, 1000);
      setTimeout(() => { 
         // setdisplayBgState(displayBg=false);
         clickAction();
         // console.log(displayBgState)
      }, 1500);
      setTimeout(() => {
         setdisplayBgState(displayBg=true);
         setDisplayTitleState(displayTitle=true);
         setDisplayCarouselState(displayCarousel=true);
      }, 2000);
      
      // Animated the next slide
      // setTimeout(() => {
      //    // Load the next Slide
      //    // clickAction();

      //    setDisplayTitleState(displayTitle=true); 
      // }, 4000);
      // // setTimeout(() => { 
      // //    setdisplayBgState(displayBg=true);
      // // }, 7000);
      // setTimeout(() => { 
      //    setDisplayCarouselState(displayCarousel=true);
      // }, 5000);
   }
   useEffect(() => {
      setLength(children.length)
         setDataSlider(getData);

         // setdisplayBgState(displayBg);
         // setDisplayTitleState(displayTitle);
         // setDisplayCarouselState(displayCarousel);
         console.log("displayTitle---- : ", displayTitle)
         console.log("displayCarousel---- : ", displayCarousel)
         console.log("displayBg---- : ", displayBg)
   // }, [getData]);
   }, [displayTitle, displayBg, displayCarousel, getData, children]);

   return (
      
      <div className='slider__container'>
      {
         dataSlider.map(i => {
            return (
               // console.log(i.id, idd + "----") 
               idd === i.id &&
               (<div
                  key={i.id}>
                     <div  style={{ transform: `translateX(-${currentIndex * 100}%)`,
                   display: "flex",
                   transition: "all 1500ms linear"
                     }}>  {children} </div>
                   {/* { i.id >=2 ? (<div  style={{ transform: `translateX(-${currentIndex * 100}%)`,
                   display: "flex",
                   transition: "all 250ms linear"
                     }}>  {children} </div>)
                     : (<img   className={ "slider__bg-first "   } src={ i.img } alt="" />)} */}
                  
                  {/* <button onClick={handleSlideClick}> {idd} </button> */}
                  <div className='slider__content'>
                     <div className={"slider__left " + (i.theme ==="light" ? 'light-theme' : '')}>
                        <div className='slider__progressBar'> { i.progressBar.nb1 } <span className='slider__progressBar-lightTxt'> { i.progressBar.nb1 }</span> { i.progressBar.text }</div>
                        <h1 className={displayTitleState ? 'showTitle' : 'hideTitle'}> {i.title } </h1>
                     </div>
                     <div className={`slider__right ${displayCarouselState ?
                        'showCarousel' : 'hideCarousel'} ${i.theme === "light" ?  "light-theme" : "" }`}>
                     <VerticalCarousel data={i.slider} clickActionTransfer={handleSlideClick}  />
                     </div>
                  </div>

               </div>)
            )
         })
      }
      </div>
  )
}

export default Slider