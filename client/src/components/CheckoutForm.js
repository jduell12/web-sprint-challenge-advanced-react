import React, { useState } from "react";
import {useForm} from '../hooks/useForm'

const initialValues = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

// This form should be handled by a "useForm" custom hook
// Build out the logic needed for a form custom hook (see the useForm.js file)
// and replace the necessary stateful logic from CheckoutForm with the hook

const CheckoutForm = (props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const useFormHook = useForm(initialValues);
  const [values, handleChanges] = useFormHook;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Checkout Form</h2>
        <label htmlFor="first">
          First Name:
          <input
            id="first"
            name="firstName"
            value={values.firstName}
            onChange={handleChanges}
          />
        </label>
        <label htmlFor="last">
          Last Name:
          <input
            id = "last"
            name="lastName"
            value={values.lastName}
            onChange={handleChanges}
          />
        </label>
        <label htmlFor="address">
          Address:
          <input
            id = "address"
            name="address"
            value={values.address}
            onChange={handleChanges}
          />
        </label>
        <label htmlFor="city">
          City:
          <input id = "city" name="city" value={values.city} onChange={handleChanges} />
        </label>
        <label htmlFor="state">
          State:
          <input name="state" id="state" value={values.state} onChange={handleChanges} />
        </label>
        <label htmlFor="zip">
          Zip:
          <input name="zip" id="zip" value={values.zip} onChange={handleChanges} />
        </label>
        <label htmlFor='checkout'>
          <button id='checkout'>Checkout</button>
        </label>
      </form>

      {showSuccessMessage && (
        <div className="success-message" data-testid="successMessage">
          <p>
            You have ordered some plants! Woo-hoo! <span role="img">🎉</span>
          </p>
          <p>Your new green friends will be shipped to:</p>
          <br />
          <br />
          <p>
            {values.firstName} {values.lastName}
          </p>
          <p>{values.address}</p>
          <p>
            {values.city}, {values.state} {values.zip}
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
