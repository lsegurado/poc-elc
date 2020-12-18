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
    typingTimer;

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
            this.waitUntilFinishesWriting(() => {
                productsApiHelper.getProducts(newSearchText, this.pageSize, 0).then(result => {
                    this.hasMoreProducts = result.hasMoreProducts;
                    this.products = result.products;
                    this.searchText = newSearchText;
                })
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

    /**
     * Wait for another input to avoid unnecessary api calls.
     * 
     * @param callback [Function] - callback to call after the timeout
     * @memberof ProductsStore
    */
    waitUntilFinishesWriting(callback) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(callback, 500);//Wait 1/2 second
    }
}

const instance = new ProductsStore();

export default instance;