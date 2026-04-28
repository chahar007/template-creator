import {
  MOCK_AUTH,
  MOCK_CATEGORIES,
  MOCK_QUOTES,
  MOCK_TEMPLATES,
} from "../../assets/constants/mockData.constant";

let categories = [...MOCK_CATEGORIES];
let quotes = [...MOCK_QUOTES];
let templatesByCategory = Object.entries(MOCK_TEMPLATES).reduce(
  (acc, [key, value]) => {
    acc[key] = [...value];
    return acc;
  },
  {}
);

const PAGE_SIZE = 10;

const paginate = (items, page = 1) => {
  const resolvedPage = Number(page) > 0 ? Number(page) : 1;
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const start = (resolvedPage - 1) * PAGE_SIZE;
  return {
    results: items.slice(start, start + PAGE_SIZE),
    page: resolvedPage,
    totalPages,
    totalResults: items.length,
  };
};

const resolvePage = (payload) => {
  if (!payload || typeof payload !== "object") return 1;
  return payload.page || 1;
};

const getCategoryData = async (payload) => paginate(categories, resolvePage(payload));

const postCategoryData = async (payload) => {
  const newCategory = {
    id: `cat-${Date.now()}`,
    name: payload?.name || "Untitled Category",
  };
  categories = [newCategory, ...categories];
  if (!templatesByCategory[newCategory.id]) templatesByCategory[newCategory.id] = [];
  return newCategory;
};

const updateCategoryData = async (id, payload) => {
  categories = categories.map((category) =>
    String(category.id) === String(id)
      ? { ...category, name: payload?.name || category.name }
      : category
  );
  return categories.find((category) => String(category.id) === String(id));
};

const getQuotes = async (payload) => paginate(quotes, resolvePage(payload));

const quoteUploads = async () => {
  const generatedQuote = {
    _id: `quote-${Date.now()}`,
    caption: "Uploaded quote from mock source.",
    title: "Uploaded quote from mock source.",
    quote_by: "Mock CSV",
    categoryId: categories[0]?.id || "cat-1",
  };
  quotes = [generatedQuote, ...quotes];
  return { success: true, inserted: 1 };
};

const deleteQuote = async (id) => {
  quotes = quotes.filter((quote) => String(quote._id) !== String(id));
  return { success: true };
};

const imageUpload = async () => ({
  url: `https://picsum.photos/seed/upload-${Date.now()}/600/600`,
});

const templateUpload = async (payload) => {
  const categoryId = String(payload?.categoryId || "");
  if (!templatesByCategory[categoryId]) templatesByCategory[categoryId] = [];
  const newTemplate = {
    id: `temp-${Date.now()}`,
    categoryId,
    imageUrl: payload?.imageUrl || `https://picsum.photos/seed/new-${Date.now()}/600/600`,
  };
  templatesByCategory[categoryId] = [newTemplate, ...templatesByCategory[categoryId]];
  return newTemplate;
};

const getTemplates = async (catId) => {
  const categoryId = String(catId || "");
  const items = templatesByCategory[categoryId] || [];
  return {
    results: items,
    page: 1,
    totalPages: 1,
    totalResults: items.length,
  };
};

const imageUploadToWP = async () => ({
  id: Date.now(),
  source_url: `https://picsum.photos/seed/wp-${Date.now()}/600/600`,
});

const schedulePost = async () => ({
  id: Date.now(),
  status: "publish",
});

const login = async (payload) => ({
  ...MOCK_AUTH,
  user: { ...MOCK_AUTH.user, email: payload?.email || MOCK_AUTH.user.email },
});

const syncTime = async () => ({
  status: "ok",
  now: new Date().toISOString(),
});

const fetchDropdownData1 = async () => [
  { id: 1, value: "motivation", label: "Motivation" },
  { id: 2, value: "education", label: "Education" },
];

const fetchDropdownData2 = async () => [
  { id: 1, value: "square", label: "Square" },
  { id: 2, value: "portrait", label: "Portrait" },
];

const mockDataService = {
  getCategoryData,
  postCategoryData,
  updateCategoryData,
  getQuotes,
  quoteUploads,
  deleteQuote,
  imageUpload,
  templateUpload,
  getTemplates,
  imageUploadToWP,
  schedulePost,
  login,
  syncTime,
  fetchDropdownData1,
  fetchDropdownData2,
};

export default mockDataService;
