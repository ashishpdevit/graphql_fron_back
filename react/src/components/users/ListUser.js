import React, { useState, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import DeleteModal from '../common/DeleteModal';
import { Context } from '../../pages/ProtectedRoute';

// query to fetch users
const GET_USERS = gql`
    query {
    getUsers {
        id
        username
        email
      }
    }
  `;

const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

const AUDIT_LOG = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
function ListUser(props) {
    const navigate = useNavigate();
    const [deleteUserId, setDeleteUserId] = useState(null);

    const { loading, error, data } = useQuery(GET_USERS);

    const [deleteUser] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }] // Refetch users after deletion
    });

    const handleDelete = async () => {
        try {
            await deleteUser({ variables: { id: deleteUserId } });
            toast.success("Deleted successfully !");
            setDeleteUserId(null);
        } catch (error) {
            toast.error('Error deleting user:', error);
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = async (id) => {
        navigate(`/edit-user/${id}`)
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteUserId(id);
    };

    const handleCloseDeleteModal = () => {
        setDeleteUserId(null);
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    let i = 1;

    return (
        // <div className="container">
        //     <h2>List Users</h2>
        //     {loading && <p>Loading...</p>}
        //     {error && <p>Error: {error.message}</p>}
        //     {data?.getUsers &&
        //         (<>
        //             <table className="users-table">
        //                 <tr>
        //                     <th>Sr No</th>
        //                     <th>Name</th>
        //                     <th>Email</th>
        //                     <th>Action</th>
        //                 </tr>
        //                 {data.getUsers.map(user => (
        //                     <tr key={user.id}>
        //                         <td>{i++}</td>
        //                         <td>{user.username}</td>
        //                         <td>{user.email}</td>
        //                         <td>
        //                             {/* <Link className="edit-button" to={`/edit-user/${user.id}`}>Edit</Link> */}
        //                             <button className="edit-button" onClick={() => handleEdit(user.id)}><FontAwesomeIcon icon={faPencil} /></button>
        //                             {/* <button className="delete-button" onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash} /></button> */}
        //                             <button className="delete-button" onClick={() => handleOpenDeleteModal(user.id)}><FontAwesomeIcon icon={faTrash} /></button>
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </table>
        //             <DeleteModal
        //                 isOpen={!!deleteUserId}
        //                 onRequestClose={handleCloseDeleteModal}
        //                 onDelete={handleDelete}
        //                 moduleName={"User"}
        //                 message={"Are you sure you want to delete this User?"}
        //             /></>
        //         )
        //     }
        // </div >

        <div className="row">
            <div className="col-xl-12 col-md-12 col-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h4>List Users</h4>
                        <div className="">
                            <Link to="/add-user" className="btn btn-primary">Add User</Link>
                        </div>
                        {/* <div className="row">
                            <div className="col">
                                <h4>List Users</h4>
                            </div>
                            <div className="col-auto">
                                <div className="float-right">
                                <Link to="/add-user" className="btn btn-primary">Add User</Link>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    <div className="card-body">
                        {/* <div className="recent-report__chart">
                            <div id="chart5"></div>
                        </div> */}
                        <div className='table table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && <tr>Loading...</tr>}
                                    {data?.getUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>{i++}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {/* <Link className="edit-button" to={`/edit-user/${user.id}`}>Edit</Link> */}
                                                <button className="btn btn-primary" onClick={() => handleEdit(user.id)}><FontAwesomeIcon icon={faPencil} /></button>
                                                {/* <button className="delete-button" onClick={() => handleDelete(user.id)}><FontAwesomeIcon icon={faTrash} /></button> */}
                                                <button className="btn btn-danger" onClick={() => handleOpenDeleteModal(user.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <DeleteModal
                                isOpen={!!deleteUserId}
                                onRequestClose={handleCloseDeleteModal}
                                onDelete={handleDelete}
                                moduleName={"User"}
                                message={"Are you sure you want to delete this User?"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListUser;
