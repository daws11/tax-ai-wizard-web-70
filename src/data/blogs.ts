export interface BlogPost {
  id: string;
  slug: string;
  title: {
    en: string;
    ar: string;
  };
  excerpt: {
    en: string;
    ar: string;
  };
  content: {
    en: string;
    ar: string;
  };
  metaDescription: {
    en: string;
    ar: string;
  };
  keywords: {
    en: string;
    ar: string;
  };
  author: {
    en: string;
    ar: string;
  };
  publishedAt: string;
  updatedAt: string;
  category: {
    en: string;
    ar: string;
  };
  tags: string[];
  featuredImage?: string;
  readTime: {
    en: string;
    ar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "uae-corporate-tax-guide",
    slug: "uae-corporate-tax-guide",
    title: {
      en: "UAE Corporate Tax – Key Guide",
      ar: "ضريبة الشركات في الإمارات – دليل أساسي"
    },
    excerpt: {
      en: "Complete guide to UAE Corporate Tax regime launched in June 2023, covering rates, exemptions, and compliance requirements.",
      ar: "دليل شامل لنظام ضريبة الشركات في الإمارات الذي أُطلق في يونيو 2023، يشمل المعدلات والإعفاءات ومتطلبات الامتثال."
    },
    content: {
      en: `
        <h2>1. Introduction</h2>
        <p>Since 1 June 2023, the UAE has launched a federal corporate tax (CT) regime under Federal Decree-Law No. 60 of 2023 (amending Decree-Law 47 of 2022).</p>

        <h2>2. Who is Subject to the Tax?</h2>
        <p>The tax applies to all businesses and individuals carrying out commercial activities under a UAE business licence, including free-zone entities (if they meet qualifying conditions), and to foreign companies operating regularly in the UAE.</p>

        <h2>3. Tax Rates & Threshold</h2>
        <ul>
          <li>0% on taxable profits up to AED 375,000</li>
          <li>9% on profits above AED 375,000</li>
          <li>Special OECD Pillar 2 rules may apply for large multinational groups.</li>
        </ul>

        <h2>4. Key Exemptions</h2>
        <ul>
          <li>Natural resource extraction companies (still taxed at Emirate level).</li>
          <li>Dividends, qualifying capital gains, intra-group reorganisations, and qualifying participation income are exempt.</li>
        </ul>

        <h2>5. Free Zone Treatment</h2>
        <p>Qualifying Free Zone Persons (QFZPs) can continue to benefit from 0% CT if they meet conditions and avoid mainland business. They must still register and file tax returns annually.</p>

        <h2>6. Registration & Filing Deadlines</h2>
        <p>All businesses must register with the FTA and file corporate tax returns online via EmaraTax. Filing starts at the end of the first tax year – usually late 2024 or 2025 depending on the financial year.</p>

        <h2>Why It Matters</h2>
        <p>The UAE wants to align with global tax standards while keeping a competitive 9% rate – one of the lowest in the region.</p>

        <h2>Final Words</h2>
        <p>Corporate tax is now a core part of doing business in the UAE. Knowing your rates, exemptions, and deadlines is essential to avoid penalties and stay compliant.</p>
      `,
      ar: `
        <h2>١. المقدّمة</h2>
        <p>منذ ١ يونيو ٢٠٢٣، أطلقت دولة الإمارات النظام الاتحادي لضريبة الشركات (CT) بموجب المرسوم بقانون اتحادي رقم ٦٠ لسنة ٢٠٢٣ (المعدل للمرسوم رقم ٤٧ لسنة ٢٠٢٢).</p>

        <h2>٢. من يشمله النظام؟</h2>
        <p>تنطبق الضريبة على جميع الشركات والأفراد الذين يمارسون نشاطًا تجاريًا بموجب ترخيص تجاري في الدولة، بما في ذلك شركات المناطق الحرة (في حال استيفاء الشروط المؤهلة)، وكذلك الشركات الأجنبية التي تمارس نشاطًا منتظمًا داخل الإمارات.</p>

        <h2>٣. معدلات الضريبة والحد الأدنى</h2>
        <ul>
          <li>0٪ على الأرباح حتى ٣٧٥,٠٠٠ درهم</li>
          <li>9٪ على الأرباح التي تزيد عن ٣٧٥,٠٠٠ درهم</li>
          <li>قد تُطبّق قواعد «الركيزة الثانية» للـ OECD على المجموعات متعددة الجنسيات الكبرى.</li>
        </ul>

        <h2>٤. الإعفاءات الرئيسية</h2>
        <ul>
          <li>شركات استخراج الموارد الطبيعية (تظل خاضعة لضريبة الإمارة).</li>
          <li>الأرباح الموزّعة، الأرباح الرأسمالية المؤهلة، إعادة الهيكلة داخل المجموعة، ودخل المشاركة المؤهل معفاة.</li>
        </ul>

        <h2>٥. معاملة المناطق الحرة</h2>
        <p>يمكن للكيانات المؤهلة في المناطق الحرة (QFZP) الاستمرار بالاستفادة من 0٪ ضريبة إذا استوفت الشروط ولم تمارس نشاطًا في البر الرئيسي. ومع ذلك فهي مُلزمة بـ التسجيل وتقديم الإقرارات الضريبية سنويًا.</p>

        <h2>٦. التسجيل والمواعيد النهائية</h2>
        <p>يجب على جميع الشركات التسجيل لدى الهيئة الاتحادية للضرائب (FTA) وتقديم الإقرارات عبر منصة EmaraTax. يبدأ تقديم الإقرارات في نهاية السنة المالية الأولى الخاضعة للضريبة – غالبًا نهاية ٢٠٢٤ أو ٢٠٢٥ بحسب السنة المالية.</p>

        <h2>لماذا يهم؟</h2>
        <p>تسعى الإمارات للتماشي مع المعايير الضريبية العالمية، مع الحفاظ على بيئة تنافسية بمعدل 9٪ فقط – وهو من أدنى المعدلات في المنطقة.</p>

        <h2>الكلمة النهائية</h2>
        <p>أصبحت ضريبة الشركات الآن جزءًا أساسيًا من ممارسة الأعمال في الإمارات. معرفة المعدلات، الإعفاءات، والمواعيد النهائية ضرورية لتجنب الغرامات والالتزام بالنظام.</p>
      `
    },
    metaDescription: {
      en: "Complete guide to UAE Corporate Tax regime launched in June 2023, covering rates, exemptions, and compliance requirements for businesses.",
      ar: "دليل شامل لنظام ضريبة الشركات في الإمارات الذي أُطلق في يونيو 2023، يشمل المعدلات والإعفاءات ومتطلبات الامتثال للشركات."
    },
    keywords: {
      en: "UAE corporate tax, business tax, FTA, EmaraTax, tax compliance, free zone, tax rates",
      ar: "ضريبة الشركات الإمارات، ضريبة الأعمال، الهيئة الاتحادية للضرائب، إماراتاكس، الامتثال الضريبي، المنطقة الحرة، معدلات الضريبة"
    },
    author: {
      en: "TaxAI Team",
      ar: "فريق TaxAI"
    },
    publishedAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    category: {
      en: "Corporate Tax",
      ar: "ضريبة الشركات"
    },
    tags: ["corporate-tax", "uae", "compliance", "business"],
    readTime: {
      en: "5 min read",
      ar: "قراءة 5 دقائق"
    }
  },
  {
    id: "uae-corporate-tax-pillar-two-2025",
    slug: "uae-corporate-tax-pillar-two-2025",
    title: {
      en: "What's New in UAE Corporate Tax: Pillar Two & Beyond (2025 Update)",
      ar: "مستجدات ضريبة الشركات في الإمارات: حزمة الركيزة الثانية وتحديثات ٢٠٢٥"
    },
    excerpt: {
      en: "Comprehensive update on UAE Corporate Tax developments including the critical Pillar Two / Domestic Minimum Top-up Tax (DMTT) framework as of early 2025.",
      ar: "تحديث شامل حول مستجدات ضريبة الشركات في الإمارات بما في ذلك إطار الركيزة الثانية وضريبة التكميل الداخلي (DMTT) اعتبارًا من أوائل ٢٠٢٥."
    },
    content: {
      en: `
        <h2>1. What's Changed?</h2>
        <p>Starting 1 January 2025, the UAE introduced a Domestic Minimum Top-up Tax (DMTT) of 15% for large multinational enterprises (MNEs) with consolidated global revenues exceeding €750 million in at least two of the preceding four financial years, in line with the OECD Pillar Two global tax initiative.</p>

        <h2>2. Standard UAE Corporate Tax Framework</h2>
        <p>Since 1 June 2023, the UAE has imposed a federal Corporate Tax (CT) under Federal Decree-Law No. 60 of 2023 (amending Decree-Law No. 47 of 2022). Key rates remain:</p>
        <ul>
          <li>0% for taxable income up to AED 375,000</li>
          <li>9% on taxable income above AED 375,000</li>
          <li>Qualifying Free Zone Persons (QFZPs) may continue to enjoy 0% CT on qualifying income if they meet compliance and substance requirements.</li>
        </ul>

        <h2>3. Who Pays What?</h2>
        <div class="blog-table-container">
          <table class="blog-table">
            <thead>
              <tr>
                <th style="text-align: left;">Entity Type</th>
                <th style="text-align: left;">Tax Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard UAE companies (profit up to AED 375,000)</td>
                <td class="tax-rate-0">0%</td>
              </tr>
              <tr>
                <td>Standard UAE companies (profit above AED 375,000)</td>
                <td class="tax-rate-9">9%</td>
              </tr>
              <tr>
                <td>QFZPs on qualifying income</td>
                <td class="tax-rate-0">0%</td>
              </tr>
              <tr>
                <td>Large international MNEs (global revenue ≥ €750m)</td>
                <td class="tax-rate-15">Effective 15% via DMTT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>4. Substance & Compliance</h2>
        <p>Regulations now emphasize:</p>
        <ul>
          <li>Economic substance within UAE, especially for free zone entities</li>
          <li>Transfer pricing documentation for related-party transactions, domestic or international</li>
          <li>Interest deduction limitation rules, restricting excessive interest expense claims</li>
        </ul>

        <h2>5. Key Deadlines & Filings</h2>
        <ul>
          <li>Entities must register with the FTA, obtain a TRN, and file annually through EmaraTax.</li>
          <li>Filing deadline: within 9 months after financial year-end (e.g., year-end 31 Dec → file by 30 Sep next year).</li>
        </ul>

        <h2>6. Why It Matters</h2>
        <ul>
          <li>Harmonizes UAE tax policy with global minimum tax standards, enhancing international credibility</li>
          <li>Balances competitiveness: retains a low 9% standard rate while ensuring large MNEs pay at least 15% globally via DMTT</li>
          <li>Encourages transparency, substance, and alignment with OECD BEPS–Pillar Two frameworks</li>
        </ul>
      `,
      ar: `
        <h2>١. ما الجديد؟</h2>
        <p>اعتبارًا من ١ يناير ٢٠٢٥، أدخلت الإمارات ضريبة تكميلية داخلية (DMTT) بنسبة ١٥٪ على الشركات متعددة الجنسيات التي يتجاوز إيرادها العالمي ٧٥٠ مليون يورو في سنتين على الأقل من آخر أربع سنوات، وفقًا لمبادرة الركيزة الثانية التابعة لمنظمة التعاون الاقتصادي والتنمية (OECD).</p>

        <h2>٢. الإطار الأساسي لضريبة الشركات في الإمارات</h2>
        <p>منذ ١ يونيو ٢٠٢٣، نفّذت الإمارات نظامًا اتحاديًا لضريبة الشركات بموجب المرسوم بقانون اتحادي رقم ٦٠ لسنة ٢٠٢٣ (تعديلًا للمرسوم ٤٧ لسنة ٢٠٢٢). المعدّلات الضريبية:</p>
        <ul>
          <li>0٪ على الأرباح حتى ٣٧٥,٠٠٠ درهم</li>
          <li>9٪ على الأرباح التي تتجاوز هذا الحد</li>
          <li>الكيانات المؤهلة في المناطق الحرة (QFZP) تحتفظ بإعفاء 0٪ على الدخل المؤهل عند استيفاء الشروط والامتثال التنظيمي.</li>
        </ul>

        <h2>٣. من يدفع ماذا؟</h2>
        <div class="blog-table-container">
          <table class="blog-table">
            <thead>
              <tr>
                <th style="text-align: right;">نوع الكيان</th>
                <th style="text-align: right;">المعدل الضريبي</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: right;">شركات الإمارات (أرباح حتى AED 375k)</td>
                <td class="tax-rate-0" style="text-align: right;">0٪</td>
              </tr>
              <tr>
                <td style="text-align: right;">شركات الإمارات (أرباح فوق AED 375k)</td>
                <td class="tax-rate-9" style="text-align: right;">9٪</td>
              </tr>
              <tr>
                <td style="text-align: right;">كيانات المناطق الحرة المؤهلة على الدخل المؤهل</td>
                <td class="tax-rate-0" style="text-align: right;">0٪</td>
              </tr>
              <tr>
                <td style="text-align: right;">الشركات متعددة الجنسيات الكبرى (إيراد ≥ €750m)</td>
                <td class="tax-rate-15" style="text-align: right;">15% فعليًا عبر DMTT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>٤. المتطلبات والامتثال</h2>
        <ul>
          <li>ضرورة وجود مضمون اقتصادي داخل الإمارات، خاصة في المناطق الحرة</li>
          <li>توثيق تسعير التحويل للمعاملات مع الأطراف ذات العلاقة داخل الإمارات أو خارجها</li>
          <li>قيود على خصم الفوائد لمنع الاستخدام المفرط للفوائد كتكاليف ضريبياً قابلة للخصم</li>
        </ul>

        <h2>٥. المواعيد النهائية والتقديم</h2>
        <ul>
          <li>يجب على الكيانات التسجيل لدى الهيئة الاتحادية للضرائب (FTA) والحصول على رقم التسجيل الضريبي (TRN)، وتقديم الإقرار سنويًا عبر منصة EmaraTax.</li>
          <li>الموعد النهائي لتقديم الإقرار: ٩ أشهر من نهاية السنة المالية (مثال: نهاية 31 ديسمبر → موعد التقديم 30 سبتمبر من السنة التالية).</li>
        </ul>

        <h2>٦. لماذا هذا مهم؟</h2>
        <ul>
          <li>تواءم سياسة الضرائب الإماراتية مع المعايير الضريبية العالمية الدنيا، مما يُعزز مصداقية الدولة دولياً</li>
          <li>الحفاظ على التنافسية: معدل معياري منخفض 9٪ مع ضمان أن الشركات الكبرى تدفع فعليًا 15٪ من خلال DMTT</li>
          <li>التشجيع على الامتثال والشفافية والانسجام مع إطار BEPS–Pillar Two التابع لـ OECD</li>
        </ul>
      `
    },
    metaDescription: {
      en: "Comprehensive update on UAE Corporate Tax developments including Pillar Two and DMTT framework for 2025. Learn about new tax rates, compliance requirements, and filing deadlines.",
      ar: "تحديث شامل حول مستجدات ضريبة الشركات في الإمارات بما في ذلك الركيزة الثانية وإطار DMTT لعام ٢٠٢٥. تعرف على المعدلات الضريبية الجديدة ومتطلبات الامتثال والمواعيد النهائية."
    },
    keywords: {
      en: "UAE corporate tax, Pillar Two, DMTT, OECD, multinational enterprises, tax compliance, EmaraTax, free zone, substance requirements",
      ar: "ضريبة الشركات الإمارات، الركيزة الثانية، DMTT، منظمة التعاون الاقتصادي، الشركات متعددة الجنسيات، الامتثال الضريبي، إماراتاكس، المنطقة الحرة، متطلبات المضمون"
    },
    author: {
      en: "TaxAI Team",
      ar: "فريق TaxAI"
    },
    publishedAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
    category: {
      en: "Corporate Tax",
      ar: "ضريبة الشركات"
    },
    tags: ["corporate-tax", "uae", "pillar-two", "dmtt", "oecd", "compliance", "2025"],
    readTime: {
      en: "7 min read",
      ar: "قراءة 7 دقائق"
    }
  }
];

// Helper function to get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Helper function to get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Helper function to get blog posts by category
export const getBlogPostsByCategory = (category: string, language: 'en' | 'ar' = 'en'): BlogPost[] => {
  return blogPosts.filter(post => 
    post.category[language].toLowerCase() === category.toLowerCase()
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

// Helper function to search blog posts
export const searchBlogPosts = (query: string, language: 'en' | 'ar' = 'en'): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title[language].toLowerCase().includes(lowercaseQuery) ||
    post.excerpt[language].toLowerCase().includes(lowercaseQuery) ||
    post.content[language].toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  ).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};
