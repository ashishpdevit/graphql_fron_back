import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApolloClient, ApolloProvider, gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
// import './login.css';
// import '../../public/assets/css/style.css'
// import '../../public/assets/css/components.css'
// import '../../public/assets/css/custom.css'

// import '../../public/assets/css/app.min.css'
// import '../../public/assets/bundles/bootstrap-social/bootstrap-social.css'




import { getToken, isAuthenticated, setToken, setUserName } from '../../pages/Auth';

// import client from '../../common'

// mutation to login user
const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
      token,
      user {
        id
        username
        email
      }
    }
  }
`;

const Login = ({ onLogin }) => {
    // const loaderRef = useRef(null);
    // console.log(loaderRef);


    const [user, getUser] = useState({});

    const [login] = useMutation(LOGIN_USER);
    const navigate = useNavigate();
    const [email, setEmail] = useState('aayush.solanki@devitpl.com');
    const [password, setPassword] = useState('Admin@123');

    // const token = getToken();
    // useEffect(() => {
    //     if (token) {
    //         navigate('/users')
    //     } else{
    //         navigate('/login')
    //     }
    //   }, [])
    //   console.log(token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ variables: { email, password } });
            const userData = data?.login.user;
            console.log(userData);
            getUser(userData)
            const token = data?.login?.token;
            if (token) {
                // localStorage.setItem('token', token);
                onLogin({ userData });
                setToken(token);
                setUserName(userData)
                toast.success("Login successfully !");
                navigate('/users');

                document.addEventListener("DOMContentLoaded", function(event) { 
                    console.log("73",document.getElementsByClassName("loader"));
                    document.getElementsByClassName("loader").style.display = "none"
                  });
            } else {
                // setIsLoggedIn(true)
                toast.error("Failed to login. Please check your credentials.");
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message);
            navigate('/users');
            console.error('Error Login', error.message);
        }
    };


    return (
        // <div className='loginform-container'>
        //     <h2>Login</h2>
        //     <form onSubmit={handleSubmit}>
        //         <div>
        //             <label htmlFor="username">Email</label>
        //             <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //         </div>
        //         <div>
        //             <label htmlFor="password">Password</label>
        //             <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //         </div>
        //         <button className="login-button" type="submit">Login</button>
        //     </form>
        // </div>
        <div id="app">
            <div className="wrapper">
                <div className="d-lg-flex half">
                    {/* <div className="bg order-1 order-md-2">
                        <div className="container">
                            <div className="row notice-box">
                                <div className="col-12 col-sm-12 col-lg-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4>Important Notices</h4>
                                        </div>
                                        <div className="card-body">
                                            <div id="support-scroll1">
                                                <ul className="list-unstyled ">
                                                    <li className="media border-bottom m-b-15 support-ticket">
                                                        <img alt="image" className="mr-3 user-img" width="40" src="assets/img/users/user-5.png"/>
                                                            <div className="media-body">
                                                                <div className="media-title mb-1"><a href="#!">જાહેરનામુ ડાઉનલોડ</a></div>
                                                                <div className="text-muted font-12">05 March 2023</div>
                                                                <div className="media-description">સરકારશ્રીના જાહેરનામા ક્રમાંક:ગસ/૨૬/૨૦૨૩/જસર/૧૦૨૦૨૨/૬૦૩/ઘ, તારીખ:૦૪/૧૧/૨૦૨૩ થી દિવાળી પછીની તારીખ:૧૩/૧૧/૨૦૨૩ ના રોજ સોમવારને રજા જાહેર કરેલ હોઇ તા.૧૩/૧૧/૨૦૨૩ ના રોજ બુક થયેલ તમામ ટોકન અનબ્લોક કરવામાં આવેલ છે.</div>
                                                            </div>
                                                    </li>
                                                    <li className="media border-bottom m-b-15 support-ticket">
                                                        <img alt="image" className="mr-3 user-img" width="40" src="assets/img/users/user-5.png"/>
                                                            <div className="media-body">
                                                                <div className="media-title mb-1"><a href="#!">જાહેરનામુ ડાઉનલોડ 1</a></div>
                                                                <div className="text-muted font-12">05 March 2023</div>
                                                                <div className="media-description">સરકારશ્રીના જાહેરનામા ક્રમાંક:ગસ/૨૬/૨૦૨૩/જસર/૧૦૨૦૨૨/૬૦૩/ઘ, ના રોજ કરવામાં આવેલ છે.</div>
                                                            </div>
                                                    </li>
                                                    <li className="media border-bottom m-b-15 support-ticket">
                                                        <img alt="image" className="mr-3 user-img" width="40" src="assets/img/users/user-5.png"/>
                                                            <div className="media-body">
                                                                <div className="media-title mb-1"><a href="#!">જાહેરનામુ ડાઉનલોડ 2</a></div>
                                                                <div className="text-muted font-12">05 March 2023</div>
                                                                <div className="media-description">સરકારશ્રીના જાહેરનામા ક્રમાંક:ગસ/૨૬/૨૦૨૩/જસર/૧૦૨૦૨૨/૬૦૩/ઘ</div>
                                                            </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> */}
                    <div className="contents order-2 order-md-2">
                        <div className="container">
                            <div className="row lg-box align-items-center justify-content-center">
                                <div className="col-md-7 col-sm-12 m-2">
                                    <div className="text-center">
                                        {/* <img src="assets/img/gov.png" title="Inspector General of Registration" className="img-fluid" width="150" alt="Inspector General of Registration"/> */}
                                        <h2 className="heading">Login</h2>
                                        <h5>(React + GraphQL Demo)</h5>
                                    </div>
                                    <form className="needs-validation" novalidate="" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label for="email">Email</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" className="form-control" name="email" tabindex="1" required autofocus />
                                            <div className="invalid-feedback">
                                                Please fill in your email
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="d-block">
                                                <label for="password" className="control-label">Password</label>
                                                <div className="float-right">
                                                    <a href="auth-forgot-password.html" className="text-small">
                                                        Forgot Password?
                                                    </a>
                                                </div>
                                            </div>
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" className="form-control" name="password" tabindex="2" required />
                                            <div className="invalid-feedback">
                                                please fill in your password
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" name="remember" className="custom-control-input" tabindex="3" id="remember-me" />
                                                <label className="custom-control-label" for="remember-me">Remember Me</label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button tabindex="4" className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
