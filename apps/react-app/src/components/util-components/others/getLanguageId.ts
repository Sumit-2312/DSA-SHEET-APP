const languageId: Record<string, number> = {
  cpp: 54,
  "c++": 54,
  java: 62,
  javascript: 63,
  js: 63,
};

function getLanguageId(lang: string): number {
  const normalized = lang.toLowerCase().trim();

  const id = languageId[normalized];

  if (!id) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  return id;
}

export default getLanguageId;