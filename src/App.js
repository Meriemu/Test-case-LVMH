import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import './App.scss';

function App() {
	const [loadSlide, setLoadSlide] = useState(0);
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoadSlide(loadSlide => loadSlide + 1);

		fetch('/data.json', {
			headers : { 
			  'Content-Type': 'application/json',
			  'Accept': 'application/json'
			 }
	
		 })
			.then((response) => response.json())
			.then((json) => {
				setData(json.lvmh.sliders)
			});
	}, []);

	return (
		<div className="App">
			<div className="slider">
				<>
					{
						(loadSlide >= 0 && loadSlide <= data.length) &&
						(loadSlide + 1 && <Slider
							clickAction={loadSlide}
							getData={data} >
							{
								data.map((img, index) => {
									return (<img key={index} className={"slider__bgImg "} src={img.img} alt="" />)
								})
							}
						</Slider>)
					}
				</>
			</div>
		</div>
	);
}

export default App;
