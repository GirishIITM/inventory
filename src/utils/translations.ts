export const customResources = {
    home: ["Home", "ಮನೆ"],
    products: ["Products", "ಸಾಮಾನುಗಳು"],
    stock: ["Stock", "ಸ್ಟಾಕ್"],
    billing: ["Billing", "ಬಿಲ್ಲಿಂಗ್"],
    reports: ["Reports", "ವರದಿಗಳು"],
    settings: ["Settings", "ಸಂಯೋಜನೆಗಳು"],
    productName: ["Product Name", "ಉತ್ಪನ್ನದ ಹೆಸರು"],
    company: ["Company", "ಕಂಪನಿ"],
    mrpPrice: ["MRP Price", "ಎಂಆರ್‌ಪಿ ದರ"],
    originalPrice: ["Original Price", "ಮೂಲ ದರ"],
    stocksLeft: ["Stocks Left", "ಉಳಿತಾಯದ ಸ್ಟಾಕ್"],
    originalStock: ["Original Stock", "ಮೂಲ ಸ್ಟಾಕ್"],
    imageUrl: ["Image URL", "ಚಿತ್ರ URL"],
    saveProduct: ["Save Product", "ಉತ್ಪನ್ನವನ್ನು ಉಳಿಸಿ"],
    enterProductName: ["Enter product name", "ಉತ್ಪನ್ನದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"],
    enterCompanyName: ["Enter company name", "ಕಂಪನಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"],
    enterMrpPrice: ["Enter MRP price", "ಎಂಆರ್‌ಪಿ ದರವನ್ನು ನಮೂದಿಸಿ"],
    enterOriginalPrice: ["Enter original price", "ಮೂಲ ದರವನ್ನು ನಮೂದಿಸಿ"],
    enterStocksLeft: ["Enter stocks left", "ಉಳಿತಾಯದ ಸ್ಟಾಕ್ ಅನ್ನು ನಮೂದಿಸಿ"],
    enterOriginalStock: ["Enter original stock", "ಮೂಲ ಸ್ಟಾಕ್ ಅನ್ನು ನಮೂದಿಸಿ"],
    enterImageUrl: ["Enter image URL", "ಚಿತ್ರ URL ಅನ್ನು ನಮೂದಿಸಿ"],
} as const;

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