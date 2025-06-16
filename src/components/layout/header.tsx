"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, User, Heart, Menu, X, Star, Sparkles } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
          : "bg-slate-900/80 backdrop-blur-sm border-b border-purple-500/10"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-purple-500/10">
          <div className="hidden md:flex items-center gap-4 text-gray-300">
            <span className="hover:text-purple-300 transition-colors duration-300">📞 +51 999 999 999</span>
            <span className="hover:text-purple-300 transition-colors duration-300">✉️ hola@animehub.com</span>
          </div>
          <div className="flex items-center gap-4 text-gray-300">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium animate-pulse">
              🚚 Envío gratis en compras +S/100
            </span>
            <Link href="/admin/login" className="hover:text-purple-300 transition-colors duration-300">
              Admin
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/25">
              <Star className="h-7 w-7 text-white animate-pulse" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                AnimeHub
              </div>
              <div className="text-xs text-gray-400 -mt-1 group-hover:text-purple-300 transition-colors duration-300">
                Tu universo anime
              </div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-hover:text-purple-400 transition-colors duration-300" />
              <Input
                placeholder="Buscar productos, mangas, figuras..."
                className="pl-10 pr-4 w-full bg-slate-800/50 border-purple-500/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:bg-slate-800/80 transition-all duration-300"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:text-purple-300 hover:bg-purple-500/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white hover:text-purple-300 hover:bg-purple-500/20 transition-all duration-300"
              >
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Cuenta
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white hover:text-pink-300 hover:bg-pink-500/20 transition-all duration-300"
              >
                <Link href="/wishlist">
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="relative text-white hover:text-purple-300 hover:bg-purple-500/20 transition-all duration-300"
              >
                <Link href="/carrito">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 py-3 border-t border-purple-500/10">
          <Link
            href="/tienda"
            className="text-white hover:text-purple-300 font-medium transition-all duration-300 hover:scale-105"
          >
            Todos los Productos
          </Link>
          <Link
            href="/tienda?category=figuras"
            className="text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-105"
          >
            Figuras
          </Link>
          <Link
            href="/tienda?category=mangas"
            className="text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-105"
          >
            Mangas
          </Link>
          <Link
            href="/tienda?category=ropa"
            className="text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-105"
          >
            Ropa
          </Link>
          <Link
            href="/tienda?category=tazas"
            className="text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-105"
          >
            Tazas
          </Link>
          <Link
            href="/tienda?category=decorativos"
            className="text-gray-300 hover:text-purple-300 transition-all duration-300 hover:scale-105"
          >
            Decorativos
          </Link>
          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white animate-pulse cursor-pointer transform hover:scale-105 transition-all duration-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Ofertas
          </Badge>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-500/20 py-4 space-y-4 bg-slate-900/95 backdrop-blur-md">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                className="pl-10 pr-4 w-full bg-slate-800/50 border-purple-500/20 text-white placeholder:text-gray-400 focus:border-purple-400"
              />
            </div>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Link
                href="/tienda"
                className="block py-2 text-white hover:text-purple-300 font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Todos los Productos
              </Link>
              <Link
                href="/tienda?category=figuras"
                className="block py-2 text-gray-300 hover:text-purple-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Figuras
              </Link>
              <Link
                href="/tienda?category=mangas"
                className="block py-2 text-gray-300 hover:text-purple-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Mangas
              </Link>
              <Link
                href="/tienda?category=ropa"
                className="block py-2 text-gray-300 hover:text-purple-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Ropa
              </Link>
              <Link
                href="/tienda?category=tazas"
                className="block py-2 text-gray-300 hover:text-purple-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Tazas
              </Link>
              <Link
                href="/tienda?category=decorativos"
                className="block py-2 text-gray-300 hover:text-purple-300 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Decorativos
              </Link>
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-purple-500/20">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1 border-purple-500/30 text-white hover:bg-purple-500/20"
              >
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <User className="h-4 w-4 mr-2" />
                  Mi Cuenta
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-purple-500/30 text-white hover:bg-purple-500/20"
              >
                <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="sm"
                asChild
                className="relative border-purple-500/30 text-white hover:bg-purple-500/20"
              >
                <Link href="/carrito" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
