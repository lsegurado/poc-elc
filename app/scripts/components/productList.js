import { observer } from "mobx-react";
import React from "react"
import ProductsStore from '../store/productsStore'
import Product from "./product";
import InfiniteScroll from 'react-infinite-scroller';

@observer
class ProductList extends React.Component {

    /**
     * Renders a product list with pagination.
     * 
     * @returns JSX
     * @memberof ProductList
    */
    render() {
        const hasProducts = ProductsStore.products && ProductsStore.products.length > 0;
        if (ProductsStore.searchText !== "" && !hasProducts) {
            return <span className="noProductsFound">No results found. We suggest double-checking the spelling or searching for a similar term.</span>
        } else if (hasProducts) {
            return <InfiniteScroll
                pageStart={0}
                loadMore={(pageNumber) => ProductsStore.fetchMoreProducts(pageNumber)}
                hasMore={ProductsStore.hasMoreProducts}
                useWindow={true} className="productList">
                {ProductsStore.products.map(x => <Product key={x._id} {...x} />)}
            </InfiniteScroll>
        }
        return null;
    }
}

export default ProductList