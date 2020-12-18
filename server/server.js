/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to implement a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
import productsData from './data'
import express from 'express'
import { port, backendURL } from '../shared/constants';
import sanitize from 'sanitize';

const app = express();
app.use(sanitize.middleware);

/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
app.get('/', (req, res) => {
    res.send('Server is OK')
})

/**
     * Indicates that the product matches its name.
     * 
     * @returns [Boolean] If true the product matches.
    */
function filterProductsWithName(product, name) {
    const lowerCaseName = name.toLowerCase();
    //  Product should match with its name or some tag
    return product.name.toLowerCase().includes(lowerCaseName) || product.tags.find(tag => tag.toLowerCase().includes(lowerCaseName))
}

app.get('/products', (req, res) => {
    const name = req.queryString('name');
    const pageSize = req.queryInt('pageSize');
    const pageNumber = req.queryInt('pageNumber');
    let filterResult = productsData.filter(product => filterProductsWithName(product, name));
    let hasMoreProducts = false;

    if (pageSize !== undefined && pageNumber !== undefined) {
        const pageStart = pageSize * pageNumber;
        const pageEnd = pageStart + pageSize;
        hasMoreProducts = pageEnd < filterResult.length;
        filterResult = filterResult.slice(pageStart, pageEnd);
    }

    res.header('Access-Control-Allow-Origin', '*');
    res.send({ products: filterResult, hasMoreProducts })
})

app.listen(port, () => {
    console.log(`[Server running on ${backendURL}`)
})