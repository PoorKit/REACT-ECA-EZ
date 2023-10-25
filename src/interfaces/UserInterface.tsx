export interface User extends UserDetails {
  id: number;
}

export interface UserDetails {
  email: string;
  username: string;
  password: string;
  name: Name;
  address: Address;
  phone: string;
}

export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: Geolocation;
}

export interface Geolocation {
  lat: string;
  long: string;
}

export interface Name {
  firstname: string;
  lastname: string;
}
