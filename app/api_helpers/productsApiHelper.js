import ApiHelperBase from "./apiHelperBase";
import { backendURL } from '../../shared/constants';

class ProductsApiHelper extends ApiHelperBase {
    endpoint = '/products';
    constructor() {
        super(backendURL);
    }
    async getProducts(name, pageSize, pageNumber) {
        return await super.get(this.endpoint, { name, pageSize, pageNumber });
    }
}

export default new ProductsApiHelper();