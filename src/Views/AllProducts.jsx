import { useState, useMemo } from "react";
import { mockProducts } from "../Data/products";
import { ProductCard } from "../Components/product/ProductCard";
//import { ProductFilters } from "../Components/product/ProductFilters";
import { Button } from "../Components/ui/button";
import { Badge } from "../Components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/ui/select";
import { Grid, List, SortAsc, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { itemCount } = useCart();
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: 0,
    maxPrice: 3000,
    search: "",
    inStock: false,
  });

  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  // Extraer categorías únicas
  const categories = useMemo(() => {
    return Array.from(new Set(mockProducts.map(p => p.category))).sort();
  }, []);
console.log(categories)
  const brands = useMemo(() => {
    return Array.from(new Set(mockProducts.map(p => p.brand))).sort();
  }, []);

  const priceRange = useMemo(() => {
    const prices = mockProducts.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, []);
 console.log(useCart )
  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product) => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesSearch = !filters.search || 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
      const matchesStock = !filters.inStock || product.inStock;

      return matchesCategory && matchesBrand && matchesPrice && matchesSearch && matchesStock;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [filters, sortBy]);

  // Contador de filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.brand) count++;
    if (filters.search) count++;
    if (filters.inStock) count++;
    if (filters.minPrice !== priceRange.min || filters.maxPrice !== priceRange.max) count++;
    return count;
  }, [filters, priceRange]);

  return (
    <div className="min-h-screen bg-[#f0f8ff]">
      {/* Header */}
      <header className="bg-card shadow-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Catálogo de Productos
              </h1>
              <p className="text-muted-foreground mt-1">
                Descubre nuestra amplia selección de productos tecnológicos
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </span>
              <Link to="/cart">
                <Button variant="outline" className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Carrito
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-[1.5rem] h-6 flex items-center justify-center text-xs px-1">
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filtros 
        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            brands={brands}
            priceRange={priceRange}
            activeFiltersCount={activeFiltersCount}
          />
        </div>*/}

        {/* Ordenar y Vista */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Valorados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="transition-all duration-300"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="transition-all duration-300"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Productos */}
        {filteredProducts.length > 0 ? (
          <div 
            className={`grid gap-6 animate-fade-in ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1 max-w-4xl mx-auto"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-gradient-card rounded-lg p-8 shadow-card max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron productos
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar los filtros o buscar algo diferente
              </p>
              <Button 
                onClick={() => setFilters({
                  category: "",
                  brand: "",
                  minPrice: priceRange.min,
                  maxPrice: priceRange.max,
                  search: "",
                  inStock: false,
                })}
                className="bg-gradient-primary hover:opacity-90 transition-all duration-300"
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
