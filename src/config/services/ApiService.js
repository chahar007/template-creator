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


    deleteQuote: async (payload) => {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/quotes/upload`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },


    imageUpload: async (payload) => {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/image/upload`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    templateUpload: async (payload) => {
        try {
            let response = await axios.post(`${process.env.REACT_APP_API_HOST}/category/${payload.categoryId}/image`, payload, {});
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    getTemplates: async (catId) => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_HOST}/category/${catId}/image`,);
            return response.data;
        } catch (error) {
            // console.error('Error fetching dropdown 2 data:', error);
            //throw error;
        }
    },

    imageUploadToWP: async (payload) => {
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
    },


    bulkTemplateUpload: async (payload) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/temporaryposts/bulk`, payload);
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    getBulkUpload: async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_HOST}/temporaryposts?status=new`);
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    goLive: async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/socialmedia/golive`);
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }




};

export default apiService;
