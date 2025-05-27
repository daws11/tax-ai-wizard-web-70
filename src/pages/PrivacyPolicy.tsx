import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';
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

  const particlesOptions = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true
      },
      modes: {
        push: {
          quantity: 4,
        },
        grab: {
          distance: 200,
          links: {
            opacity: 0.3
          }
        }
      }
    },
    particles: {
      color: {
        value: "#3b82f6", // blue-500
      },
      links: {
        color: "#3b82f6",
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: ["circle"]
      },
      size: {
        value: { min: 1, max: 3 }
      }
    },
    detectRetina: true,
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />
      
      {/* Particles Background */}
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            {t('privacy_policy')}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
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

      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 