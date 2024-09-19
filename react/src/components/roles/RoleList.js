import React, { useState, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import DeleteModal from '../common/DeleteModal';
import { Context } from '../../pages/ProtectedRoute';
import './rolelist.css';

// query to fetch users
const GET_ROLES = gql`
    query {
    getRoles {
        id
        name
        rights
      }
    }
  `;


const DELETE_ROLE = gql`
  mutation deleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`;


function RoleList(props) {
    // const currentUser = useContext(Context);

    const navigate = useNavigate();
    const [deleteRoleId, setDeleteRoleId] = useState(null);

    const { loading, error, data } = useQuery(GET_ROLES);

    const [deleteRole] = useMutation(DELETE_ROLE, {
        refetchQueries: [{ query: GET_ROLES }] // Refetch after deletion
    });
    const handleDelete = async () => {
        try {
            const res = await deleteRole({ variables: { id: deleteRoleId } });
            console.log(res);
            toast.success("Deleted successfully !");
            setDeleteRoleId(null);
        } catch (error) {
            toast.error('Error deleting role:', error);
            console.error(error);
        }
    };

    const handleEdit = async (id) => {
        navigate(`/edit-role/${id}`)
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteRoleId(id);
    };

    const handleCloseDeleteModal = () => {
        setDeleteRoleId(null);
    };


    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    let i = 1;

    return (
        <div className="row">
            <div className="col-xl-12 col-md-12 col-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h4>List Roles</h4>
                        <div className="">
                            <Link to="/add-role" className="btn btn-primary">Add Role</Link>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className='table table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && <tr>Loading...</tr>}
                                    {error && <tr>{error.message}</tr>}
                                    {data?.getRoles.map(item => (
                                        <tr key={item.id}>
                                            <td>{i++}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}><FontAwesomeIcon icon={faPencil} /></button>
                                                <button className="btn btn-danger" onClick={() => handleOpenDeleteModal(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <DeleteModal
                                isOpen={!!deleteRoleId}
                                onRequestClose={handleCloseDeleteModal}
                                onDelete={handleDelete}
                                moduleName={"Role"}
                                message={"Are you sure you want to delete this Role?"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoleList;
