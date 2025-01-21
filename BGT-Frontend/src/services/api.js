
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your API base URL



/**
 * Login with email and password.
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - API response data
 */
export const login = async (email, password) => {
const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({ email, password }),
});

if (!response.ok) {
throw new Error('Invalid login credentials');
}


return response.json();
};

/**
 * Login with Microsoft.
 * @returns {Promise<Object>} - API response data
 */
export const microsoftLogin = async () => {
const response = await fetch(`${API_BASE_URL}/api/auth/microsoft`);

if (!response.ok) {
throw new Error('Microsoft login failed');
}

return response.json();
};

/**
 * Login with Google.
 * @returns {Promise<Object>} - API response data
 */
export const googleLogin = async () => {
const response = await fetch(`${API_BASE_URL}/api/auth/google`);

if (!response.ok) {
throw new Error('Google login failed');
}

return response.json();
};
