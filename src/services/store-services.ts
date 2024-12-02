import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=30';

const getStoreProducts = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

export const storeService = {
    getStoreProducts,
};