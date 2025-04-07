import React, { useState } from 'react';
import '../styles/FAQSection.css';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <div className="faq-question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className="faq-toggle">{open ? '-' : '+'}</span>
      </div>
      {open && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'What is CineNiche?',
      answer:
        'CineNiche is a curated movie streaming service offering cult classics, indie films, and niche documentaries.',
    },
    {
      question: 'How do I sign up?',
      answer:
        'Click on the Sign Up link at the bottom and follow the registration process.',
    },
    {
      question: 'How do I contact support?',
      answer:
        'You can reach our support team via email at support@cineniche.com or call 123-456-7890.',
    },
  ];

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  );
};

export default FAQSection;
