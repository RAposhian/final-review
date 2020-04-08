import React, {Component} from 'react';
import axios from 'axios';
import AuthModal from './AuthModal';
import {connect} from 'react-redux';

class Products extends Component {
    constructor(props){
        super(props)

        this.state = {
            products: [],
            showModal: false
        }
    }

    componentDidMount = () => {
        axios.get('/api/products')
        .then(res => this.setState({products: res.data}))
        .catch(err => console.log(err));
    }

    handleToggle = () => {
        this.setState({showModal: !this.state.showModal})
    }

    addToCart = (id, price) => {
        if(this.props.user.email) {
            axios.post('/api/cart-item', {cart_id: this.props.user.cart_id, product_id: id, price})
            .then(() => {
                window.alert('Item added to cart')
            })
            .catch(err => console.log(err))
        } else {
            this.handleToggle()
        }
    }

    render(){
        let displayProducts = this.state.products.map((e, i) => {
            return (
                <div key={i} className='product-container'>
                    <img src={e.image} alt={e.name} className='product-image'/>
                    <h1>{e.name}</h1>
                    <p>{e.description}</p>
                    <p>${e.price}</p>
                    <button onClick={() => this.addToCart(e.product_id, e.price)}>Add To Cart</button>
                </div>
            )
        })
        return (
            <div className='products'>
                {displayProducts}
                {this.state.showModal
                ? <AuthModal toggleFn={this.handleToggle}/>
                : null}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Products);