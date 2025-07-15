import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const navigation = {
    company: [
      { name: t('about'), href: '#' },
      { name: t('careers'), href: '#' },
      { name: t('contact'), href: '#' },
    ],
    resources: [
      { name: t('blog'), href: '/blogs' },
      { name: t('help'), href: '#' },
    ],
    legal: [
      { name: t('privacy_and_policy'), href: '/privacy-policy' },
      { name: t('disclaimer'), href: '/disclaimer' },
      // { name: t('terms'), href: '#' },
    ],
  };

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 pt-12 sm:pt-20 lg:pt-24">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <Link to="/" aria-label="Homepage">
              <img
                className="h-8 w-auto mb-4"
                src="/lovable-uploads/logo%20circle.png"
                alt="TaxAI Logo"
              />
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center md:text-left max-w-xs">
              {t('heroTitle')} {/* Optional tagline */}
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-2">
                {t('company')}
              </h3>
              <ul role="list" className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-2">
                {t('resources')}
              </h3>
              <ul role="list" className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white mb-2">
                {t('legal')}
              </h3>
              <ul role="list" className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            &copy; {new Date().getFullYear()}  {t('copyright')}
          </p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            {/* Social media or additional links can be added here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
