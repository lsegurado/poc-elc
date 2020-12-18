/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import productsStore from '../store/productsStore';
import ProductList from './productList';

export default class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    toggleSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        e.preventDefault();
        productsStore.setSearchText(e.target.value);
    }

    /**
     * Renders the default menu of the app.
     * 
     * @returns JSX
     * @memberof Menu
    */
    render() {
        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT&apos;S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.toggleSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                {this.state.showingSearch && <div className="search-container">
                    <input autoFocus aria-label="Type to search products" placeholder="Search" type="text" onChange={(e) => this.onSearch(e)} />
                    <a href="#" onClick={(e) => this.toggleSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>
                    <ProductList/>
                </div>}
            </header>
        );
    }


}