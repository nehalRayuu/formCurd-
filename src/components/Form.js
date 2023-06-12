import React, { useState,useEffect } from 'react';

import Tables from './Tables';
import '../App.css'


const Form = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    state: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    city: '',
    state: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate first name
    if (formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
      valid = false;
    } else {
      newErrors.firstName = '';
    }

    // Validate last name
    if (formData.lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
      valid = false;
    } else {
      newErrors.lastName = '';
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Invalid phone number';
      valid = false;
    } else {
      newErrors.phoneNumber = '';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Invalid email';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Validate gender
    if (formData.gender.trim() === '') {
      newErrors.gender = 'Gender is required';
      valid = false;
    } else {
      newErrors.gender = '';
    }

    // Validate date of birth
    if (formData.dateOfBirth.trim() === '') {
      newErrors.dateOfBirth = 'Date of birth is required';
      valid = false;
    } else {
      newErrors.dateOfBirth = '';
    }

    // Validate city
    if (formData.city.trim() === '') {
      newErrors.city = 'City is required';
      valid = false;
    } else {
      newErrors.city = '';
    }

    // Validate state
    if (formData.state.trim() === '') {
      newErrors.state = 'State is required';
      valid = false;
    } else {
      newErrors.state = '';
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      handleFormSubmit(formData);

      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        city: '',
        state: '',
      });
    }
  };
 
 
 
  // Retrieve form submissions from LocalStorage 
  useEffect(() => {
    const storedSubmissions = localStorage.getItem('formSubmissions');
    // console.log('useEffect called')
    if (storedSubmissions) {
      setFormSubmissions(JSON.parse(storedSubmissions));

    }
    
  }, []);
 

  const handleFormSubmit = (formData) => {
    setFormSubmissions([...formSubmissions, formData]);
    //  console.log({formData})
  }

  
  



  return (
    <div className='container'>
    <div className='form-container'>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <br/>
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <br/>
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <br/>
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br/>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <br/>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
          <br/>

          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </div>

        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <br/>

          {errors.city && <span className="error">{errors.city}</span>}
        </div>

        <div>
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <br/>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        <br/>
        <button type="submit">Submit</button>
      </form>
      
    </div>
    <div>
    <Tables
        formSubmissions={formSubmissions}
        setFormSubmissions={setFormSubmissions}
       
        
      />
    </div>
    </div>
    
  );
};

export default Form;
