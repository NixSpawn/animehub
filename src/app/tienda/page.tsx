"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ShoppingCart, Search, Filter, Grid, List } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function TiendaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const categories = [
    { value: "all", label: "Todas las Categorías" },
    { value: "figuras", label: "Figuras" },
    { value: "mangas", label: "Mangas" },
    { value: "ropa", label: "Ropa" },
    { value: "tazas", label: "Tazas" },
    { value: "decorativos", label: "Decorativos" },
  ]

  const products = [
    {
      id: 1,
      name: "Figura Naruto Uzumaki Sage Mode",
      price: 89.99,
      originalPrice: 120.0,
      image: "/placeholder.svg?height=300&width=300",
      category: "figuras",
      franchise: "Naruto",
      rating: 4.8,
      reviews: 124,
      description: "Figura de alta calidad de Naruto en modo sabio, con detalles increíbles y articulaciones móviles.",
    },
    {
      id: 2,
      name: "Manga Attack on Titan Vol. 1-10",
      price: 149.99,
      originalPrice: 200.0,
      image: "/placeholder.svg?height=300&width=300",
      category: "mangas",
      franchise: "Attack on Titan",
      rating: 4.9,
      reviews: 89,
      description: "Colección completa de los primeros 10 volúmenes de Attack on Titan en español.",
    },
    {
      id: 3,
      name: "Hoodie Dragon Ball Z Goku",
      price: 59.99,
      originalPrice: 80.0,
      image: "/placeholder.svg?height=300&width=300",
      category: "ropa",
      franchise: "Dragon Ball",
      rating: 4.7,
      reviews: 156,
      description: "Sudadera con capucha de alta calidad con diseño exclusivo de Goku Super Saiyan.",
    },
    {
      id: 4,
      name: "Taza Térmica One Piece Luffy",
      price: 24.99,
      originalPrice: 35.0,
      image: "/placeholder.svg?height=300&width=300",
      category: "tazas",
      franchise: "One Piece",
      rating: 4.6,
      reviews: 203,
      description: "Taza térmica que cambia de diseño con el calor, revelando el Gear 4 de Luffy.",
    },
    {
      id: 5,
      name: "Poster Decorativo Demon Slayer",
      price: 19.99,
      originalPrice: 30.0,
      image: "/placeholder.svg?height=300&width=300",
      category: "decorativos",
      franchise: "Demon Slayer",
      rating: 4.5,
      reviews: 78,
      description: "Poster de alta resolución de Tanjiro y Nezuko, perfecto para decorar tu habitación.",
    },
    {
      id: 6,
      name: "Figura Goku Ultra Instinct",
      price: 129.99,
      originalPrice: 160.0,
      image: "/placeholder.svg?height=300&width=300",
      category: "figuras",
      franchise: "Dragon Ball",
      rating: 4.9,
      reviews: 95,
      description: "Figura premium de Goku en Ultra Instinto con efectos de energía incluidos.",
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.franchise.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tienda AnimeHub</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Descubre más de 10,000 productos anime auténticos con envío rápido a todo el Perú
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por producto o franquicia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Más Popular</SelectItem>
                  <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="rating">Mejor Calificados</SelectItem>
                  <SelectItem value="newest">Más Recientes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Mostrando {filteredProducts.length} productos
              {selectedCategory !== "all" && ` en ${categories.find((c) => c.value === selectedCategory)?.label}`}
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>

          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === "list" ? "w-full h-full" : "w-full h-64"
                    }`}
                  />
                  <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" className="rounded-full w-10 h-10 p-0">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {categories.find((c) => c.value === product.category)?.label}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.franchise}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

                  {viewMode === "list" && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  )}

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-purple-600">S/ {product.price}</div>
                      <div className="text-sm text-gray-500 line-through">S/ {product.originalPrice}</div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Agregar al Carrito
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500">Intenta con otros términos de búsqueda o cambia los filtros</p>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Siguiente</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
