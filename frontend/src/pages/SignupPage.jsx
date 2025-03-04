import React, { useState } from 'react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'address', 'city', 'postalCode'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Ce champ est requis';
      }
    });
    
    // Email format
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }
    
    // Password strength
    if (formData.password && formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    // Password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    // Postal code format (French postal code: 5 digits)
    if (formData.postalCode && !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide';
    }
    
    // Terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        window.location.href = '/compte'; // Redirect to account page
      }, 2000);
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="bg-amber-50 min-h-screen pt-20">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-amber-900">Compte créé avec succès</h2>
            <p className="mt-2 text-amber-700">Votre compte a été créé. Vous allez être redirigé vers votre espace client.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 min-h-screen py-12">
      {/* Navigation */}
      <header className="bg-amber-800 text-amber-100 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Conserverie du Terroir</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>Accueil</li>
              <li>Nos Produits</li>
              <li>Service Traiteur</li>
              <li>Notre Histoire</li>
              <li>Contact</li>
            </ul>
          </nav>
          <div>
            <button className="bg-amber-600 px-4 py-2 rounded">Connexion</button>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-amber-900">Créer un compte</h2>
            <p className="mt-2 text-sm text-amber-700">
              Déjà inscrit? {' '}
              <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                Connectez-vous
              </a>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-amber-900">Informations personnelles</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-amber-700">
                    Prénom
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.firstName ? 'border-red-300' : ''}`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-amber-700">
                    Nom
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.lastName ? 'border-red-300' : ''}`}
                    />
                    {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.email ? 'border-red-300' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-amber-700">
                    Téléphone (optionnel)
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-amber-700">
                    Mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.password ? 'border-red-300' : ''}`}
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-700">
                    Confirmer le mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.confirmPassword ? 'border-red-300' : ''}`}
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="pt-6 border-t border-amber-200">
              <h3 className="text-lg font-medium text-amber-900">Adresse de livraison</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="address" className="block text-sm font-medium text-amber-700">
                    Adresse
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.address ? 'border-red-300' : ''}`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium text-amber-700">
                    Ville
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.city ? 'border-red-300' : ''}`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="postalCode" className="block text-sm font-medium text-amber-700">
                    Code postal
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="postalCode"
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md ${errors.postalCode ? 'border-red-300' : ''}`}
                    />
                    {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-amber-700">
                    Pays
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-amber-300 rounded-md"
                      defaultValue="France"
                    >
                      <option>France</option>
                      <option>Belgique</option>
                      <option>Suisse</option>
                      <option>Luxembourg</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and conditions */}
            <div className="pt-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className={`focus:ring-amber-500 h-4 w-4 text-amber-600 border-amber-300 rounded ${errors.acceptTerms ? 'border-red-300' : ''}`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="font-medium text-amber-700">
                    J'accepte les conditions d'utilisation et la politique de confidentialité
                  </label>
                  {errors.acceptTerms && <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>}
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création en cours...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;