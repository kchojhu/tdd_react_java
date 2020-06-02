import React from 'react';
import {render, fireEvent, RenderResult, waitForDomChange, waitForElement} from '@testing-library/react';
import UserSignupPage, {UserSignupAction, UserSignUpForm, UserSignupProps} from "./UserSignupPage";

export const createEvent = (value: string): { target: { value: string } } => {
    return {
        target: {
            value
        }
    }
};


describe('UserSignupPage', () => {
    describe('Layout', () => {
        it('has header of Sign Up', () => {
            const {container} = render(<UserSignupPage/>);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });

        it('has input for display name', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>);
            const displayName: HTMLElement | null = queryByPlaceholderText('Your display name');
            expect(displayName).toBeTruthy();
            if (displayName) {
                expect(displayName).toBeInTheDocument();
            }
        });

        it('has input for user name', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>);
            const userName: HTMLElement | null = queryByPlaceholderText('Your user name');
            expect(userName).toBeTruthy();
            if (userName) {
                expect(userName).toBeInTheDocument();
            }
        });

        it('has input for password', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>);
            const password: HTMLElement | null = queryByPlaceholderText('Your password');
            expect(password).toBeTruthy();
            if (password) {
                expect(password).toBeInTheDocument();
            }
        });

        it('has password type for password input', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>);
            const password: HTMLInputElement | null = queryByPlaceholderText('Your password') as HTMLInputElement;
            expect(password).toBeTruthy();
            if (password) {
                expect(password.type).toBe('password');
            }
        });

        it('has input for repeat password', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>);
            const password: HTMLElement | null = queryByPlaceholderText('Repeat your password');
            expect(password).toBeTruthy();
            if (password) {
                expect(password).toBeInTheDocument();
            }
        });

        it('has password type for repeat password input', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>);
            const password: HTMLInputElement | null = queryByPlaceholderText('Repeat your password') as HTMLInputElement;
            expect(password).toBeTruthy();
            if (password) {
                expect(password.type).toBe('password');
            }
        });

        it('has submit button', () => {
            const {container} = render(<UserSignupPage/>);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });

    });

    describe('Interactions', () => {
        let button: HTMLButtonElement | null;
        let userName: HTMLInputElement | null;
        let displayName: HTMLInputElement | null;
        let password: HTMLInputElement | null;
        let repeatPassword: HTMLInputElement | null;

        const setupForSubmit = (props: UserSignupProps): RenderResult => {
            const rendered = render(<UserSignupPage {...props}/>);

            const {container, queryByPlaceholderText} = rendered;

            displayName = queryByPlaceholderText('Your display name') as HTMLInputElement;
            userName = queryByPlaceholderText('Your user name') as HTMLInputElement;
            repeatPassword = queryByPlaceholderText('Repeat your password') as HTMLInputElement;
            password = queryByPlaceholderText('Your password') as HTMLInputElement;

            fireEvent.change(displayName, createEvent('my-display-name'));
            fireEvent.change(userName, createEvent('my-user-name'));
            fireEvent.change(repeatPassword, createEvent('my-repeat-password'));
            fireEvent.change(password, createEvent('my-password'));

            button = container.querySelector('button') as HTMLButtonElement;

            return rendered;
        }

        it('sets the display name into the state ', () => {
            const {queryByPlaceholderText} = render(<UserSignupPage/>);
            const displayName: HTMLElement | null = queryByPlaceholderText('Your display name');
            const changeEvent = createEvent('my-display-name');
            if (displayName) {
                fireEvent.change(displayName, changeEvent);
            }

            expect(displayName).toHaveValue('my-display-name');
        });

        it('sign up', async () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}),
            };

            setupForSubmit({actions});
            if (button) {
                fireEvent.click(button);
                await waitForDomChange();
            }

            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });

        it('calls post when fields are valid', async () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({}),
            };

            setupForSubmit({actions});
            if (button) {
                fireEvent.click(button);
                await waitForDomChange();
            }

            const expectedUserObject = {
                displayName: 'my-display-name',
                userName: 'my-user-name',
                password: 'my-password',
                repeatPassword: 'my-repeat-password',
            };

            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });

        const mockAsyncDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise<UserSignUpForm>((resolve, reject) => {
                    setTimeout(() => {
                        resolve({
                            displayName: '',
                            password: '',
                            repeatPassword: '',
                            userName: '',
                        })
                    }, 300);
                });
            })
        }
        const mockAsyncFailDelayed = () => {
            return jest.fn().mockImplementation(() => {
                return new Promise<UserSignUpForm>((resolve, reject) => {
                    setTimeout(() => {
                        reject({
                            response: {
                                data: {}
                            }
                        })
                    }, 300);
                });
            })
        }

        it('does not allow to press sign up button while it is processing', () => {
            const actions = {
                postSignup: mockAsyncDelayed(),
            };

            setupForSubmit({actions});
            if (button) {
                fireEvent.click(button);
                fireEvent.click(button);
            }

            expect(actions.postSignup).toHaveBeenCalledTimes(1);

        });

        it('display spinner while loading', () => {
            const actions = {
                postSignup: mockAsyncDelayed(),
            };

            const {queryByText} = setupForSubmit({actions});
            if (button) {
                fireEvent.click(button);
            }

            const spinner = queryByText('Loading...');

            expect(spinner).toBeInTheDocument();

        });

        it('hide display spinner after loading', async () => {
            const actions = {
                postSignup: mockAsyncDelayed(),
            };

            const {queryByText} = setupForSubmit({actions});
            if (button) {
                fireEvent.click(button);
                await waitForDomChange();
            }

            const spinner = queryByText('Loading...');

            expect(spinner).not.toBeInTheDocument();

        });

        it('hide display spinner after api call fails', async () => {
            const actions = {
                postSignup: mockAsyncFailDelayed(),
            };

            const {queryByText} = setupForSubmit({actions});
            if (button) {
                fireEvent.click(button);
                await waitForDomChange();
            }

            const spinner = queryByText('Loading...');

            expect(spinner).not.toBeInTheDocument();

        });

        xit('displays input field error', async () => {
            const actions: UserSignupAction = {
                postSignup: jest.fn().mockRejectedValue(({
                    data: {
                        validationErrors: {
                            displayName: 'Cannot be null'
                        }
                    }
                }))
            }

            const {queryByText} = setupForSubmit({actions});
            userName = null;

            if (button) {
                fireEvent.click(button);
            }

            const errorMessage = await waitForElement(() => queryByText('Cannot be null'));
            expect(errorMessage).toBeInTheDocument();

        });

        it('validates password field', () => {
            const actions = {
                postSignup: mockAsyncFailDelayed(),
            };
            setupForSubmit({actions});
            if (repeatPassword) {
                fireEvent.change(repeatPassword, createEvent('different password'));
            }
            expect(button).toBeDisabled();
        });

    });
});

console.error = () => {
};