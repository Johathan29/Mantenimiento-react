// Estructura de un producto
/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number} [originalPrice]
 * @property {string} image
 * @property {string} category
 * @property {string} brand
 * @property {number} rating
 * @property {number} reviews
 * @property {boolean} inStock
 * @property {string[]} tags
 */

// Estructura de filtros
/**
 * @typedef {Object} ProductFilters
 * @property {string} category
 * @property {string} brand
 * @property {number} minPrice
 * @property {number} maxPrice
 * @property {string} search
 * @property {boolean} inStock
 */

// 👉 Ejemplo de un producto
export const sampleProduct = {
  id: "1",
  name: "Laptop Gamer",
  description: "Laptop con procesador i7 y 16GB RAM",
  price: 1200,
  originalPrice: 1500,
  image: "/images/laptop.png",
  category: "Computadoras",
  brand: "Acer",
  rating: 4.5,
  reviews: 120,
  inStock: true,
  tags: ["gaming", "laptop", "16GB"],
};

// 👉 Ejemplo de filtros iniciales
export const defaultFilters = {
  category: "",
  brand: "",
  minPrice: 0,
  maxPrice: 3000,
  search: "",
  inStock: false,
};
