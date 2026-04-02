import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CART_CONFIG } from '../utils/config';

function Login() {
  const { APP_NAME, RADIUS } = CART_CONFIG;

  const [formData, setFormData] = useState({
    identifier: '', 
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
  const [errors, setErrors] = useState({});  // State to store validation error messages for form fields


  const validateField = (name, value) => {  // Validation logic for each form field based on its name 
    let errorMsg = '';     
    const cleanValue = value.trim(); 
    
    if (name === 'identifier') {
      const mobileRegex = /^[0-9]{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (cleanValue === '') {
        errorMsg = "Email or Mobile is required.";
      } else if (!emailRegex.test(cleanValue) && !mobileRegex.test(cleanValue)) {
        errorMsg = "Enter a valid email or 10-digit mobile.";
      }
    } else if (name === 'password') {
      if (value.length < 1) errorMsg = "Password cannot be empty.";
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
    return errorMsg; // Crucial for handleSubmit
  };

  const handleChange = (e) => {   // Handle input changes and perform real-time validation for each field
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value); 
  };

  const handleSubmit = (e) => {  // Final validation on form submission to ensure all fields are valid before processing the login attempt
    e.preventDefault();   //
     
    
    const identifierError = validateField('identifier', formData.identifier);
    const passwordError = validateField('password', formData.password);

  
    if (identifierError || passwordError || formData.identifier.trim() === '' || formData.password === '') {
        alert("Please provide valid login details.");
        return;
    }
    // ---------------------------------------------------

    const finalLoginPayload = {
      identifier: formData.identifier.trim(),
      password: formData.password
    };

    console.log("Sending Clean Data to Server:", finalLoginPayload);
    alert("Login Attempt Successful!"); 
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-6 font-sans selection:bg-brand-primary selection:text-white">
      
      <div className={`w-full max-w-[420px] bg-white shadow-2xl ${RADIUS} overflow-hidden border border-slate-50 transition-all duration-500`}>
        
        <div className="bg-brand-dark p-12 text-center">
          <h1 className="text-2xl font-black text-white tracking-[0.5em] uppercase italic">
            {APP_NAME}<span className="text-brand-primary">.</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3">
            Lucknow's Premium Fashion Store
          </p>
        </div>

        <div className="p-10 md:p-14 space-y-10">
          <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter">
            Sign <span className="text-slate-200 font-light">In</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email or Mobile Number</label>
              <input 
                name="identifier" 
                type="text"
                value={formData.identifier} // Added Controlled Input
                className={`w-full border-b-2 pb-2 outline-none text-sm font-bold transition-all ${errors.identifier ? 'border-rose-500' : 'border-slate-100 focus:border-brand-primary'}`}
                onChange={handleChange} 
                placeholder="name@email.com"
                required
              />
              {errors.identifier && <p className="text-[9px] text-rose-500 font-bold uppercase pl-1">{errors.identifier}</p>}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[9px] font-black text-brand-primary uppercase tracking-widest hover:underline">Forgot?</button>
              </div>
              <div className={`flex items-center border-b-2 pb-2 transition-all ${errors.password ? 'border-rose-500' : 'border-slate-100 focus-within:border-brand-primary'}`}>
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  value={formData.password} 
                  className="w-full outline-none text-sm font-bold tracking-[0.2em] placeholder:tracking-normal"
                  onChange={handleChange} 
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] font-black text-brand-primary uppercase tracking-widest px-2"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="text-[9px] text-rose-500 font-bold uppercase pl-1">{errors.password}</p>}
            </div>

            <button type="submit" className={`w-full bg-brand-dark text-white py-5 ${RADIUS} font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-primary shadow-xl active:scale-[0.98] transition-all duration-300`}>
              Login
            </button>
          </form>

          <div className="flex flex-col items-center space-y-6">
            <div className="w-full flex items-center justify-center space-x-4">
              <div className="h-[1px] bg-slate-100 flex-1"></div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Or</span>
              <div className="h-[1px] bg-slate-100 flex-1"></div>
            </div>
            
            <button className="flex items-center space-x-3 px-8 py-3 border border-slate-100 rounded-full hover:bg-slate-50 transition-all shadow-sm">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
              <span className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Login with Google</span>
            </button>
          </div>

          <div className="text-center pt-8 border-t border-slate-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Don't have an account? <br />
              <Link to="/signup" className="text-brand-primary font-black mt-2 inline-block hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;