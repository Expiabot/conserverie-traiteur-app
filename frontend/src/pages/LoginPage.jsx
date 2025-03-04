import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call to verify credentials
      if (email === 'client@example.com' && password === 'password123') {
        // Success - redirect to account page
        console.log('Login successful');
        window.location.href = '/compte';
      } else {
        // Failed login
        setError('Email ou mot de passe incorrect');
        setIsSubmitting(false);
      }
    }, 1000);
  };

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

      <div className="max-w-md mx-auto mt-20 px-4 sm:px-6 lg:px-8">
        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-amber-900">Connexion</h2>
            <p className="mt-2 text-sm text-amber-700">
              Pas encore de compte? {' '}
              <a href="/signup" className="font-medium text-amber-600 hover:text-amber-500">
                Créer un compte
              </a>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-700">
                Adresse email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-amber-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="votre.email@exemple.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-700">
                Mot de passe
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-amber-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-700">
                  Se souvenir de moi
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                  Mot de passe oublié?
                </a>
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
                    Connexion en cours...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-amber-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-amber-600">Ou continuer avec</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-amber-300 rounded-md shadow-sm bg-white text-sm font-medium text-amber-600 hover:bg-amber-50"
                >
                  <span>Google</span>
                </a>
              </div>
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-2 px-4 border border-amber-300 rounded-md shadow-sm bg-white text-sm font-medium text-amber-600 hover:bg-amber-50"
                >
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-amber-600">
          <p>
            Pour les démonstrations, utilisez :<br />
            Email: client@example.com<br />
            Mot de passe: password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;