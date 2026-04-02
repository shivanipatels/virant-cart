import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CART_CONFIG } from "../utils/config";

function Signup() {
  const { APP_NAME, RADIUS } = CART_CONFIG; // Get app name and radius class from config for consistent styling

  const [formData, setFormData] = useState({
    // Form data state to hold user input
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});  // Errors state to hold validation messages for each field
  const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility

  useEffect(() => {   // Effect to check password match whenever password or confirmPassword changes
    if (formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));  // Clear error if passwords match
      }
    }
  }, [formData.password, formData.confirmPassword]);  // Dependency array ensures this runs whenever password or confirmPassword changes

  const validateField = (name, value) => {  // Validation logic for each field based on its name
    let errorMsg = "";
    const val = value.trim();  

    if (name === "fullName" && val.length < 3) {  
      errorMsg = "Name must be 3+ characters.";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) errorMsg = "Invalid email format.";
    } else if (name === "mobile") {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(val)) errorMsg = "Enter 10-digit number.";
    } else if (name === "password") {
      const strongRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongRegex.test(val)) {
        errorMsg = "Min 8 chars, must include A-Z, 1-9 & @$!";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg; // Return msg for submit validation
  };

  const handleChange = (e) => {    // Handle input changes and validate on the fly
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {  // Handle form submission with final validation before processing
    e.preventDefault();  

    // --- FINAL VALIDATION LOGIC ADDED ---  // This ensures all fields are validated again on submit, and prevents submission if there are errors
    const newErrors = {};  // Object to hold any new errors found during this validation step  
    let isFormValid = true;  // Flag to track overall form validity

  
    Object.keys(formData).forEach((key) => {   // Loop through each form field and validate it using the same validateField function
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isFormValid = false;
      }
    });

     if (formData.password !== formData.confirmPassword) {   // Final check to ensure passwords match before submission
      newErrors.confirmPassword = "Passwords do not match.";
      isFormValid = false;
    }

     if (!isFormValid) {   // If any validation errors are found, update the errors state and prevent form submission
      setErrors(newErrors);
      alert("Please fix the errors before registering.");
      return;
    }
    // ------------------------------------

    const finalData = {    // Prepare final data object to be sent to backend, trimming whitespace from text fields
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      mobile: formData.mobile.trim(),
      password: formData.password,
    };

    console.log("Clean Data for Backend:", finalData);
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-6 font-sans selection:bg-brand-primary">
      <div
        className={`w-full max-w-[450px] bg-white shadow-2xl ${RADIUS} overflow-hidden border border-slate-50 transition-all duration-500`}
      >
        <div className="bg-brand-dark p-10 text-center text-white">
          <h1 className="text-xl font-black tracking-[0.3em] uppercase italic">
            {APP_NAME}
            <span className="text-brand-primary">.</span>
          </h1>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 italic">
            Designed for Lucknow
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <h2 className="text-2xl font-black text-brand-dark uppercase tracking-tighter leading-none">
            Create <span className="text-slate-200 font-light">Account</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">  
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                className={`w-full border-b-2 pb-2 outline-none text-sm font-bold transition-all ${errors.fullName ? "border-rose-500" : "border-slate-100 focus:border-brand-primary"}`}
                onChange={handleChange}  
                placeholder="Enter Full Name"
                required
              />
              {errors.fullName && (
                <p className="text-[9px] text-rose-500 font-bold uppercase pl-1 animate-tighten">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                className={`w-full border-b-2 pb-2 outline-none text-sm font-bold transition-all ${errors.email ? "border-rose-500" : "border-slate-100 focus:border-brand-primary"}`}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
              {errors.email && (
                <p className="text-[9px] text-rose-500 font-bold uppercase pl-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Mobile
              </label>
              <div
                className={`flex items-center border-b-2 pb-2 ${errors.mobile ? "border-rose-500" : "border-slate-100 focus-within:border-brand-primary"}`}
              >
                <span className="text-xs font-bold text-slate-300 mr-2">
                  +91
                </span>
                <input
                  name="mobile"
                  maxLength="10"
                  value={formData.mobile}
                  className="w-full outline-none text-sm font-bold"
                  onChange={handleChange}
                  placeholder="00000 00000"
                  required
                />
              </div>
              {errors.mobile && (
                <p className="text-[9px] text-rose-500 font-bold uppercase pl-1">
                  {errors.mobile}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[9px] font-black text-brand-primary uppercase hover:underline"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                className={`w-full border-b-2 pb-2 outline-none text-sm font-bold tracking-[0.2em] ${errors.password ? "border-rose-500" : "border-slate-100 focus:border-brand-primary"}`}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              {errors.password && (
                <p className="text-[9px] text-rose-500 font-bold uppercase pl-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                className={`w-full border-b-2 pb-2 outline-none text-sm font-bold tracking-[0.2em] ${errors.confirmPassword ? "border-rose-500" : "border-slate-100 focus:border-brand-primary"}`}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              {errors.confirmPassword && (
                <p className="text-[9px] text-rose-500 font-bold uppercase pl-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-brand-dark text-white py-5 ${RADIUS} font-black text-[11px] uppercase tracking-[0.3em] hover:bg-brand-primary shadow-xl transition-all active:scale-[0.98]`}
            >
              Register
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center space-y-6">
            <div className="w-full flex items-center justify-center space-x-4">
              <div className="h-[1px] bg-slate-100 flex-1"></div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                Or Continue With
              </span>
              <div className="h-[1px] bg-slate-100 flex-1"></div>
            </div>

            <button className="flex items-center space-x-3 px-8 py-3 border border-slate-100 rounded-full hover:bg-slate-50 transition-all group">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-4 h-4 group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-black text-brand-dark uppercase tracking-widest">
                Google
              </span>
            </button>
          </div>

          <div className="text-center pt-6 border-t border-slate-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-primary font-black ml-1 border-b border-brand-primary pb-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
