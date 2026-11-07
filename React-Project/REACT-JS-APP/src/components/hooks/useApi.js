const useApi = () => {
    
    const baseUrl = "https://academia.conquerblocks.com/playground/api/v1/";

    const defaultHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    const baseRequest = async (endpoint, options = {}) => {
        const endpointUrl = `${baseUrl} ${endpoint}`
        options = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        }
        const response = await fetch(endpointUrl, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error interno de la API. Intente mas tarde");
        }
        return data;
    }

    const get = async (endpoint) => {
        return await baseRequest(endpoint);
    }

    const post = async (endpoint, payload) => {
        return await baseRequest(endpoint, {
            method: "POST",
            body: JSON.stringify(payload)
        });
    }

    return {
        get,
        post
    }
}

export default useApi;