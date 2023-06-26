import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Enzyme from "enzyme";
import Adapter from '@cfaester/enzyme-adapter-react-18';
import App from "./App"
Enzyme.configure({ adapter: new Adapter() });

test("#Question 1: Phone formatting tests", async () => {
    render(<App/>);
    const inputElement = screen.getByRole('textbox');

    await userEvent.type(inputElement, "123")
    expect(inputElement).toHaveValue("123")

    await userEvent.type(inputElement, "4")
    expect(inputElement).toHaveValue("(123) 4")

    await userEvent.type(inputElement, "56")
    expect(inputElement).toHaveValue("(123) 456")

    await userEvent.type(inputElement, "7890")
    expect(inputElement).toHaveValue("(123) 456-7890")
})

test("#Question 2: Backspace Tests", async () => {
    render(<App/>);
    const inputElement = screen.getByRole('textbox');

    await userEvent.type(inputElement, "1234")
    expect(inputElement).toHaveValue("(123) 4")
    
    await userEvent.type(inputElement, "{arrowleft}{arrowleft}{arrowleft}{backspace}2")
    expect(inputElement).toHaveValue("(122) 4")
    
    await userEvent.type(inputElement, "{arrowleft}{arrowleft}{backspace}5")
    expect(inputElement).toHaveValue("(122) 54")

    await userEvent.type(inputElement, "67")
    expect(inputElement).toHaveValue("(122) 546-7")

    await userEvent.type(inputElement, "{arrowleft}{backspace}8")
    expect(inputElement).toHaveValue("(122) 546-87")

    await userEvent.type(inputElement, "{arrowleft}{arrowleft}{backspace}{backspace}1")
    expect(inputElement).toHaveValue("(122) 541-87")
})
