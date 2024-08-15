import axios from 'axios';


const loginService = {
    login: async (payload) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching dropdown 1 data:', error);
            throw error;
        }
    },

    syncTime: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/health`);
            return response.data;
        } catch (error) {
            console.error('Error fetching dropdown 1 data:', error);
            throw error;
        }
    },


};

export default loginService;
