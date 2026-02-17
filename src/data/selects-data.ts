export const countries = [
  {
    name: "السعودية",
    code: "(+966)",
    value: "SA",
    icon: "/assets//images/flags/SA.png",
  },
  {
    name: "الإمارات",
    code: "(+971)",
    value: "AE",
    icon: "/assets//images/flags/AE.png",
  },
  {
    name: "مصر",
    code: "(+20)",
    value: "EG",
    icon: "/assets//images/flags/EG.png",
  },
  {
    name: "الأردن",
    code: "(+962)",
    value: "JO",
    icon: "/assets//images/flags/JO.png",
  },
  {
    name: "سوريا",
    code: "(+963)",
    value: "SY",
    icon: "/assets//images/flags/SY.png",
  },
  {
    name: "عمان",
    code: "(+968)",
    value: "OM",
    icon: "/assets//images/flags/OM.png",
  },
  {
    name: "الكويت",
    code: "(+965)",
    value: "KW",
    icon: "/assets//images/flags/KW.png",
  },
  {
    name: "العراق",
    code: "(+964)",
    value: "IQ",
    icon: "/assets//images/flags/IQ.png",
  },
  {
    name: "البحرين",
    code: "(+973)",
    value: "BH",
    icon: "/assets//images/flags/BH.png",
  },
  {
    name: "قطر",
    code: "(+974)",
    value: "QA",
    icon: "/assets//images/flags/QA.png",
  },
];

export const arabCountries = [
  { name: "مواطن / مقيم" },
  { name: "مواطن خليجي" },
];

export const registrationTypes = [
  { name: "خصوصى", icon: "/assets//images/registration-types/1.png" },
  {
    name: "نقل عام",
    icon: "/assets//images/registration-types/2.png",
  },
  { name: "نقل خاص", icon: "/assets//images/registration-types/3.png" },
  { name: "مقطورة", icon: "/assets//images/registration-types/4.png" },
  { name: "دراجة نارية", icon: "/assets//images/registration-types/5.png" },
  {
    name: "مركبة أجرة",
    icon: "/assets//images/registration-types/2.png",
  },

  { name: "تصدير", icon: "/assets//images/registration-types/6.png" },
  {
    name: "دراجة نارية ترفيهيه",
    icon: "/assets//images/registration-types/5.png",
  },
  { name: "هيئة دبلوماسية", icon: "/assets//images/registration-types/7.png" },
  { name: "حافلة خاصة", icon: "/assets//images/registration-types/3.png" },
  { name: "مؤقتة", icon: "/assets//images/registration-types/8.png" },
  {
    name: "مركبة أشغال عامة",
    icon: "/assets//images/registration-types/9.png",
  },
];

export const vehicleType = [
  { name: "سيارة خاصة", icon: "/assets//images/car-icon.png" },
  { name: "مركبة نقل خفيفة خاصة", icon: "/assets//images/light.png" },
  { name: "نقل ثقيل", icon: "/assets//images/heavy.png" },
  { name: "حافلة خفيفة", icon: "/assets//images/bus-light.png" },
  { name: "مركبة نقل خفيفة", icon: "/assets//images/light.png" },
  { name: "نقل متوسط", icon: "/assets//images/meduim.png" },
  { name: "حافلة كبيرة", icon: "/assets//images/bus-big.png" },
  { name: "الدراجات ثنائية العجلات", icon: "/assets//images/bike.png" },
  {
    name: "مركبات أشغال عامة",
    icon: "/assets//images/vechile-works-general.png",
  },
  {
    name: "دراجة ثلاثية او رباعية العجلات",
    icon: "/assets//images/bike-3-4.png",
  },
  { name: "مقطورة ثقيلة", icon: "/assets//images/mktora.png" },
  { name: "سيارات الأجرة", icon: "/assets//images/taxi.png" },
  { name: "سيارات التأجير", icon: "/assets//images/vechile-rent.png" },
  { name: "نصف مقطورة ثقيلة", icon: "/assets//images/mktora-heavy-half.png" },
  { name: "حافلة متوسطة", icon: "/assets//images/bus-light.png" },
  { name: "مقطورة خفيفة", icon: "/assets//images/maktora-light.png" },
  { name: "نصف مقطورة خفيفة", icon: "/assets//images/mktora-heavy-half.png" },
  {
    name: "نصف مقطورة خفيفة خاصة",
    icon: "/assets//images/maktora-light-half-spec.png",
  },
  { name: "مقطورة خفيفة خاصة", icon: "/assets//images/maktora-light-spec.png" },
];
export const checkTypes = [
  { name: "خدمة الفحص الدوري" },
  { name: "خدمة إعادة الفحص" },
];

export const regions = [
  {
    name: "منطقة نجران",
    maintainanceCenters: [{ name: "نجران" }],
  },
  {
    name: "منطقة الجوف",
    maintainanceCenters: [{ name: "الجوف" }, { name: "القريات" }],
  },
  {
    name: "المنطقة الشرقية",
    maintainanceCenters: [
      { name: "الهفوف" },
      { name: "الخفجي" },
      { name: "الجبيل" },
      { name: "الدمام" },
      { name: "حفر الباطن" },
    ],
  },
  {
    name: "منطقة تبوك",
    maintainanceCenters: [{ name: "تبوك" }],
  },
  {
    name: "منطقة القصيم",
    maintainanceCenters: [{ name: "الراس" }, { name: "القصيم" }],
  },
  {
    name: "منطقة حائل",
    maintainanceCenters: [{ name: "حائل" }],
  },

  {
    name: "منطقة عسير",
    maintainanceCenters: [
      { name: "بيشة" },
      { name: "ابها" },
      { name: "محايل عسير" },
    ],
  },

  {
    name: "منطقة مكة المكرمة",
    maintainanceCenters: [
      { name: "جدة الشمال" },
      { name: "جدة عسفان" },
      { name: "مكة المكرمة" },
      { name: "الطائف" },
      { name: "جدة الجنوب" },
      { name: "الخرمة" },
    ],
  },
  {
    name: "منطقة المدينة المنورة",
    maintainanceCenters: [{ name: "المدينة المنورة" }, { name: "ينبع" }],
  },
  {
    name: "منطقة الباحة",
    maintainanceCenters: [{ name: "الباحة" }],
  },
  {
    name: "منطقة الرياض",
    maintainanceCenters: [
      { name: "الرياض حي المونسية" },
      { name: "وادى الدواسر" },
      { name: "الخرج" },
      { name: "جنوب شرق الرياض مخرج سبعة عشر" },
      { name: "الرياض حي الشفا طريق ديراب" },
      { name: "المجمعة" },
      { name: "القويعية" },
      { name: "الرياض حي القيروان" },
    ],
  },
  {
    name: "منطقة جازان",
    maintainanceCenters: [{ name: "جيزان" }],
  },
  {
    name: "منطقة الحدود الشمالية",
    maintainanceCenters: [{ name: "عرعر" }],
  },
];
