import axios from 'axios';
import * as apiCalls from './apiCalls';

describe('apiCalls', () => {
    describe('Sign Up', () => {
        it('calls /api/1.0/users', () => {
            const mockSignup = jest.fn();
            axios.post = mockSignup;
            apiCalls.signup({
                userName:'',
                repeatPassword: '',
                password: '',
                displayName: ''
            });

            const path = mockSignup.mock.calls[0][0];
            console.log(path);
            expect(path).toBe('/api/1.0/users');
        });
    });
});