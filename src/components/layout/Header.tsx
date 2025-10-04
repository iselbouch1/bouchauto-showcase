import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const menuItems = [
    { label: "Nouveautés", path: "/?section=nouveautes" },
    { label: "Intérieur", path: "/categories/interieur" },
    { label: "Extérieur", path: "/categories/exterieur" },
    { label: "Éclairage", path: "/categories/eclairage" },
    { label: "Audio & Multimédia", path: "/categories/audio-multimedia" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">BA</span>
            </div>
            <span className="hidden text-xl font-bold text-foreground sm:inline-block">
              Bouch Auto
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t bg-card lg:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
