import api from "../config/api";

async function verifyEmail(email) {
    const response = await api.post('/auth/verify-email', { email });
    return response
}

async function register(params) {
    const response = await api.post('/auth/register', params);
    return response
}

async function login(params) {
    const response = await api.post('/users/login', params);
    return response
}

export default {
    verifyEmail,
    register,
    login
};
