import React, { createContext, useContext } from 'react';
import { Route, Navigate, Routes, Router } from 'react-router-dom';
import { isAuthenticated } from './Auth';
import Home from '../components/home/Home';
export const Context = createContext()

function ProtectedRoute({ element, currentUser,...rest }) {  
  // console.log(currentUser?.userData);// Check if the user is authenticated
  const isAuthenticatedUser = isAuthenticated(); // Implement this function

  return isAuthenticatedUser ? (
    <Context.Provider value={currentUser?.userData}>
      <Routes>
        <Route {...rest} element={element} />
      </Routes>
    </Context.Provider>
  ) : (
    // Redirect to login if not authenticated
    <Navigate to="/" replace />
  )
};

export default ProtectedRoute;


// import { useEffect } from 'react';
// // import { useRouter } from 'next/router';
// import { getToken, isAuthenticated } from './Auth';
// // import 'react-toastify/dist/ReactToastify.css';
// // import cookies from 'js-cookie';
// import { Route, useNavigate } from 'react-router-dom';
// import CreateEditUser from '../components/users/CreateEditUser';
// import ListUser from '../components/users/ListUser';
// import Login from '../components/login/Login';

// function RouterGard({ children }) {
//   console.log(children)
//   const navigate = useNavigate();
//   useEffect(() => {
//     console.log(navigate);
//     // const isLoginPage = router.pathname === '/';
//     // const isRegisterPage = router.pathname === '/users';

//     // If the user is on the login or register page, no authentication check is needed.
//     // if (!(isLoginPage || isRegisterPage)) {
//       // Perform your authentication check here

//       const token = getToken();


//       if (!token) {
//         navigate('/');
//       } else {
//         navigate('/');
//       }
//       // else {
//       //   fetch('http://localhost:5012/validateToken', {
//       //     method: 'POST',
//       //     headers: {
//       //       'Authorization': `Bearer ${token}`,
//       //     },
//       //   })
//       //     .then(response => {
//       //       if (response.status !== 200) {
//       //         // Token is invalid
//       //       }
//       //     })
//       //     .catch(error => {
//       //       console.log(error);
//       //     });
//       // }
//     // }
//   }, []);
//   return <>
//    <Route path="/" element={<Login/>} ><Route path="/users" element={<ListUser />} />
//   <Route path="/add-user" element={<CreateEditUser />} />
//   <Route path="/edit-user/:id" element={<CreateEditUser />} />
//   </Route></>;
// }

// export default RouterGard;