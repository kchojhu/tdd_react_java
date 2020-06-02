import * as React from 'react';

interface InputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    hasError?: boolean;
    error?: string;
    name?: string;

    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Input: React.FC<InputProps> = ({name = '', label, type = 'text', placeholder = '', value = '', onChange, hasError = false, error}) => {
    const inputClassName = `form-control ${hasError ? 'is-invalid' : 'is-valid'}`
    return (
        <div>
            {label && (<label>{label}</label>)}
            <input name={name} type={type} className={inputClassName} placeholder={placeholder} value={value} onChange={onChange}/>
            {error && (<span className='invalid-feedback'>{error}</span>)}
        </div>
    );
};

export default Input;