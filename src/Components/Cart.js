import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class Cart extends Component {
   constructor(props){
       super(props);

       this.state = {
            cart: []
       }
   }
   
   componentDidMount = () => {
       this.getCart()
   }

   getCart = () => {
    axios.get(`/api/cart/${this.props.user.cart_id}`)
    .then(res => this.setState({cart: res.data}))
    .catch(err => console.log(err));
   }

   deleteCartItem = (id) => {
       axios.delete(`/api/cart-item/${id}`)
       .then(() => {
           this.getCart()
       })
       .catch(err => console.log(err))
   }
   
    render(){
        let cartItems = this.state.cart.map((e, i) => {
            return (
                <div key={i} className='product-container'>
                    <img src={e.image} alt={e.name} className='product-image'/>
                    <h1>{e.name}</h1>
                    <p>{e.description}</p>
                    <p>${e.price}</p>
                    <button onClick={() => this.deleteCartItem(e.cart_item_id)}>Remove Item</button>
                </div>
            )
        })
        return (
            <div className='products'>
                {cartItems}
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Cart);