import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-xl font-bold text-primary-foreground">BA</span>
              </div>
              <span className="text-xl font-bold text-foreground">Bouch Auto</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Votre spécialiste en accessoires et décorations automobiles. Qualité et style pour
              votre véhicule.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground transition-colors hover:text-accent">
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/interieur"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Catégories
                </Link>
              </li>
              <li>
                <Link
                  to="/?section=nouveautes"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Nouveautés
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Catégories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/categories/interieur"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Intérieur
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/exterieur"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Extérieur
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/eclairage"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Éclairage
                </Link>
              </li>
              <li>
                <Link
                  to="/categories/audio-multimedia"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  Audio & Multimédia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-accent" />
                <a
                  href="mailto:contact@bouchauto.fr"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  contact@bouchauto.fr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-accent" />
                <a
                  href="tel:+33123456789"
                  className="text-muted-foreground transition-colors hover:text-accent"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-accent" />
                <span className="text-muted-foreground">Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Bouch Auto. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};
