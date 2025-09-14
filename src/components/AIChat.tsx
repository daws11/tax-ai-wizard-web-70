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
    <Card className="max-w-6xl mx-auto backdrop-blur-md bg-white/20 dark:bg-gray-800/20 dark:border-gray-700/30" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold text-center text-primary">
          {t('meetExperts')}
        </CardTitle>
      </CardHeader> */}
      <CardContent className="flex flex-col gap-12 p-6 md:p-8 lg:p-10">
        {/* <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
          {t('exploreAssistants')}
        </p> */}

        {/* ATTO Agent Section - Centered and Larger */}
        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Larger Image Link */}
          <Link
            to="https://chat-taxai.onrender.com/"
            className="w-full max-w-4xl group overflow-hidden rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-105"
          >
            <img
              src={attoGifSrc}
              alt={t('attoTitle')}
              className="object-contain w-full h-auto"
            />
          </Link>

          {/* Centered Title and Description Card */}
          <div className="w-full max-w-2xl">
            <Card className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-md shadow-xl border-2 border-primary/20">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  {t('attoTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t('attoDescription')}
                </p>
                <Link to="https://chat-taxai.onrender.com/">
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                  >
                    {t('askAtto')}
                  </Button>
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
