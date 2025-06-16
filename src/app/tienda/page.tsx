"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  ShoppingCart,
  Search,
  Filter,
  Grid,
  List,
  Heart,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TiendaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = [
    { value: "all", label: "Todas las Categorías" },
    { value: "figuras", label: "Figuras" },
    { value: "mangas", label: "Mangas" },
    { value: "ropa", label: "Ropa" },
    { value: "tazas", label: "Tazas" },
    { value: "decorativos", label: "Decorativos" },
  ];

  const products = [
    {
      id: 1,
      name: "Figura Naruto Uzumaki Sage Mode",
      price: 89.99,
      originalPrice: 120.0,
      image: "/img/featured/img1.jpg",
      category: "figuras",
      franchise: "Naruto",
      rating: 4.8,
      reviews: 124,
      description:
        "Figura de alta calidad de Naruto en modo sabio, con detalles increíbles y articulaciones móviles.",
      isNew: true,
    },
    {
      id: 2,
      name: "Manga Attack on Titan Vol. 1-10",
      price: 149.99,
      originalPrice: 200.0,
      image: "/img/featured/img2.jpg",
      category: "mangas",
      franchise: "Attack on Titan",
      rating: 4.9,
      reviews: 89,
      description:
        "Colección completa de los primeros 10 volúmenes de Attack on Titan en español.",
      isHot: true,
    },
    {
      id: 3,
      name: "Hoodie Dragon Ball Z Goku",
      price: 59.99,
      originalPrice: 80.0,
      image: "/img/featured/img3.jpg",
      category: "ropa",
      franchise: "Dragon Ball",
      rating: 4.7,
      reviews: 156,
      description:
        "Sudadera con capucha de alta calidad con diseño exclusivo de Goku Super Saiyan.",
      isNew: true,
    },
    {
      id: 4,
      name: "Taza Térmica One Piece Luffy",
      price: 24.99,
      originalPrice: 35.0,
      image: "/img/featured/img4.jpg",
      category: "tazas",
      franchise: "One Piece",
      rating: 4.6,
      reviews: 203,
      description:
        "Taza térmica que cambia de diseño con el calor, revelando el Gear 4 de Luffy.",
      isHot: true,
    },
    {
      id: 5,
      name: "Poster Decorativo Demon Slayer",
      price: 19.99,
      originalPrice: 30.0,
      image: "/img/featured/img5.jpg",
      category: "decorativos",
      franchise: "Demon Slayer",
      rating: 4.5,
      reviews: 78,
      description:
        "Poster de alta resolución de Tanjiro y Nezuko, perfecto para decorar tu habitación.",
    },
    {
      id: 6,
      name: "Figura Goku Ultra Instinct",
      price: 129.99,
      originalPrice: 160.0,
      image: "/img/featured/img6.jpg",
      category: "figuras",
      franchise: "Dragon Ball",
      rating: 4.9,
      reviews: 95,
      description:
        "Figura premium de Goku en Ultra Instinto con efectos de energía incluidos.",
      isNew: true,
    },
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.franchise.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.isNew ? 1 : -1;
        default:
          return b.rating * b.reviews - a.rating * a.reviews;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Effect */}
      <div
        className="fixed w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/30 to-pink-900/50" />
        <div className="container mx-auto px-4">
          <div
            className={`text-center transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-400/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 animate-pulse">
              <Star className="w-4 h-4 mr-2" />
              Tienda AnimeHub
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="block text-white animate-fade-in-up">
                Explora Nuestra
              </span>
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x animate-fade-in-up delay-300">
                Colección Anime
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-500">
              Más de 10,000 productos auténticos con envío rápido a todo Ayacucho
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-purple-900/30 to-slate-900/50"></div>
        <div className="container mx-auto px-4 relative">
          <div
            className={`flex flex-col lg:flex-row gap-4 items-center justify-between transform transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-4 w-4" />
                <Input
                  placeholder="Buscar por producto o franquicia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 text-white border-purple-400/30 focus:border-purple-400 backdrop-blur-sm"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 text-white border-purple-400/30">
                  <Filter className="h-4 w-4 mr-2 text-purple-300" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/80 text-white border-purple-400/30 backdrop-blur-sm">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="hover:bg-purple-500/20"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 text-white border-purple-400/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800/80 text-white border-purple-400/30 backdrop-blur-sm">
                  <SelectItem
                    value="popular"
                    className="hover:bg-purple-500/20"
                  >
                    Más Popular
                  </SelectItem>
                  <SelectItem
                    value="price-low"
                    className="hover:bg-purple-500/20"
                  >
                    Precio: Menor a Mayor
                  </SelectItem>
                  <SelectItem
                    value="price-high"
                    className="hover:bg-purple-500/20"
                  >
                    Precio: Mayor a Menor
                  </SelectItem>
                  <SelectItem value="rating" className="hover:bg-purple-500/20">
                    Mejor Calificados
                  </SelectItem>
                  <SelectItem value="newest" className="hover:bg-purple-500/20">
                    Más Recientes
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-purple-400/50 hover:border-purple-400"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-purple-400/50 hover:border-purple-400"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div
            className={`mb-8 animate-fade-in-up delay-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-gray-300">
              Mostrando {filteredProducts.length} productos
              {selectedCategory !== "all" &&
                ` en ${
                  categories.find((c) => c.value === selectedCategory)?.label
                }`}
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>

          <div
            className={`grid gap-8 ${
              viewMode === "grid"
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up py-0 ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-48 flex-shrink-0" : ""
                  }`}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                      viewMode === "list" ? "w-full h-full" : "w-full h-64"
                    }`}
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg">
                      -
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      %
                    </Badge>
                    {product.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg animate-pulse">
                        <Star className="w-3 h-3 mr-1" />
                        Nuevo
                      </Badge>
                    )}
                    {product.isHot && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-bounce">
                        🔥 Hot
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <Button
                      size="sm"
                      className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <CardContent
                  className={`p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm ${
                    viewMode === "list" ? "flex-1" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                    >
                      {
                        categories.find((c) => c.value === product.category)
                          ?.label
                      }
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs bg-slate-800/50 text-gray-300 border-purple-400/30"
                    >
                      {product.franchise}
                    </Badge>
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-white group-hover:text-purple-200 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {viewMode === "list" && (
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transition-colors duration-300 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div
                    className={`flex items-center ${
                      viewMode === "list"
                        ? "justify-between"
                        : "justify-between"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        S/ {product.price}
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        S/ {product.originalPrice}
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 animate-fade-in-up delay-1000">
              <div className="text-gray-300 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-300">
                Intenta con otros términos de búsqueda o cambia los filtros
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div
              className={`flex justify-center mt-12 animate-fade-in-up delay-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  disabled
                  className="border-purple-400/50 text-black hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm"
                >
                  Anterior
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-black">
                  1
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-400/50 text-black hover:text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm"
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-bounce"></div>

        <div className="container mx-auto px-4 text-center relative">
          <div
            className={`animate-fade-in-up transform transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              ¿Aún no encuentras tu
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
                Producto Anime Ideal?
              </span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explora nuestro catálogo completo o contáctanos para
              recomendaciones personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/25"
              >
                <Link href="/contacto">
                  <Star className="mr-2 h-5 w-5" />
                  Contáctanos
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 text-black hover:text-white hover:bg-white/10 hover:border-white backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/tienda">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ver Todo el Catálogo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
