import axios from 'axios';


const apiService = {
    getCategoryData: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/list/cat`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dropdown 1 data:', error);
            throw error;
        }
    },

    postCategoryData: async (payload) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/add/cat`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching dropdown 2 data:', error);
            throw error;
        }
    },
};

export default apiService;
