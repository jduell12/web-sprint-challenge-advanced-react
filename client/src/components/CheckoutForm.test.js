import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>);
    const header = screen.getByText(/checkout form/i);
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", () => {
    render(<CheckoutForm/>)

    //type into all input fields
    const firstName = screen.getByLabelText(/first/i);
    const lastName = screen.getByLabelText(/last/i);
    const address = screen.getByLabelText(/address/i);
    const city = screen.getByLabelText(/city/i);
    const state = screen.getByLabelText(/state/i);
    const zip = screen.getByLabelText(/zip/i);

    //change text in input fields
    fireEvent.change(firstName, {target: {value: 'Aroura'}});
    fireEvent.change(lastName, {target: {value: 'Nightingale'}});
    fireEvent.change(address, {target: {value: '1234 Street'}});
    fireEvent.change(city, {target: {value: 'Apex'}});
    fireEvent.change(state, {target: {value: 'North Carolina'}});
    fireEvent.change(zip, {target: {value: 27539}});

    //click checkout button 
    const checkoutBtn = screen.getByLabelText(/checkout/i);
    fireEvent.click(checkoutBtn);

    //assert that the checkout button worked 
    const newFirstName = screen.getByText(/aroura/i);
    expect(newFirstName).toBeInTheDocument();

    const newLastName = screen.getByText(/nightingale/i);
    expect(newLastName).toBeInTheDocument();

    const newAddress = screen.getByText(/1234 street/i);
    expect(newAddress).toBeInTheDocument();

    const newCity = screen.getByText(/apex/i);
    expect(newCity).toBeInTheDocument();

    const newState = screen.getByText(/north carolina/i);
    expect(newState).toBeInTheDocument();

    const newZip = screen.getByText(/27539/);
    expect(newZip).toBeInTheDocument();

    const successMessage = screen.getByText(/you have ordered some plants! woo-hoo!/i);
    expect(successMessage).toBeInTheDocument();

    const secondSuccessMessage = screen.getByText(/your new green friends will be shipped to/i);
    expect(secondSuccessMessage).toBeInTheDocument();
});
