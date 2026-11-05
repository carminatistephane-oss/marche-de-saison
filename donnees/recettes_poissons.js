// =========================================================================
// LE PETIT MARCHÉ DE MON ESTOMAC - RECETTES OFFICIELLES "MAISON"
// =========================================================================
// 🐟 recettes_poissons.js	poi_	poi_001, poi_002, poi_003...
// =========================================================================

if (!window.RECETTES_MAISON) window.RECETTES_MAISON = [];

window.RECETTES_MAISON.push(

  {
    id: "poi_001",
    nom: "Papillote de Cabillaud fondante au thym doux",
    alimentsAssocies: ["Filets de cabillaud", "Courgettes", "Filet de Colin"],
    portions: "2 personnes",
    temps: "20 min",
    statut: "🟢",
    conseilDigestif: "Cuisson vapeur douce sans matière grasse cuite, repos gastrique idéal.",
    image: "images_recettes/papillote_de_cabillaud_au_thym.webp",	
    ingredients: [
      "2 filets de cabillaud bien frais",
      "1 petite courgette (pelée et épépinée)",
      "1 filet d'huile d'olive extra-vierge",
      "2 branches de thym frais",
      "Quelques gouttes de jus de citron",
      "1 pincée de sel fin"
    ],
    instructions: "1. Préchauffer le four à 180°C.\n2. Tailler la courgette pelée en fines demi-rondelles.\n3. Sur deux feuilles de papier cuisson, déposer un lit de rondelles de courgettes.\n4. Poser les filets de cabillaud par-dessus.\n5. Arroser d'un filet d'huile d'olive, d'un soupçon de citron et parsemer de thym émietté.\n6. Refermer hermétiquement les papillotes pour emprisonner la vapeur.\n7. Enfourner pendant 15 à 18 minutes.\n8. Déguster chaud avec un riz basmati bien tendre."
  },
  {
    id: "poi_002",
    nom: "Pad Thaï authentique aux Crevettes (Sen Chan)",
    alimentsAssocies: ["Crevettes crues Black Tiger", "Crevettes cocktail", "Nouilles de riz", "Concombre", "Ciboulette"],
    portions: "2 personnes",
    temps: "30 min",
    statut: "🟢",
    conseilDigestif: "Crevettes ultra-maigres et nouilles de riz 100% sans gluten. Si vous souffrez d'acidité ou de côlon irritable, remplacez le piment fort par du paprika doux pour garder la belle couleur sans brûlure.",
    image: "images_recettes/pad_thai_authentique_aux_crevettes.webp",
    sourceNom: "Hot Thai Kitchen",
    sourceUrl: "https://hot-thai-kitchen.com/easier-pad-thai/#recipe",
    ingredients: [
      "170g de nouilles de riz plates (3 mm de large)",
      "10 à 12 crevettes moyennes décortiquées (ou chair de crabe)",
      "85g de pousses de haricots mungo fraîches",
      "4 tiges de ciboulette chinoise ou ciboulette fraîche (coupées en tronçons)",
      "2 petits concombres (pelés et sans pépins, en rondelles)",
      "2 c. à soupe d'huile de colza ou tournesol",
      "3 c. à soupe de pâte de tamarin liquide douce",
      "2 c. à soupe et demie de sauce de poisson (nuoc-mâm)",
      "45g de sucre de palme (ou sucre de canne)",
      "80ml d'eau tiède",
      "2 gousses d'ail pilées (ou ciboulette si estomac très sensible)",
      "2 échalotes finement hachées",
      "1 c. à café de paprika doux ou piment doux séché moulu",
      "Quartiers de lime (citron vert) pour le service"
    ],
    instructions: "1. Faire tremper les nouilles de riz dans de l'eau à température ambiante pendant 30 à 45 minutes jusqu'à ce qu'elles soient souples et retombent sans résistance, puis égoutter.\n2. Dans un mortier ou un bol, écraser l'ail, les échalotes et le paprika doux pour former une pâte aromatique.\n3. Dans un bol, délayer la pâte de tamarin avec la sauce de poisson, le sucre de canne et 80ml d'eau.\n4. Chauffer l'huile dans un wok ou une grande poêle à feu moyen, faire suer la pâte aromatique pendant 1 minute en remuant sans dorer.\n5. Verser la sauce au tamarin et porter à ébullition. Ajouter les crevettes et les cuire 1 minute jusqu'à ce qu'elles soient roses, puis les retirer et réserver dans une assiette (en laissant la sauce dans le wok).\n6. Remettre le wok à feu vif, ajouter les nouilles de riz égouttées et remuer constamment jusqu'à ce qu'elles aient bu toute la sauce (ajouter un petit trait d'eau si elles sont encore un peu fermes).\n7. Couper le feu, remettre les crevettes, ajouter les pousses de haricots mungo et la ciboulette. Mélanger 30 secondes pour tiédir les pousses tout en gardant leur croquant.\n8. Dresser dans des assiettes avec les rondelles de concombre frais et un quartier de lime."
  }

);