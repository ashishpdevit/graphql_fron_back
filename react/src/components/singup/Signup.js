import React, { useState } from 'react';
// import './signup.css'
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { setToken } from '../../pages/Auth';

const SIGNUP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password){
        token,
        user {
          id
          username
          email
        }
    }
  }
`;

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [singUp] = useMutation(SIGNUP_USER);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { data } = await singUp({ variables: { username, email, password } });
        const userData = data?.signUp.user;
        const token = data?.signUp?.token;
        if (token) {
            setToken(token);
            toast.success("Registered successfully!");
            navigate('/users');
        } else {
            // setIsLoggedIn(true)
            toast.error("something went wrong!");
            navigate('/');
        }
    };

    return (
        <>
            <div id="app">
                <div className="wrapper">
                    <div className="d-lg-flex half">
                        <div className="contents order-2 order-md-2">
                            <div className="container">
                                <div className="row lg-box align-items-center justify-content-center">
                                    <div className="col-md-7 col-sm-12 m-2">
                                        <div className="text-center">
                                            {/* <img src="assets/img/gov.png" title="Inspector General of Registration" className="img-fluid" width="150" alt="Inspector General of Registration"/> */}
                                            <h2 className="heading">Signup</h2>
                                        </div>
                                        <form className="needs-validation" novalidate="" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label for="email">Username</label>
                                                <input type="text"
                                                    id="username"
                                                    value={username}
                                                    onChange={(event) => setUsername(event.target.value)}
                                                    required
                                                    className="form-control" 
                                                    name="username" />
                                                <div className="invalid-feedback">
                                                    Please fill in your Username
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="email">Email</label>
                                                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="form-control" name="email" tabindex="1" required autofocus />
                                                <div className="invalid-feedback">
                                                    Please fill in your email
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="password" className="control-label">Password</label>
                                                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="form-control" name="password" tabindex="2" required />
                                                <div className="invalid-feedback">
                                                    please fill in your password
                                                </div>
                                            </div>
                                            <div className="form-group mt-5">
                                                <button tabindex="4" className="btn btn-primary btn-lg btn-block" type="submit">Sign Up</button>
                                                <p>Already registered? <Link style={{color:"#4f5ece"}} to="/login">Login</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
