import { render, screen, fireEvent } from '@testing-library/react';
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";



function TestInput() {
    const [value, setValue] = useState("");
    const [input, setInput] = useState("");
    const handleSelect = (e) => {
        console.log(e);
        setValue(e);
    };
    return (
        <InputGroup className="mb-3" size="lg">
            <DropdownButton
                variant="outline-light"
                title={value || "Movies"}
                onSelect={handleSelect}
            >
                {["Movies", "Songs", "TV Shows"].map((option) => (
                    <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
                ))}
            </DropdownButton>
            <Form.Control
                placeholder={
                    !value
                        ? "Search your movies"
                        : "Search your " + value.toLowerCase()
                }
                aria-label="InputTest"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                    if (e.target.value.match(/^[A-Z 'a-z0-9 -:]*$/)) {
                        setInput(e.target.value);
                    }
                }}
                value={input}
            />
            <Button variant="outline-success" type="submit" id="button-addon2">
                Search
            </Button>
        </InputGroup>);
}
test('renders learn react link', () => {

    render(<TestInput />);

    const inputNode = screen.getByLabelText('InputTest')
    expect(inputNode.value).toBe('')
    fireEvent.change(inputNode, { target: { value: '123' } })
    expect(inputNode.value).toBe('123')

});