import type { Catalog } from '../common/models/catalog'

const leaf = (slug: string, name: string, description: string): Catalog.Category => ({
  slug,
  name,
  description,
  children: [],
})

export const CATEGORY_TREE: Catalog.Category[] = [
  {
    slug: 'plantes-interieur',
    name: 'Plantes d’intérieur',
    description:
      'Plantes tropicales d’intérieur : feuillages graphiques et plantes à fleurs faciles à vivre, sélectionnées pour la lumière de la maison.',
    children: [
      {
        slug: 'feuillages',
        name: 'Feuillages',
        description:
          'Monstera et fougères aux feuillages découpés, pour apporter une ambiance de jungle à la maison sans exposition plein soleil.',
        children: [
          leaf(
            'monstera',
            'Monstera',
            'Monstera deliciosa, adansonii et variegata : des feuilles ajourées spectaculaires pour les pièces lumineuses à mi-ombre.',
          ),
          leaf(
            'fougeres',
            'Fougères',
            'Fougères de Boston, nid d’oiseau et arborescente : des plantes d’ombre qui aiment l’humidité de la salle de bain.',
          ),
        ],
      },
      {
        slug: 'plantes-a-fleurs',
        name: 'Plantes à fleurs',
        description:
          'Anthuriums et strelitzias en pot : des floraisons tropicales durables pour égayer un salon ou un bureau bien éclairé.',
        children: [
          leaf(
            'anthurium',
            'Anthurium',
            'Anthuriums rouges, blancs ou à feuillage veiné : une floraison presque continue, à mi-ombre et sans soleil direct.',
          ),
          leaf(
            'strelitzia',
            'Strelitzia',
            'Strelitzias, ou oiseaux de paradis : silhouettes graphiques et fleurs orangées pour les pièces très lumineuses.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'plantes-exterieur',
    name: 'Plantes d’extérieur',
    description:
      'Palmiers et arbustes tropicaux pour le jardin ou la terrasse, choisis pour leur rusticité et leur floraison généreuse.',
    children: [
      leaf(
        'palmiers',
        'Palmiers',
        'Palmiers rustiques et d’orangerie : Trachycarpus, Kentia et Chamaerops pour structurer un jardin ou une terrasse.',
      ),
      {
        slug: 'arbustes-a-fleurs',
        name: 'Arbustes à fleurs',
        description:
          'Heliconias et calliandras : des arbustes à fleurs spectaculaires qui attirent colibris, papillons et regards.',
        children: [
          leaf(
            'heliconia',
            'Heliconia',
            'Heliconias à bractées rouges et jaunes : l’emblème des jardins tropicaux, en plein soleil ou à mi-ombre.',
          ),
          leaf(
            'calliandra',
            'Calliandra',
            'Calliandras aux pompons d’étamines rouges ou roses : une floraison légère et colorée pour les massifs ensoleillés.',
          ),
        ],
      },
    ],
  },
  {
    slug: 'plantes-aquatiques',
    name: 'Plantes aquatiques',
    description:
      'Plantes aquatiques pour bassins et bacs : nénuphars et lotus qui fleurissent en plein soleil pendant toute la belle saison.',
    children: [
      leaf(
        'nenuphars',
        'Nénuphars',
        'Nénuphars blancs ou roses et lotus sacré : des fleurs flottantes pour bassins, à installer en plein soleil.',
      ),
    ],
  },
]

type Seed = [
  name: string,
  euros: number,
  exposure: Catalog.Exposure,
  size: Catalog.Size,
  inStock?: boolean,
]

const SEEDS: Record<string, Seed[]> = {
  monstera: [
    ['Monstera deliciosa', 34.9, 'mi-ombre', 'L'],
    ['Monstera adansonii', 19.9, 'mi-ombre', 'M'],
    ['Monstera variegata', 89, 'mi-ombre', 'M', false],
  ],
  fougeres: [
    ['Fougère de Boston', 14.9, 'ombre', 'M'],
    ['Asplenium nidus', 17.5, 'ombre', 'S'],
    ['Fougère arborescente', 59, 'mi-ombre', 'L', false],
  ],
  anthurium: [
    ['Anthurium andreanum rouge', 24.9, 'mi-ombre', 'M'],
    ['Anthurium blanc', 26.9, 'mi-ombre', 'M'],
    ['Anthurium clarinervium', 39, 'ombre', 'S'],
  ],
  strelitzia: [
    ['Strelitzia reginae', 29.9, 'soleil', 'M'],
    ['Strelitzia nicolai', 69, 'soleil', 'L'],
    ['Strelitzia mini', 16.9, 'soleil', 'S', false],
  ],
  palmiers: [
    ['Palmier de Chine', 49, 'soleil', 'L'],
    ['Palmier Kentia', 54, 'mi-ombre', 'L'],
    ['Palmier nain', 39.9, 'soleil', 'M'],
  ],
  heliconia: [
    ['Heliconia rostrata', 32, 'soleil', 'L'],
    ['Heliconia psittacorum', 27.5, 'soleil', 'M'],
    ['Heliconia wagneriana', 44, 'mi-ombre', 'L', false],
  ],
  calliandra: [
    ['Calliandra haematocephala', 36, 'soleil', 'M'],
    ['Calliandra surinamensis', 31, 'soleil', 'M'],
    ['Calliandra tweedii', 22, 'soleil', 'S'],
  ],
  nenuphars: [
    ['Nénuphar blanc', 12.9, 'soleil', 'S'],
    ['Nénuphar rose', 13.9, 'soleil', 'S'],
    ['Lotus sacré', 24, 'soleil', 'M'],
  ],
}

const slugify = (name: string) =>
  name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')

export const PRODUCTS: Catalog.Product[] = Object.entries(SEEDS)
  .flatMap(([categorySlug, seeds]) =>
    seeds.map(([name, euros, exposure, size, inStock = true]) => ({
      name,
      euros,
      exposure,
      size,
      inStock,
      categorySlug,
    })),
  )
  .map((seed, index) => ({
    id: String(index + 1),
    slug: slugify(seed.name),
    name: seed.name,
    categorySlug: seed.categorySlug,
    price: Math.round(seed.euros * 100),
    exposure: seed.exposure,
    size: seed.size,
    inStock: seed.inStock,
    image: (index % 12) + 1,
  }))
