# Bouch Auto - Catalogue Vitrine

Application front moderne de catalogue vitrine pour accessoires et décorations automobiles.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 📁 Structure du projet

```
src/
├── assets/              # Images et ressources statiques
├── components/
│   ├── layout/         # Header, Footer
│   ├── products/       # ProductCard, ProductGrid, ProductFilters
│   └── ui/             # Composants shadcn-ui
├── data/
│   └── mockData.ts     # Données mock (temporaire)
├── lib/
│   └── api.ts          # Service API avec mock/real toggle
├── pages/
│   ├── Index.tsx       # Page d'accueil
│   ├── CategoryPage.tsx
│   ├── ProductPage.tsx
│   ├── SearchPage.tsx
│   └── NotFound.tsx
└── types/
    └── product.ts      # Types TypeScript
```

## 🎨 Features

✅ **Pages & Navigation**
- Accueil avec hero, nouveautés et catégories
- Pages catégories avec filtres, tri et pagination
- Fiches produits détaillées avec galerie
- Recherche globale avec filtres
- 404 stylisée

✅ **Composants réutilisables**
- Cards produits avec badges (Nouveau, Best-seller)
- Filtres latéraux (accordéons)
- Header responsive avec recherche
- Footer complet

✅ **SEO optimisé**
- Meta tags par page
- Open Graph tags
- Sitemap.xml
- Robots.txt
- Sémantique HTML

✅ **Accessibilité & UX**
- Navigation clavier
- Contrastes corrects
- Alt text sur images
- Responsive mobile-first
- Transitions fluides

## 🔌 Intégration API

### Configuration

1. Copier `.env.example` vers `.env`:
```bash
cp .env.example .env
```

2. Configurer les variables:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
USE_MOCK=false
```

### Endpoints API attendus

- `GET /api/v1/categories` - Liste des catégories
- `GET /api/v1/products?search=&category=&tags[]=&visible=1&featured=1&page=1&per_page=12&sort_by=newest` - Liste produits avec filtres
- `GET /api/v1/products/{slug}` - Détail produit
- `GET /api/v1/categories/{slug}` - Détail catégorie

### Format de réponse

```typescript
// GET /api/v1/products
{
  "data": Product[],
  "total": number,
  "page": number,
  "perPage": number,
  "totalPages": number
}
```

## 📝 Données Mock

Les données mock sont définies dans `src/data/mockData.ts`.
Pour basculer entre mock et API réelle, modifier `USE_MOCK` dans `src/lib/api.ts`.

## 🎨 Design System

Le design system est défini dans:
- `src/index.css` - Variables CSS (couleurs, ombres, transitions)
- `tailwind.config.ts` - Configuration Tailwind

**Palette:**
- Primary: Anthracite sophistiqué
- Accent: Rouge sportif dynamique
- Background: Gris très clair / Blanc

## 🧪 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualisation du build
- `npm run lint` - Linter le code

## 📦 Technologies

- **React 18** + **TypeScript**
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling utility-first
- **shadcn-ui** - Composants UI
- **React Router** - Navigation
- **TanStack Query** - State management

## 🚧 Prochaines étapes

1. Remplacer les données mock par l'API réelle
2. Ajouter la pagination/infinite scroll
3. Implémenter les tests
4. Optimiser les images (WebP, lazy loading)
5. Ajouter l'i18n pour multi-langue

## 📄 License

MIT - Bouch Auto 2025
