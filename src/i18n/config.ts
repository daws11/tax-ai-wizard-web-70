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

      // Privacy Policy Page
      privacy_and_policy: 'Privacy & Policy',
      privacy_policy: 'Privacy Policy',
      privacy_policy_introduction: 'Introduction',
      privacy_policy_introduction_text: 'This privacy notice ("Notice") for TAX-AI ("we," "us," or "our") explains how and why we collect, use, and process your personal information when you interact with our services, including through our website, mobile applications, or other channels.',
      privacy_policy_compliance: 'We are committed to protecting your personal data in accordance with the Abu Dhabi Global Market (ADGM) Data Protection Regulations 2021 and applicable laws of the United Arab Emirates (UAE).',
      
      information_collection: 'What Personal Information We Collect',
      information_collection_text: 'Account Information: Name, email, login credentials.\nUser Inputs: Data you enter into our AI tools or upload as files.\nCommunication Data: Messages, inquiries, or feedback you submit.\nSocial Media Data: Information you provide through interactions on our social media pages.\nSensitive Information: We do not intentionally collect sensitive personal data.\n\nYou are responsible for providing accurate and up-to-date information.',
      
      information_usage: 'Why We Process Your Data',
      information_usage_text: 'To operate and provide the TAX-AI services.\nTo manage user accounts and interactions.\nTo prevent fraud and ensure security.\nTo analyze usage trends and improve the platform.\nTo comply with legal and regulatory obligations.\n\nWe only process your data when it is legally permitted, such as under consent, legal obligation, or legitimate interest.',
      
      data_sharing: 'Sharing Your Information',
      data_sharing_text: 'We may share your personal data with:\nOur group companies.\nService providers and contractors.\nLegal and regulatory authorities within or outside the UAE.\nThird parties involved in transactions or business changes.\nAnalytics or marketing partners (aggregated/anonymized only).\n\nWe ensure all third parties handle your data with appropriate safeguards.',
      
      data_security: 'Data Storage & Security',
      data_security_text: 'We store your data securely on protected servers and use technical and organizational measures to protect it from unauthorized access or misuse. While we take reasonable precautions, no system is fully secure, and you use our services at your own risk.',
      
      children_privacy: 'Children\'s Privacy',
      children_privacy_text: 'TAX-AI is not intended for users under 18. If we learn that personal data from minors has been collected, we will delete it promptly. Parents or guardians can contact us to request deletion.',
      
      data_retention: 'Data Retention',
      data_retention_text: 'We retain your data only as long as necessary for the stated purposes, legal requirements, or until you withdraw consent (if applicable). Typically, this is no longer than 12 months unless required by law.',
      
      cookies_links: 'Cookies and External Links',
      cookies_links_text: 'We use cookies to improve user experience. Please refer to our Cookie Policy for more details. Our website may link to third-party sites. We are not responsible for their privacy practices or content.',
      
      user_rights: 'Your Rights',
      user_rights_text: 'You have rights under applicable laws, including:\nThe right to be informed\nThe right to access\nThe right to rectify\nThe right to erase\nThe right to restrict processing\nThe right to data portability\nThe right to object\nThe right to withdraw consent\nThe right to lodge a complaint with the ADGM Office of Data Protection\n\nTo exercise any of your rights or raise concerns, please contact us.',
      
      policy_changes: 'Changes to This Notice',
      policy_changes_text: 'We may update this Privacy Policy periodically. Continued use of TAX-AI after any updates signifies your acceptance of the revised Notice.',
      
      last_updated: 'Last Updated',
      last_updated_date: '27 May 2025',
      
      contact_us: 'Contact Us',
      contact_us_text: 'If you have any questions about this Privacy Policy, please contact us at privacy@taxai.com.',
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

      // Privacy Policy Page
      privacy_and_policy: 'الخصوصية والسياسة',
      privacy_policy: 'سياسة الخصوصية',
      privacy_policy_introduction: 'مقدمة',
      privacy_policy_introduction_text: 'توضح إشعار الخصوصية هذا ("الإشعار") لـ TAX-AI ("نحن" أو "لنا") كيفية وأسباب جمع معلوماتك الشخصية واستخدامها ومعالجتها عند التفاعل مع خدماتنا، بما في ذلك من خلال موقعنا الإلكتروني أو تطبيقاتنا المحمولة أو القنوات الأخرى.',
      privacy_policy_compliance: 'نحن ملتزمون بحماية بياناتك الشخصية وفقًا لائحة حماية البيانات في سوق أبوظبي العالمي (ADGM) 2021 والقوانين المعمول بها في دولة الإمارات العربية المتحدة.',
      
      information_collection: 'المعلومات الشخصية التي نجمعها',
      information_collection_text: 'معلومات الحساب: الاسم، البريد الإلكتروني، بيانات تسجيل الدخول.\nالمدخلات: البيانات التي تدخلها في أدوات الذكاء الاصطناعي أو تقوم بتحميلها كملفات.\nبيانات الاتصال: الرسائل والاستفسارات أو الملاحظات التي تقدمها.\nبيانات وسائل التواصل الاجتماعي: المعلومات التي تقدمها من خلال التفاعلات على صفحات وسائل التواصل الاجتماعي الخاصة بنا.\nالمعلومات الحساسة: نحن لا نقوم بجمع البيانات الشخصية الحساسة عن قصد.\n\nأنت مسؤول عن تقديم معلومات دقيقة وحديثة.',
      
      information_usage: 'لماذا نقوم بمعالجة بياناتك',
      information_usage_text: 'لتشغيل وتقديم خدمات TAX-AI.\nلإدارة حسابات المستخدمين والتفاعلات.\nلمنع الاحتيال وضمان الأمان.\nلتحليل اتجاهات الاستخدام وتحسين المنصة.\nللامتثال للالتزامات القانونية والتنظيمية.\n\nنحن نقوم بمعالجة بياناتك فقط عندما يكون ذلك مسموحًا به قانونًا، مثل الموافقة أو الالتزام القانوني أو المصلحة المشروعة.',
      
      data_sharing: 'مشاركة معلوماتك',
      data_sharing_text: 'قد نشارك بياناتك الشخصية مع:\nشركات مجموعتنا.\nمقدمي الخدمات والمقاولين.\nالسلطات القانونية والتنظيمية داخل أو خارج الإمارات العربية المتحدة.\nأطراف ثالثة مشاركة في المعاملات أو التغييرات التجارية.\nشركاء التحليلات أو التسويق (مجمع/مجهول الهوية فقط).\n\nنضمن أن جميع الأطراف الثالثة تتعامل مع بياناتك بضمانات مناسبة.',
      
      data_security: 'تخزين وأمن البيانات',
      data_security_text: 'نحن نخزن بياناتك بشكل آمن على خوادم محمية ونستخدم تدابير تقنية وتنظيمية لحمايتها من الوصول غير المصرح به أو سوء الاستخدام. بينما نتخذ احتياطات معقولة، لا يوجد نظام آمن بالكامل، وأنت تستخدم خدماتنا على مسؤوليتك الخاصة.',
      
      children_privacy: 'خصوصية الأطفال',
      children_privacy_text: 'TAX-AI غير مخصص للمستخدمين دون سن 18. إذا علمنا أنه تم جمع بيانات شخصية من القاصرين، فسنقوم بحذفها على الفور. يمكن للآباء أو الأوصياء الاتصال بنا لطلب الحذف.',
      
      data_retention: 'الاحتفاظ بالبيانات',
      data_retention_text: 'نحتفظ ببياناتك فقط طالما كان ذلك ضروريًا للأغراض المذكورة أو المتطلبات القانونية أو حتى سحب موافقتك (إذا كان ذلك ينطبق). عادةً، لا تزيد هذه المدة عن 12 شهرًا ما لم يكن ذلك مطلوبًا بموجب القانون.',
      
      cookies_links: 'ملفات تعريف الارتباط والروابط الخارجية',
      cookies_links_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم. يرجى الرجوع إلى سياسة ملفات تعريف الارتباط لمزيد من التفاصيل. قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية أو المحتوى الخاص بهم.',
      
      user_rights: 'حقوقك',
      user_rights_text: 'لديك حقوق بموجب القوانين المعمول بها، بما في ذلك:\nالحق في الإعلام\nالحق في الوصول\nالحق في التصحيح\nالحق في المحو\nالحق في تقييد المعالجة\nالحق في نقل البيانات\nالحق في الاعتراض\nالحق في سحب الموافقة\nالحق في تقديم شكوى إلى مكتب حماية البيانات في ADGM\n\nلممارسة أي من حقوقك أو رفع المخاوف، يرجى الاتصال بنا.',
      
      policy_changes: 'التغييرات على هذا الإشعار',
      policy_changes_text: 'قد نقوم بتحديث سياسة الخصوصية هذه بشكل دوري. الاستمرار في استخدام TAX-AI بعد أي تحديثات يعني قبولك للإشعار المنقح.',
      
      last_updated: 'آخر تحديث',
      last_updated_date: '27 مايو 2025',
      
      contact_us: 'اتصل بنا',
      contact_us_text: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على privacy@taxai.com.',
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