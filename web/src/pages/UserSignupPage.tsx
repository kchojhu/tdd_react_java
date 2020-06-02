import React, {useState} from 'react';
import Input from "../components/Input";

export interface UserSignUpForm {
    displayName: string;
    userName: string;
    password: string;
    repeatPassword: string;
}

export interface UserSignupAction {
    postSignup(user: UserSignUpForm): Promise<any>;
}

export interface UserSignupProps {
    actions?: UserSignupAction
}

export interface FieldErrors {
    [name: string]: string;
}

export interface ApiError {
    data: {
        validationErrors: FieldErrors;
    };
}

const UserSignupPage: React.FC<UserSignupProps> = ({actions}) => {
    const [state, setState] = useState<UserSignUpForm>({
        displayName: '',
        userName: '',
        password: '',
        repeatPassword: ''
    });

    const [pendingApiCall, setPendingApiCall] = useState<boolean>(false);

    const [errors, setErrors] = useState<FieldErrors>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {target: {name, value}} = event;
        setState((prevState: UserSignUpForm) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    };

    const onSignup = () => {
        setPendingApiCall(true);
        actions?.postSignup(state).then((response: any) => {
            setPendingApiCall(false);
        }).catch((apiError) => {
            if (apiError.response?.data?.validationErrors) {
                const validationErrors: FieldErrors = apiError.response.data.validationErrors;
                setErrors({...validationErrors});
            }
            setPendingApiCall(false);
        });
    }

    return (
        <div className='container'>
            <h1 className='text-center'>Sign Up</h1>
            <div className='col-12 mb-3'>
                <Input label='Display Name' placeholder='Your display name' name='displayName'
                       value={state.displayName} hasError={Boolean(errors.displayName)}
                       onChange={handleChange} error={errors.displayName} />
            </div>
            <div>
                <Input label='User Name' placeholder='Your user name' name='userName' value={state.userName}
                       onChange={handleChange} hasError={Boolean(errors.username)} error={errors.username}/>
            </div>
            <div>
                <Input label='Password' placeholder='Your password' name='password' type="password"
                       value={state.password} onChange={handleChange} hasError={Boolean(errors.password)} error={errors.password}/>
            </div>
            <div>
                <Input label='Repeat Password' placeholder='Repeat your password' name='repeatPassword' type="password"
                       value={state.repeatPassword} onChange={handleChange} hasError={Boolean(errors.repeatPassword)} error={errors.repeatPassword}/>
            </div>
            <div className='text-center'>
                {pendingApiCall && (
                    <div>Loading...</div>
                )}
                <button className='btn btn-primary' onClick={onSignup} disabled={pendingApiCall || state.password !== state.repeatPassword}>Sign Up</button>
            </div>
        </div>
    );
};

export default UserSignupPage;