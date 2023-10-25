import axios, { AxiosResponse } from 'axios';
import { User } from '../interfaces/UserInterface';
import { Product } from '../interfaces/ProductInterface';
import { Cart, ReturnedCart } from '../interfaces/CartInterface';

const apiUrl = 'https://fakestoreapi.com';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const login = async (userData: LoginRequest): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${apiUrl}/auth/login`,
      userData
    );
    if (response.data){
      return response.data;
    } 
  } catch (error) {
    throw error;
  }
}; 

export const findMe = async (enteredUsername: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${apiUrl}/users`);
    const users: User[] = response.data;
    
    // Find the user with the entered username
    const user = users.find((user) => user.username === enteredUsername);

    if (user) {
      return user;
    } else {
      return null; // User not found
    }
  } catch (error) {
    throw error;
  }
};

export const editMe = async (userDetails: User): Promise<User> =>{
  try{
    const response = await axios.put(`${apiUrl}/users/${userDetails.id}`, userDetails);
    if (response.data){
      return response.data;
    }
  }catch(error){
    throw error;
  }
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const sendCart = async (cartData: Cart): Promise<ReturnedCart> => {
  try {
      const response = await axios.post('https://fakestoreapi.com/carts', cartData);
      return response.data;
  } catch (error) {
      throw new Error('Failed to create cart: ' + error.message);
  }
};
