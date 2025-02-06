import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const PricingTable = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.className = darkMode ? "bg-dark text-white" : "bg-light text-dark";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const [cart, setCart] = useState([]);

  const addToCart = (plan) => {
    setCart([...cart, plan]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const plans = [
    {
      name: "Basic",
      price: "$9.99/mo",
      features: ["5GB Storage", "Basic Support", "Single User"],
    },
    {
      name: "Standard",
      price: "$19.99/mo",
      features: ["50GB Storage", "Priority Support", "Up to 5 Users"],
    },
    {
      name: "Premium",
      price: "$49.99/mo",
      features: ["Unlimited Storage", "24/7 Support", "Unlimited Users"],
    },
  ];

  const faqs = [
    { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and bank transfers." },
    { question: "Can I cancel my subscription?", answer: "Yes, you can cancel anytime from your account settings." },
    { question: "Do you offer customer support?", answer: "Yes, we provide 24/7 customer support." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="container py-5 text-center" style={{ maxWidth: "800px" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center w-100">Pricing Plans</h2>
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="row justify-content-center">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-4">
              <div className={`card shadow-lg text-center p-4 ${darkMode ? "bg-secondary text-white" : "bg-white text-dark"}`}>
                <h3 className="mb-3">{plan.name}</h3>
                <h4 className="text-primary">{plan.price}</h4>
                <ul className="list-unstyled mt-3 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <button className="btn btn-primary w-100" onClick={() => addToCart(plan)}>Choose Plan</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <h2 className="text-center">Your Cart</h2>
          {cart.length > 0 ? (
            <ul className="list-group">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.name} - {item.price}
                  <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(index)}>Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No plans selected.</p>
          )}
        </div>

        <div className="mt-5">
          <h2 className="text-center">FAQ</h2>
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <div className="card-header" onClick={() => toggleFAQ(index)}>
                  <h5 className="mb-0">
                    <button className="btn btn-link" style={{ textDecoration: 'none' }}>
                      {faq.question}
                    </button>
                  </h5>
                </div>
                {openIndex === index && (
                  <div className="card-body">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
