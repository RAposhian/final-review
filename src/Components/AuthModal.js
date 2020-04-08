import React, {useState} from 'react';
import axios from 'axios';
import {connect} from  'react-redux';
import {setUser} from '../redux/reducer';

const AuthModal = props => {
    const [emailInput, setEmailInput] = useState(''),
          [passInput, setPassInput] = useState('');
    
    const login = () => {
        axios.post('/api/login', {email: emailInput, password: passInput})
        .then(res => {
            props.setUser(res.data)
            props.toggleFn()
        }
        )
        .catch(err => console.log(err))
    }

    const register = () => {
        axios.post('/api/register', {email: emailInput, password: passInput})
        .then(res => {
            props.setUser(res.data)
            props.toggleFn()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='auth-modal'>
            <input 
                value={emailInput}
                placeholder='Email'
                onChange={e => setEmailInput(e.target.value)}/>
            <input  
                value={passInput}
                type='password'
                placeholder='Password'
                onChange={e => setPassInput(e.target.value)}/>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
            <button onClick={props.toggleFn}>Cancel</button>
        </div>
    )
}

export default connect(null, {setUser})(AuthModal);