const products = [
  {
    id: 1,
    name: "Lemon & Mint Roasted Makhana",
    description: "Tangy lemon zest with refreshing mint flavor in every crunchy bite! A light, tasty, and guilt-free snack packed with goodness — perfect for anytime munching, tea-time cravings, or healthy snacking on the go.",
    price: 149,
    originalPrice: 199,
    stock: 150,
    category: "flavored",
    tags: ["bestseller", "healthy", "roasted"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products1.png",
    rating: 4.5,
    reviews: 234
  },
  {
    id: 2,
    name: "Makhana Sugar-Free Instant Kheer Premix",
    description: "Enjoy the rich traditional taste of kheer without added sugar! Made with premium makhana and flavorful ingredients for a creamy, healthy, and instant dessert experience.",
    price: 249,
    originalPrice: 349,
    stock: 80,
    category: "organic",
    tags: ["sugar-free", "premium", "dessert"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products2.png",
    rating: 4.8,
    reviews: 156
  },
  {
    id: 3,
    name: "Peri Peri Roasted Makhana",
    description: "Bold peri peri spices blended with crunchy roasted makhana for the perfect spicy snack experience! Light, flavorful, and irresistibly tasty — ideal for movie nights, tea-time cravings, and healthy snacking anytime.",
    price: 169,
    originalPrice: 229,
    stock: 200,
    category: "flavored",
    tags: ["spicy", "bestseller", "trending"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products3.png",
    rating: 4.7,
    reviews: 189
  },
  {
    id: 4,
    name: "Cream & Onion Roasted Makhana",
    description: "A delicious blend of creamy richness and savory onion flavor in every crunchy bite! Light, tasty, and perfectly roasted for a satisfying snack experience — great for anytime munching and guilt-free cravings.",
    price: 169,
    originalPrice: 219,
    stock: 120,
    category: "flavored",
    tags: ["trending", "creamy"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products4.png",
    rating: 4.6,
    reviews: 142
  },
  {
    id: 5,
    name: "Tangy Tomato Roasted Makhana",
    description: "Enjoy the perfect mix of zesty tomato flavor and crunchy roasted makhana in every bite! A light, flavorful, and delicious snack that's perfect for tea-time, travel, movie nights, or anytime healthy cravings strike.",
    price: 169,
    originalPrice: 219,
    stock: 130,
    category: "flavored",
    tags: ["tangy", "trending"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products5.png",
    rating: 4.5,
    reviews: 167
  },
  {
    id: 6,
    name: "Salt & Pepper Roasted Makhana",
    description: "Simple, classic, and perfectly seasoned with salt & pepper for a delicious crunchy snack! Light, roasted, and full of flavor — the perfect guilt-free munch for anytime cravings, travel, or tea-time enjoyment.",
    price: 149,
    originalPrice: 199,
    stock: 180,
    category: "plain",
    tags: ["classic", "bestseller"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products6.png",
    rating: 4.4,
    reviews: 210
  },
  {
    id: 7,
    name: "Mint Pudina Roasted Makhana",
    description: "Refreshing pudina flavor blended with crunchy roasted makhana for a cool and tasty snacking experience! Light, flavorful, and guilt-free — perfect for anytime munching, travel, or healthy cravings.",
    price: 169,
    originalPrice: 219,
    stock: 110,
    category: "flavored",
    tags: ["refreshing", "mint"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products7.png",
    rating: 4.3,
    reviews: 98
  },
  {
    id: 8,
    name: "Handpicked Makhana 6 Sutta+",
    description: "Premium quality handpicked makhana with extra-large 6 Sutta+ size for rich taste, superior crunch, and perfect purity. Ideal for healthy snacking, fasting, kheer, and daily nutrition with every wholesome bite.",
    price: 399,
    originalPrice: 549,
    stock: 60,
    category: "organic",
    tags: ["premium", "handpicked", "jumbo"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products8.png",
    rating: 4.9,
    reviews: 67
  },
  {
    id: 9,
    name: "Premium 4 Sutta+ Ratio Makhana",
    description: "Carefully selected premium makhana with a balanced 4 Sutta+ ratio for perfect crunch, rich taste, and superior quality. A wholesome snack choice for daily nutrition, fasting, roasting, and delicious homemade recipes.",
    price: 299,
    originalPrice: 399,
    stock: 90,
    category: "plain",
    tags: ["premium", "balanced"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products9.png",
    rating: 4.6,
    reviews: 88
  },
  {
    id: 10,
    name: "Premium 4.5 Sutta+ Makhana",
    description: "Expertly selected premium-grade makhana with a superior 4.5 Sutta+ size for rich flavor, crisp texture, and exceptional quality. Perfect for healthy snacking, fasting, roasting, and creating delicious traditional recipes.",
    price: 349,
    originalPrice: 479,
    stock: 70,
    category: "plain",
    tags: ["premium", "graded"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products10.png",
    rating: 4.7,
    reviews: 76
  },
  {
    id: 11,
    name: "Premium 5 Sutta+ Grade Makhana",
    description: "Carefully handpicked premium makhana with an extra-large 5 Sutta+ grade for unmatched crunch, rich taste, and superior purity. Perfect for healthy snacking, fasting, roasting, and making delicious traditional dishes.",
    price: 449,
    originalPrice: 599,
    stock: 45,
    category: "plain",
    tags: ["premium", "jumbo", "graded"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products11.png",
    rating: 4.8,
    reviews: 52
  },
  {
    id: 12,
    name: "Makhana Gift Box Premium",
    description: "Beautifully packed assortment of 4 premium flavors. The perfect gift for health-conscious loved ones. Includes Lemon & Mint, Peri Peri, Cream & Onion, and Salt & Pepper varieties.",
    price: 699,
    originalPrice: 899,
    stock: 35,
    category: "giftpack",
    tags: ["gift", "premium", "assorted"],
    image: "https://www.aapnamakhana.com/assets/images/makhanas.png",
    rating: 4.9,
    reviews: 45
  },
  {
    id: 13,
    name: "Organic Makhana (Raw)",
    description: "100% organic, chemical-free fox nuts sourced directly from Bihar farms. The purest form of makhana — roast at home and season to your taste. Perfect for fasting and daily nutrition.",
    price: 279,
    originalPrice: 379,
    stock: 100,
    category: "organic",
    tags: ["organic", "raw", "natural"],
    image: "https://www.aapnamakhana.com/assets/images/makhana.png",
    rating: 4.7,
    reviews: 112
  },
  {
    id: 14,
    name: "Makhana Trail Mix",
    description: "Energy-boosting mix of premium makhana, almonds, raisins, and dried cranberries. Your perfect hiking companion and healthy snacking option for active lifestyles.",
    price: 329,
    originalPrice: 449,
    stock: 55,
    category: "organic",
    tags: ["healthy", "premium", "energy"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products2.png",
    rating: 4.6,
    reviews: 91
  },
  {
    id: 15,
    name: "Kids Fun Pack Makhana",
    description: "Mildly flavored makhana in fun, colorful packaging. Makes healthy snacking exciting for kids! Available in Cheese and Lightly Salted varieties that children love.",
    price: 199,
    originalPrice: 279,
    stock: 85,
    category: "giftpack",
    tags: ["kids", "fun", "mild"],
    image: "https://www.aapnamakhana.com/assets/images/Products/Products1.png",
    rating: 4.4,
    reviews: 102
  }
];

const categories = [
  { id: "plain", name: "Plain & Roasted", description: "Simple, healthy, and delicious" },
  { id: "flavored", name: "Flavored", description: "Exciting taste sensations" },
  { id: "organic", name: "Organic & Raw", description: "Pure and chemical-free" },
  { id: "giftpack", name: "Gift Packs", description: "Perfect for every occasion" }
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    text: "AapnaMakhana has completely replaced my chips addiction! The peri peri makhana is my go-to evening snack. Love the quality and freshness.",
    rating: 5
  },
  {
    id: 2,
    name: "Rahul Gupta",
    location: "Delhi",
    text: "Best quality makhana I've ever had. The 6 Sutta+ grade is incredible — huge, crunchy, and so fresh. The packaging is premium too.",
    rating: 5
  },
  {
    id: 3,
    name: "Anita Verma",
    location: "Bangalore",
    text: "My kids love the cream & onion makhana! Finally a healthy snack they actually ask for. Thank you AapnaMakhana!",
    rating: 5
  }
];

const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@aapnamakhana.com",
    password: "admin123",
    role: "admin",
    phone: "9876543210"
  },
  {
    id: 2,
    name: "Demo Customer",
    email: "demo@aapnamakhana.com",
    password: "demo123",
    role: "customer",
    phone: "9876543211",
    addresses: [
      {
        id: 1,
        type: "home",
        street: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400001",
        phone: "9876543211"
      }
    ]
  }
];

const orders = [
  {
    id: "ORD-001",
    userId: 2,
    items: [
      { productId: 1, name: "Lemon & Mint Roasted Makhana", quantity: 2, price: 149 },
      { productId: 3, name: "Peri Peri Roasted Makhana", quantity: 1, price: 169 }
    ],
    total: 467,
    status: "delivered",
    address: "123 MG Road, Mumbai, Maharashtra - 400001",
    paymentMethod: "UPI",
    createdAt: "2025-06-15T10:30:00Z"
  },
  {
    id: "ORD-002",
    userId: 2,
    items: [
      { productId: 8, name: "Handpicked Makhana 6 Sutta+", quantity: 3, price: 399 }
    ],
    total: 1197,
    status: "shipped",
    address: "123 MG Road, Mumbai, Maharashtra - 400001",
    paymentMethod: "Credit Card",
    createdAt: "2025-06-18T14:20:00Z"
  }
];

module.exports = { products, categories, testimonials, users, orders };
