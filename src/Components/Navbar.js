import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
	const { t } = useTranslation();
	const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
	const [menuOpen, setMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1024);
			if (window.innerWidth >= 1024) {
				setMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			let offset = element.offsetTop;

			if (sectionId === "landing-page") {
				offset = 0;
			}

			window.scrollTo({
				top: offset,
				behavior: "smooth",
			});

			setMenuOpen(false);
		}
	};

	return (
		<nav
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
				isScrolled ? "pt-3" : "pt-0"
			}`}
		>
			<div
				className={`mx-auto max-w-[90rem] transition-all duration-300 ease-in-out ${
					isScrolled ? "px-4" : "px-0"
				}`}
			>
				<div
					className={`w-full transition-all duration-300 ease-in-out ${
						isMobile
							? "bg-transparent"
							: isScrolled
								? "bg-[#e8dcc6]/60 backdrop-blur-sm rounded-xl "
								: "bg-transparent"
					}`}
				>
					{isMobile ? (
						<div className="flex items-center justify-between px-4 py-2">
							<Logo logoSrc="/Assets/logo2.png" className="w-20" />
							<button
								onClick={() => setMenuOpen(!menuOpen)}
								className={`text-5xl ${
									isScrolled ? "text-gray-200" : "text-white"
								} transition-all duration-300`}
							>
								☰
							</button>
						</div>
					) : (
						<div className="flex items-center justify-between h-16 px-4">
							<div className="flex-shrink-0">
								<Logo logoSrc="/Assets/logo2.png" className="w-16" />
							</div>
							<div className="flex items-center space-x-8">
								<button
									onClick={() => scrollToSection("landing-page")}
									className={`${
										isScrolled
											? "text-gray-600 hover:text-gray-800"
											: "text-white hover:text-gray-200"
									} text-base transition-colors duration-200 focus:outline-none`}
								>
									{t("navbar.home")}
								</button>
								<button
									onClick={() => scrollToSection("services")}
									className={`${
										isScrolled
											? "text-gray-600 hover:text-gray-800"
											: "text-white hover:text-gray-200"
									} text-base transition-colors duration-200 focus:outline-none`}
								>
									{t("navbar.services")}
								</button>
								<button
									onClick={() => scrollToSection("team")}
									className={`${
										isScrolled
											? "text-gray-600 hover:text-gray-800"
											: "text-white hover:text-gray-200"
									} text-base transition-colors duration-200 focus:outline-none`}
								>
									{t("navbar.team")}
								</button>
								{/* <Link
									to="/blog"
									className={`${
										isScrolled
											? "text-gray-600 hover:text-gray-800"
											: "text-white hover:text-gray-200"
									} text-base transition-colors duration-200 focus:outline-none no-underline`}
								>
									{t("navbar.blog")}
								</Link> */}
								{/* <Link
									to="/jobs"
									className={`${
										isScrolled
											? "text-gray-600 hover:text-gray-800"
											: "text-white hover:text-gray-200"
									} text-base transition-colors duration-200 focus:outline-none no-underline`}
								>
									{t("navbar.jobs")}
								</Link> */}
								<a
									href="tel:030 69005528"
									className={`${
										isScrolled
											? "text-gray-600 hover:text-gray-800"
											: "text-white hover:text-gray-200"
									} text-base transition-colors duration-200 focus:outline-none no-underline`}
								>
									(030) 69005528
								</a>
								<a
									href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?profile_skipped=true&utm_source=die-drei-zahnaerzte-website-button&utm_medium=referral&utm_campaign=website-button&utm_content=option-8&bookingFunnelSource=external_referral"
									target="_blank"
									rel="noopener noreferrer"
									className="bg-[#422f4095] text-white px-2 py-1 rounded-lg text-base hover:bg-gray-700 transition-colors duration-200 focus:outline-none no-underline hover:no-underline"
								>
									{t("navbar.appointment")}
								</a>
							</div>
						</div>
					)}
				</div>
			</div>

			{menuOpen && (
				<div className="fixed inset-0 top-0 bg-[#e8dcc6] bg-opacity-98 flex flex-col items-center justify-center text-[#422f40] z-50">
					<button
						onClick={() => setMenuOpen(false)}
						className="absolute top-12 right-12 text-4xl  text-[#422f40] hover:text-[#5a3d54]"
					>
						✖
					</button>

					<div className="flex flex-col space-y-8 text-center">
						<button
							onClick={() => scrollToSection("landing-page")}
							className="text-4xl font-bold text-[#422f40] hover:text-[#5a3d54] transition-colors duration-200"
						>
							{t("navbar.home")}
						</button>
						<button
							onClick={() => scrollToSection("services")}
							className="text-4xl font-bold text-[#422f40] hover:text-[#5a3d54] transition-colors duration-200"
						>
							{t("navbar.services")}
						</button>
						<button
							onClick={() => scrollToSection("team")}
							className="text-4xl font-bold text-[#422f40] hover:text-[#5a3d54] transition-colors duration-200"
						>
							{t("navbar.team")}
						</button>
						{/* <Link
							to="/blog"
							className="text-4xl font-bold text-[#422f40] hover:text-[#5a3d54] transition-colors duration-200 no-underline"
						>
							{t("navbar.blog")}
						</Link> */}
						{/* <Link
							to="/jobs"
							className="text-4xl font-bold text-[#422f40] hover:text-[#5a3d54] transition-colors duration-200 no-underline"
						>
							{t("navbar.jobs")}
						</Link> */}

						<div className="mt-8 flex flex-col items-center space-y-4">
							<a
								href="tel:0301234567"
								className="text-2xl font-semibold text-[#422f40] hover:text-[#5a3d54] transition-colors duration-200 no-underline"
							>
								(030) 69005528
							</a>
							<a
								href="https://www.doctolib.de/zahnarztpraxis/berlin/die-drei-zahnaerzte/booking/specialities?bookingFunnelSource=profile"
								target="_blank"
								rel="noopener noreferrer"
								className="bg-[#422f40] text-white px-8 py-4 rounded-lg font-semibold text-2xl hover:bg-[#5a3d54] transition-colors duration-200 inline-block"
							>
								{t("navbar.appointment")}
							</a>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
