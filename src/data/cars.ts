export type EnginePrice = {
  engine: string;
  stage1: number;
  stage2?: number;
};

export type CarModel = {
  model: string;
  engines: EnginePrice[];
};

export type CarBrand = {
  slug: string;
  name: string;
  logo: string; // emoji or short text as placeholder logo
  color: string; // accent color
  models: CarModel[];
};

// Prices in RUB. Hardcoded — not from DB.
export const brands: CarBrand[] = [
  {
    slug: "bmw",
    name: "BMW",
    logo: "BMW",
    color: "#1c69d4",
    models: [
      { model: "3 Series (F30)", engines: [
        { engine: "320i 2.0T (184 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "328i 2.0T (245 л.с.)", stage1: 19000, stage2: 28000 },
        { engine: "335i 3.0T (306 л.с.)", stage1: 22000, stage2: 32000 },
        { engine: "320d 2.0d (184 л.с.)", stage1: 17000, stage2: 25000 },
      ]},
      { model: "5 Series (F10)", engines: [
        { engine: "520i 2.0T (184 л.с.)", stage1: 19000, stage2: 27000 },
        { engine: "528i 2.0T (245 л.с.)", stage1: 20000, stage2: 29000 },
        { engine: "535i 3.0T (306 л.с.)", stage1: 23000, stage2: 33000 },
        { engine: "530d 3.0d (258 л.с.)", stage1: 21000, stage2: 30000 },
      ]},
      { model: "X5 (F15)", engines: [
        { engine: "35i 3.0T (306 л.с.)", stage1: 24000, stage2: 34000 },
        { engine: "50i 4.4T (450 л.с.)", stage1: 32000, stage2: 45000 },
        { engine: "30d 3.0d (258 л.с.)", stage1: 22000, stage2: 31000 },
      ]},
      { model: "X6 (F16)", engines: [
        { engine: "35i 3.0T (306 л.с.)", stage1: 24000, stage2: 34000 },
        { engine: "50i 4.4T (450 л.с.)", stage1: 32000, stage2: 45000 },
      ]},
    ],
  },
  {
    slug: "audi",
    name: "Audi",
    logo: "AUDI",
    color: "#bb0a30",
    models: [
      { model: "A3 (8V)", engines: [
        { engine: "1.4 TSI (150 л.с.)", stage1: 16000, stage2: 24000 },
        { engine: "1.8 TSI (180 л.с.)", stage1: 17000, stage2: 25000 },
        { engine: "2.0 TSI (220 л.с.)", stage1: 19000, stage2: 27000 },
        { engine: "2.0 TDI (150 л.с.)", stage1: 16000, stage2: 23000 },
      ]},
      { model: "A4 (B8/B9)", engines: [
        { engine: "1.8 TFSI (170 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "2.0 TFSI (211 л.с.)", stage1: 19000, stage2: 28000 },
        { engine: "3.0 TFSI (272 л.с.)", stage1: 24000, stage2: 34000 },
        { engine: "2.0 TDI (177 л.с.)", stage1: 17000, stage2: 25000 },
      ]},
      { model: "Q5", engines: [
        { engine: "2.0 TFSI (211 л.с.)", stage1: 20000, stage2: 29000 },
        { engine: "3.0 TFSI (272 л.с.)", stage1: 24000, stage2: 34000 },
        { engine: "2.0 TDI (170 л.с.)", stage1: 18000, stage2: 26000 },
      ]},
      { model: "Q7 (4M)", engines: [
        { engine: "3.0 TFSI (333 л.с.)", stage1: 26000, stage2: 37000 },
        { engine: "3.0 TDI (249 л.с.)", stage1: 22000, stage2: 31000 },
      ]},
    ],
  },
  {
    slug: "mercedes",
    name: "Mercedes-Benz",
    logo: "MB",
    color: "#00adef",
    models: [
      { model: "C-Class (W205)", engines: [
        { engine: "C180 1.6T (156 л.с.)", stage1: 17000, stage2: 25000 },
        { engine: "C200 2.0T (184 л.с.)", stage1: 19000, stage2: 27000 },
        { engine: "C250 2.0T (211 л.с.)", stage1: 20000, stage2: 29000 },
        { engine: "C220d 2.1d (170 л.с.)", stage1: 18000, stage2: 26000 },
      ]},
      { model: "E-Class (W213)", engines: [
        { engine: "E200 2.0T (184 л.с.)", stage1: 20000, stage2: 29000 },
        { engine: "E300 2.0T (245 л.с.)", stage1: 22000, stage2: 31000 },
        { engine: "E400 3.0T (333 л.с.)", stage1: 26000, stage2: 37000 },
      ]},
      { model: "GLE (W166)", engines: [
        { engine: "GLE 400 3.0T (333 л.с.)", stage1: 27000, stage2: 38000 },
        { engine: "GLE 350d 3.0d (258 л.с.)", stage1: 24000, stage2: 34000 },
      ]},
    ],
  },
  {
    slug: "vw",
    name: "Volkswagen",
    logo: "VW",
    color: "#001e50",
    models: [
      { model: "Golf VII", engines: [
        { engine: "1.4 TSI (122 л.с.)", stage1: 14000, stage2: 21000 },
        { engine: "1.4 TSI (150 л.с.)", stage1: 15000, stage2: 22000 },
        { engine: "2.0 TSI GTI (220 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "2.0 TDI (150 л.с.)", stage1: 15000, stage2: 22000 },
      ]},
      { model: "Passat B8", engines: [
        { engine: "1.4 TSI (150 л.с.)", stage1: 16000, stage2: 23000 },
        { engine: "1.8 TSI (180 л.с.)", stage1: 17000, stage2: 25000 },
        { engine: "2.0 TSI (220 л.с.)", stage1: 18000, stage2: 27000 },
        { engine: "2.0 TDI (190 л.с.)", stage1: 17000, stage2: 25000 },
      ]},
      { model: "Tiguan II", engines: [
        { engine: "1.4 TSI (150 л.с.)", stage1: 16000, stage2: 24000 },
        { engine: "2.0 TSI (180 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "2.0 TDI (150 л.с.)", stage1: 17000, stage2: 25000 },
      ]},
      { model: "Touareg", engines: [
        { engine: "3.0 TSI (340 л.с.)", stage1: 25000, stage2: 36000 },
        { engine: "3.0 TDI (249 л.с.)", stage1: 22000, stage2: 31000 },
      ]},
    ],
  },
  {
    slug: "toyota",
    name: "Toyota",
    logo: "TOYOTA",
    color: "#eb0a1e",
    models: [
      { model: "Camry", engines: [
        { engine: "2.0 (150 л.с.)", stage1: 12000 },
        { engine: "2.5 (181 л.с.)", stage1: 13000 },
        { engine: "3.5 V6 (249 л.с.)", stage1: 16000 },
      ]},
      { model: "RAV4", engines: [
        { engine: "2.0 (146 л.с.)", stage1: 12000 },
        { engine: "2.5 (180 л.с.)", stage1: 13000 },
      ]},
      { model: "Land Cruiser 200", engines: [
        { engine: "4.5 D-4D (249 л.с.)", stage1: 24000, stage2: 34000 },
        { engine: "4.6 V8 (309 л.с.)", stage1: 20000 },
      ]},
      { model: "Hilux", engines: [
        { engine: "2.4D (150 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "2.8D (177 л.с.)", stage1: 19000, stage2: 28000 },
      ]},
    ],
  },
  {
    slug: "kia",
    name: "Kia",
    logo: "KIA",
    color: "#05141f",
    models: [
      { model: "Rio", engines: [
        { engine: "1.4 (100 л.с.)", stage1: 11000 },
        { engine: "1.6 (123 л.с.)", stage1: 12000 },
      ]},
      { model: "Sportage", engines: [
        { engine: "2.0 (150 л.с.)", stage1: 13000 },
        { engine: "1.6 T-GDI (177 л.с.)", stage1: 17000, stage2: 25000 },
        { engine: "2.0 CRDi (185 л.с.)", stage1: 18000, stage2: 26000 },
      ]},
      { model: "Sorento", engines: [
        { engine: "2.4 (188 л.с.)", stage1: 14000 },
        { engine: "2.2 CRDi (200 л.с.)", stage1: 19000, stage2: 27000 },
      ]},
      { model: "Optima", engines: [
        { engine: "2.0 (150 л.с.)", stage1: 13000 },
        { engine: "2.4 (188 л.с.)", stage1: 14000 },
        { engine: "2.0 T-GDI (245 л.с.)", stage1: 18000, stage2: 27000 },
      ]},
    ],
  },
  {
    slug: "hyundai",
    name: "Hyundai",
    logo: "HYUNDAI",
    color: "#002c5f",
    models: [
      { model: "Solaris", engines: [
        { engine: "1.4 (100 л.с.)", stage1: 11000 },
        { engine: "1.6 (123 л.с.)", stage1: 12000 },
      ]},
      { model: "Creta", engines: [
        { engine: "1.6 (123 л.с.)", stage1: 12000 },
        { engine: "2.0 (149 л.с.)", stage1: 13000 },
      ]},
      { model: "Tucson", engines: [
        { engine: "2.0 (150 л.с.)", stage1: 13000 },
        { engine: "1.6 T-GDI (177 л.с.)", stage1: 17000, stage2: 25000 },
        { engine: "2.0 CRDi (185 л.с.)", stage1: 18000, stage2: 26000 },
      ]},
      { model: "Santa Fe", engines: [
        { engine: "2.4 (188 л.с.)", stage1: 14000 },
        { engine: "2.2 CRDi (200 л.с.)", stage1: 19000, stage2: 27000 },
      ]},
    ],
  },
  {
    slug: "skoda",
    name: "Škoda",
    logo: "ŠKODA",
    color: "#4ba82e",
    models: [
      { model: "Octavia A7", engines: [
        { engine: "1.4 TSI (150 л.с.)", stage1: 15000, stage2: 22000 },
        { engine: "1.8 TSI (180 л.с.)", stage1: 16000, stage2: 24000 },
        { engine: "2.0 TSI RS (220 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "2.0 TDI (150 л.с.)", stage1: 15000, stage2: 22000 },
      ]},
      { model: "Kodiaq", engines: [
        { engine: "1.4 TSI (150 л.с.)", stage1: 16000, stage2: 24000 },
        { engine: "2.0 TSI (180 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "2.0 TDI (150 л.с.)", stage1: 17000, stage2: 25000 },
      ]},
      { model: "Superb", engines: [
        { engine: "1.8 TSI (180 л.с.)", stage1: 17000, stage2: 25000 },
        { engine: "2.0 TSI (220 л.с.)", stage1: 19000, stage2: 27000 },
      ]},
    ],
  },
  {
    slug: "ford",
    name: "Ford",
    logo: "FORD",
    color: "#003478",
    models: [
      { model: "Focus III", engines: [
        { engine: "1.6 (125 л.с.)", stage1: 12000 },
        { engine: "1.5 EcoBoost (150 л.с.)", stage1: 15000, stage2: 22000 },
        { engine: "2.0 ST (250 л.с.)", stage1: 19000, stage2: 28000 },
      ]},
      { model: "Kuga II", engines: [
        { engine: "1.5 EcoBoost (150 л.с.)", stage1: 16000, stage2: 23000 },
        { engine: "2.0 EcoBoost (240 л.с.)", stage1: 19000, stage2: 27000 },
      ]},
      { model: "Mondeo V", engines: [
        { engine: "2.0 EcoBoost (203 л.с.)", stage1: 18000, stage2: 26000 },
        { engine: "2.0 TDCi (180 л.с.)", stage1: 17000, stage2: 25000 },
      ]},
    ],
  },
  {
    slug: "mazda",
    name: "Mazda",
    logo: "MAZDA",
    color: "#101820",
    models: [
      { model: "3 (BM/BN)", engines: [
        { engine: "1.5 SkyActiv (120 л.с.)", stage1: 12000 },
        { engine: "2.0 SkyActiv (150 л.с.)", stage1: 13000 },
      ]},
      { model: "6 (GJ)", engines: [
        { engine: "2.0 SkyActiv (150 л.с.)", stage1: 13000 },
        { engine: "2.5 SkyActiv (192 л.с.)", stage1: 15000 },
      ]},
      { model: "CX-5", engines: [
        { engine: "2.0 SkyActiv (150 л.с.)", stage1: 13000 },
        { engine: "2.5 SkyActiv (192 л.с.)", stage1: 15000 },
      ]},
    ],
  },
  {
    slug: "nissan",
    name: "Nissan",
    logo: "NISSAN",
    color: "#c3002f",
    models: [
      { model: "Qashqai", engines: [
        { engine: "1.2 DIG-T (115 л.с.)", stage1: 14000, stage2: 20000 },
        { engine: "2.0 (144 л.с.)", stage1: 12000 },
      ]},
      { model: "X-Trail T32", engines: [
        { engine: "2.0 (144 л.с.)", stage1: 12000 },
        { engine: "2.5 (171 л.с.)", stage1: 13000 },
      ]},
      { model: "Patrol Y62", engines: [
        { engine: "5.6 V8 (405 л.с.)", stage1: 25000 },
      ]},
    ],
  },
  {
    slug: "lada",
    name: "LADA",
    logo: "LADA",
    color: "#0b4d24",
    models: [
      { model: "Vesta", engines: [
        { engine: "1.6 (106 л.с.)", stage1: 8000 },
        { engine: "1.8 (122 л.с.)", stage1: 9000 },
      ]},
      { model: "Granta", engines: [
        { engine: "1.6 8V (87 л.с.)", stage1: 7000 },
        { engine: "1.6 16V (106 л.с.)", stage1: 8000 },
      ]},
      { model: "Niva / Travel", engines: [
        { engine: "1.7 (83 л.с.)", stage1: 8000 },
      ]},
      { model: "XRAY", engines: [
        { engine: "1.6 (106 л.с.)", stage1: 8000 },
        { engine: "1.8 (122 л.с.)", stage1: 9000 },
      ]},
    ],
  },
];
