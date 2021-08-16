import React from 'react'
import { Route,Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox';

import { signout } from '../actions/userActions';

const Navbar = ({ setSidebarIsOpen }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;


    const signoutHandler = () => {
        dispatch(signout());
  };
    return (
        <div>
            <header className="row">
                <div>
                    <button
                    type="button"
                    className="open-sidebar"
                    onClick={() => setSidebarIsOpen(true)}
                    >
                    <i className="fa fa-bars"></i>
                    </button>
                    <Link className="brand" to="/">
                     Web shop
                    </Link>
                </div>
                <div>
                    <Route
                    render={({ history }) => (
                        <SearchBox history={history}></SearchBox>
                    )}
                    ></Route>
                </div>
                <div>
                    <Link to="/cart">
                    Cart
                    {cartItems.length > 0 && (
                        <span className="badge">{cartItems.length}</span>
                    )}
                    </Link>
                    {userInfo ? (
                    <div className="dropdown">
                        <Link to="#">
                        {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                        </Link>
                        <ul className="dropdown-content">
                        <li>
                            <Link to="/profile">User Profile</Link>
                        </li>
                        <li>
                            <Link to="/orderhistory">Order History</Link>
                        </li>
                        <li>
                            <Link to="#signout" onClick={signoutHandler}>
                            Sign Out
                            </Link>
                        </li>
                        </ul>
                    </div>
                    ) : (
                    <Link to="/signin">Sign In</Link>
                    )}
                    {userInfo && userInfo.isSeller && (
                    <div className="dropdown">
                        <Link to="#admin">
                        Seller <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                        <li>
                            <Link to="/productlist/seller">Products</Link>
                        </li>
                        <li>
                            <Link to="/orderlist/seller">Orders</Link>
                        </li>
                        </ul>
                    </div>
                    )}
                    {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                        <Link to="#admin">
                        Admin <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/productlist">Products</Link>
                        </li>
                        <li>
                            <Link to="/orderlist">Orders</Link>
                        </li>
                        <li>
                            <Link to="/userlist">Users</Link>
                        </li>
                        <li>
                            <Link to="/support">Support</Link>
                        </li>
                        </ul>
                    </div>
                    )}
                </div>
        </header>
        </div>
    )
}

export default Navbar
