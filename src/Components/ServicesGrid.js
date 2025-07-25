import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ServiceItem = ({ service, isHovered, isFaded, onMouseEnter, onMouseLeave, onClick }) => {
	const itemClasses = `
    relative flex items-center justify-between py-6 border-b border-black/10
    transition-colors duration-200 ease-in-out
    ${isFaded ? "text-gray-400" : "text-[#422f40]"}
  `;

	return (
		<div
			className={itemClasses + " group"}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
		>
			{/* Pink line for hover effect (horizontal) */}
			<div
				className={`absolute bottom-0 left-0 w-full h-px bg-[#f68b1f] transition-transform duration-300 ease-in-out transform ${
					isHovered ? "scale-x-100" : "scale-x-0"
				} origin-left`}
			/>
			<span className="text-2xl font-serif">{service}</span>
			<FiArrowUpRight
				className={`text-2xl transition-colors duration-300 ${
					isHovered
						? "text-[#f68b1f]"
						: isFaded
						? "text-gray-400"
						: "text-[#422f40]"
				}`}
			/>
		</div>
	);
};

const ServicesGrid = () => {
	const { t } = useTranslation();
	const [hoveredService, setHoveredService] = useState(null);
	const navigate = useNavigate();

	const serviceKeys = Array.from(
		{ length: 11 },
		(_, i) => ({ key: `services_grid.items.item${i + 1}`, step: i })
	);

	return (
		<div className="bg-[#e8e2d4] py-24 px-4 sm:px-6 lg:px-24">
			<div className="max-w-6xl mx-auto">
				{/* Header Section */}
				<div className="mb-16 text-center flex flex-col items-center">
					{/* <h2 className="text-sm font-semiboldtext-[#422f40] tracking-widest uppercase">
						{t("services_grid.subtitle")}
					</h2> */}
					<h1 className="mt-2 text-6xl font-serif text-[#422f40] tracking-tight">
						{t("services_grid.title")}
					</h1>
					<p className="mt-6 max-w-3xl text-lg text-[#422f40]">
						{t("services_grid.description")}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
					{serviceKeys.map(({ key, step }) => {
						const serviceName = t(key);
						const isHovered = hoveredService === serviceName;
						const isFaded = hoveredService !== null && !isHovered;
						return (
							<ServiceItem
								key={key}
								service={serviceName}
								isHovered={isHovered}
								isFaded={isFaded}
								onMouseEnter={() => setHoveredService(serviceName)}
								onMouseLeave={() => setHoveredService(null)}
								onClick={() => navigate(`/service?step=${step}`)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ServicesGrid; 