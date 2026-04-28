import axios from 'axios';
import mockDataService from './MockDataService';
import { IS_MOCK } from '../constants/runtime.constant';


const apiService = {
    fetchDropdownData1: async () => {
        if (IS_MOCK) return mockDataService.fetchDropdownData1();
        // try {
        //     const response = await axios.get(`${process.env.REACT_APP_API_HOST}/dropdown1`);
        //     return response.data;
        // } catch (error) {
        //     console.error('Error fetching dropdown 1 data:', error);
        //     throw error;
        // }
    },

    fetchDropdownData2: async () => {
        if (IS_MOCK) return mockDataService.fetchDropdownData2();
        // try {
        //     const response = await axios.get(`${process.env.REACT_APP_API_HOST}/dropdown2`);
        //     return response.data;
        // } catch (error) {
        //     console.error('Error fetching dropdown 2 data:', error);
        //     throw error;
        // }
    },
};

export default apiService;
