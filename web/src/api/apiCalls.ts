import axios from 'axios';
import {UserSignUpForm} from "../pages/UserSignupPage";

export const signup = (user: UserSignUpForm): Promise<any> => {
    return axios.post('/api/1.0/users', user);
};