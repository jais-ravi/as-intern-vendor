import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const data = [
    {
      question: "How do I register as a supplier in the system?",
      answer: [
        "Step 1: Go to the registration page.",
        "Step 2: Fill out the required information.",
        "Step 3: Submit your documents for verification.",
      ],
    },
    {
      question: "What documents are needed for registration?",
      answer: [
        "1. GST Certificate",
        "2. Company PAN Card",
        "3. Address proof and bank account details",
      ],
    },
    {
      question: "How long does the verification process take?",
      answer: [
        "Typically, the verification process takes 3-5 business days.",
        "Our team will notify you via email once verification is complete.",
      ],
    },
    {
      question: "Is there a fee to register as a supplier?",
      answer: [
        "No, registration as a supplier is free of charge.",
        "There are no hidden fees during the onboarding process.",
      ],
    },
  ];

  return (
    <div className="container px-4 py-10 mx-auto w-full max-w-screen-lg space-y-5">
      <h1 className="text-3xl font-bold underline">Common Questions</h1>
      <div className="flex justify-center items-center">
        <Accordion type="single" collapsible className="w-full">
          {data.map((items, index) => (
            <AccordionItem key={`item-0${index}`} value={`item-0${index}`}>
              <AccordionTrigger className="text-lg ">
                {items.question}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5 space-y-2 text-base ">
                  {items.answer.map((answer, i) => (
                    <li key={i}>{answer}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqSection;
