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
        return ProductsStore.products.length > 0 && <InfiniteScroll
            pageStart={0}
            loadMore={(pageNumber) => ProductsStore.fetchMoreProducts(pageNumber)}
            hasMore={ProductsStore.hasMoreProducts}
            useWindow={true} className="productList">
            {ProductsStore.products.map(x => <Product key={x._id} {...x} />)}
        </InfiniteScroll>
    }
}

export default ProductList