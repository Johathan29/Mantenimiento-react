// import { ProductFilters as IProductFilters } from "../../types/product";
// import { Card } from "../ui/card";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { Badge } from "../ui/badge";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Slider } from "../ui/slider";
// import { Switch } from "../ui/switch";
// import { Search, Filter, X } from "lucide-react";
// import { useState, useEffect } from "react";

// interface ProductFiltersProps {
//   filters: IProductFilters;
//   onFiltersChange: (filters: IProductFilters) => void;
//   categories: string[];
//   brands: string[];
//   priceRange: { min: number; max: number };
//   activeFiltersCount: number;
// }

// export const ProductFilters = ({
//   filters,
//   onFiltersChange,
//   categories,
//   brands,
//   priceRange,
//   activeFiltersCount,
// }: ProductFiltersProps) => {
//   const [isFilterVisible, setIsFilterVisible] = useState(false);
//   const [priceValues, setPriceValues] = useState([filters.minPrice, filters.maxPrice]);

//   useEffect(() => {
//     setPriceValues([filters.minPrice, filters.maxPrice]);
//   }, [filters.minPrice, filters.maxPrice]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     onFiltersChange({ ...filters, search: e.target.value });
//   };

//   const handleCategoryChange = (category: string) => {
//     onFiltersChange({ ...filters, category: category === "all" ? "" : category });
//   };

//   const handleBrandChange = (brand: string) => {
//     onFiltersChange({ ...filters, brand: brand === "all" ? "" : brand });
//   };

//   const handlePriceChange = (values: number[]) => {
//     setPriceValues(values);
//     onFiltersChange({ ...filters, minPrice: values[0], maxPrice: values[1] });
//   };

//   const handleInStockChange = (checked: boolean) => {
//     onFiltersChange({ ...filters, inStock: checked });
//   };

//   const clearAllFilters = () => {
//     onFiltersChange({
//       category: "",
//       brand: "",
//       minPrice: priceRange.min,
//       maxPrice: priceRange.max,
//       search: "",
//       inStock: false,
//     });
//   };

//   const clearFilter = (filterType: string) => {
//     switch (filterType) {
//       case "category":
//         onFiltersChange({ ...filters, category: "" });
//         break;
//       case "brand":
//         onFiltersChange({ ...filters, brand: "" });
//         break;
//       case "search":
//         onFiltersChange({ ...filters, search: "" });
//         break;
//       case "inStock":
//         onFiltersChange({ ...filters, inStock: false });
//         break;
//       case "price":
//         onFiltersChange({ ...filters, minPrice: priceRange.min, maxPrice: priceRange.max });
//         break;
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Search and Filter Toggle */}
//       <div className="flex gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             placeholder="Buscar productos..."
//             value={filters.search}
//             onChange={handleSearchChange}
//             className="pl-10 bg-card border-border focus:ring-primary/20 transition-all duration-300"
//           />
//           {filters.search && (
//             <Button
//               size="icon"
//               variant="ghost"
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:bg-muted"
//               onClick={() => clearFilter("search")}
//             >
//               <X className="h-3 w-3" />
//             </Button>
//           )}
//         </div>
        
//         <Button
//           variant="outline"
//           onClick={() => setIsFilterVisible(!isFilterVisible)}
//           className="relative animate-filter-bounce bg-gradient-card hover:bg-accent transition-all duration-300"
//         >
//           <Filter className="mr-2 h-4 w-4" />
//           Filtros
//           {activeFiltersCount > 0 && (
//             <Badge className="ml-2 bg-primary text-primary-foreground animate-scale-in">
//               {activeFiltersCount}
//             </Badge>
//           )}
//         </Button>
//       </div>

//       {/* Active Filters */}
//       {activeFiltersCount > 0 && (
//         <div className="flex flex-wrap gap-2 animate-fade-in">
//           {filters.search && (
//             <Badge
//               variant="secondary"
//               className="bg-accent text-accent-foreground hover:bg-accent/80 cursor-pointer transition-all duration-300"
//               onClick={() => clearFilter("search")}
//             >
//               Búsqueda: "{filters.search}"
//               <X className="ml-1 h-3 w-3" />
//             </Badge>
//           )}
//           {filters.category && (
//             <Badge
//               variant="secondary"
//               className="bg-accent text-accent-foreground hover:bg-accent/80 cursor-pointer transition-all duration-300"
//               onClick={() => clearFilter("category")}
//             >
//               {filters.category}
//               <X className="ml-1 h-3 w-3" />
//             </Badge>
//           )}
//           {filters.brand && (
//             <Badge
//               variant="secondary"
//               className="bg-accent text-accent-foreground hover:bg-accent/80 cursor-pointer transition-all duration-300"
//               onClick={() => clearFilter("brand")}
//             >
//               {filters.brand}
//               <X className="ml-1 h-3 w-3" />
//             </Badge>
//           )}
//           {filters.inStock && (
//             <Badge
//               variant="secondary"
//               className="bg-accent text-accent-foreground hover:bg-accent/80 cursor-pointer transition-all duration-300"
//               onClick={() => clearFilter("inStock")}
//             >
//               En stock
//               <X className="ml-1 h-3 w-3" />
//             </Badge>
//           )}
//           {(filters.minPrice !== priceRange.min || filters.maxPrice !== priceRange.max) && (
//             <Badge
//               variant="secondary"
//               className="bg-accent text-accent-foreground hover:bg-accent/80 cursor-pointer transition-all duration-300"
//               onClick={() => clearFilter("price")}
//             >
//               ${filters.minPrice} - ${filters.maxPrice}
//               <X className="ml-1 h-3 w-3" />
//             </Badge>
//           )}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={clearAllFilters}
//             className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-all duration-300"
//           >
//             Limpiar todo
//           </Button>
//         </div>
//       )}

//       {/* Filter Panel */}
//       {isFilterVisible && (
//         <Card className="p-6 bg-gradient-card shadow-card border-0 animate-scale-in">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {/* Category Filter */}
//             <div className="space-y-2">
//               <Label className="text-sm font-semibold text-foreground">Categoría</Label>
//               <Select value={filters.category || "all"} onValueChange={handleCategoryChange}>
//                 <SelectTrigger className="bg-card border-border">
//                   <SelectValue placeholder="Todas las categorías" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Todas las categorías</SelectItem>
//                   {categories.map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Brand Filter */}
//             <div className="space-y-2">
//               <Label className="text-sm font-semibold text-foreground">Marca</Label>
//               <Select value={filters.brand || "all"} onValueChange={handleBrandChange}>
//                 <SelectTrigger className="bg-card border-border">
//                   <SelectValue placeholder="Todas las marcas" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Todas las marcas</SelectItem>
//                   {brands.map((brand) => (
//                     <SelectItem key={brand} value={brand}>
//                       {brand}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Price Range Filter */}
//             <div className="space-y-4">
//               <Label className="text-sm font-semibold text-foreground">Rango de precio</Label>
//               <div className="px-2">
//                 <Slider
//                   value={priceValues}
//                   onValueChange={handlePriceChange}
//                   max={priceRange.max}
//                   min={priceRange.min}
//                   step={10}
//                   className="w-full"
//                 />
//                 <div className="flex justify-between text-sm text-muted-foreground mt-2">
//                   <span>${priceValues[0]}</span>
//                   <span>${priceValues[1]}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Stock Filter */}
//             <div className="space-y-2">
//               <Label className="text-sm font-semibold text-foreground">Disponibilidad</Label>
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   checked={filters.inStock}
//                   onCheckedChange={handleInStockChange}
//                   className="data-[state=checked]:bg-primary"
//                 />
//                 <Label className="text-sm text-muted-foreground">Solo en stock</Label>
//               </div>
//             </div>
//           </div>
//         </Card>
//       )}
//     </div>
//   );
// };