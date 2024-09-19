import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
// import client from '../../common'
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';

// mutation to add a new user
const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!) {
    createUser(username: $username, email: $email){
      id
      username
      email
    }
  }
`;

const GET_USERS = gql`
    query {
    getUsers {
        id
        username
        email
      }
    }
`;

const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
    }
  }
`;



//mutation to update a user
const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $username: String!, $email: String!) {
    updateUser(id: $id, username: $username, email: $email) {
      id
      username
      email
    }
  }
`;

function CreateEditUser() {
    const client = useApolloClient();
    const { id } = useParams();
    const isEditMode = !!id; // Check if we are in edit mode
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    // const fetchAllData = useQuery(GET_USERS);
    // const fetchDataFromCacheById = (id) => {
    //     try {
    //         const cacheData = client.cache.extract(); // Extract the normalized cache data
    //         const dataValues = Object.values(cacheData); // Get an array of all cached data objects
    //         const filteredData = dataValues.find(data => data.id == id);

    //         console.log('Filtered data:', filteredData);
    //         // setUsername(filteredData.username);
    //         // setEmail(filteredData.email);
    //         return filteredData

    //     } catch (error) {
    //         console.error('Error fetching data from cache:', error);
    //     }
    // };


    const currentUser = useQuery(GET_USER, {
        variables: { id },
        skip: !isEditMode
    });


    useEffect(() => {
        if (isEditMode && currentUser && currentUser.data) {
            setUsername(currentUser?.data.getUser.username);
            setEmail(currentUser?.data.getUser.email);
        } else {
            setUsername("");
            setEmail("");
        }
    }, [isEditMode, id, currentUser]);

    let nameInput, emailInput;
    const navigate = useNavigate();
    const [updateUser] = useMutation(UPDATE_USER);
    const [createUser] = useMutation(ADD_USER,
        {
            update(cache, { data: { createUser } }) {
                cache.modify({
                    fields: {
                        getUsers(existingUsers = []) {
                            const newUserRef = cache.writeFragment({
                                data: createUser,
                                fragment: gql`
                                fragment NewUser on User {
                                    id
                                    username
                                    email
                                }
                                `
                            });
                            return [...existingUsers, newUserRef];
                        }
                    }
                });
            }
        }
    );

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateUser({ variables: { id, username, email } });
                toast.success("User updated successfully !");
            } else {
                // await createUser({ variables: { username, email } });
                const response = await createUser({ variables: { username: nameInput.value, email: emailInput.value } });
                console.log(response);
                toast.success("User created successfully !");
            }
            setUsername('');
            setEmail('');
            navigate('/users');

        } catch (error) {
            toast.error(error.message);
            console.error('Error adding user:', error);
        }
    };


    return (
        <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4>{isEditMode ? 'Edit User' : 'Add User'}</h4>
                        {/* <form onSubmit={handleSubmit}></form> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Username</label>
                                        {/* <input type="text" className="form-control"> */}
                                        <input type='text'
                                            className="form-control"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            ref={node => {
                                                nameInput = node;
                                            }}
                                            placeholder="Username"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            ref={node => {
                                                emailInput = node;
                                            }}
                                            placeholder="Email"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-left">
                            {/* <button className="btn btn-primary mr-1" type="submit">Submit</button> */}
                            <button className="btn btn-primary mr-1" type="submit">{isEditMode ? 'Update User' : 'Add User'}</button>
                            {/* <button className="btn btn-secondary mr-1" type="reset">Reset</button> */}
                        </div>
                    </form>
                </div>
            </div >
        </div>
    );
}

export default CreateEditUser;
