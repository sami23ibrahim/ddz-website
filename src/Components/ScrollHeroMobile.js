import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// Placeholder for images, assuming you have a way to map steps to images.
// You might want to replace this with a more robust solution.
const serviceImages = {
	0: "/Assets/tech.jpg",
	1: "/Assets/tech.jpg",
	2: "/Assets/tech.jpg",
	3: "/Assets/tech.jpg",
	4: "/Assets/tech.jpg",
	5: "/Assets/tech.jpg",
	6: "/Assets/tech.jpg",
	7: "/Assets/tech.jpg",
	8: "/Assets/tech.jpg",
	9: "/Assets/tech.jpg",
	10: "/Assets/tech.jpg",
};

const ScrollHeroMobile = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const step = parseInt(params.get("step")) || 0;

	const titleKey = `services_grid.items.item${step + 1}`;
	const descriptionKey = `services_grid.items.item${step + 1}_desc`;

	const title = t(titleKey);
	const description = t(descriptionKey);
	const imageUrl = serviceImages[step];

	return (
		<div className="bg-[#e8e2d4] font-serif">
			<div className="p-2">
				{imageUrl && (
					<img
						src={imageUrl}
						alt={title}
						className="w-full h-80 object-cover rounded-xl"
					/>
				)}
			</div>
			<div className="px-6 pb-6">
				<h1 className="text-3xl font-bold text-[#422f40] mb-4">{title}</h1>
				<div className="text-[#422f40] prose">
					<ReactMarkdown>{description}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
};

export default ScrollHeroMobile; 