import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { ReactComponent as Next } from "../assets/icons/chevronDown.svg";
import { ReactComponent as Prev } from "../assets/icons/chevronUp.svg";
import "./VerticalCarousel.scss";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-a-vertical-carousel-component-in-react
 */

const VerticalCarousel = ({ data, clickActionTransfer }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	// Used to determine which items appear above the active item
	const halfwayIndex = Math.ceil(data.length / 2);

	// Usd to determine the height/spacing of each item
	const itemHeight = 70;

	// Used to determine at what point an item is moved from the top to the bottom
	const shuffleThreshold = halfwayIndex * itemHeight;

	// Used to determine which items should be visible. this prevents the "ghosting" animation
	const visibleStyleThreshold = shuffleThreshold / 2;

	const determinePlacement = (itemIndex) => {
		// If these match, the item is active
		if (activeIndex === itemIndex) return 0;

		if (itemIndex >= halfwayIndex) {
			if (activeIndex > itemIndex - halfwayIndex) {
				return (itemIndex - activeIndex) * itemHeight;
			} else {
				return -(data.length + activeIndex - itemIndex) * itemHeight;
			}
		}

		if (itemIndex > activeIndex) {
			return (itemIndex - activeIndex) * itemHeight;
		}

		if (itemIndex < activeIndex) {
			if ((activeIndex - itemIndex) * itemHeight >= shuffleThreshold) {
				return (data.length - (activeIndex - itemIndex)) * itemHeight;
			}
			return -(activeIndex - itemIndex) * itemHeight;
		}
	};

	const handleClick = (direction) => {
		setActiveIndex((prevIndex) => {
			if (direction === "next") {
				if (prevIndex + 1 > data.length - 1) {
					return 0;
				}
				return prevIndex + 1;
			}

			if (prevIndex - 1 < 0) {
				return data.length - 1;
			}

			return prevIndex - 1;
		});
	};

	return (
		<div className="carousel-wrapper">
			<button
				type="button"
				className="carousel-button prev"
				onClick={() => handleClick("prev")}
			>
				<Prev />
			</button>

			<div className="carousel">
				<div className="carousel-points">
					{
						Array.apply(null, { length: 3 }).map((e, i) => (
							<div className="bullet-point" key={i}>
							
							</div>
						))
					}
				</div>
				<div className="carousel-inner">
					{data.map((item, i) => (
						<button
							data-glitch={item.type}
							type="button"
							onClick={()=>{clickActionTransfer(item.type)}}
							className={cn("carousel-item", {
								active: activeIndex === i,
								visible:
									Math.abs(determinePlacement(i)) <= visibleStyleThreshold
							})}
							key={i}
							style={{
								transform: `translateY(${determinePlacement(i)}px)`
							}}
						>
							<span  className="span-theme"></span>
							{item.type}
						</button>
					))}
				</div>
			</div>

			<button
				type="button"
				className="carousel-button next"
				onClick={() => handleClick("next")}
			>
				<Next />
			</button>
		</div>
	);
};

VerticalCarousel.propTypes = {
data: PropTypes.array.isRequired
};

export default VerticalCarousel;
