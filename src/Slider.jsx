import React, { useState, useEffect } from "react";
import VerticalCarousel from "./VerticalCarousel/VerticalCarousel";
import leftArrow from "./assets/icons/leftArrow.png";
import cn from "classnames";

const Slider = ({ getData, clickAction, children }) => {
	const [dataSlider, setDataSlider] = useState([]);
	const [displayCarouselState, setDisplayCarouselState] = useState(true);
	const [idLoader, setIdLoader] = useState(clickAction);
	const [color, setColor] = useState(getData.slider);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentIndexH1, setCurrentIndexH1] = useState(0);
	const [length, setLength] = useState(children.length);

	const handleColor = (colorType) => {
		setColor(colorType);
	};

	const handleSlideClick = () => {
		if (currentIndex < length - 1) {
			setCurrentIndex((prevState) => prevState + 1);
		}
		if (currentIndexH1 < length - 1) {
			setCurrentIndexH1((prevState) => prevState + 1);
		}

		setDisplayCarouselState(false);
		setTimeout(() => {
			setIdLoader((idLoader) => idLoader + 1);
		}, 1900);
		setTimeout(() => {
			setDisplayCarouselState(true);
		}, 2700);
	};

	const backTo = () => {
		if (currentIndex < length) {
			setCurrentIndex((prevState) => prevState - 1);
		}
		if (currentIndexH1 < length) {
			setCurrentIndexH1((prevState) => prevState - 1);
		}

		setDisplayCarouselState(false);
		setTimeout(() => {
			setIdLoader((idLoader) => idLoader - 1);
		}, 1900);
		setTimeout(() => {
			setDisplayCarouselState(true);
		}, 2700);
	};

	useEffect(() => {
		setLength(children.length);
		setDataSlider(getData);
	}, []);

	return (
		<div className="slider__container">
			{dataSlider.map((i) => {
				return (
					idLoader === i.id &&
					i.id <= dataSlider.length && (
						<div key={i.id}>
							<button
								className="slider__btn--back"
								style={{
									transform: `${i.id > 1 && displayCarouselState
										? "translateY(100%)"
										: "translateY(calc(-100% - 50px))"
									}`,
									transition: "all .4s linear",
								}}
								onClick={backTo}
							>
								<img src={leftArrow} alt="" />
							</button>
							<div
								style={{
									transform: `translateX(-${currentIndex * 100}%)`,
									display: "flex",
									position: "fixed",
									transition: "all .5s 1s linear",
								}}
								className={color ? "bg-color bg-" + color : ""}
							>
								{" "}
								{children}{" "}
							</div>
							<div
								className={i.theme === "dark" ? "dark-theme" : ""}
								style={{
									transform: `translateY(-${(currentIndexH1 * 100) / dataSlider.length }%)`,
									transition: "all .4s ease-out 1.5s",
									display: "flex",
									flexDirection: "column",
									position: "absolute",
									zIndex: "1",
								}}>
								{dataSlider.map((i, index) => {
									return (
										<h1 key={index} >
											{" "}
											{i.title}
										</h1>
									);
								})}
							</div>
							<div className="slider__content">
								<div
									className={
										"slider__left " + (i.theme === "dark" ? "dark-theme" : "")
									}>
									<div
										className="slider__progressBar"
										style={{
											"--progressBar-width": `calc(100% / ${dataSlider.length})`,
											"--progressBar-right": `${i.id <= 1
													? "0"
													: "calc((100% / " +
													dataSlider.length +
													") * " +
													(i.id - 1) +
													")"
												}`,
											transition: "all 3s linear",
											// "--progressBar-transition": `${displayCarouselState && "right 3s ease 4s" }`
										}} >
										{" "}
										{i.progressBar.nb1} /
										<span className={cn("slider__progressBar-lighterTxt", {})}>
											{" "}
											{i.progressBar.nb2}
										</span>{" "}
										{i.progressBar.text}
									</div>
								</div>
								<div
									className={`slider__right ${displayCarouselState ? "showCarousel" : "hideCarousel"
										} ${i.theme === "dark" ? "dark-theme" : ""}`} >
									<VerticalCarousel
										data={i.slider}
										clickActionTransfer={
											i.id < dataSlider.length ? handleSlideClick : handleColor
										}
									/>
								</div>
							</div>
						</div>
					)
				);
			})}
		</div>
	);
};

export default Slider;
