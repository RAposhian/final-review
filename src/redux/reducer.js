const initialState = {
   user: {}
}

const SET_USER = 'SET_USER';

export const setUser = (userObj) => {
   return {
      type: SET_USER,
      payload: userObj
   }
}

export default function reducer(state = initialState, action) {
   const {type, payload} = action;
   switch(type) {
      case SET_USER:
         return {...state, user: payload}
      default: 
         return state;
   }
}