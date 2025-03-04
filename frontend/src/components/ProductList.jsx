import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import Spinner from './Spinner';
import Message from './Message';

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const queryParams = category ? `?category=${category}` : '';
        const response = await axios.get(`/api/products${queryParams}`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des produits. Veuillez réessayer plus tard.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleFilterChange = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredProducts = activeFilters.length === 0
    ? products
    : products.filter(product => 
        activeFilters.some(filter => {
          if (filter === 'inStock') return product.stock > 0;
          // Ajoutez d'autres filtres selon vos besoins
          return false;
        })
      );

  const addToCart = async (productId) => {
    try {
      await axios.post('/api/cart', { productId, quantity: 1 });
      // Afficher message de confirmation, mettre à jour l'état global du panier, etc.
    } catch (err) {
      setError('Erreur lors de l\'ajout au panier');
    }
  };

  if (loading) return <Spinner />;
  
  if (error) return <Message variant="danger">{error}</Message>;

  if (filteredProducts.length === 0) {
    return <Message>Aucun produit trouvé</Message>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            activeFilters.includes('inStock') 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200'
          }`}
          onClick={() => handleFilterChange('inStock')}
        >
          En stock
        </button>
        {/* Ajoutez d'autres filtres ici */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <Link to={`/product/${product._id}`}>
              <img 
                src={product.images[0] || '/images/placeholder.jpg'} 
                alt={product.name}
                className="w-full h-48 object-cover" 
              />
            </Link>
            
            <div className="p-4">
              <Link to={`/product/${product._id}`}>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 hover:text-blue-600">{product.name}</h3>
              </Link>
              
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900">{product.price.toFixed(2)} €</span>
                
                <button
                  onClick={() => addToCart(product._id)}
                  disabled={product.stock <= 0}
                  className={`flex items-center px-3 py-2 rounded ${
                    product.stock > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaShoppingCart className="mr-2" />
                  {product.stock > 0 ? 'Ajouter' : 'Épuisé'}
                </button>
              </div>
              
              {product.stock <= 5 && product.stock > 0 && (
                <p className="text-sm text-orange-600 mt-2">Plus que {product.stock} en stock!</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;