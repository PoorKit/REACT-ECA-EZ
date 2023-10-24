import axios, { AxiosResponse } from 'axios';

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
