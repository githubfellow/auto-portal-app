import { createStore, combineReducers,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/product.reducers';
import { cartReducer } from './reducers/cart.reducers';
import { userRegisterReducer, userLoginReducer } from './reducers/auth.reducers';
import { userProfileReducer, userUpdateProfileReducer } from './reducers/user.reducers';
import { userDetailsForAdminReducer, 
        userListReducer, 
        userRemoveReducer, 
        userUpdateReducer,
        productCreateReducer,
        productUpdateReducer,
        productRemoveReducer,
        orderListReducer } from './reducers/admin.reducers';
import { orderCreateReducer, 
        orderDetailsReducer, 
        orderPayReducer, 
        myOrderListReducer } from './reducers/order.reducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userProfile: userProfileReducer,
    updatingUserProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPayingStatus: orderPayReducer,
    myOrderList: myOrderListReducer,
    usersList: userListReducer,
    userRemove: userRemoveReducer,
    userUpdate: userUpdateReducer,
    userDetailsForAdmin: userDetailsForAdminReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productRemove: productRemoveReducer,
    orderList: orderListReducer
});

const cartProductItemsFromStorage = localStorage.getItem('cart') 
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : '';

const initialState = {
    cart: { 
        cartProductItems: cartProductItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;