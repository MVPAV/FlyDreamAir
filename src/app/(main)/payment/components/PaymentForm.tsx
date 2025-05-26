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
    <form onSubmit={handleSubmit}>
      <h2 className="text-black text-2xl mt-[27px] mb-[26px]">
        Payment Information
      </h2>

      <div className="mb-4">
        <label htmlFor="cardNumber" className="text-black block mb-[13px]">
          Card Number
        </label>
        <input
          id="cardNumber"
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="Enter card number"
          maxLength={19}
          className="border w-[833px] max-w-full text-black px-[31px] py-3.5 rounded-[10px] border-[rgba(0,0,0,0.2)] border-solid max-md:px-5"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cardholderName" className="text-black block mb-[13px]">
          Cardholder Name
        </label>
        <input
          id="cardholderName"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="border w-[833px] max-w-full h-[51px] px-[31px] py-3.5 rounded-[10px] border-[rgba(0,0,0,0.2)] border-solid max-md:px-5"
          required
        />
      </div>

      <div className="flex w-[636px] max-w-full items-stretch gap-[40px_100px] flex-wrap mb-4">
        <div className="flex flex-col items-stretch flex-1">
          <label htmlFor="expiryDate" className="text-black block mb-[13px]">
            Expiry Date
          </label>
          <input
            id="expiryDate"
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
            placeholder="MM/YY"
            maxLength={5}
            className="border text-black whitespace-nowrap px-[22px] py-3.5 rounded-[10px] border-[rgba(0,0,0,0.2)] border-solid max-md:px-5"
            required
          />
        </div>

        <div className="flex flex-col items-stretch whitespace-nowrap flex-1">
          <label htmlFor="cvv" className="text-black block mb-[13px]">
            CVV
          </label>
          <input
            id="cvv"
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            maxLength={3}
            className="border text-black px-[22px] py-3.5 rounded-[10px] border-[rgba(0,0,0,0.2)] border-solid max-md:px-5"
            required
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="billingAddress" className="text-black block mb-[13px]">
          Billing Address
        </label>
        <input
          id="billingAddress"
          type="text"
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          className="border w-[833px] max-w-full text-black px-[21px] py-3.5 rounded-[10px] border-[rgba(0,0,0,0.2)] border-solid max-md:px-5"
          required
        />
      </div>

      <div className="bg-[rgba(238,243,251,1)] border flex items-stretch gap-[7px] text-base text-black font-normal flex-wrap ml-2.5 mt-[39px] p-[13px] rounded-[10px] border-[rgba(0,0,0,0.1)] border-solid">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/c6873386ec4a4d6982ab9f318cb7a156/3d50ac038c359d242ba8916f5f75acd35a71dccc?placeholderIfAbsent=true"
          alt="Secure"
          className="aspect-[1] object-contain w-[25px] shrink-0"
        />
        <div className="basis-auto grow shrink max-md:max-w-full">
          Secure payment processing
          <br />
          Your payment information is encrypted and secure.
        </div>
      </div>

      <button
        type="submit"
        className="bg-[rgba(5,12,156,1)] block mx-auto w-[396px] max-w-full text-2xl text-white text-center mt-[58px] px-[70px] py-[19px] rounded-[10px] border-[rgba(0,0,0,0.2)] border-r border-l max-md:mt-10 max-md:px-5"
      >
        Complete Payment
      </button>
    </form>
  );
};

export default PaymentForm;
