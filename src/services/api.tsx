import axios, { AxiosResponse } from 'axios';
import { User } from '../interfaces/UserInterface';

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
    return response.data;
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

// export const fetchProducts = async (): Promise<Product[]> => {
  
// }
