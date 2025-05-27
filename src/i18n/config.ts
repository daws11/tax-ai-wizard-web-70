import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
const resources = {
  en: {
    translation: {
      // Navigation
      features: 'Features',
      howItWorks: 'How It Works',
      faq: 'FAQ',
      getStarted: 'Get Started',

      // Hero Section
      heroTitle: 'AI-Powered Tax Assistant',
      heroSubtitle: 'Simplify your tax preparation with our intelligent AI assistant',
      heroDescription: 'Get accurate tax guidance, automated calculations, and personalized support for all your tax needs.',
      startFreeTrial: 'Start Free Trial',
      learnMore: 'Learn More',

      // Features Section
      featuresTitle: 'Powerful Features',
      featuresSubtitle: 'Everything you need for seamless tax preparation',
      aiAssistant: 'AI Assistant',
      aiAssistantDesc: 'Get instant answers to your tax questions',
      automatedCalculations: 'Automated Calculations',
      automatedCalculationsDesc: 'Accurate tax calculations with minimal effort',
      documentManagement: 'Document Management',
      documentManagementDesc: 'Secure storage and organization of tax documents',
      realTimeUpdates: 'Real-time Updates',
      realTimeUpdatesDesc: 'Stay informed with the latest tax regulations',

      // AI Chat Section
      meetExperts: 'Meet Our AI Tax Experts',
      exploreAssistants: 'Explore our specialized AI tax assistants designed to help you with different aspects of tax preparation and consultation. Choose the expert that best suits your needs.',
      attoTitle: 'ATTO',
      attoDescription: 'Your AI tax consultant based on chat, offering instant, chat-based guidance to intelligently optimize your finances for maximum savings and effortless compliance.',
      askAtto: 'Ask Atto!',
      yosrTitle: 'YOSR',
      yosrDescription: 'Your intelligent AI tax consultant, offering instant, expert advice and seamless filing support right through a natural voice conversation, making tax season effortlessly clear and optimized for you.',
      talkWithYosr: 'Talk with Yosr!',

      // Process Section
      processTitle: 'How It Works',
      processSubtitle: 'From signup to filing, our streamlined process makes tax preparation simple',
      step1: 'Create Account',
      step1Desc: 'Sign up for free and set up your profile',
      step2: 'Input Information',
      step2Desc: 'Enter your tax-related information',
      step3: 'AI Analysis',
      step3Desc: 'Our AI analyzes and processes your data',
      step4: 'Review & Submit',
      step4Desc: 'Review results and submit your tax return',

      // Pricing Section
      pricingTitle: 'AI Tax Agent Pricing Plans',
      pricingSubtitle: 'Choose the plan that\'s right for your business needs',
      monthlyPlan: 'Monthly Plan',
      quarterlyPlan: 'Quarterly Plan',
      yearlyPlan: 'Yearly Plan',
      enterprisePlan: 'Enterprise Plan',
      customPrice: 'Custom',
      quotation: 'Quotation',
      mostPopular: 'Most Popular',
      monthlyPlanDesc: 'Ideal for business owners, freelancers, tax advisors, accountants, and finance professionals who need accurate and accessible tax guidance.',
      quarterlyPlanDesc: 'Best for professionals who want consistent tax advisory access with savings.',
      yearlyPlanDesc: 'For users committed to long-term support and deeper features, with the best value.',
      enterprisePlanDesc: 'For tax advisors, legal firms, or corporate finance departments managing multiple clients or entities.',
      pricingGetStarted: 'Get Started',
      contactSales: 'Contact Sales',
      pricingNote: 'All plans include 14-day free trial. No credit card required to start.',
      
      // Pricing Features
      oneUser: '1 user',
      twoUsers: '1 to 2 users',
      threePlusUsers: '3+ users',
      oneDevice: '1 device',
      twoDevices: '2 devices',
      monthlyMessages: '100 AI-powered messages per month',
      quarterlyMessages: '300 messages total over 3 months',
      yearlyMessages: '1,200 messages per year (averaging 100/month)',
      volumeBasedMessages: 'Volume-based message allocation',
      uaeTaxCoverage: 'Coverage of UAE VAT, Corporate Tax, and Excise regulations',
      bilingualSupport: 'Answers in both English and Arabic',
      standardSupport: 'Standard support',
      prioritySupport: 'Priority email support',
      stepByStepGuidance: 'Access to step-by-step guidance and process explanations',
      monthlyTaxDigest: 'Access to monthly tax regulation digest',
      earlyAccess: 'Early access to new features',
      onboardingSession: 'Onboarding session included',
      dedicatedManager: 'Dedicated account manager',
      customModules: 'Custom advisory modules',
      slaSupport: 'SLA-based support and team training',
      allMonthlyFeatures: 'All Monthly features',
      allQuarterlyFeatures: 'All Quarterly features',

      // FAQ Section
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Find answers to common questions',
      question1: 'How accurate is the AI tax assistant?',
      answer1: 'Our AI tax assistant is highly accurate and regularly updated with the latest tax regulations.',
      question2: 'Is my data secure?',
      answer2: 'Yes, we use industry-standard encryption and security measures to protect your data.',
      question3: 'Can I cancel my subscription anytime?',
      answer3: 'Yes, you can cancel your subscription at any time without any penalties.',
      question4: 'Do you support multiple tax jurisdictions?',
      answer4: 'Yes, our system supports multiple tax jurisdictions and can handle complex tax scenarios.',

      // Testimonials Section
      testimonialsTitle: 'What Our Users Say',
      testimonialsSubtitle: 'Trusted by thousands of users worldwide',
      testimonial1: 'This AI tax assistant has revolutionized how I handle my taxes. Highly recommended!',
      testimonial2: 'The automated calculations save me hours of work. Incredible tool!',
      testimonial3: 'Best tax software I\'ve ever used. The AI support is exceptional.',

      // CTA Section
      ctaTitle: 'Ready to make taxes stress-free?',
      ctaSubtitle: 'Join thousands who are simplifying their taxes with AI assistance. Get started today.',
      ctaButton: 'Start Free Trial',
      ctaNote: 'No credit card required. 14-day free trial with full access.',

      // Footer
      company: 'Company',
      about: 'About',
      careers: 'Careers',
      contact: 'Contact',
      resources: 'Resources',
      blog: 'Blog',
      help: 'Help',
      privacy: 'Privacy',
      terms: 'Terms',
      copyright: 'All rights reserved',

      // Chat Interface
      chatPlaceholder: 'Type your tax question here...',
      send: 'Send',
      clear: 'Clear Chat',
      thinking: 'Thinking...',
      error: 'An error occurred. Please try again.',

      // AI Demo Section
      aiDemoTitle: 'Experience Our AI Tax Assistant',
      aiDemoSubtitle: 'Try a demo of our conversational AI that makes taxes simple and stress-free.',

      // Agent Page Section
      chooseAgent: 'Choose Your Agent',
      attoAgentTitle: 'ATTO',
      attoAgentDesc: 'Your AI-powered tax consultant, offering instant, chat-based guidance to intelligently optimize your finances for maximum savings and effortless compliance.',
      yosrAgentTitle: 'YOSR',
      yosrAgentDesc: 'Your intelligent AI tax consultant, offering instant, expert advice and seamless filing support right through a natural voice conversation, making tax season effortlessly clear and optimized for you.',
    }
  },
  ar: {
    translation: {
      // Navigation
      features: 'الميزات',
      howItWorks: 'كيف يعمل',
      faq: 'الأسئلة الشائعة',
      getStarted: 'ابدأ الآن',

      // Hero Section
      heroTitle: 'مساعد الضرائب الذكي',
      heroSubtitle: 'بسّط إعداد الضرائب مع مساعدنا الذكي',
      heroDescription: 'احصل على توجيه ضريبي دقيق وحسابات آلية ودعم مخصص لجميع احتياجاتك الضريبية.',
      startFreeTrial: 'ابدأ التجربة المجانية',
      learnMore: 'اعرف المزيد',

      // Features Section
      featuresTitle: 'ميزات قوية',
      featuresSubtitle: 'كل ما تحتاجه لإعداد الضرائب بسلاسة',
      aiAssistant: 'المساعد الذكي',
      aiAssistantDesc: 'احصل على إجابات فورية لأسئلتك الضريبية',
      automatedCalculations: 'حسابات آلية',
      automatedCalculationsDesc: 'حسابات ضريبية دقيقة بأقل جهد',
      documentManagement: 'إدارة المستندات',
      documentManagementDesc: 'تخزين وتنظيم آمن للمستندات الضريبية',
      realTimeUpdates: 'تحديثات فورية',
      realTimeUpdatesDesc: 'ابق على اطلاع بأحدث اللوائح الضريبية',

      // AI Chat Section
      meetExperts: 'تعرف على خبراء الضرائب الذكيين لدينا',
      exploreAssistants: 'اكتشف مساعدي الضرائب الذكيين المتخصصين لدينا المصممين لمساعدتك في جوانب مختلفة من إعداد الضرائب والاستشارات. اختر الخبير الذي يناسب احتياجاتك.',
      attoTitle: 'أتّو',
      attoDescription: 'مستشار الضرائب الذكي الخاص بك القائم على الدردشة، يقدم توجيهاً فورياً قائماً على الدردشة لتحسين أموالك بذكاء لأقصى توفير وامتثال سهل.',
      askAtto: 'اسأل أتّو!',
      yosrTitle: 'يسر',
      yosrDescription: 'مستشار الضرائب الذكي الذكي الخاص بك، يقدم نصائح فورية من الخبراء ودعم تقديم سلس من خلال محادثة صوتية طبيعية، مما يجعل موسم الضرائب واضحاً ومحسناً بسهولة.',
      talkWithYosr: 'تحدث مع يسر!',

      // Process Section
      processTitle: 'كيف يعمل',
      processSubtitle: 'من التسجيل إلى التقديم، تجعل عملية الضرائب لدينا إعداد الضرائب بسيطاً',
      step1: 'إنشاء حساب',
      step1Desc: 'سجل مجاناً وقم بإعداد ملفك الشخصي',
      step2: 'إدخال المعلومات',
      step2Desc: 'أدخل معلوماتك الضريبية',
      step3: 'تحليل الذكاء الاصطناعي',
      step3Desc: 'يقوم الذكاء الاصطناعي بتحليل ومعالجة بياناتك',
      step4: 'المراجعة والتقديم',
      step4Desc: 'راجع النتائج وقدم إقرارك الضريبي',

      // Pricing Section
      pricingTitle: 'خطط أسعار مساعد الضرائب الذكي',
      pricingSubtitle: 'اختر الخطة المناسبة لاحتياجات عملك',
      monthlyPlan: 'الخطة الشهرية',
      quarterlyPlan: 'الخطة الفصلية',
      yearlyPlan: 'الخطة السنوية',
      enterprisePlan: 'خطة المؤسسات',
      customPrice: 'مخصص',
      quotation: 'عرض سعر',
      mostPopular: 'الأكثر شعبية',
      monthlyPlanDesc: 'مثالية لأصحاب الأعمال، والعاملين لحسابهم الخاص، ومستشاري الضرائب، والمحاسبين، ومتخصصي المالية الذين يحتاجون إلى توجيه ضريبي دقيق وسهل الوصول.',
      quarterlyPlanDesc: 'الأفضل للمهنيين الذين يرغبون في الوصول المستمر إلى الاستشارات الضريبية مع توفير.',
      yearlyPlanDesc: 'للمستخدمين الملتزمين بالدعم طويل الأمد والميزات المتقدمة، مع أفضل قيمة.',
      enterprisePlanDesc: 'لمستشاري الضرائب، والمكاتب القانونية، أو أقسام المالية المؤسسية التي تدير عملاء أو كيانات متعددة.',
      pricingGetStarted: 'ابدأ الآن',
      contactSales: 'اتصل بالمبيعات',
      pricingNote: 'جميع الخطط تشمل تجربة مجانية لمدة 14 يوم. لا حاجة لبطاقة ائتمان للبدء.',

      // Pricing Features
      oneUser: 'مستخدم واحد',
      twoUsers: 'مستخدم إلى مستخدمين',
      threePlusUsers: '3+ مستخدمين',
      oneDevice: 'جهاز واحد',
      twoDevices: 'جهازين',
      monthlyMessages: '100 رسالة مدعومة بالذكاء الاصطناعي شهرياً',
      quarterlyMessages: '300 رسالة إجمالاً على مدار 3 أشهر',
      yearlyMessages: '1,200 رسالة سنوياً (بمتوسط 100 شهرياً)',
      volumeBasedMessages: 'تخصيص الرسائل حسب الحجم',
      uaeTaxCoverage: 'تغطية ضريبة القيمة المضافة الإماراتية، وضريبة الشركات، ولوائح الضرائب الانتقائية',
      bilingualSupport: 'إجابات باللغتين الإنجليزية والعربية',
      standardSupport: 'دعم قياسي',
      prioritySupport: 'دعم البريد الإلكتروني ذو الأولوية',
      stepByStepGuidance: 'الوصول إلى التوجيه خطوة بخطوة وشروحات العملية',
      monthlyTaxDigest: 'الوصول إلى ملخص لوائح الضرائب الشهري',
      earlyAccess: 'الوصول المبكر إلى الميزات الجديدة',
      onboardingSession: 'جلسة التوجيه الأولي مشمولة',
      dedicatedManager: 'مدير حساب مخصص',
      customModules: 'وحدات استشارية مخصصة',
      slaSupport: 'دعم قائم على اتفاقية مستوى الخدمة وتدريب الفريق',
      allMonthlyFeatures: 'جميع ميزات الخطة الشهرية',
      allQuarterlyFeatures: 'جميع ميزات الخطة الفصلية',

      // FAQ Section
      faqTitle: 'الأسئلة الشائعة',
      faqSubtitle: 'اعثر على إجابات للأسئلة الشائعة',
      question1: 'ما مدى دقة مساعد الضرائب الذكي؟',
      answer1: 'مساعد الضرائب الذكي لدينا دقيق للغاية ويتم تحديثه بانتظام بأحدث اللوائح الضريبية.',
      question2: 'هل بياناتي آمنة؟',
      answer2: 'نعم، نستخدم تشفير ومعايير أمان على مستوى الصناعة لحماية بياناتك.',
      question3: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
      answer3: 'نعم، يمكنك إلغاء اشتراكك في أي وقت دون أي عقوبات.',
      question4: 'هل تدعمون ولايات قضائية ضريبية متعددة؟',
      answer4: 'نعم، يدعم نظامنا ولايات قضائية ضريبية متعددة ويمكنه التعامل مع سيناريوهات ضريبية معقدة.',

      // Testimonials Section
      testimonialsTitle: 'ماذا يقول مستخدمونا',
      testimonialsSubtitle: 'موثوق به من قبل آلاف المستخدمين حول العالم',
      testimonial1: 'لقد أحدث مساعد الضرائب الذكي هذا ثورة في كيفية تعاملي مع ضرائبي. أنصح به بشدة!',
      testimonial2: 'الحسابات الآلية توفر علي ساعات من العمل. أداة رائعة!',
      testimonial3: 'أفضل برنامج ضريبي استخدمته على الإطلاق. الدعم الذكي استثنائي.',

      // CTA Section
      ctaTitle: 'هل أنت مستعد لجعل الضرائب خالية من التوتر؟',
      ctaSubtitle: 'انضم إلى الآلاف الذين يبسطون ضرائبهم بمساعدة الذكاء الاصطناعي. ابدأ اليوم.',
      ctaButton: 'ابدأ التجربة المجانية',
      ctaNote: 'لا حاجة لبطاقة ائتمان. تجربة مجانية لمدة 14 يوم مع وصول كامل.',

      // Footer
      company: 'الشركة',
      about: 'من نحن',
      careers: 'وظائف',
      contact: 'اتصل بنا',
      resources: 'الموارد',
      blog: 'المدونة',
      help: 'المساعدة',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      copyright: 'جميع الحقوق محفوظة',

      // Chat Interface
      chatPlaceholder: 'اكتب سؤالك الضريبي هنا...',
      send: 'إرسال',
      clear: 'مسح المحادثة',
      thinking: 'جاري التفكير...',
      error: 'حدث خطأ. يرجى المحاولة مرة أخرى.',

      // AI Demo Section
      aiDemoTitle: 'جرب مساعد الضرائب الذكي لدينا',
      aiDemoSubtitle: 'جرب نسخة تجريبية من الذكاء الاصطناعي المحادث الذي يجعل الضرائب بسيطة وخالية من التوتر.',

      // Agent Page Section
      chooseAgent: 'اختر مساعدك',
      attoAgentTitle: 'أتّو',
      attoAgentDesc: 'مستشار الضرائب الذكي الخاص بك القائم على الدردشة، يقدم توجيهاً فورياً قائماً على الدردشة لتحسين أموالك بذكاء لأقصى توفير وامتثال سهل.',
      yosrAgentTitle: 'يسر',
      yosrAgentDesc: 'مستشار الضرائب الذكي الذكي الخاص بك، يقدم نصائح فورية من الخبراء ودعم تقديم سلس من خلال محادثة صوتية طبيعية، مما يجعل موسم الضرائب واضحاً ومحسناً بسهولة.',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n; 