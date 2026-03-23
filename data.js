// ✅ 메뉴 구조 (사이드바용)
const siteStructure = {
  works: [
    {
      title: "인간",
      items: [
        { key: "people", label: "사람들" },
        { key: "house", label: "집" },
        { key: "self-portraits", label: "자화상" }
      ]
    },
    {
      title: "사물",
      key: "objects",
      label: "사물"
    },
    {
      title: "자연",
      key: "nature",
      label: "자연"
    },
    {
      title: "이야기",
      items: [
        { key: "roots", label: "화분과 뿌리" },
        { key: "black-room", label: "검은 방" },
        { key: "room-202", label: "202호" }
      ]
    }
  ],
  pages: [
    { key: "exhibitions", label: "Exhibitions" },
    { key: "texts", label: "Texts" },
    { key: "cv", label: "CV" },
    { key: "contact", label: "Contact" }
  ]
};


// ✅ 작품 데이터
// 규칙:
// 1. series 값은 siteStructure의 key와 반드시 똑같아야 함
// 2. image 경로는 실제 /images 폴더 경로와 맞아야 함
// 3. 아직 작품이 없는 카테고리는 빈 상태로 두거나 아래 템플릿을 복붙해서 추가

const artworks = [
  /* =========================
     👤 인간 → 사람들
  ========================= */
  {
    series: "people",
    title: "흰옷 입은 사람",
    titleEn: "The One in White",
    year: "2024",
    material: "Oil on canvas",
    size: "130 × 97 cm",
    image: "/images/the-one-in-white.jpg"
  },
  {
    series: "people",
    title: "돌사람",
    titleEn: "Stone Figure",
    year: "2024",
    material: "Oil on canvas",
    size: "145 × 112 cm",
    image: "/images/stone-figure.jpg"
  },

    /* =========================
     🏠 인간 → 집
  ========================= */
  // {
  //   series: "house",
  //   title: "작품명",
  //   titleEn: "English Title",
  //   year: "2024",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/house-1.jpg"
  // },

  /* =========================
     🪞 인간 → 자화상
  ========================= */
  {
    series: "self-portraits",
    title: "늙은 민들레",
    titleEn: "An Old Dandelion",
    year: "2022",
    material: "Oil on canvas",
    size: "116 × 91 cm",
    image: "/images/old-dandelion.jpg"
  },

  /* =========================
     📦 사물
  ========================= */
  // {
  //   series: "objects",
  //   title: "노란 연필",
  //   titleEn: "Yellow pencil",
  //   year: "2025",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/yellow-pencil.jpg"
  // },

    // {
  //   series: "objects",
  //   title: "성냥개비 나무",
  //   titleEn: "Ma",
  //   year: "2025",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/yellow-pencil.jpg"
  // },

    // {
  //   series: "objects",
  //   title: "노란 연필",
  //   titleEn: "Yellow pencil",
  //   year: "2025",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/yellow-pencil.jpg"
  // },

  /* =========================
     🌿 자연
  ========================= */
  // {
  //   series: "nature",
  //   title: "작품명",
  //   titleEn: "English Title",
  //   year: "2024",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/nature-1.jpg"
  // },

  /* =========================
     📖 이야기 → 나타샤 이야기
  ========================= */
  // {
  //   series: "roots",
  //   title: "작품명",
  //   titleEn: "English Title",
  //   year: "2024",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/roots-1.jpg"
  // },

  /* =========================
     🌑 이야기 → 검은방
  ========================= */
  // {
  //   series: "black-room",
  //   title: "작품명",
  //   titleEn: "English Title",
  //   year: "2024",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/black-room-1.jpg"
  // },

  /* =========================
     🚪 이야기 → 202호
  ========================= */
  // {
  //   series: "room-202",
  //   title: "작품명",
  //   titleEn: "English Title",
  //   year: "2024",
  //   material: "Oil on canvas",
  //   size: "100 × 80 cm",
  //   image: "/images/room-202-1.jpg"
  // },
  

];

const exhibitions = [
  {
    slug: "far-home-alone",
    title: "혼자 가는 먼 집",
    year: "2026",
    venue: "OO Gallery, Seoul",
    thumbnail: "/images/exhibitions/far-home-alone-thumb.jpg",
    cover: "/images/exhibitions/far-home-alone-cover.jpg",
    text: "전시 소개 문장을 여기에 넣습니다.",
    images: [
      "/images/exhibitions/far-home-alone-1.jpg",
      "/images/exhibitions/far-home-alone-2.jpg"
    ]
  },
  {
    slug: "flowerpot-and-roots",
    title: "화분과 뿌리",
    year: "2025",
    venue: "OO Space, Seoul",
    thumbnail: "/images/exhibitions/flowerpot-and-roots-thumb.jpg",
    cover: "/images/exhibitions/flowerpot-and-roots-cover.jpg",
    text: "전시 소개 문장을 여기에 넣습니다.",
    images: [
      "/images/exhibitions/flowerpot-and-roots-1.jpg"
    ]
  },
  {
    slug: "pencil-marks",
    title: "지워지지 않는 연필 자국",
    year: "2024",
    venue: "OO Project, Seoul",
    thumbnail: "/images/exhibitions/pencil-marks-thumb.jpg",
    cover: "/images/exhibitions/pencil-marks-cover.jpg",
    text: "전시 소개 문장을 여기에 넣습니다.",
    images: [
      "/images/exhibitions/pencil-marks-1.jpg"
    ]
  }
];
