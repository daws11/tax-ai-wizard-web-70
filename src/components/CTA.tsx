import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="section-padding bg-primary backdrop-blur-sm" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          {t('ctaTitle')}
        </h2>
        <p className="mt-4 text-xl text-white/90 max-w-2xl mx-auto">
          {t('ctaSubtitle')}
        </p>
        <div className="mt-8 flex justify-center">
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 hover:text-primary/90 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/agent")}
          >
            {t('ctaButton')}
          </Button>
        </div>
        <p className="mt-4 text-sm text-white/80">
          {t('ctaNote')}
        </p>
      </div>
    </div>
  );
};

export default CTA;
