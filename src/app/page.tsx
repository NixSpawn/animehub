"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Users, Truck, Shield, Sparkles, Zap, Heart } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const featuredProducts = [
    {
      id: 1,
      name: "Figura Naruto Uzumaki Sage Mode",
      price: 89.99,
      originalPrice: 120.0,
      image: "/img/featured/img1.jpg",
      category: "Figuras",
      rating: 4.8,
      reviews: 124,
      isNew: true,
    },
    {
      id: 2,
      name: "Manga Attack on Titan Complete Set",
      price: 149.99,
      originalPrice: 200.0,
      image: "/img/featured/img2.jpg",
      image: "/img/featured/img2.jpg",
      category: "Mangas",
      rating: 4.9,
      reviews: 89,
      isHot: true,
    },
    {
      id: 3,
      name: "Hoodie Dragon Ball Z Goku Ultra Instinct",
      price: 59.99,
      originalPrice: 80.0,
      image: "/img/featured/img3.webp",
      category: "Ropa",
      rating: 4.7,
      reviews: 156,
      isNew: true,
    },
    {
      id: 4,
      name: "Taza Térmica One Piece Luffy Gear 5",
      price: 24.99,
      originalPrice: 35.0,
      image: "/img/featured/img4.webp",
      category: "Tazas",
      rating: 4.6,
      reviews: 203,
      isHot: true,
    },
  ]

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
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 via-blue-900/30 to-pink-900/50" />

        {/* Animated Orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-2xl animate-ping"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-pulse"></div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`space-y-8 transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
            >
              <div className="space-y-6">
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-400/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 animate-pulse">
                  <Sparkles className="w-4 h-4 mr-2" />✨ Nueva colección disponible
                </Badge>

                <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white animate-fade-in-up">Tu Universo</span>
                  <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x animate-fade-in-up delay-300">
                    Anime Favorito
                  </span>
                </h1>

                <p className="text-xl text-gray-300 max-w-lg leading-relaxed animate-fade-in-up delay-500">
                  Descubre la colección más completa de productos anime. Desde figuras exclusivas hasta mangas
                  originales, todo lo que necesitas para vivir tu pasión otaku al máximo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-700">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                >
                  <Link href="/tienda">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Explorar Tienda
                    <Zap className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-purple-400/50 bg- text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
                >
                  <Link href="#comunidad">
                    <Users className="mr-2 h-5 w-5" />
                    Únete a la Comunidad
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-6 animate-fade-in-up delay-1000">
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                    10K+
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Productos
                  </div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-white group-hover:text-pink-300 transition-colors duration-300">
                    50K+
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Clientes Felices
                  </div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    4.9★
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    Calificación
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`hidden lg:flex relative transform transition-all duration-1000 delay-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
            >
              <div className="relative z-10 group">
                <Image
                  src="/img/hero-section/img1.jpg"
                  alt="Productos Anime Destacados"
                  width={500}
                  height={600}
                  className="object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-all duration-500 group-hover:shadow-purple-500/25"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-2xl animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute top-1/2 -right-12 w-16 h-16 bg-gradient-to-r from-cyan-400/40 to-blue-400/40 rounded-full blur-xl animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-400/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
              <Star className="w-4 h-4 mr-2" />
              Productos Destacados
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text">
              Los Más Populares de la Semana
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Descubre los productos más vendidos y mejor valorados por nuestra comunidad otaku
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className={`group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transform hover:scale-105 hover:-translate-y-2 animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image || "/img/featured/img1.jpg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                    {product.isNew && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg animate-pulse">
                        <Sparkles className="w-3 h-3 mr-1" />
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

                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <CardContent className="p-6 bg-transparent backdrop-blur-sm">
                  <Badge
                    variant="secondary"
                    className="mb-3 text-xs bg-purple-500/20 text-purple-300 border-purple-500/30"
                  >
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-2 text-white group-hover:text-purple-200 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 transition-colors duration-300 ${
                            i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        S/ {product.price}
                      </div>
                      <div className="text-sm text-gray-500 line-through">S/ {product.originalPrice}</div>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in-up delay-1000">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-purple-400/50 bg- text-white hover:bg-purple-500/20 hover:border-purple-400 backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
            >
              <Link href="/tienda">Ver Todos los Productos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-purple-900/30 to-slate-900/50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text">
              ¿Por Qué Elegir AnimeHub?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Somos más que una tienda, somos tu comunidad anime de confianza
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Envío Rápido y Seguro",
                description:
                  "Entrega en 24-48 horas en Lima y 3-5 días a nivel nacional. Empaque especial para proteger tus productos.",
                gradient: "from-purple-600 to-pink-600",
                delay: "0ms",
              },
              {
                icon: Shield,
                title: "Productos Auténticos",
                description:
                  "Garantizamos la autenticidad de todos nuestros productos. Trabajamos directamente con distribuidores oficiales.",
                gradient: "from-blue-600 to-purple-600",
                delay: "200ms",
              },
              {
                icon: Users,
                title: "Comunidad Activa",
                description:
                  "Únete a miles de otakus. Comparte, descubre y conecta con personas que comparten tu pasión por el anime.",
                gradient: "from-pink-600 to-red-600",
                delay: "400ms",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`text-center group animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: feature.delay }}
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-purple-500/25`}
                >
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="comunidad" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl animate-bounce"></div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              ¿Listo para Comenzar tu
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-x">
                Aventura Anime?
              </span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              Únete a nuestra comunidad y descubre un mundo lleno de productos exclusivos, ofertas especiales y
              contenido único que hará vibrar tu corazón otaku.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/25"
              >
                <Link href="/registro">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Crear Cuenta Gratis
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/50 bg- text-white hover:bg-white/10 hover:border-white backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
              >
                <Link href="/tienda">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Explorar Catálogo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  )
}
