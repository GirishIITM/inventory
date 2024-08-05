export const resources = {
  en: {
    translation: {
      home: "Home",
      products: "Products",
      stock: "Stock",
      billing: "Billing",
      reports: "Reports",
      settings: "Settings",
      productName: "Product Name",
      company: "Company",
      mrpPrice: "MRP Price",
      originalPrice: "Original Price",
      stocksLeft: "Stocks Left",
      originalStock: "Original Stock",
      imageUrl: "Image URL",
      saveProduct: "Save Product",
      enterProductName: "Enter product name",
      enterCompanyName: "Enter company name",
      enterMrpPrice: "Enter MRP price",
      enterOriginalPrice: "Enter original price",
      enterStocksLeft: "Enter stocks left",
      enterOriginalStock: "Enter original stock",
      enterImageUrl: "Enter image URL"
    }
  },
  kn: {
    translation: {
      home: "ಮನೆ",
      products: "ಸಾಮಾನುಗಳು",
      stock: "ಸ್ಟಾಕ್",
      billing: "ಬಿಲ್ಲಿಂಗ್",
      reports: "ವರದಿಗಳು",
      settings: "ಸಂಯೋಜನೆಗಳು",
      productName: "ಉತ್ಪನ್ನದ ಹೆಸರು",
      company: "ಕಂಪನಿ",
      mrpPrice: "ಎಂಆರ್‌ಪಿ ದರ",
      originalPrice: "ಮೂಲ ದರ",
      stocksLeft: "ಉಳಿತಾಯದ ಸ್ಟಾಕ್",
      originalStock: "ಮೂಲ ಸ್ಟಾಕ್",
      imageUrl: "ಚಿತ್ರ URL",
      saveProduct: "ಉತ್ಪನ್ನವನ್ನು ಉಳಿಸಿ",
      enterProductName: "ಉತ್ಪನ್ನದ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      enterCompanyName: "ಕಂಪನಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
      enterMrpPrice: "ಎಂಆರ್‌ಪಿ ದರವನ್ನು ನಮೂದಿಸಿ",
      enterOriginalPrice: "ಮೂಲ ದರವನ್ನು ನಮೂದಿಸಿ",
      enterStocksLeft: "ಉಳಿತಾಯದ ಸ್ಟಾಕ್ ಅನ್ನು ನಮೂದಿಸಿ",
      enterOriginalStock: "ಮೂಲ ಸ್ಟಾಕ್ ಅನ್ನು ನಮೂದಿಸಿ",
      enterImageUrl: "ಚಿತ್ರ URL ಅನ್ನು ನಮೂದಿಸಿ"
    }
  }
};


const keysArray = Object.keys(resources.en.translation) as Array<keyof typeof resources.en.translation>;
export const trans = keysArray.reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<keyof typeof resources.en.translation, keyof typeof resources.en.translation>);
