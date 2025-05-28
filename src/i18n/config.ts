import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      faq: 'FAQ',
      getStarted: 'Get Started',

      // Hero Section
      heroTitle: 'AI-Powered Tax Solutions',
      heroSubtitle: 'Simplify and streamline your enterprise tax operations with intelligent, end-to-end AI capabilities',
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
      enterpriseFeaturesTitle: 'AI Solutions for Enterprises in Taxation (UAE)',
      enterpriseFeaturesSubtitle: 'Empowering large organizations to manage taxation with confidence, clarity, and control.',
      feature1Title: 'Smarter Tax Management at Scale',
      feature1Desc: 'Ensure accurate, real-time tax calculations across your entire organization, no matter how complex or spread out. Stay compliant in multiple countries without manual effort.',
      feature2Title: 'Clear Tax Insights',
      feature2Desc: 'Get an executive-level view of your tax landscape—track trends, forecast exposure, and identify risks before they happen. Ideal for CFOs and Tax Leaders who want to stay ahead.',
      feature3Title: 'Automated Tax Workflows',
      feature3Desc: 'Eliminate delays in approvals and reduce errors. Ensure the right documents reach the right people on time, and never miss a compliance deadline again.',
      feature4Title: 'Proactive Risk Management',
      feature4Desc: 'Stay one step ahead of audits and penalties. Our AI identifies risky transactions and highlights potential non-compliance, helping you act before issues escalate.',
      feature5Title: 'Instant Tax Law Clarity',
      feature5Desc: 'No more digging through complex regulations. Instantly access clear interpretations of UAE tax laws to support internal teams and decisions—just ask and get simplified answers.',
      feature6Title: 'Smarter Corporate Structuring',
      feature6Desc: 'Explore "what-if" scenarios to optimize your corporate setup. Understand the tax impact of different legal structures and uncover opportunities for savings and efficiencies.',
      feature7Title: 'Seamless Tax Reconciliation',
      feature7Desc: 'Effortlessly match data across systems and documents. Reduce reconciliation time, catch discrepancies early, and ensure accuracy in filings.',
      feature8Title: 'Your AI Tax Assistant',
      feature8Desc: 'Empower your internal teams with a secure, intelligent assistant trained on your documents and UAE tax regulations. From memos to audit prep—get support instantly.',
      feature9Title: 'Flexible Integration with Your Operations',
      feature9Desc: 'Bring AI-driven tax intelligence into your existing systems—supporting procurement, finance, and legal teams with real-time insights that improve accuracy and reduce risk.',

      // AI Chat Section
      meetExperts: 'Meet Our AI Tax Experts',
      exploreAssistants: 'Explore our specialized AI tax assistants designed to help you with different aspects of tax preparation and consultation. Choose the expert that best suits your needs.',
      attoTitle: 'ATTO – Your Chat-Based AI Tax Assistant',
      attoDescription: "ATTO is your intelligent AI tax consultant available through chat. It delivers instant, text-based answers to your UAE Corporate Tax, VAT, and Excise Tax queries. Whether you're looking to optimize compliance or uncover eligible deductions, ATTO is always ready to guide you—fast, accurate, and available 24/7.",
      askAtto: 'Ask Atto!',
      yosrTitle: 'YOSR – Your Voice-Powered AI Tax Assistant',
      yosrDescription: 'Prefer speaking over typing? YOSR is your voice-enabled AI tax assistant, designed for a hands-free, human-like experience. Ask your tax questions out loud—YOSR listens, understands, and replies in real-time, giving you expert insights aligned with the latest UAE tax regulations.',
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
      pricingSubtitle: "Choose the plan that's right for your business needs",
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
      faqTitle: 'Frequently Asked Questions (FAQs)',
      faqSubtitle: 'Find answers to common questions about TAX-AI',
      faqQuestion1: 'What is TAX-AI?',
      faqAnswer1: 'TAX-AI is an AI-powered Tax Platform designed for businesses operating in the UAE. It provides real-time, regulation-aware support on Corporate Tax, VAT, and Excise Tax, aligned with the latest rules and guidance from the UAE Federal Tax Authority (FTA).',
      faqQuestion2: 'What taxes does TAX-AI cover?',
      faqAnswer2: 'TAX-AI currently supports:\n- UAE Corporate Tax\n- Value Added Tax (VAT)\n- Excise Tax\n\nOur system is continuously updated to reflect the latest FTA regulations, guides, clarifications, and Cabinet Decisions.',
      faqQuestion3: 'How does the AI Assistant Agent work?',
      faqAnswer3: 'The AI Assistant Agent is an intelligent chatbot designed for enterprise use. It answers complex tax queries using natural language, instantly referencing FTA regulations and guidance. It helps your team make informed decisions without manually browsing FTA documentation.',
      faqQuestion4: 'Is TAX-AI up to date with the latest tax laws and FTA guidance?',
      faqAnswer4: 'Yes. TAX-AI is updated regularly to include the most recent changes to:\n- UAE Corporate Tax Law (Federal Decree-Law No. 47 of 2022 and amendments)\n- VAT rules and Cabinet Decision updates\n- Excise Tax obligations\n\nOur system integrates summaries and interpretations of official FTA publications.',
      faqQuestion5: 'Can TAX-AI be used by tax professionals and legal teams?',
      faqAnswer5: 'Absolutely. TAX-AI is built to support:\n- In-house tax teams\n- Legal counsel\n- Compliance officers\n- Tax consultants and advisors\n\nIt provides quick reference to technical tax language in an easy-to-use conversational format.',
      faqQuestion6: 'Is TAX-AI a replacement for tax advisors?',
      faqAnswer6: "No. TAX-AI is an AI-powered assistant designed to augment decision-making. It's not a licensed tax advisor. We recommend consulting with qualified tax professionals for complex or high-risk matters.",
      faqQuestion7: 'What makes TAX-AI different from general AI tools like ChatGPT?',
      faqAnswer7: 'TAX-AI is built specifically for UAE tax compliance and is:\n- Tuned to FTA-compliant answers only\n- Updated regularly with tax circulars, decisions, and bulletins\n- Trained to avoid speculation or outdated practices\n\nUnlike generic AI, TAX-AI is focused and domain-specific.',
      faqQuestion8: 'Is TAX-AI compliant with UAE and international data privacy regulations?',
      faqAnswer8: 'Yes. TAX-AI follows UAE ADGM data protection laws and is GDPR-compliant. All data is processed securely, and no user inputs are used to train external models like OpenAI.',
      faqQuestion9: 'Can I integrate TAX-AI into my enterprise systems?',
      faqAnswer9: 'Yes. TAX-AI offers enterprise integration options via API or custom interface solutions. Our team can help embed the Assistant Agent into your internal platforms securely.',
      faqQuestion10: 'Is there a free trial or demo available?',
      faqAnswer10: 'Yes. We offer demo access to explore how the AI Assistant works with sample queries across VAT, Excise, and Corporate Tax.',
      faqQuestion11: 'How often is the AI Assistant Agent updated?',
      faqAnswer11: 'Updates are pushed weekly or in real-time when:\n- The FTA issues new guides or clarifications\n- New Cabinet Decisions or Ministerial Decisions are released\n- Legislative changes are officially published',

      // Testimonials Section
      testimonialsTitle: 'What Our Users Say',
      testimonialsSubtitle: 'Trusted by thousands of users worldwide',
      testimonial1: 'This AI tax assistant has revolutionized how I handle my taxes. Highly recommended!',
      testimonial2: 'The automated calculations save me hours of work. Incredible tool!',
      testimonial3: "Best tax software I've ever used. The AI support is exceptional.",

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
      copyright: 'Copyright © 2025 DataU3 and Atto group. All rights reserved.',

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
      
      children_privacy: "Children's Privacy",
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

      // Disclaimer Page
      disclaimerTitle: 'Disclaimer',
      disclaimerContent: 'By using TAX-AI, you acknowledge and accept that, as with any large language model, it may generate incorrect, misleading, or potentially offensive information. The content provided is AI-generated and intended solely for informational purposes. It does not constitute professional tax, legal, or financial advice and should not be relied upon as such. TAX-AI and its affiliates make no representations or warranties regarding the accuracy or completeness of the content. You are solely responsible for any actions taken based on the information provided. We welcome feedback and are continually improving our models and services.',
      legal: 'Legal',
      disclaimer: 'Disclaimer',
    }
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      features: 'الميزات',
      howItWorks: 'كيف يعمل',
      faq: 'الأسئلة الشائعة',
      getStarted: 'ابدأ الآن',

      // Hero Section
      heroTitle: 'حلول ضريبية مدعومة بالذكاء الاصطناعي',
      heroSubtitle: 'بسّط واعمل على تحسين عمليات الضرائب في شركتك باستخدام قدرات الذكاء الاصطناعي الذكية والشاملة',
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
      enterpriseFeaturesTitle: 'حلول الذكاء الاصطناعي للمؤسسات في مجال الضرائب (الإمارات)',
      enterpriseFeaturesSubtitle: 'تمكين المؤسسات الكبيرة من إدارة الضرائب بثقة ووضوح وسيطرة.',
      feature1Title: 'إدارة ضريبية ذكية على نطاق واسع',
      feature1Desc: 'ضمان حسابات ضريبية دقيقة وفورية في جميع أنحاء مؤسستك، بغض النظر عن مدى تعقيدها أو انتشارها. ابق متوافقاً مع متطلبات عدة دول دون جهد يدوي.',
      feature2Title: 'رؤى ضريبية واضحة لاتخاذ قرارات واثقة',
      feature2Desc: 'احصل على نظرة تنفيذية للمشهد الضريبي الخاص بك — تتبع الاتجاهات، وتوقع التعرض، وتحديد المخاطر قبل حدوثها. مثالي لمديري المالية وقادة الضرائب الذين يرغبون في البقاء في المقدمة.',
      feature3Title: 'سير العمل الضريبي الآلي',
      feature3Desc: 'القضاء على التأخير في الموافقات وتقليل الأخطاء. تأكد من وصول المستندات الصحيحة إلى الأشخاص المناسبين في الوقت المحدد، وعدم تفويت مواعيد الامتثال مرة أخرى.',
      feature4Title: 'إدارة المخاطر الاستباقية',
      feature4Desc: 'ابق متقدماً بخطوة على عمليات التدقيق والغرامات. يحدد الذكاء الاصطناعي لدينا المعاملات المحفوفة بالمخاطر ويسلط الضوء على عدم الامتثال المحتمل، مما يساعدك على التصرف قبل تصاعد المشكلات.',
      feature5Title: 'وضوح فوري لقانون الضرائب',
      feature5Desc: 'لا مزيد من البحث في اللوائح المعقدة. احصل على تفسيرات واضحة لقوانين الضرائب الإماراتية لدعم الفرق الداخلية والقرارات — فقط اسأل واحصل على إجابات مبسطة.',
      feature6Title: 'هيكلة مؤسسية ذكية',
      feature6Desc: 'استكشف سيناريوهات "ماذا لو" لتحسين الإعداد المؤسسي الخاص بك. فهم التأثير الضريبي للهياكل القانونية المختلفة واكتشف فرص التوفير والكفاءة.',
      feature7Title: 'مصالحة ضريبية سلسة',
      feature7Desc: 'قم بمطابقة البيانات بسهولة عبر الأنظمة والمستندات. تقليل وقت المصالحة، واكتشاف التناقضات مبكراً، وضمان دقة الإقرارات.',
      feature8Title: 'مساعدك الضريبي الذكي',
      feature8Desc: 'قوّي فرقك الداخلية بمساعد آمن وذكي مدرب على مستنداتك ولوائح الضرائب الإماراتية. من المذكرات إلى التحضير للتدقيق — احصل على الدعم فوراً.',
      feature9Title: 'تكامل مرن مع عملياتك',
      feature9Desc: 'أدخل الذكاء الضريبي المدعوم بالذكاء الاصطناعي إلى أنظمتك الحالية — دعم فرق المشتريات والمالية والقانونية برؤى فورية تحسن الدقة وتقلل المخاطر.',

      // AI Chat Section
      meetExperts: 'تعرف على خبراء الضرائب الذكيين لدينا',
      exploreAssistants: 'اكتشف مساعدي الضرائب الذكيين المتخصصين لدينا المصممين لمساعدتك في جوانب مختلفة من إعداد الضرائب والاستشارات. اختر الخبير الذي يناسب احتياجاتك.',
      attoTitle: ' ATTO – مساعدك الضريبي القائم على الذكاء الاصطناعي والمحادثة',
      attoDescription: 'ATTO هو مستشارك الضريبي الذكي الذي يعمل بالذكاء الاصطناعي والمتاح عبر الدردشة. يقدم إجابات فورية نصية على استفساراتك المتعلقة بالضريبة على الشركات في الإمارات العربية المتحدة وضريبة القيمة المضافة وضريبة الاستهلاك. سواء كنت تبحث عن تحسين الامتثال أو اكتشاف الخصومات المؤهلة، فإن ATTO جاهز دائمًا لإرشادك بسرعة ودقة ومتاح على مدار الساعة طوال أيام الأسبوع.',
      askAtto: 'اسأل أتّو!',
      yosrTitle: 'YOSR – مساعدك الضريبي الذكي الذي يعمل بالصوت',
      yosrDescription: 'هل تفضل التحدث بدلاً من الكتابة؟ YOSR هو مساعدك الضريبي الذكي الذي يعمل بالصوت، وهو مصمم لتجربة تشبه التجربة البشرية دون استخدام اليدين. اطرح أسئلتك الضريبية بصوت عالٍ — YOSR يستمع ويفهم ويجيب في الوقت الفعلي، ويقدم لك رؤى متخصصة تتوافق مع أحدث اللوائح الضريبية في الإمارات العربية المتحدة.',
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
      faqSubtitle: 'اعثر على إجابات للأسئلة الشائعة حول TAX-AI',
      faqQuestion1: 'ما هو TAX-AI؟',
      faqAnswer1: 'TAX-AI هو منصة ضريبية مدعومة بالذكاء الاصطناعي مصممة للشركات العاملة في الإمارات العربية المتحدة. يوفر دعماً فورياً ومدركاً للوائح في ضريبة الشركات وضريبة القيمة المضافة والضريبة الانتقائية، متوافقاً مع أحدث القواعد والتوجيهات من الهيئة الاتحادية للضرائب (FTA).',
      faqQuestion2: 'ما هي الضرائب التي يغطيها TAX-AI؟',
      faqAnswer2: 'يدعم TAX-AI حالياً:\n- ضريبة الشركات الإماراتية\n- ضريبة القيمة المضافة (VAT)\n- الضريبة الانتقائية\n\nيتم تحديث نظامنا باستمرار ليعكس أحدث لوائح وتوجيهات وقرارات مجلس الوزراء الصادرة عن الهيئة الاتحادية للضرائب.',
      faqQuestion3: 'كيف يعمل مساعد الذكاء الاصطناعي؟',
      faqAnswer3: 'مساعد الذكاء الاصطناعي هو روبوت محادثة ذكي مصمم للاستخدام المؤسسي. يجيب على الاستفسارات الضريبية المعقدة باستخدام اللغة الطبيعية، مع الإشارة الفورية إلى لوائح وتوجيهات الهيئة الاتحادية للضرائب. يساعد فريقك على اتخاذ قرارات مستنيرة دون الحاجة إلى تصفح وثائق الهيئة يدوياً.',
      faqQuestion4: 'هل TAX-AI محدث بأحدث قوانين الضرائب وتوجيهات الهيئة الاتحادية للضرائب؟',
      faqAnswer4: 'نعم. يتم تحديث TAX-AI بانتظام ليشمل أحدث التغييرات في:\n- قانون ضريبة الشركات الإماراتي (المرسوم بقانون اتحادي رقم 47 لسنة 2022 والتعديلات)\n- تحديثات قواعد ضريبة القيمة المضافة وقرارات مجلس الوزراء\n- التزامات الضريبة الانتقائية\n\nيتكامل نظامنا مع ملخصات وتفسيرات المنشورات الرسمية للهيئة الاتحادية للضرائب.',
      faqQuestion5: 'هل يمكن استخدام TAX-AI من قبل المتخصصين في الضرائب والفرق القانونية؟',
      faqAnswer5: 'بالتأكيد. تم بناء TAX-AI لدعم:\n- فرق الضرائب الداخلية\n- المستشارين القانونيين\n- مسؤولي الامتثال\n- مستشاري ومستشارين الضرائب\n\nيوفر مرجعاً سريعاً للغة الضريبية التقنية بتنسيق محادثة سهل الاستخدام.',
      faqQuestion6: 'هل TAX-AI بديل لمستشاري الضرائب؟',
      faqAnswer6: 'لا. TAX-AI هو مساعد مدعوم بالذكاء الاصطناعي مصمم لتعزيز اتخاذ القرارات. إنه ليس مستشار ضرائب مرخصاً. نوصي بالتشاور مع متخصصي الضرائب المؤهلين للمسائل المعقدة أو عالية المخاطر.',
      faqQuestion7: 'ما الذي يميز TAX-AI عن أدوات الذكاء الاصطناعي العامة مثل ChatGPT؟',
      faqAnswer7: 'تم بناء TAX-AI خصيصاً للامتثال الضريبي في الإمارات وهو:\n- مضبوط للإجابات المتوافقة مع الهيئة الاتحادية للضرائب فقط\n- محدث بانتظام بالدوريات والقرارات والنشرات الضريبية\n- مدرب على تجنب التكهن أو الممارسات القديمة\n\nعلى عكس الذكاء الاصطناعي العام، يركز TAX-AI على مجال محدد.',
      faqQuestion8: 'هل TAX-AI متوافق مع لوائح خصوصية البيانات الإماراتية والدولية؟',
      faqAnswer8: 'نعم. يتبع TAX-AI قوانين حماية بيانات ADGM الإماراتية وهو متوافق مع GDPR. تتم معالجة جميع البيانات بشكل آمن، ولا يتم استخدام مدخلات المستخدم لتدريب نماذج خارجية مثل OpenAI.',
      faqQuestion9: 'هل يمكنني دمج TAX-AI في أنظمة المؤسسة الخاصة بي؟',
      faqAnswer9: 'نعم. يقدم TAX-AI خيارات تكامل المؤسسات عبر واجهة برمجة التطبيقات (API) أو حلول واجهة مخصصة. يمكن لفريقنا المساعدة في تضمين المساعد في منصاتك الداخلية بشكل آمن.',
      faqQuestion10: 'هل هناك تجربة مجانية أو عرض توضيحي متاح؟',
      faqAnswer10: 'نعم. نقدم وصولاً تجريبياً لاستكشاف كيفية عمل مساعد الذكاء الاصطناعي مع استعلامات نموذجية عبر ضريبة القيمة المضافة والضريبة الانتقائية وضريبة الشركات.',
      faqQuestion11: 'كم مرة يتم تحديث مساعد الذكاء الاصطناعي؟',
      faqAnswer11: 'يتم دفع التحديثات أسبوعياً أو في الوقت الفعلي عندما:\n- تصدر الهيئة الاتحادية للضرائب توجيهات أو توضيحات جديدة\n- يتم إصدار قرارات مجلس الوزراء أو القرارات الوزارية الجديدة\n- يتم نشر التغييرات التشريعية رسمياً',

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
      copyright: 'حقوق النشر © ٢٠٢٥ لـ DataU3 و Atto group. جميع الحقوق محفوظة.',

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
      
      children_privacy: "Children's Privacy",
      children_privacy_text: 'TAX-AI غير مخصص للمستخدمين دون سن 18. إذا علمنا أنه تم جمع بيانات شخصية من القاصرين، فسنقوم بحذفها على الفور. يمكن للآباء أو الأوصياء الاتصال بنا لطلب الحذف.',
      
      data_retention: 'الاحتفاظ بالبيانات',
      data_retention_text: 'نحتفظ ببياناتك فقط طالما كان ذلك ضروريًا للأغراض المذكورة أو المتطلبات القانونية أو حتى سحب موافقتك (إذا كان ذلك ينطبق). عادةً، لا تزيد هذه المدة عن 12 شهرًا ما لم يكن ذلك مطلوبًا بموجب القانون.',
      
      cookies_links: 'ملفات تعريف الارتباط والروابط الخارجية',
      cookies_links_text: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة المستخدم. يرجى الرجوع إلى سياسة ملفات تعريف الارتباط لمزيد من التفاصيل. قد يحتوي موقعنا على روابط لمواقع خارجية. نحن لسنا مسؤولين عن ممارسات الخصوصية أو المحتوى الخاص بهم.',
      
      user_rights: 'حقوقك',
      user_rights_text: 'لديك حقوق بموجب القوانين المعمول بها، بما في ذلك:\nالحق في الإعلام\nالحق في الوصول\nالحق في التصحيح\nالحق في المحو\nالحق في تقييد المعالجة\nالحق في نقل البيانات\nالحق في الاعتراض\nالحق في سحب الموافقة\nالحق في تقديم شكوى إلى مكتب حماية البيانات في ADGM\n\nTo exercise any of your rights or raise concerns, please contact us.',
      
      policy_changes: 'التغييرات على هذا الإشعار',
      policy_changes_text: 'قد نقوم بتحديث سياسة الخصوصية هذه بشكل دوري. الاستمرار في استخدام TAX-AI بعد أي تحديثات يعني قبولك للإشعار المنقح.',
      
      last_updated: 'آخر تحديث',
      last_updated_date: '27 مايو 2025',
      
      contact_us: 'اتصل بنا',
      contact_us_text: 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا على privacy@taxai.com.',

      // Disclaimer Page
      disclaimerTitle: 'إخلاء المسؤولية',
      disclaimerContent: 'باستخدام TAX-AI، فإنك تقر وتقبل أنه، مثل أي نموذج لغوي كبير، قد يولد معلومات غير صحيحة أو مضللة أو قد تكون مسيئة. المحتوى المقدم تم إنشاؤه بواسطة الذكاء الاصطناعي وهو مخصص للأغراض المعلوماتية فقط. لا يشكل نصيحة ضريبية أو قانونية أو مالية احترافية ولا يجب الاعتماد عليه كأمر مسلم به. لا تقدم TAX-AI والشركات التابعة لها أي تمثيلات أو ضمانات فيما يتعلق بدقة أو اكتمال المحتوى. أنت مسؤول وحدك عن أي إجراءات يتم اتخاذها بناءً على المعلومات المقدمة. نرحب بالملاحظات ونعمل باستمرار على تحسين نماذجنا وخدماتنا.',
      legal: 'قانوني',
      disclaimer: 'إخلاء المسؤولية',
    }
  }
} as const;

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