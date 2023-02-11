import { http } from "../../services/http.service";
import { Product } from "../../types/type";


export const getProducts = async  () : Promise<Product[]> => {
    return await (await http.get('/products', {
        baseURL: 'https://fakestoreapi.com/'
    })).data
}