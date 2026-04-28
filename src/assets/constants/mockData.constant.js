export const MOCK_AUTH = {
  user: {
    id: "mock-user-1",
    email: "mock.user@example.com",
    name: "Mock User",
  },
  tokens: {
    access: {
      token: "mock-access-token",
      expires: "2099-01-01T00:00:00.000Z",
    },
    refresh: {
      token: "mock-refresh-token",
      expires: "2099-01-02T00:00:00.000Z",
    },
  },
};

export const MOCK_CATEGORIES = [
  { id: "cat-1", name: "Motivation" },
  { id: "cat-2", name: "Education" },
  { id: "cat-3", name: "Mindset" },
];

export const MOCK_QUOTES = [
  {
    _id: "quote-1",
    caption: "Small steps every day still move you forward.",
    title: "Small steps every day still move you forward.",
    quote_by: "Unknown",
    categoryId: "cat-1",
  },
  {
    _id: "quote-2",
    caption: "Learning compounds when you stay consistent.",
    title: "Learning compounds when you stay consistent.",
    quote_by: "Anonymous",
    categoryId: "cat-2",
  },
  {
    _id: "quote-3",
    caption: "Focus on progress, not perfection.",
    title: "Focus on progress, not perfection.",
    quote_by: "Coach",
    categoryId: "cat-3",
  },
];

export const MOCK_TEMPLATES = {
  "cat-1": [
    {
      id: "temp-1",
      categoryId: "cat-1",
      imageUrl: "https://picsum.photos/seed/template-1/600/600",
    },
    {
      id: "temp-2",
      categoryId: "cat-1",
      imageUrl: "https://picsum.photos/seed/template-2/600/600",
    },
  ],
  "cat-2": [
    {
      id: "temp-3",
      categoryId: "cat-2",
      imageUrl: "https://picsum.photos/seed/template-3/600/600",
    },
  ],
  "cat-3": [
    {
      id: "temp-4",
      categoryId: "cat-3",
      imageUrl: "https://picsum.photos/seed/template-4/600/600",
    },
  ],
};
