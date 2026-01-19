export type Category = "shoes" | "suits" | "food" | "drinks";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  category: Category;
  quantity?: number;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Nike Air Max",
    image: "/images/nike.jpg",
    price: 150,
    category: "shoes",
    quantity: 0,
  },
  {
    id: "4",
    name: "Nike Running Shoes",
    image: "/images/nike3.jpg",
    price: 180,
    category: "shoes",
    quantity: 0,
  },
  {
    id: "7",
    name: "Nike Casual Shoes",
    image: "/images/nike2.jpg",
    price: 130,
    category: "shoes",
    quantity: 0,
  },
  {
    id: "2",
    name: "Men Black Suit",
    image: "/images/suitblack.jpg",
    price: 200,
    category: "suits",
    quantity: 0,
  },
  {
    id: "5",
    name: "Men Blue Suit",
    image: "/images/suitblue.jpg",
    price: 220,
    category: "suits",
    quantity: 0,
  },
  {
    id: "6",
    name: "Men Green Suit",
    image: "/images/suitgreen.jpg",
    price: 210,
    category: "suits",
    quantity: 0,
  },
  {
    id: "3",
    name: "Pepperoni Pizza",
    image: "/images/pizza.jpg",
    price: 80,
    category: "food",
    quantity: 0,
  },
  {
    id: "8",
    name: "Instant Noodles",
    image: "/images/nooles.jpg",
    price: 30,
    category: "food",
    quantity: 0,
  },
  {
    id: "100",
    name: "Hot Coffee",
    image: "/images/coffee.jpg",
    price: 50,
    category: "drinks",
    quantity: 0,
  },
  {
    id: "101",
    name: "Cold Brew Coffee",
    image: "/images/coffee1.jpg",
    price: 60,
    category: "drinks",
    quantity: 0,
  }
];
