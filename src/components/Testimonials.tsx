
import { Avatar } from "@/components/ui/avatar";

const clientLogos = [
  {
    id: 1,
    name: "Al Hilal Bank",
    logo: "/lovable-uploads/c7e739dc-1a39-4f55-91d1-2e3b3cdf1802.png",
    alt: "Al Hilal Bank logo"
  },
  {
    id: 2,
    name: "Abu Dhabi Police",
    logo: "/lovable-uploads/3932c6fc-feba-4256-9860-d47d9d57a73a.png",
    alt: "Abu Dhabi Police logo"
  },
  {
    id: 3,
    name: "Saudi Fransi Capital",
    logo: "/lovable-uploads/6bb1a6b1-cbcc-44f6-8a12-4547dca168c9.png",
    alt: "Saudi Fransi Capital logo"
  },
  {
    id: 4,
    name: "Environment Agency - Abu Dhabi",
    logo: "/lovable-uploads/56266dad-76fb-462e-a287-f3c25cb3d8b6.png",
    alt: "Environment Agency Abu Dhabi logo"
  },
  {
    id: 5,
    name: "ADCB",
    logo: "/lovable-uploads/e324416a-41a4-45b3-9e9f-e6c5a742ea2c.png",
    alt: "ADCB logo"
  },
  {
    id: 6,
    name: "STC",
    logo: "/lovable-uploads/24d60201-9124-4add-928f-5cacfd2ea0b8.png",
    alt: "STC logo"
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center slide-up">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Join these forward-thinking companies already simplifying their tax compliance with our AI solution.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {clientLogos.map((client) => (
              <div 
                key={client.id}
                className="p-4 flex items-center justify-center fade-in-right" 
                style={{ transitionDelay: `${client.id * 0.1}s` }}
              >
                <img 
                  src={client.logo} 
                  alt={client.alt}
                  className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
