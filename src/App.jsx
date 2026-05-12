import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X,
  Search,
  ChevronDown,
  Heart,
  SlidersHorizontal,
  Eye,
  Truck,
  ShieldCheck,
  RotateCcw,
  Menu,
  Grid3X3,
  Check,
} from "lucide-react";

const categories = ["Все", "Свечи", "Ароматы", "Диффузоры", "Предметы", "Подарки"];
const scentFamilies = ["Древесные", "Свежие", "Цветочные", "Тёплые", "Чистые"];
const sortOptions = ["Популярные", "Сначала новые", "Цена по возрастанию", "Цена по убыванию"];

const collections = [
  {
    title: "Вечерняя коллекция",
    text: "Глубокие ароматы, спокойные оттенки и предметы, которые красиво смотрятся в полумраке.",
    image: "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&w=1400&q=90",
  },
  {
    title: "Ежедневные ритуалы",
    text: "Лёгкие чистые ароматы для спальни, ванной, гардероба и утреннего настроения.",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=90",
  },
];

const products = [
  {
    id: 1,
    name: "Свеча Северное Утро",
    category: "Свечи",
    family: "Древесные",
    price: 4800,
    oldPrice: 5600,
    rating: 4.9,
    reviews: 128,
    stock: 12,
    volume: "220 г",
    feature: "45 часов горения",
    scent: "Кедр, груша, белый мускус",
    tag: "Бестселлер",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 2,
    name: "Спрей Чистый Лён",
    category: "Ароматы",
    family: "Чистые",
    price: 3400,
    rating: 4.8,
    reviews: 74,
    stock: 20,
    volume: "100 мл",
    feature: "для текстиля и комнат",
    scent: "Свежий лён, ирис, дождевой аккорд",
    tag: "Новинка",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 3,
    name: "Диффузор Белый Кедр",
    category: "Диффузоры",
    family: "Древесные",
    price: 6200,
    rating: 4.9,
    reviews: 91,
    stock: 8,
    volume: "180 мл",
    feature: "до 12 недель",
    scent: "Кедр, сандал, хлопок",
    tag: "Выбор редакции",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 4,
    name: "Набор Мягкий Ритуал",
    category: "Подарки",
    family: "Тёплые",
    price: 9600,
    oldPrice: 11200,
    rating: 5,
    reviews: 56,
    stock: 5,
    volume: "3 предмета",
    feature: "подарочная упаковка",
    scent: "Свеча, спрей, хлопковый мешочек",
    tag: "Для подарка",
    image: "https://images.unsplash.com/photo-1602523067449-f448c9c7b647?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 5,
    name: "Свеча Янтарный Лес",
    category: "Свечи",
    family: "Тёплые",
    price: 5200,
    rating: 4.7,
    reviews: 83,
    stock: 14,
    volume: "240 г",
    feature: "50 часов горения",
    scent: "Янтарь, хвоя, дымная ваниль",
    tag: "Долгое горение",
    image: "https://images.unsplash.com/photo-1602523067449-f448c9c7b647?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 6,
    name: "Дубовый поднос Base",
    category: "Предметы",
    family: "Чистые",
    price: 6800,
    rating: 4.8,
    reviews: 39,
    stock: 9,
    volume: "30 × 18 см",
    feature: "массив дуба",
    scent: "Матовая обработка, натуральная фактура",
    tag: "Ручная работа",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 7,
    name: "Свеча Пион и Молоко",
    category: "Свечи",
    family: "Цветочные",
    price: 4600,
    rating: 4.8,
    reviews: 67,
    stock: 16,
    volume: "210 г",
    feature: "42 часа горения",
    scent: "Пион, рисовое молоко, светлая древесина",
    tag: "Нежный аромат",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=90",
  },
  {
    id: 8,
    name: "Саше После Дождя",
    category: "Ароматы",
    family: "Свежие",
    price: 1900,
    rating: 4.6,
    reviews: 42,
    stock: 24,
    volume: "2 шт.",
    feature: "для шкафа и белья",
    scent: "Зелёный чай, дождь, белый хлопок",
    tag: "Для белья",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1400&q=90",
    gallery: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=90",
  },
];

const reviews = [
  { name: "Мира Л.", text: "Заказ выглядит как подарок самому себе. Всё аккуратно, красиво и без лишнего шума." },
  { name: "Антон С.", text: "Очень приятная упаковка и спокойные ароматы. Видно, что бренд продуман в деталях." },
  { name: "Елена В.", text: "Свечи хорошо смотрятся в интерьере, а запах не перегружает комнату. То, что нужно для дома." },
];

const faqs = [
  { q: "Как выбрать аромат онлайн?", a: "В карточках указаны семейство аромата, ноты и настроение. Для первого заказа советуем начать с бестселлеров или подарочных наборов." },
  { q: "Можно ли вернуть товар?", a: "Да, возврат возможен в течение 14 дней, если товар не использовался и сохранена оригинальная упаковка." },
  { q: "Есть ли подарочная упаковка?", a: "Да, подарочная упаковка доступна для наборов и может быть добавлена к отдельным товарам на этапе оформления." },
];

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[1.8rem] border border-stone-200 bg-white">
      <div className="h-80 animate-pulse bg-stone-100" />
      <div className="space-y-4 p-5">
        <div className="h-3 w-20 rounded-full bg-stone-100" />
        <div className="h-5 w-3/4 rounded-full bg-stone-100" />
        <div className="h-4 w-full rounded-full bg-stone-100" />
        <div className="h-11 rounded-full bg-stone-100" />
      </div>
    </div>
  );
}

function FilterPanel({
  compact = false,
  activeCategory,
  setActiveCategory,
  activeFamily,
  setActiveFamily,
  subtotal,
  closeMobileFilters,
}) {
  return (
    <div className={`${compact ? "" : "sticky top-28 hidden lg:block"} rounded-[1.8rem] border border-stone-200 bg-white p-5 shadow-[0_20px_70px_rgba(28,25,23,0.05)]`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-serif text-2xl tracking-[-0.05em]">Фильтры</h3>
        <SlidersHorizontal size={18} className="text-stone-400" />
      </div>

      <div className="space-y-7">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-stone-400">Категория</p>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  closeMobileFilters?.();
                }}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                  activeCategory === category
                    ? "bg-stone-950 text-white"
                    : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {category}
                {activeCategory === category && <Check size={15} />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-stone-400">Семейство аромата</p>
          <div className="flex flex-wrap gap-2">
            {["Все", ...scentFamilies].map((family) => (
              <button
                key={family}
                onClick={() => {
                  setActiveFamily(family);
                  closeMobileFilters?.();
                }}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeFamily === family
                    ? "bg-[#d8cec0] text-stone-950"
                    : "bg-stone-50 text-stone-600 hover:bg-stone-100"
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#f4efe6] p-5">
          <p className="text-sm font-medium">Бесплатная доставка</p>
          <p className="mt-1 text-sm leading-6 text-stone-500">
            Для заказов от 8 500 ₽. Осталось: {subtotal >= 8500 ? "0 ₽" : formatPrice(8500 - subtotal)}
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-stone-950"
              style={{ width: `${Math.min((subtotal / 8500) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileStorefront({
  filteredProducts,
  activeCategory,
  setActiveCategory,
  query,
  setQuery,
  sort,
  setSort,
  setMobileFilters,
  setQuickView,
  addToCart,
  cartCount,
  subtotal,
}) {
  return (
    <main className="lg:hidden px-4 pb-28 pt-4">
      <section className="relative overflow-hidden rounded-[2rem] bg-[#15110d] p-5 text-white shadow-[0_24px_80px_rgba(28,25,23,0.18)]">
        <img
          src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1200&q=90"
          alt="Коллекция Lumae"
          className="absolute inset-0 h-full w-full object-cover opacity-42"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15110d] via-[#15110d]/55 to-transparent" />
        <div className="relative flex min-h-[420px] flex-col justify-end">
          <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/55">Новая коллекция</p>
          <h1 className="font-serif text-5xl leading-[0.85] tracking-[-0.08em]">
            Ароматы для спокойного дома.
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/68">
            Свечи, диффузоры и подарочные наборы с чистым визуальным стилем.
          </p>
          <a
            href="#mobile-catalog"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#efe6d8] px-5 py-3 text-sm font-medium text-stone-950"
          >
            Смотреть товары <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-2">
        {[["1–3", "дня доставка"], ["14", "дней возврат"], ["8 500 ₽", "до бесплатной"]].map(([value, label]) => (
          <div key={label} className="rounded-3xl bg-white p-3 text-center shadow-sm">
            <p className="font-serif text-2xl tracking-[-0.06em]">{value}</p>
            <p className="mt-1 text-[11px] leading-4 text-stone-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-4xl tracking-[-0.07em]">Категории</h2>
          <button onClick={() => setMobileFilters(true)} className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">
            Фильтры
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm transition ${
                activeCategory === category ? "bg-stone-950 text-white" : "bg-white text-stone-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5 grid gap-3">
        <button
          onClick={() => setQuickView(products[3])}
          className="flex items-center gap-3 rounded-[1.6rem] bg-[#efe6d8] p-3 text-left shadow-sm"
        >
          <img src={products[3].image} alt={products[3].name} className="h-24 w-24 rounded-[1.2rem] object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">Особая коллекция</p>
            <h3 className="mt-1 font-serif text-2xl leading-none tracking-[-0.06em]">Набор для дома</h3>
            <p className="mt-2 text-sm text-stone-600">{formatPrice(products[3].price)}</p>
          </div>
          <Eye size={18} />
        </button>
      </section>

      <section id="mobile-catalog" className="mt-7">
        <div className="sticky top-[58px] z-30 -mx-4 border-y border-stone-200/70 bg-[#f7f3ec]/90 px-4 py-3 backdrop-blur-xl">
          <div className="flex gap-2">
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm">
              <Search size={16} className="text-stone-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Поиск"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400"
              />
            </div>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="w-12 rounded-full bg-white px-2 text-xs outline-none shadow-sm"
              aria-label="Сортировка"
            >
              {sortOptions.map((option) => <option key={option}>{option}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-4 mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-400">Каталог</p>
            <h2 className="font-serif text-4xl tracking-[-0.07em]">Все товары</h2>
          </div>
          <p className="text-sm text-stone-500">{filteredProducts.length} шт.</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <motion.article
              layout
              key={product.id}
              className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm"
            >
              <button onClick={() => setQuickView(product)} className="relative block h-44 w-full overflow-hidden bg-stone-100">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                <span className="absolute left-2 top-2 rounded-full bg-white/85 px-2 py-1 text-[10px] backdrop-blur">
                  {product.tag}
                </span>
              </button>
              <div className="p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] uppercase tracking-[0.18em] text-stone-400">{product.category}</p>
                  <span className="flex items-center gap-1 text-xs"><Star size={11} fill="currentColor" />{product.rating}</span>
                </div>
                <h3 className="min-h-10 font-serif text-xl leading-none tracking-[-0.06em]">{product.name}</h3>
                <p className="mt-2 line-clamp-2 min-h-9 text-xs leading-4 text-stone-500">{product.scent}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="grid h-9 w-9 place-items-center rounded-full bg-stone-950 text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] bg-[#15110d] p-5 text-white">
        <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">О бренде</p>
        <h2 className="mt-3 font-serif text-4xl leading-[0.9] tracking-[-0.07em]">
          Приятные детали без лишнего шума.
        </h2>
        <p className="mt-4 text-sm leading-6 text-white/62">
          Мы делаем ароматы и предметы, которые легко вписать в дом: спокойные оттенки, аккуратная упаковка и мягкое раскрытие аромата.
        </p>
      </section>

      <section className="mt-6 space-y-3">
        {reviews.slice(0, 2).map((review) => (
          <div key={review.name} className="rounded-[1.5rem] bg-white p-4 shadow-sm">
            <div className="mb-3 flex gap-1">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} fill="currentColor" />)}</div>
            <p className="text-sm leading-6 text-stone-600">“{review.text}”</p>
            <p className="mt-3 text-sm font-medium">{review.name}</p>
          </div>
        ))}
      </section>

      <nav className="fixed bottom-3 left-3 right-3 z-40 rounded-full border border-stone-200 bg-white/90 p-2 shadow-[0_20px_70px_rgba(28,25,23,0.18)] backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <a href="#mobile-catalog" className="flex flex-col items-center gap-1 rounded-full py-2 text-stone-600">
            <Grid3X3 size={18} /> Каталог
          </a>
          <button onClick={() => setMobileFilters(true)} className="flex flex-col items-center gap-1 rounded-full py-2 text-stone-600">
            <SlidersHorizontal size={18} /> Фильтры
          </button>
          <button onClick={() => document.dispatchEvent(new CustomEvent("open-cart"))} className="relative flex flex-col items-center gap-1 rounded-full bg-stone-950 py-2 text-white">
            <ShoppingBag size={18} /> {cartCount > 0 ? `${cartCount} шт.` : formatPrice(subtotal)}
          </button>
        </div>
      </nav>
    </main>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeFamily, setActiveFamily] = useState("Все");
  const [sort, setSort] = useState("Популярные");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileFilters, setMobileFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = activeCategory === "Все" || product.category === activeCategory;
      const matchesFamily = activeFamily === "Все" || product.family === activeFamily;
      const matchesQuery = `${product.name} ${product.scent} ${product.family}`
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchesCategory && matchesFamily && matchesQuery;
    });

    if (sort === "Цена по возрастанию") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "Цена по убыванию") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "Сначала новые") result = [...result].sort((a, b) => b.id - a.id);
    if (sort === "Популярные") result = [...result].sort((a, b) => b.reviews - a.reviews);

    return result;
  }, [activeCategory, activeFamily, query, sort]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 8500 || subtotal === 0 ? 0 : 700;
  const total = subtotal + shipping;

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function updateQuantity(id, direction) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + direction) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-stone-950 selection:bg-stone-950 selection:text-white">
      <div className="bg-[#14100c] px-4 py-2.5 text-center text-[11px] uppercase tracking-[0.22em] text-[#efe6d8]/80">
        Подарочная упаковка доступна для всех наборов · Бесплатная доставка от 8 500 ₽
      </div>

      <header className="sticky top-0 z-40 border-b border-[#2a2118]/10 bg-[#f7f3ec]/88 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              className="grid h-10 w-10 place-items-center rounded-full bg-white lg:hidden"
              onClick={() => setMobileFilters(true)}
            >
              <Menu size={18} />
            </button>
            <a href="#top" className="font-serif text-4xl tracking-[-0.1em]">LUMAE</a>
          </div>

          <nav className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.22em] text-stone-500 md:flex">
            <a className="hover:text-stone-950" href="#catalog">Каталог</a>
            <a className="hover:text-stone-950" href="#collections">Коллекции</a>
            <a className="hover:text-stone-950" href="#atelier">О бренде</a>
            <a className="hover:text-stone-950" href="#faq">Помощь</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden h-11 items-center gap-2 rounded-full bg-white px-4 text-sm shadow-sm sm:flex">
              <Heart size={17} /> Избранное
            </button>
            <button
              onClick={() => setCartOpen(true)}
              data-cart-button
              className="relative flex h-11 items-center gap-2 rounded-full bg-stone-950 px-4 text-sm text-white shadow-[0_18px_60px_rgba(28,25,23,0.18)]"
            >
              <ShoppingBag size={17} /> {formatPrice(subtotal)}
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-[#d8cec0] text-xs text-stone-950">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileStorefront
        filteredProducts={filteredProducts}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
        setMobileFilters={setMobileFilters}
        setQuickView={setQuickView}
        addToCart={addToCart}
        cartCount={cartCount}
        subtotal={subtotal}
      />

      <main id="top" className="mx-auto hidden max-w-[1500px] px-4 pb-20 sm:px-8 lg:block lg:px-10">
        <section className="grid gap-4 py-7 lg:grid-cols-[1.45fr_.55fr]">
          <div className="relative overflow-hidden rounded-[2.8rem] bg-[#15110d] p-7 text-white shadow-[0_45px_140px_rgba(28,25,23,0.22)] sm:p-12 lg:min-h-[560px]">
            <img
              src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1800&q=92"
              alt="Коллекция свечей Lumae"
              className="absolute inset-0 h-full w-full object-cover opacity-48"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.16),transparent_30%),linear-gradient(90deg,rgba(20,16,12,0.96),rgba(20,16,12,0.55),rgba(20,16,12,0.1))]" />
            <div className="relative flex h-full max-w-3xl flex-col justify-between gap-20">
              <div>
                <div className="mb-7 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/65 backdrop-blur-xl">
                  Домашние ароматы и предметы для спокойного интерьера
                </div>
                <h1 className="font-serif text-[clamp(4rem,9vw,9.5rem)] leading-[0.76] tracking-[-0.1em]">
                  Ароматы и предметы для дома, в который хочется возвращаться.
                </h1>
                <p className="mt-7 max-w-xl text-xl leading-8 text-white/68">
                  Свечи, диффузоры и предметы для дома с чистым современным дизайном, приятными материалами и спокойной эстетикой.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a href="#catalog" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#efe6d8] px-7 py-4 text-sm font-medium text-[#17130f] transition hover:-translate-y-1">
                  Смотреть каталог <ArrowRight className="transition group-hover:translate-x-1" size={18} />
                </a>
                <span className="text-sm text-white/45">Небольшие коллекции · Продуманная упаковка · Спокойная эстетика</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2.4rem] border border-[#2a2118]/10 bg-[#efe6d8] p-7 shadow-[0_30px_100px_rgba(28,25,23,0.08)]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone-500">Особая коллекция</p>
              <h2 className="mt-4 font-serif text-5xl leading-[0.86] tracking-[-0.08em]">Набор для дома</h2>
              <p className="mt-5 text-sm leading-6 text-stone-600">Подарочный сет с тремя ароматами, фактурной бумагой и хлопковой лентой.</p>
              <button
                onClick={() => setQuickView(products[3])}
                className="mt-7 rounded-full bg-[#17130f] px-5 py-3 text-sm text-white transition hover:-translate-y-0.5"
              >
                Быстрый просмотр
              </button>
            </div>

            <button
              onClick={() => setQuickView(products[0])}
              className="group overflow-hidden rounded-[2.4rem] border border-[#2a2118]/10 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img src={products[0].image} alt={products[0].name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] bg-white/82 p-4 backdrop-blur-xl">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">Выбор покупателей</p>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <h3 className="font-serif text-2xl tracking-[-0.06em]">{products[0].name}</h3>
                    <span className="text-sm font-medium">{formatPrice(products[0].price)}</span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>

        <section className="grid gap-4 border-y border-stone-200 py-5 sm:grid-cols-3">
          {[
            [Truck, "Доставка 1–3 дня", "по Москве и Санкт-Петербургу"],
            [ShieldCheck, "Безопасная оплата", "карта, СБП или сплит"],
            [RotateCcw, "Возврат 14 дней", "если товар не использовался"],
          ].map(([Icon, title, text]) => (
            <div key={title} className="flex items-center gap-4 rounded-3xl bg-white p-4">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-[#f4efe6]"><Icon size={18} /></div>
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-stone-500">{text}</p>
              </div>
            </div>
          ))}
        </section>

        <section id="collections" className="grid gap-5 py-10 md:grid-cols-2">
          {collections.map((collection) => (
            <div key={collection.title} className="group relative min-h-[420px] overflow-hidden rounded-[2.6rem] bg-stone-900 p-8 text-white shadow-[0_35px_110px_rgba(28,25,23,0.12)]">
              <img src={collection.image} alt={collection.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/15 to-transparent" />
              <div className="relative flex h-full flex-col justify-end">
                <p className="text-[11px] uppercase tracking-[0.3em] text-white/55">Коллекция</p>
                <h2 className="mt-3 font-serif text-6xl leading-none tracking-[-0.08em]">{collection.title}</h2>
                <p className="mt-4 max-w-md leading-7 text-white/68">{collection.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section id="catalog" className="grid gap-7 py-10 lg:grid-cols-[300px_1fr]">
          <FilterPanel
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeFamily={activeFamily}
            setActiveFamily={setActiveFamily}
            subtotal={subtotal}
            closeMobileFilters={() => setMobileFilters(false)}
          />

          <div>
            <div className="mb-6 rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-stone-500"><Grid3X3 size={16} /> Найдено товаров: {filteredProducts.length}</div>
                  <h2 className="mt-2 font-serif text-5xl tracking-[-0.08em] sm:text-6xl">Все товары</h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex min-w-0 items-center gap-3 rounded-full bg-[#f7f3ec] px-4 py-3">
                    <Search size={17} className="text-stone-400" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Поиск по товарам"
                      className="min-w-0 bg-transparent text-sm outline-none placeholder:text-stone-400 sm:w-64"
                    />
                  </div>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="rounded-full border-0 bg-[#f7f3ec] px-4 py-3 text-sm outline-none"
                  >
                    {sortOptions.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <button onClick={() => setMobileFilters(true)} className="rounded-full bg-stone-950 px-5 py-3 text-sm text-white lg:hidden">Фильтры</button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
                </motion.div>
              ) : (
                <motion.div key={`${activeCategory}-${activeFamily}-${query}-${sort}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <motion.article
                      layout
                      key={product.id}
                      whileHover={{ y: -6 }}
                      className="group overflow-hidden rounded-[2.2rem] border border-[#2a2118]/10 bg-[#fffdf8] shadow-[0_18px_70px_rgba(28,25,23,0.045)] transition hover:shadow-[0_35px_110px_rgba(28,25,23,0.13)]"
                    >
                      <div className="relative h-[360px] overflow-hidden bg-[#e8ded0]">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-white/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] backdrop-blur">{product.tag}</div>
                        {product.oldPrice && <div className="absolute left-4 top-14 rounded-full bg-stone-950 px-3 py-1.5 text-xs font-medium text-white">Скидка</div>}
                        <div className="absolute right-4 top-4 flex flex-col gap-2">
                          <button className="grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105"><Heart size={17} /></button>
                          <button onClick={() => setQuickView(product)} className="grid h-10 w-10 place-items-center rounded-full bg-white/90 backdrop-blur transition hover:scale-105"><Eye size={17} /></button>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-stone-400">{product.category} · {product.family}</p>
                          <div className="flex items-center gap-1 text-sm"><Star size={14} fill="currentColor" /> {product.rating}</div>
                        </div>
                        <h3 className="font-serif text-3xl leading-none tracking-[-0.07em]">{product.name}</h3>
                        <p className="mt-2 min-h-12 text-sm leading-6 text-stone-500">{product.scent}</p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{formatPrice(product.price)}</span>
                              {product.oldPrice && <span className="text-sm text-stone-400 line-through">{formatPrice(product.oldPrice)}</span>}
                            </div>
                            <p className="mt-1 text-xs text-stone-400">В наличии: {product.stock} шт.</p>
                          </div>
                          <button onClick={() => addToCart(product)} className="grid h-12 w-12 place-items-center rounded-full bg-stone-950 text-white transition hover:scale-105">
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <section id="atelier" className="grid gap-6 py-14 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[2.6rem] bg-[#17130f] p-8 text-white shadow-[0_35px_120px_rgba(28,25,23,0.16)] sm:p-10">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/38">О бренде</p>
            <h2 className="mt-4 font-serif text-6xl leading-[0.85] tracking-[-0.08em]">Предметы, которые приятно получать и использовать.</h2>
            <p className="mt-7 text-lg leading-8 text-white/62">
              Мы уделяем внимание деталям: приятным материалам, спокойным оттенкам, аккуратной упаковке и чистому визуальному стилю.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["01", "Матовые сосуды", "Свечи и диффузоры хорошо смотрятся в интерьере даже после использования."],
              ["02", "Мягкое раскрытие аромата", "Запах не перегружает пространство и остаётся комфортным на каждый день."],
              ["03", "Подарочная упаковка", "Большинство товаров уже готовы для подарка без дополнительных деталей."],
            ].map(([num, title, text]) => (
              <div key={title} className="rounded-[2.2rem] border border-[#2a2118]/10 bg-white p-6 shadow-sm">
                <p className="font-serif text-5xl tracking-[-0.08em] text-[#d2c4b3]">{num}</p>
                <h3 className="mt-10 font-serif text-3xl leading-none tracking-[-0.07em]">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-stone-500">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="reviews" className="grid gap-5 py-10 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex gap-1">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={15} fill="currentColor" />)}</div>
              <p className="leading-7 text-stone-600">“{review.text}”</p>
              <p className="mt-5 font-medium">{review.name}</p>
            </div>
          ))}
        </section>

        <section id="faq" className="grid gap-6 py-10 md:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Помощь покупателю</p>
            <h2 className="mt-3 font-serif text-5xl leading-none tracking-[-0.07em]">Вопросы перед заказом</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="overflow-hidden rounded-[1.6rem] border border-stone-200 bg-white">
                <button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-medium">
                  {faq.q}<ChevronDown className={`transition ${openFaq === index ? "rotate-180" : ""}`} size={18} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-5 leading-7 text-stone-600">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.8rem] bg-[#15110d] p-8 text-white shadow-[0_45px_130px_rgba(28,25,23,0.18)] sm:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_.8fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/40">Письма Lumae</p>
              <h2 className="mt-3 font-serif text-6xl leading-[0.85] tracking-[-0.08em]">Редкие письма о новых ароматах и небольших коллекциях.</h2>
            </div>
            <form className="flex flex-col gap-3 rounded-full bg-white p-2 sm:flex-row">
              <input className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-sm text-stone-950 outline-none placeholder:text-stone-400" placeholder="Ваш email" />
              <button className="rounded-full bg-[#d8cec0] px-7 py-3 text-sm font-medium text-stone-950 transition hover:scale-[1.02]">Подписаться</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="hidden border-t border-stone-200 bg-white/50 lg:block">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-4 px-4 py-10 text-sm text-stone-500 sm:flex-row sm:px-8 lg:px-10">
          <p className="font-serif text-3xl tracking-[-0.08em] text-stone-950">LUMAE</p>
          <p>Интернет-магазин свечей, диффузоров и товаров для дома</p>
        </div>
      </footer>

      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFilters(false)} className="fixed inset-0 z-50 bg-stone-950/30 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-[2rem] bg-[#f7f3ec] p-4 lg:hidden">
              <FilterPanel
                compact
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                activeFamily={activeFamily}
                setActiveFamily={setActiveFamily}
                subtotal={subtotal}
                closeMobileFilters={() => setMobileFilters(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quickView && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setQuickView(null)} className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.96 }} className="fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-[2rem] bg-white shadow-2xl lg:bottom-auto lg:left-1/2 lg:right-auto lg:top-1/2 lg:w-[calc(100%-2rem)] lg:max-w-4xl lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-[2.2rem]">
              <button onClick={() => setQuickView(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-sm"><X size={18} /></button>
              <div className="grid md:grid-cols-2">
                <div className="grid grid-cols-2 gap-2 bg-[#f7f3ec] p-2">
                  <img src={quickView.image} alt={quickView.name} className="col-span-2 h-80 w-full rounded-[1.7rem] object-cover md:h-full" />
                  <img src={quickView.gallery} alt={quickView.name} className="hidden h-36 w-full rounded-[1.4rem] object-cover md:block" />
                  <img src={quickView.image} alt={quickView.name} className="hidden h-36 w-full rounded-[1.4rem] object-cover md:block" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">{quickView.category} · {quickView.family}</p>
                  <h2 className="mt-3 font-serif text-5xl leading-none tracking-[-0.07em]">{quickView.name}</h2>
                  <div className="mt-4 flex items-center gap-2 text-sm"><Star size={15} fill="currentColor" /> {quickView.rating} · {quickView.reviews} отзывов</div>
                  <p className="mt-6 leading-7 text-stone-600">{quickView.scent}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-[#f7f3ec] p-4"><p className="text-stone-400">Объём</p><p className="mt-1 font-medium">{quickView.volume}</p></div>
                    <div className="rounded-2xl bg-[#f7f3ec] p-4"><p className="text-stone-400">Особенность</p><p className="mt-1 font-medium">{quickView.feature}</p></div>
                  </div>
                  <div className="mt-7 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-stone-400">Цена</p>
                      <p className="font-serif text-4xl tracking-[-0.06em]">{formatPrice(quickView.price)}</p>
                    </div>
                    <p className="text-sm text-stone-500">В наличии: {quickView.stock} шт.</p>
                  </div>
                  <button onClick={() => addToCart(quickView)} className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-stone-950 px-6 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5">
                    Добавить в корзину <Plus size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-50 bg-stone-950/30 backdrop-blur-sm" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }} className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-[#f7f3ec] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-200 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-stone-400">Корзина</p>
                  <h2 className="font-serif text-4xl tracking-[-0.07em]">Ваш заказ</h2>
                </div>
                <button onClick={() => setCartOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"><X size={18} /></button>
              </div>

              <div className="flex-1 overflow-y-auto py-5">
                {cart.length === 0 ? (
                  <div className="grid h-full place-items-center rounded-[2rem] border border-dashed border-stone-300 bg-white/60 p-8 text-center">
                    <div>
                      <ShoppingBag className="mx-auto mb-4 text-stone-300" size={42} />
                      <h3 className="font-serif text-3xl tracking-[-0.06em]">Корзина пуста</h3>
                      <p className="mt-3 text-sm leading-6 text-stone-500">Добавьте товар из каталога.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 rounded-[1.6rem] border border-stone-200 bg-white p-3 shadow-sm">
                        <img src={item.image} alt={item.name} className="h-24 w-24 rounded-[1.2rem] object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-3">
                            <h3 className="font-medium leading-snug">{item.name}</h3>
                            <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                          <p className="mt-1 truncate text-xs text-stone-500">{item.scent}</p>
                          <div className="mt-4 flex w-fit items-center gap-2 rounded-full border border-stone-200 bg-[#f7f3ec] p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="grid h-7 w-7 place-items-center rounded-full bg-white"><Minus size={14} /></button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="grid h-7 w-7 place-items-center rounded-full bg-white"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-stone-200 pt-5">
                <div className="mb-5 rounded-3xl bg-white p-4">
                  <div className="mb-3 flex justify-between text-sm"><span>До бесплатной доставки</span><span>{subtotal >= 8500 ? "0 ₽" : formatPrice(8500 - subtotal)}</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#f7f3ec]"><div className="h-full rounded-full bg-stone-950" style={{ width: `${Math.min((subtotal / 8500) * 100, 100)}%` }} /></div>
                </div>
                <div className="space-y-3 text-sm text-stone-600">
                  <div className="flex justify-between"><span>Товары</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Доставка</span><span>{shipping === 0 ? "Бесплатно" : formatPrice(shipping)}</span></div>
                  <div className="flex justify-between text-lg font-medium text-stone-950"><span>Итого</span><span>{formatPrice(total)}</span></div>
                </div>
                <a href="#catalog" onClick={() => setCartOpen(false)} className="mt-5 flex w-full items-center justify-center rounded-full bg-stone-950 px-5 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5">
                  Продолжить оформление
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
