import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/ThemeProvider";

const AIChat = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { theme } = useTheme();

  const attoGifSrc = theme === 'dark' ? '/lovable-uploads/attopreview-dark.gif' : '/lovable-uploads/attopreview-light.gif';

  return (
    <Card className="max-w-6xl mx-auto backdrop-blur-sm dark:bg-gray-800/50 dark:border-gray-700" dir={isRTL ? 'rtl' : 'ltr'}>
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold text-center text-primary">
          {t('meetExperts')}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-12 p-6 md:p-8 lg:p-10">
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
          {t('exploreAssistants')}
        </p>

        {/* Atto Agent Section */}
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-10 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          {/* Image Link - order 1 on mobile, order none on desktop */}
          <Link
            to="https://chat-taxai.onrender.com/"
            className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0 group overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 order-1 md:order-none"
          >
            <img
              src={attoGifSrc}
              alt={t('attoTitle')}
              className="object-contain w-full h-auto"
            />
          </Link>

          {/* Container for Title and Description/Button Cards - order 2 on mobile, order none on desktop*/}
          <div className="flex-grow flex flex-col gap-6 md:gap-0 order-2 md:order-none">
            {/* Combined Title and Description Card */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {t('attoTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
                  {t('attoDescription')}
                </p>
                <Link to="https://chat-taxai.onrender.com/">
                  <Button className="w-full">{t('askAtto')}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* YOSR Agent Section */}
        <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-10 ${isRTL ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
          {/* Image Link - order 1 on mobile, order none on desktop */}
          <Link
            to="/agent/yosr"
            className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0 group overflow-hidden rounded-md shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 order-1 md:order-none"
          >
            <img
              src="/lovable-uploads/yosrpreview.gif"
              alt={t('yosrTitle')}
              className="object-contain w-full h-auto"
            />
          </Link>

          {/* Container for Title and Description/Button Cards - order 2 on mobile, order none on desktop*/}
          <div className="flex-grow flex flex-col gap-6 md:gap-0 order-2 md:order-none">
            {/* Combined Title and Description Card */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {t('yosrTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6">
                  {t('yosrDescription')}
                </p>
                <Link to="/agent/yosr">
                  <Button className="w-full">{t('talkWithYosr')}</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
