import React, { useState, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import DeleteModal from '../common/DeleteModal';
import { Context } from '../../pages/ProtectedRoute';
import './modulelist.css';

// query to fetch users
const GET_MODULES = gql`
    query {
    getModules {
        id
        name
        description
        slug
      }
    }
  `;

const DELETE_MODULE = gql`
  mutation deleteModule($id: ID!) {
    deleteModule(id: $id)
  }
`;

const AUDIT_LOG = gql`
  mutation deleteModule($id: ID!) {
    deleteModule(id: $id)
  }
`;
function ModuleList(props) {
    const currentUser = useContext(Context);
    console.log(currentUser);

    const navigate = useNavigate();
    const [deleteMoudleId, setDeleteMoudleId] = useState(null);

    const { loading, error, data } = useQuery(GET_MODULES);

    const [deleteModule] = useMutation(DELETE_MODULE, {
        refetchQueries: [{ query: GET_MODULES }] // Refetch users after deletion
    });
    const handleDelete = async () => {
        try {
            await deleteModule({ variables: { id: deleteMoudleId } });
            toast.success("Deleted successfully !");
            setDeleteMoudleId(null);
        } catch (error) {
            toast.error('Error deleting Module:', error);
            console.error('Error deleting Module:', error);
        }
    };

    const handleEdit = async (id) => {
        navigate(`/edit-module/${id}`)
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteMoudleId(id);
    };

    const handleCloseDeleteModal = () => {
        setDeleteMoudleId(null);
    };

    const handleAddRole = () => {
        // setDeleteMoudleId(null);
    };

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    let i = 1;

    return (
        <div className="row">
            <div className="col-xl-12 col-md-12 col-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h4>List Modules</h4>
                        <div className="">
                            <Link to="/add-module" className="btn btn-primary">Add Module</Link>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className='table table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && <tr>Loading...</tr>}
                                    {data?.getModules.map(item => (
                                        <tr key={item.id}>
                                            <td>{i++}</td>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}><FontAwesomeIcon icon={faPencil} /></button>
                                                <button className="btn btn-danger"  onClick={() => handleOpenDeleteModal(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <DeleteModal
                                isOpen={!!deleteMoudleId}
                                onRequestClose={handleCloseDeleteModal}
                                onDelete={handleDelete}
                                moduleName={"Module"}
                                message={"Are you sure you want to delete this Module?"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModuleList;
