
import axios from 'axios';

const API_BASE_URL = 'http://146.190.118.121/api';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchTableData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/table`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
