import axios from 'axios';
import mockDataService from './MockDataService';
import { IS_MOCK } from '../constants/runtime.constant';


const apiService = {
    getCategoryData: async (payload) => {
        if (IS_MOCK) return mockDataService.getCategoryData(payload);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/category`);
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 1 data:', error);
            // throw error;
        }
    },

    postCategoryData: async (payload) => {
        if (IS_MOCK) return mockDataService.postCategoryData(payload);
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/category`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    updateCategoryData: async (id, payload) => {
        if (IS_MOCK) return mockDataService.updateCategoryData(id, payload);
        try {
            let response = await axios.patch(`${process.env.REACT_APP_API_HOST}/category/${id}`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    getQuotes: async (payload) => {
        if (IS_MOCK) return mockDataService.getQuotes(payload);
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_HOST}/quotes`);
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    quoteUploads: async (payload) => {
        if (IS_MOCK) return mockDataService.quoteUploads(payload);
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/quotes/upload`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },


    deleteQuote: async (payload) => {
        if (IS_MOCK) return mockDataService.deleteQuote(payload);
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/quotes/upload`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },


    imageUpload: async (payload) => {
        if (IS_MOCK) return mockDataService.imageUpload(payload);
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/image/upload`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    templateUpload: async (payload) => {
        if (IS_MOCK) return mockDataService.templateUpload(payload);
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/category/${payload.categoryId}/image`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    getTemplates: async (catId) => {
        if (IS_MOCK) return mockDataService.getTemplates(catId);
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_HOST}/category/${catId}/image`,);
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    imageUploadToWP: async (payload) => {
        if (IS_MOCK) return mockDataService.imageUploadToWP(payload);
        try {
            const response = await axios.post('https://gratifytech.com/admin/wp-json/wp/v2/media', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Basic YWRtaW46Z3JJTyBjOUh1IFJVTHcgZ1htcSBLS09tIFNRZjg=', // Your base64-encoded credentials
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    schedulePost: async (payload) => {
        if (IS_MOCK) return mockDataService.schedulePost(payload);
        try {
            const response = await axios.post('https://gratifytech.com/admin/wp-json/wp/v2/posts', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic YWRtaW46Z3JJTyBjOUh1IFJVTHcgZ1htcSBLS09tIFNRZjg=', // Your base64-encoded credentials
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

};

export default apiService;
