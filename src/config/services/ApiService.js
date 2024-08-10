import axios from 'axios';


const apiService = {
    getCategoryData: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/category`);
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 1 data:', error);
            // throw error;
        }
    },

    postCategoryData: async (payload) => {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/category`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    updateCategoryData: async (id, payload) => {
        try {
            let response = await axios.patch(`${process.env.REACT_APP_API_HOST}/category/${id}`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    getQuotes: async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_HOST}/quotes`);
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    quoteUploads: async (payload) => {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/quotes/upload`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },


    templateImageUpload: async (payload) => {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/image/upload`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    }


};

export default apiService;
