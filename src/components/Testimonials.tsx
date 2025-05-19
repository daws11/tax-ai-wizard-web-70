import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";

const clientLogos = [
	{
		id: 1,
		// name: "Abu Dhabi Police",
		logo: "/lovable-uploads/Abudhabipolice.png",
		alt: "Abu Dhabi Police logo",
	},
	{
		id: 2,
		// name: "ADCB",
		logo: "/lovable-uploads/ADBC.png",
		alt: "ADCB logo",
	},
	{
		id: 3,
		// name: "Environment Agency - Abu Dhabi",
		logo: "/lovable-uploads/EAabudhabi.png",
		alt: "Environment Agency Abu Dhabi logo",
	},
	{
		id: 4,
		// name: "Al Hilal Bank",
		logo: "/lovable-uploads/Alhilalbank.png",
		alt: "Al Hilal Bank logo",
	},
	{
		id: 5,
		// name: "Saudi Fransi Capital",
		logo: "/lovable-uploads/SFC.png",
		alt: "Saudi Fransi Capital logo",
	},
	{
		id: 6,
		// name: "STC",
		logo: "/lovable-uploads/STC.jpg",
		alt: "STC logo",
	},
];

const Testimonials = () => {
	const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);

	return (
		<section className="py-20 bg-gray-50 dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center slide-up">
					<h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
						Trusted by Leading Organizations
					</h2>
					<p className="max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
						Join these forward-thinking companies already simplifying their tax
						compliance with our AI solution.
					</p>
				</div>

				<div className="mt-16">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
						{clientLogos.map((client) => (
							<div
								key={client.id}
								className="relative p-6 flex items-center justify-center fade-in-right rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800"
								style={{
									transitionDelay: `${client.id * 0.1}s`,
									minHeight: "120px",
									width: "100%",
								}}
								onMouseEnter={() => setHoveredLogo(client.id)}
								onMouseLeave={() => setHoveredLogo(null)}
							>
								<div className="relative w-full h-full flex items-center justify-center">
									<img
										src={client.logo}
										alt={client.alt}
										className={`max-h-20 max-w-full object-contain transition-all duration-300 bg-white dark:bg-gray-900 rounded-lg p-2 shadow-md ${
											hoveredLogo === client.id
												? "scale-110 filter-none"
												: "filter grayscale hover:grayscale-0"
										}`}
										style={{
											mixBlendMode: "multiply",
											border: "1px solid #e5e7eb",
											background: "inherit",
										}}
									/>

									{hoveredLogo === client.id && (
										<div className="absolute -bottom-2 left-0 right-0 text-center">
											<p className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 py-1 px-2 rounded-md backdrop-blur-sm inline-block">
												{/* {client.name} */}
											</p>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
