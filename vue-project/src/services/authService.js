import axios from 'axios';

const API_URL = 'https://laravel-e23.herokuapp.com/api/';

const getAdminUser = () => {
  return JSON.parse(localStorage.getItem('admin')); 
};

const authHeader = () => {
  const user = getAdminUser();

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
};

const checkAdmin = async () => {
  try {
    const response = await axios.get(API_URL + 'admin-check', { headers: authHeader() });
    return response.data.isAdmin;
  } catch (error) {
    throw error;
  }
};

export default {
  getAdminUser,
  checkAdmin
};
