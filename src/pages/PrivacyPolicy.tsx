import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
import { useParticlesConfig } from "@/lib/particles-config";
import { 
  Shield, 
  Database, 
  Lock, 
  Mail, 
  Info, 
  Share2, 
  Users, 
  Clock, 
  Cookie, 
  Scale,
  AlertCircle,
  Calendar
} from "lucide-react";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = useParticlesConfig();

  const sections = [
    {
      icon: Info,
      title: t('privacy_policy_introduction'),
      content: t('privacy_policy_introduction_text'),
      compliance: t('privacy_policy_compliance'),
    },
    {
      icon: Database,
      title: t('information_collection'),
      content: t('information_collection_text'),
    },
    {
      icon: Shield,
      title: t('information_usage'),
      content: t('information_usage_text'),
    },
    {
      icon: Share2,
      title: t('data_sharing'),
      content: t('data_sharing_text'),
    },
    {
      icon: Lock,
      title: t('data_security'),
      content: t('data_security_text'),
    },
    {
      icon: Users,
      title: t('children_privacy'),
      content: t('children_privacy_text'),
    },
    {
      icon: Clock,
      title: t('data_retention'),
      content: t('data_retention_text'),
    },
    {
      icon: Cookie,
      title: t('cookies_links'),
      content: t('cookies_links_text'),
    },
    {
      icon: Scale,
      title: t('user_rights'),
      content: t('user_rights_text'),
    },
    {
      icon: AlertCircle,
      title: t('policy_changes'),
      content: t('policy_changes_text'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <div className="relative flex-grow">
        <div className="absolute inset-0 -z-10">
          <div className="w-full h-full max-w-[1920px] mx-auto">
            <Particles
              id="tsparticles"
              init={particlesInit}
              options={particlesOptions}
              className="w-full h-full"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 px-6 rounded-lg inline-block">
              {t('privacy_policy')}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-2 px-4 rounded-lg inline-block">
              <Calendar className="h-5 w-5" />
              <span>{t('last_updated')}: {t('last_updated_date')}</span>
            </div>
          </div>

          {/* Introduction Card */}
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t('privacy_policy_introduction')}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                {t('privacy_policy_introduction_text')}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {t('privacy_policy_compliance')}
              </p>
            </CardContent>
          </Card>

          {/* Cards Grid - Single Column */}
          <div className="space-y-8">
            {sections.slice(1).map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray dark:prose-invert max-w-none">
                    {section.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="text-gray-600 dark:text-gray-400 mb-2">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {t('contact_us')}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
                  {t('contact_us_text')}
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="mailto:privacy@taxai.com"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                  >
                    {t('contact_us')}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 