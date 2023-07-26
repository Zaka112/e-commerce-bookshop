export type Book = {
  _id: string;
  isbn: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string[];
  quantity: number;
  author: string[];
  publisher: string;
  publishedDate: Date;
  onSale: boolean;
  mostSold: false;
  newAddition: false;
};

export type BookOrder = Book & {
  counter: number;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  age: number;
  gender: string;
  country: string;
  phone: number;
  interests: string;
};

export type Order = {
  _id: string;
  userId: string;
  bookList: BookOrder[];
  orderedAt: string;
  total: number;
};
