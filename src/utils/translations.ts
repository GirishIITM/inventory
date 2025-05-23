export const customResources = {
  home: ["Home", "ಮನೆ"],
  products: ["Products", "ಸಾಮಾನುಗಳು"],
  stock: ["Stock", "ಸ್ಟಾಕ್"],
  billing: ["Billing", "ಬಿಲ್ಲಿಂಗ್"],
  reports: ["Reports", "ವರದಿಗಳು"],
  settings: ["Settings", "ಸಂಯೋಜನೆಗಳು"],
  productName: ["Product Name", "ಉತ್ಪನ್ನದ ಹೆಸರು"],
  company: ["Company", "ಕಂಪನಿ"],
  mrpPrice: ["MRP Price", "MRP ದರ"],
  originalPrice: ["Original Price", "ಮೂಲ ದರ"],
  stocksLeft: ["Stocks Left", "ಉಳಿತಾಯದ ಸ್ಟಾಕ್"],
  originalStock: ["Original Stock", "ಮೂಲ ಸ್ಟಾಕ್"],
  imageUrl: ["Image URL", "ಚಿತ್ರ URL"],
  saveProduct: ["Save Product", "ಉತ್ಪನ್ನವನ್ನು ಉಳಿಸಿ"],
  editProduct: ["Edit Product", "ಉತ್ಪನ್ನವನ್ನು ಬದಲಾಯಿಸಿ"],
  enterProductName: ["Enter product name", "ಉತ್ಪನ್ನದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"],
  enterCompanyName: ["Enter company name", "ಕಂಪನಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"],
  enterMrpPrice: ["Enter MRP price", "MRP ದರವನ್ನು ನಮೂದಿಸಿ"],
  enterOriginalPrice: ["Enter original price", "ಮೂಲ ದರವನ್ನು ನಮೂದಿಸಿ"],
  enterStocksLeft: ["Enter stocks left", "ಉಳಿತಾಯದ stock ಅನ್ನು ನಮೂದಿಸಿ"],
  enterOriginalStock: ["Enter original stock", "ಮೂಲ stock ಅನ್ನು ನಮೂದಿಸಿ"],
  enterImageUrl: ["Enter image URL", "ಚಿತ್ರ URL ಅನ್ನು ನಮೂದಿಸಿ"],
  description: ["Description", "ವಿವರಣೆ"],
  'No description available.': ["No description available.", "ವಿವರಣೆ ಲಭ್ಯವಿಲ್ಲ."],
  addProduct: ["Add Product", "ಉತ್ಪನ್ನವನ್ನು ಸೇರಿಸಿ"],
  showFilters: ["Show Filters", "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೋರಿಸಿ"],
  hideFilters: ["Hide Filters", "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರೆಮಾಡಿ"],
  clearFilters: ["Clear Filters", "ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಅಳಿಸಿ"],
  sl: ["SL", "ಕ್ರಮ ಸಂಖ್ಯೆ"],
  product: ["Product", "ಉತ್ಪನ್ನ"],
  price: ["Price", "ದರ"],
  quantity: ["Quantity", "ಪ್ರಮಾಣ"],
  totalPrice: ["Total Price", "ಒಟ್ಟು ದರ"],
  remove: ["Remove", "ತೆಗೆದುಹಾಕಿ"],
  addRow: ["Add Row", "ಸರಣಿಯನ್ನು ಸೇರಿಸಿ"],
  totalAmount: ["Total Amount", "ಒಟ್ಟು ಮೊತ್ತ"],
  actions: ["Actions", "ಚಟುವತಟಿಕೆಗಳು"],
  search: ["Search", "ಹುಡುಕು"],
  deleteSelected: ["Delete Selected", "ಆಯ್ಕೆ ಮಾಡಿದನ್ನು ಅಳಿಸಿ"],
  duplicateRow: ["Duplicate Row", "ಸಾಲನ್ನು ನಕಲಿಸಿ"],
  deleteRow: ["Delete Row", "ಸಾಲನ್ನು ಅಳಿಸಿ"],
  deleteSelectedRows: ["Delete Selected Rows", "ಆಯ್ಕೆ ಮಾಡಿದ ಸಾಲುಗಳನ್ನು ಅಳಿಸಿ"],
  addRowAfter: ["Add Row After", "ಸರಣಿಯ ನಂತರ ಸಾಲು ಸೇರಿಸಿ"],
  addRowBefore: ["Add Row Before", "ಸರಣಿಯ ಮೊದಲು ಸಾಲು ಸೇರಿಸಿ"],

};

// Infer the keys of customResources as a union type
type TranslationKeys = keyof typeof customResources;

// Define the translation object type using the keys
type TranslationObject = { translation: Record<TranslationKeys, string> };
type Translations = {
  en: TranslationObject;
  kn: TranslationObject;
};

// Convert customResources to the desired format with type safety
export const resources: Translations = Object.keys(customResources).reduce(
  (acc, key) => {
    const [en, kn] = customResources[key as TranslationKeys];

    acc.en.translation[key as TranslationKeys] = en;
    acc.kn.translation[key as TranslationKeys] = kn;

    return acc;
  },
  { en: { translation: {} } as TranslationObject, kn: { translation: {} } as TranslationObject }
)

type Trans = Record<TranslationKeys, TranslationKeys>;

// Create the trans object with type safety
export const trans: Trans = Object.keys(customResources).reduce((acc, key) => {
  acc[key as TranslationKeys] = key as TranslationKeys;
  return acc;
}, {} as Trans);
