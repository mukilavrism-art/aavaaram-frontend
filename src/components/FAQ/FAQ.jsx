import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./FAQ.css";

export default function FAQ() {

  const faqs = [
    {
      question: "Are Aavaaram supplements safe for daily use?",
      answer:
        "Yes, our products are made using standardized herbal extracts and are safe when consumed as per recommended dosage."
    },
    {
      question: "Do your products contain preservatives or artificial additives?",
      answer:
        "No. We focus on clean formulations without unnecessary fillers or harmful chemicals."
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Results may vary depending on individual health conditions. Consistent use as advised typically shows noticeable improvements within a few weeks."
    },
    {
      question: "Are your supplements vegetarian?",
      answer:
        "Yes, all our capsules are 100% vegetarian."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-container">
        {faqs.map((item, index) => (
          <div key={index} className="faq-item">
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              {activeIndex === index ? <FiMinus /> : <FiPlus />}
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}