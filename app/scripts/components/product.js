import React from "react";
import PropTypes from 'prop-types';

class Product extends React.Component {

    /**
     * Renders a single product.
     * 
     * @returns JSX
     * @memberof Product
    */
    render() {
        const { isActive,
            price,
            picture,
            name,
            about } = this.props;

            const isActiveBool = JSON.parse(isActive)
        return (
            <div className="product">
                <span className="product_name">{name}</span>
                <span className="product_about">{about}</span>
                <img disabled={!isActiveBool} className="product_image" height="280" alt={name} src={picture} />
                <div className="product_footer">
                    <span className="product_price">${price}</span>
                    <button disabled={!isActiveBool} className="product_buy">{isActiveBool ? 'add to bag': 'sold out'}</button>
                </div>

            </div>
        )
    }
}

Product.propTypes = {
    isActive: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired
}


export default Product;