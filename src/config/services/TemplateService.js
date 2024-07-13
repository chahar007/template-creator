import axios from 'axios';

const API_BASE_URL = 'https://your.api.base.url'; // Replace with your API base URL

const apiService = {
    fetchDropdownData1: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dropdown1`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dropdown 1 data:', error);
            throw error;
        }
    },

    fetchDropdownData2: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/dropdown2`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dropdown 2 data:', error);
            throw error;
        }
    },
};

export default apiService;
