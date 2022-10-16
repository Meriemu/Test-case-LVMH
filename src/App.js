import React, { useState, useEffect } from 'react';
import Slider from './Slider';
// import data from './data.json';
import './App.scss';

function App() {
  const [loadSlide, setLoadSlide] = useState(0);
  const [data, setData] = useState([]);

// Do animationw when slider to another item
const [displayTitle, setDisplayTitle] = useState(false);
const [displayBg, setDisplayBg] = useState(false);
const [displayCarousel, setDisplayCarousel] = useState(false);


  	const handleclick = () => {
		setLoadSlide(loadSlide + 1);
	// const timer = setTimeout(() => {
		// setDisplayTitle(true);
		// setDisplayBg(true);
		// setDisplayCarousel(true);
	// }, 1000);

	//  return () => clearTimeout(timer);
  	}


	useEffect(() => {
		setLoadSlide(loadSlide + 1);

		// setDisplayTitle(true);
		// setDisplayBg(true);
		// setDisplayCarousel(true);


		
		fetch('/data.json')
		.then((response) => response.json())
		.then((json) =>  {
			setData(json.lvmh.sliders)
		});
	}, []);

  return (
    <div className="App">
      <div className={ "slider " + ((loadSlide >=1  && loadSlide <=3 && loadSlide+1) && `ifSlider`)} >
			{/* <p>{ loadSlide }</p>  */}
			{/* <button onClick={handleclick}> nb { loadSlide }</button> */}
				<>
					{ 
						(loadSlide >=0  && loadSlide <=3 ) && 
						 (loadSlide+1 && <Slider 
							clickAction={handleclick} 
							idd={ loadSlide } 
							getData={ data } 
							displayTitle={displayTitle}
							displayCarousel={displayCarousel}
							displayBg={displayBg}
							> 
							{
								data.map(img => {
									return (<img  className={ "slider__bg---- "   } src={ img.img } alt="" />)
								})
							}
							</Slider>) 

					}
						{/* { loadSlide === 1 && <Slider getData={ data } /> }
						{ loadSlide === 2 && <Slider getData={ data } /> }
						{ loadSlide === 3 && <Slider getData={ data } /> } */}
				</>
      </div>
     
    </div>
  );
}

export default App;
