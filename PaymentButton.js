import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './PaymentButton.css';

// Make sure to replace with your own Stripe public key
const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const PaymentButton = ({ doctorId, amount }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    // Call your server to create a PaymentIntent and get the client secret
    const response = await fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount }), // Pass amount here
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.log(result.error.message);
      setLoading(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        alert("Payment successful!");
        // Redirect to confirmation page or handle success action
      }
    }
  };

  return (
    <div>
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button disabled={!stripe} type="submit" className="book-appointment-button">
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

const PaymentForm = ({ doctorId, amount }) => (
  <Elements stripe={stripePromise}>
    <PaymentButton doctorId={doctorId} amount={amount} />
  </Elements>
);

export default PaymentForm;
