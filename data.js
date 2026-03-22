// ✅ 메뉴 구조 (사이드바용)
const siteStructure = {
  works: [
    {
      title: "인간",
      items: [
        { key: "people", label: "사람들" },
        { key: "self-portraits", label: "자화상" }
      ]
    },
    {
      title: "정물",
      items: [
        { key: "house", label: "집" },
        { key: "objects", label: "사물" }
      ]
    },
    {
      title: "자연",
      items: [
        { key: "nature", label: "자연" }
      ]
    },
    {
      title: "이야기",
      items: [
        { key: "roots", label: "뿌리" },
        { key: "black-room", label: "검은방" }
      ]
    },
    {
      title: "프로젝트",
      items: [
        { key: "laos-national-institute-of-fine-arts", label: "라오스 국립미술원" },
        { key: "room-202", label: "202호" },
        { key: "under-the-letter", label: "Under the letter" }
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


// ✅ 작품 데이터 (절대 건드리지 말 것: 핵심 동작 부분)
const artworks = [
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
  {
    series: "self-portraits",
    title: "늙은 민들레",
    titleEn: "An Old Dandelion",
    year: "2022",
    material: "Oil on canvas",
    size: "116 × 91 cm",
    image: "/images/old-dandelion.jpg"
  }
];
