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
  mostSold: boolean;
  newAddition: boolean;
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
  gender: string;
  country: string;
  interests: string;
  createdAt:Date,
  role:string
};

export type Order = {
  _id: string;
  userId: string;
  bookList: BookOrder[];
  orderedAt: string;
  totalOrderPrice: number;
};
