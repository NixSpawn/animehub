import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Sparkles, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-pink-600/80 to-purple-600/80"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 animate-spin" />
              ¡No te pierdas nuestras ofertas!
              <Heart className="w-6 h-6 animate-bounce text-pink-200" />
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
              Suscríbete a nuestro newsletter y recibe descuentos exclusivos, nuevos productos y contenido anime
              especial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 focus:border-white/50 transition-all duration-300"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-fade-in-up">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Star className="h-7 w-7 text-white animate-pulse" />
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  AnimeHub
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu destino definitivo para productos anime auténticos. Desde figuras coleccionables hasta mangas
              originales, tenemos todo lo que necesitas para vivir tu pasión otaku al máximo.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, color: "hover:text-blue-400" },
                { icon: Instagram, color: "hover:text-pink-400" },
                { icon: Twitter, color: "hover:text-cyan-400" },
                { icon: Youtube, color: "hover:text-red-400" },
              ].map(({ icon: Icon, color }, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`text-gray-400 ${color} p-2 transform hover:scale-110 transition-all duration-300 hover:bg-purple-500/20`}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-up delay-200">
            <h4 className="font-semibold text-lg mb-4 text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/tienda", text: "Todos los Productos" },
                { href: "/tienda?category=figuras", text: "Figuras" },
                { href: "/tienda?category=mangas", text: "Mangas" },
                { href: "/tienda?category=ropa", text: "Ropa Anime" },
                { href: "/ofertas", text: "Ofertas Especiales" },
                { href: "/novedades", text: "Novedades" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-300 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="animate-fade-in-up delay-400">
            <h4 className="font-semibold text-lg mb-4 text-white">Atención al Cliente</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/mi-cuenta", text: "Mi Cuenta" },
                { href: "/mis-pedidos", text: "Mis Pedidos" },
                { href: "/envios", text: "Información de Envíos" },
                { href: "/devoluciones", text: "Devoluciones" },
                { href: "/faq", text: "Preguntas Frecuentes" },
                { href: "/contacto", text: "Contacto" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-300 transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="animate-fade-in-up delay-600">
            <h4 className="font-semibold text-lg mb-4 text-white">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400 group cursor-pointer">
                <MapPin className="h-4 w-4 flex-shrink-0 group-hover:text-purple-400 transition-colors duration-300" />
                <span className="group-hover:text-gray-300 transition-colors duration-300">
                  Av. Anime 123, Miraflores
                  <br />
                  Lima, Perú
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group cursor-pointer">
                <Phone className="h-4 w-4 flex-shrink-0 group-hover:text-purple-400 transition-colors duration-300" />
                <span className="group-hover:text-gray-300 transition-colors duration-300">+51 999 999 999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group cursor-pointer">
                <Mail className="h-4 w-4 flex-shrink-0 group-hover:text-purple-400 transition-colors duration-300" />
                <span className="group-hover:text-gray-300 transition-colors duration-300">hola@animehub.com</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2 text-white">Horarios de Atención</h5>
              <div className="text-sm text-gray-400">
                <p className="hover:text-gray-300 transition-colors duration-300">Lun - Vie: 9:00 AM - 8:00 PM</p>
                <p className="hover:text-gray-300 transition-colors duration-300">Sáb - Dom: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-purple-500/20 relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} AnimeHub. Todos los derechos reservados. Hecho con{" "}
              <Heart className="inline w-4 h-4 text-pink-400 animate-pulse" /> para la comunidad otaku.
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {[
                { href: "/terminos", text: "Términos y Condiciones" },
                { href: "/privacidad", text: "Política de Privacidad" },
                { href: "/cookies", text: "Política de Cookies" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-purple-300 transition-all duration-300 hover:scale-105"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
