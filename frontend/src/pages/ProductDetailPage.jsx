import React from 'react';

const ProductDetailPage = () => {
  // Données du produit (simulées)
  const product = {
    id: 1,
    name: "Cassoulet Traditionnel",
    description: "Un plat savoureux à base de haricots blancs et de viandes confites. Le cassoulet est une spécialité régionale du Languedoc, particulièrement associée à la ville de Castelnaudary.",
    longDescription: "Le cassoulet traditionnel est préparé avec des haricots blancs lingots, mijotés lentement avec des morceaux de confit de canard, de poitrine de porc et de saucisses de Toulouse. Notre recette respecte la tradition tout en apportant une touche personnelle grâce à nos herbes aromatiques cultivées localement. Chaque conserve est préparée à la main dans notre atelier, pour garantir une qualité artisanale exceptionnelle.",
    price: 12.90,
    category: "conserve",
    stock: 15,
    weight: "750g",
    ingredients: "Haricots blancs lingots, confit de canard, poitrine de porc, saucisse de Toulouse, oignon, ail, bouquet garni, sel, poivre",
    allergens: "Peut contenir des traces de céleri",
    conservation: "3 ans à température ambiante. Après ouverture, à conserver au réfrigérateur et à consommer sous 3 jours.",
    nutritionalInfo: {
      calories: 350,
      protein: 22,
      carbs: 30,
      fat: 18
    },
    relatedProducts: [
      { id: 2, name: 'Rillettes de Canard', price: 8.50 },
      { id: 3, name: 'Terrine de Campagne', price: 9.90 }
    ]
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      {/* Navigation */}
      <header className="bg-amber-800 text-amber-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Conserverie du Terroir</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>Accueil</li>
              <li className="border-b-2 border-amber-300">Nos Produits</li>
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

      {/* Fil d'Ariane */}
      <div className="bg-amber-100 py-2">
        <div className="container mx-auto px-4">
          <ul className="flex text-amber-800 text-sm">
            <li className="after:content-['>'] after:mx-2">Accueil</li>
            <li className="after:content-['>'] after:mx-2">Catalogue</li>
            <li className="after:content-['>'] after:mx-2">Conserves</li>
            <li className="font-medium">{product.name}</li>
          </ul>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Images du produit */}
            <div className="md:w-1/2 p-4">
              <div className="bg-amber-100 rounded-lg h-96 mb-4 flex items-center justify-center">
                <img src="/api/placeholder/500/500" alt={product.name} className="max-h-full rounded-lg" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-24 bg-amber-100 rounded-lg flex items-center justify-center cursor-pointer">
                  <img src="/api/placeholder/100/100" alt={`${product.name} - vue 1`} className="max-h-full rounded-lg" />
                </div>
                <div className="h-24 bg-amber-100 rounded-lg flex items-center justify-center cursor-pointer">
                  <img src="/api/placeholder/100/100" alt={`${product.name} - vue 2`} className="max-h-full rounded-lg" />
                </div>
                <div className="h-24 bg-amber-100 rounded-lg flex items-center justify-center cursor-pointer">
                  <img src="/api/placeholder/100/100" alt={`${product.name} - vue 3`} className="max-h-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* Informations produit */}
            <div className="md:w-1/2 p-6">
              <div className="border-b border-amber-200 pb-4 mb-4">
                <h1 className="text-3xl font-bold text-amber-900 mb-2">{product.name}</h1>
                <p className="text-amber-700 mb-4">{product.description}</p>
                
                <div className="flex items-center">
                  <div className="mr-4">
                    <span className="text-2xl font-bold text-amber-900">{product.price.toFixed(2)} €</span>
                  </div>
                  <div className="bg-amber-100 px-3 py-1 rounded-full">
                    <span className="text-amber-800 font-medium">En stock : {product.stock} unités</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-amber-700 mb-1">Quantité</label>
                    <select id="quantity" className="border border-amber-300 rounded-md bg-white py-2 px-3 text-amber-900">
                      {[...Array(10)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 rounded-md font-medium transition duration-200">
                      Ajouter au panier
                    </button>
                  </div>
                </div>

                <div className="text-amber-700 text-sm flex space-x-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    Paiement sécurisé
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    Livraison soignée
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Satisfait ou remboursé
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations détaillées */}
          <div className="px-6 py-8 border-t border-amber-200">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">Description</h2>
              <p className="text-amber-700">{product.longDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-4">Informations</h2>
                <table className="w-full text-amber-700">
                  <tbody>
                    <tr className="border-b border-amber-100">
                      <th className="text-left py-2 pr-4">Poids</th>
                      <td>{product.weight}</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <th className="text-left py-2 pr-4">Ingrédients</th>
                      <td>{product.ingredients}</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <th className="text-left py-2 pr-4">Allergènes</th>
                      <td>{product.allergens}</td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 pr-4">Conservation</th>
                      <td>{product.conservation}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-4">Valeurs nutritionnelles</h2>
                <table className="w-full text-amber-700">
                  <tbody>
                    <tr className="border-b border-amber-100">
                      <th className="text-left py-2 pr-4">Calories</th>
                      <td>{product.nutritionalInfo.calories} kcal</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <th className="text-left py-2 pr-4">Protéines</th>
                      <td>{product.nutritionalInfo.protein} g</td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <th className="text-left py-2 pr-4">Glucides</th>
                      <td>{product.nutritionalInfo.carbs} g</td>
                    </tr>
                    <tr>
                      <th className="text-left py-2 pr-4">Lipides</th>
                      <td>{product.nutritionalInfo.fat} g</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Produits associés */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">Produits associés</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-amber-100 flex items-center justify-center">
                  <img src="/api/placeholder/300/200" alt={relatedProduct.name} className="max-h-full" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-amber-900">{relatedProduct.name}</h3>
                  <div className="flex justify-between items-center mt-3">
                    <span className="font-bold text-amber-900">{relatedProduct.price.toFixed(2)} €</span>
                    <button className="bg-amber-600 text-white px-3 py-1 rounded-md hover:bg-amber-700 transition duration-200">
                      Voir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-800 text-amber-100 py-8 mt-12">
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

export default ProductDetailPage;