type Rate = {
  rate: number;
  count: number;
};
type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  rating: Rate;
};
type Geolocation = {
  lat: string;
  long: string;
};

type Name = {
  firstname: string;
  lastname: string;
};

type Profile = {
  address: {
    geolocation: Geolocation;
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  name: Name;
  phone: string;
};

export { Rate, Product, Geolocation, Name, Profile };
