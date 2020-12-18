import { observable, action, makeObservable } from 'mobx'
import productsApiHelper from '../../api_helpers/productsApiHelper';
import { configure } from "mobx"

configure({
    enforceActions: "never",
})

class ProductsStore {
    @observable products = [];
    @observable searchText = '';
    @observable hasMoreProducts = false;
    pageSize = 10;

    constructor() {
        makeObservable(this);
    }

    /**
     * Fetch a new set of products.
     * 
     * @param newSearchText [String] - the search text
     * @memberof ProductsStore
    */
    @action
    setSearchText(newSearchText) {
        if (newSearchText) {
            productsApiHelper.getProducts(newSearchText, this.pageSize, 0).then(result => {
                this.hasMoreProducts = result.hasMoreProducts;
                this.products = result.products;
                this.searchText = newSearchText;
            })
        } else {
            this.products = [];
            this.searchText = newSearchText;
        }
    }

    /**
     * Fetch more products.
     * 
     * @param pageNumber [Number] - the page number to fetch
     * @memberof ProductsStore
    */
    @action
    fetchMoreProducts(pageNumber) {
        productsApiHelper.getProducts(this.searchText, this.pageSize, pageNumber).then(result => {
            this.hasMoreProducts = result.hasMoreProducts;
            this.products = this.products.concat(result.products);
        })
    }
}

const instance = new ProductsStore();

export default instance;