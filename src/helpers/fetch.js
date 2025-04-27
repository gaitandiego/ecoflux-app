const baseUrl = import.meta.env.VITE_API_URL;
import axios from 'axios';

// Para enviar peticiones al bakend por axios

const cliente = () => {
    const token = localStorage.getItem('token') || null;

    const defaultOptions = {
        token
    };

    const paramsTokenGet = {
        params: { token }
    }

    return {
        get: (endpoint) => axios.get(`${baseUrl}/${endpoint}`, { ...paramsTokenGet }),

        // un post normal en json
        post: (endpoint, data) => axios.post(`${baseUrl}/${endpoint}`, { ...defaultOptions, ...data }),
        // si el post el multipart o necesitas enviar files 
        put: (endpoint, data) => axios.put(`${baseUrl}/${endpoint}`, { ...defaultOptions, ...data }),

        putBody: (endpoint, data) => axios.post(`${baseUrl}/${endpoint}`, { ...defaultOptions, ...data }, { ...headersBody }),

        delete: (endpoint, data) => axios.delete(`${baseUrl}/${endpoint}`, { params: { ...data, token } }),
    };
}

export { cliente }