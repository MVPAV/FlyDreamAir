import React, { useState } from "react";

interface PaymentFormProps {
  onSubmit: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("123");
  const [billingAddress, setBillingAddress] = useState("123 Keira St, Wollongong, 2500");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  return (
      <form onSubmit={handleSubmit} className="px-4 sm:px-6 md:px-8 lg:px-0 max-w-[900px] mx-auto">
        <h2 className="text-black text-lg font-semibold mt-8 mb-6 text-center">
          Payment Information
        </h2>

        {/* Card Number */}
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-black text-sm mb-2">Card Number</label>
          <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="Enter card number"
              maxLength={19}
              className="w-full border text-black text-sm px-4 py-2.5 rounded-md border-black/20"
              required
          />
        </div>

        {/* Cardholder Name */}
        <div className="mb-4">
          <label htmlFor="cardholderName" className="block text-black text-sm mb-2">Cardholder Name</label>
          <input
              id="cardholderName"
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="w-full border text-black text-sm px-4 py-2.5 rounded-md border-black/20"
              required
          />
        </div>

        {/* Expiry Date and CVV */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-x-8 mb-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-black text-sm mb-2">Expiry Date</label>
            <input
                id="expiryDate"
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className="w-full border text-black text-sm px-4 py-2.5 rounded-md border-black/20"
                required
            />
          </div>

          <div className="flex-1">
            <label htmlFor="cvv" className="block text-black text-sm mb-2">CVV</label>
            <input
                id="cvv"
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                maxLength={3}
                className="w-full border text-black text-sm px-4 py-2.5 rounded-md border-black/20"
                required
            />
          </div>
        </div>

        {/* Billing Address */}
        <div className="mb-4">
          <label htmlFor="billingAddress" className="block text-black text-sm mb-2">Billing Address</label>
          <input
              id="billingAddress"
              type="text"
              value={billingAddress}
              onChange={(e) => setBillingAddress(e.target.value)}
              className="w-full border text-black text-sm px-4 py-2.5 rounded-md border-black/20"
              required
          />
        </div>

        {/* Secure Notice */}
        <div className="flex items-start gap-3 bg-[#eef3fb] border border-black/10 p-3 rounded-md mt-6 text-sm text-black">
          <img
              src="https://cdn.builder.io/api/v1/image/assets/c6873386ec4a4d6982ab9f318cb7a156/3d50ac038c359d242ba8916f5f75acd35a71dccc?placeholderIfAbsent=true"
              alt="Secure"
              className="w-5 h-5"
          />
          <div>
            <p className="font-medium">Secure payment processing</p>
            <p>Your payment information is encrypted and secure.</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            className="bg-blue-900 text-white text-base font-medium text-center w-full max-w-[360px] mt-8 mx-auto px-6 py-3 rounded-md block"
        >
          Complete Payment
        </button>
      </form>
  );
};

export default PaymentForm;
