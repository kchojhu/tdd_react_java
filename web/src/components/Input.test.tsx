import React from 'react';
import {render, fireEvent, RenderResult, waitForDomChange, waitForElement} from '@testing-library/react';
import Input from './Input';
import {createEvent} from "../pages/UserSignupPage.test";

describe('Input Component', () => {
    describe('Layout', () => {
        it('has Input', () => {
            const {container} = render(<Input/>);
            const input = container.querySelector('input');
            expect(input).toBeInTheDocument();
        });

        it('displays the label provided by props', () => {
            const {queryByText} = render(<Input label='Test label'/>);
            const label = queryByText('Test label');
            expect(label).toBeInTheDocument();
        });

        it('does not displays the label provided by props', () => {
            const {queryByText} = render(<Input />);
            const label = queryByText('Test label');
            expect(label).not.toBeInTheDocument();
        });

        it('has input type password', () => {
            const {container} = render(<Input type='password'/>);
            const input: HTMLInputElement = container.querySelector('input') as HTMLInputElement;
            expect(input.type).toBe("password");
        });

        it('has value', () => {
            const {container} = render(<Input value='test-value'/>);
            const input: HTMLInputElement = container.querySelector('input') as HTMLInputElement;
            expect(input.value).toBe("test-value");
        });

        it('has onChange callback', () => {
            const onChange = jest.fn();
            const {container} = render(<Input onChange={onChange}/>);
            const input: HTMLInputElement = container.querySelector('input') as HTMLInputElement;
            fireEvent.change(input, createEvent('new-input'));
            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('has success style when hasError property is false', () => {
            const onChange = jest.fn();
            const {container} = render(<Input onChange={onChange}/>);
            const input: HTMLInputElement = container.querySelector('input') as HTMLInputElement;
            expect(input.className).toBe('form-control is-valid');
        });

        it('has fail style when hasError property is true', () => {
            const onChange = jest.fn();
            const {container} = render(<Input onChange={onChange} hasError={true}/>);
            const input: HTMLInputElement = container.querySelector('input') as HTMLInputElement;
            expect(input.className).toBe('form-control is-invalid');
        });

        it('displays error message', () => {
            const {queryByText} = render(<Input hasError={true} error='Cannot be null'/>);
            expect(queryByText('Cannot be null')).toBeInTheDocument();
        });

    });
});