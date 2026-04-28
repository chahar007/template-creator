import axios from 'axios';
import mockDataService from './MockDataService';
import { IS_MOCK } from '../constants/runtime.constant';


const loginService = {
    login: async (payload) => {
        if (IS_MOCK) return mockDataService.login(payload);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/login`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching dropdown 1 data:', error);
            throw error;
        }
    },

    syncTime: async () => {
        if (IS_MOCK) return mockDataService.syncTime();
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
