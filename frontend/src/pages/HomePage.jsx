import React from 'react';

const WarmHomePage = () => {
  const products = [
    { name: 'Cassoulet Traditionnel', price: '12,90 €', description: 'Un plat savoureux à base de haricots blancs et de viandes confites' },
    { name: 'Rillettes de Canard', price: '8,50 €', description: 'Rillettes préparées avec du canard fermier et des épices fines' },
    { name: 'Terrine de Campagne', price: '9,90 €', description: 'Une terrine rustique, parfaite pour l\'apéritif' }
  ];

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Navigation */}
      <header className="bg-amber-800 text-amber-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Conserverie du Terroir</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li className="border-b-2 border-amber-300">Accueil</li>
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

      {/* Hero */}
      <section className="relative">
        <div className="bg-amber-700 py-20 text-center">
          <div className="absolute inset-0 opacity-30 bg-center bg-cover" style={{backgroundImage: "url('/api/placeholder/1200/400')"}}></div>
          <div className="relative container mx-auto px-4">
            <h2 className="text-4xl font-bold text-amber-100 mb-4">Saveurs authentiques de notre terroir</h2>
            <p className="text-xl text-amber-200 max-w-2xl mx-auto mb-8">
              Découvrez nos conserves artisanales et nos services traiteur pour vos événements.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-amber-100 text-amber-800 px-6 py-3 rounded-md font-medium">
                Découvrir nos produits
              </button>
              <button className="bg-amber-600 text-amber-100 px-6 py-3 rounded-md font-medium">
                Commander pour un événement
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Savoir-faire */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Notre savoir-faire</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Sélection rigoureuse</h3>
              <p className="text-amber-700">Nous sélectionnons les meilleurs produits locaux et de saison pour garantir une qualité exceptionnelle.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Préparation artisanale</h3>
              <p className="text-amber-700">Chaque plat est préparé à la main, avec le souci du détail et le respect des méthodes traditionnelles.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-amber-800 mb-2">Conservation naturelle</h3>
              <p className="text-amber-700">Nous utilisons des techniques de conservation qui préservent les saveurs sans additifs chimiques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Produits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Nos meilleures ventes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={index} className="bg-amber-50 rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-amber-200">
                  <img src="/api/placeholder/300/200" alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-amber-900 text-lg">{product.name}</h3>
                  <p className="text-amber-700 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-900">{product.price}</span>
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-md">
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">Ce que disent nos clients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-amber-700 mb-4">
                "Le cassoulet est extraordinaire, comme celui que faisait ma grand-mère. Je recommande vivement!"
              </p>
              <div className="font-bold text-amber-900">Pierre D.</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-amber-700 mb-4">
                "J'ai commandé pour l'anniversaire de mon mari. Tout était délicieux, les invités ont adoré."
              </p>
              <div className="font-bold text-amber-900">Marie L.</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="italic text-amber-700 mb-4">
                "Des produits authentiques qui me rappellent mon enfance dans le Sud-Ouest. Une vraie découverte!"
              </p>
              <div className="font-bold text-amber-900">Sophie T.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-800 text-amber-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Conserverie du Terroir</h3>
              <p>Des produits authentiques, préparés avec passion selon nos traditions familiales.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p>12 Rue des Saveurs, 31000 Toulouse</p>
              <p>contact@conserverie-terroir.fr</p>
              <p>05 61 23 45 67</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horaires</h3>
              <p>Lundi - Vendredi: 9h - 19h</p>
              <p>Samedi: 9h - 17h</p>
              <p>Dimanche: Fermé</p>
            </div>
          </div>
          <div className="border-t border-amber-700 mt-8 pt-8 text-center">
            <p>© 2025 Conserverie du Terroir. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WarmHomePage;