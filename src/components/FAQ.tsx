import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How accurate is your AI tax assistant?",
    answer:
      "Our AI tax assistant is built on advanced machine learning models trained on millions of tax returns and continuously updated with the latest tax laws. It achieves over 99% accuracy in tax preparation, and all returns are reviewed for compliance with current regulations.",
  },
  {
    question: "Is my financial information secure?",
    answer:
      "Absolutely. We use bank-level encryption (256-bit AES) to protect your data, and our systems comply with all financial security standards. Your information is never sold or shared with third parties, and you can request deletion of your data anytime.",
  },
  {
    question: "How much does it cost to use TaxAI?",
    answer:
      "We offer tiered pricing based on tax complexity. Simple returns start at $29, while more complex returns (business owners, investors, multiple income sources) are $79-149. All plans include unlimited AI consultations and amendments if needed.",
  },
  {
    question: "What if I have a question the AI can't answer?",
    answer:
      "While our AI can handle most tax scenarios, we have human tax professionals available for complex situations. If the AI is unable to resolve your query, you'll be automatically connected to a certified tax expert at no additional cost.",
  },
  {
    question: "Can I use TaxAI for state taxes too?",
    answer:
      "Yes, our system supports federal tax filing for all 50 states plus D.C. Each state's specific regulations and forms are fully integrated into our AI system.",
  },
  {
    question: "What happens if there's an audit?",
    answer:
      "All our premium plans include audit protection. If you're audited for a return prepared with TaxAI, we provide full audit support including correspondence with tax authorities and representation if needed.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Everything you need to know about our AI tax service.
          </p>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
