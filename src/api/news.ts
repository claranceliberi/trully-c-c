import { axios } from "../utils/axios";

export const getHeadlines = async (params: Record<'country' | string,string | number | boolean>) => {
    const { data } = await axios.get('/top-headlines', {
        params,
    });
    return data;
}

export const searchHeadlines = async (params: Record<'q' | string,string | number | boolean>) => {
    const { data } = await axios.get('/everything', {
        params,
    });
    return data;
}