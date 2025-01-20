import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import logoImage from '../images/logo.png';
import { motion } from 'framer-motion'; // Import Framer Motion
import bgImage from '../images/Mac.jpg';


const LoginPage = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
const [error, setError] = useState('');
const [successMessage, setSuccessMessage] = useState('');
const [popMessage, setPopMessage] = useState('');
const navigate = useNavigate();

useEffect(() => {
document.title = 'BGT - Login';
}, []);

const validateForm = () => {
if (!email || !password) {
setPopMessage('Please fill in both email and password fields.');
setTimeout(() => setPopMessage(''), 3000);
return false;
}
setPopMessage('');
return true;
};

const handleLogin = async (e) => {
e.preventDefault();
if (!validateForm()) return;

try {
const data = await login(email, password);
setSuccessMessage('Login successful!');
setError('');
setTimeout(() => {
navigate('/dashboard');
}, 1500);
} catch (err) {
setError(err.message);
setSuccessMessage('');
}
};


return (
  
<div className="relative h-screen">
<div
className="absolute top-0 left-0 w-full h-full bg-cover bg-center zoom-animation"
style={{
backgroundImage: `linear-gradient(to right, rgba(139, 139, 139, 0.30), rgba(33, 88, 255, 0.65)), url(${bgImage})`,
opacity: 0.3,
}}
></div>





<div className="flex items-center justify-center h-full">
<div
className="w-100 max-w-md bg-opacity-100 backdrop-blur-md rounded-lg p-8 shadow-lg"
style={{
background: 'linear-gradient(319deg, royalblue 0%, rgba(65, 105, 225, 0.7) 40%, rgba(0, 0, 128, 0.7) 100%)',
}}
>


<div className="flex flex-col items-center mt-4">
<img src={logoImage} alt="Logo" className="w-24 h-24 rounded-full mb-6" />
<h2 className="text-white text-3xl font-semibold mb-6">LOG IN</h2>
</div>


{error && <div className="text-red-400 text-lg text-center mb-4">{error}</div>}


{/* Animated Success Message */}
{successMessage && (
<motion.div
className=" top-0 text-green-300  text-center"
initial={{ opacity: 0, y: -50 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -50 }}
transition={{ duration: 0.8, ease: 'easeInOut' }}
>
<p className="text-xl font-semibold">{successMessage}</p>
</motion.div>
)}


{popMessage && (
<div
className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2"
style={{ zIndex: 9999, transition: 'opacity 0.5s ease-in-out' }}
>
{popMessage}

</div>
)}



<form className="space-y-6" onSubmit={handleLogin}>
<div className="relative input-container">
<i className="fas fa-envelope absolute left-3 top-4 text-white"></i>
<input
type="text"
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full pl-10 pr-4 py-3 rounded-lg bg-transparent border-b-2 border-gray-300 text-white text-base focus:outline-none focus:border-white placeholder-white"
/>
</div>



<div className="relative input-container">
<i className="fas fa-lock absolute left-3 top-4 text-white"></i>
<input
type={showPassword ? 'text' : 'password'}
placeholder="Password"
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full pl-10 pr-12 py-3 rounded-lg bg-transparent border-b-2 border-gray-300 text-white text-base focus:outline-none focus:border-white placeholder-white"
/>


<button
type="button"
onClick={() => setShowPassword(!showPassword)}
className="absolute right-1 top-4 text-white focus:outline-none"
>
<i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
</button>
</div>


<div className="flex items-center">
<input
type="checkbox"
id="remember"
className="form-checkbox h-4 w-4 text-purple-600"
/>


<label htmlFor="remember" className="ml-2 text-white text-ml">
Remember me
</label>
</div>

<div className="mt-4 flex space-x-4">
<button
type="submit"
className="w-full py-3 rounded-lg bg-white text-black font-semibold text-ml hover:bg-gray-200 transition duration-300 transform hover:scale-105 hover:shadow-xl"
>
Login
</button>
</div>
</form>

<div className="text-center mt-4">
<a href="#" className="text-white text-base hover:underline">
Forgot Password?
</a>
</div>
</div>
</div>
</div>


);
};

export default LoginPage;
