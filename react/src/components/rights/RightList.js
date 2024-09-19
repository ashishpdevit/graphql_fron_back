import React, { useState, useContext } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import DeleteModal from '../common/DeleteModal';
import './rightlist.css';

// query to fetch
const GET_RIGHTS = gql`
    query {
    getRights {
        id
        name
        slug
        module_name
      }
    }
  `;

const DELETE_RIGHT = gql`
  mutation deleteRight($id: ID!) {
    deleteRight(id: $id)
  }
`;

const AUDIT_LOG = gql`
  mutation deleteRight($id: ID!) {
    deleteRight(id: $id)
  }
`;
function RightList(props) {
    const navigate = useNavigate();
    const [deleteRightId, setDeleteRightId] = useState(null);

    const { loading, error, data } = useQuery(GET_RIGHTS);

    const [deleteRight] = useMutation(DELETE_RIGHT, {
        refetchQueries: [{ query: GET_RIGHTS }] // Refetch after deletion
    });
    const handleDelete = async () => {
        try {
            await deleteRight({ variables: { id: deleteRightId } });
            toast.success("Deleted successfully !");
            setDeleteRightId(null);
        } catch (error) {
            toast.error('Error deleting right:', error);
            console.error('Error deleting right:', error);
        }
    };

    const handleEdit = async (id) => {
        navigate(`/edit-right/${id}`)
    };

    const handleOpenDeleteModal = (id) => {
        setDeleteRightId(id);
    };

    const handleCloseDeleteModal = () => {
        setDeleteRightId(null);
    };


    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    let i = 1;

    return (
        <div className="row">
            <div className="col-xl-12 col-md-12 col-lg-8">
                <div className="card">
                    <div className="card-header">
                        <h4>List Rights</h4>
                        <div className="">
                            <Link to="/add-right" className="btn btn-primary">Add Right</Link>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className='table table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Name</th>
                                        <th>Module</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading && <tr>Loading...</tr>}
                                    {error && <tr>{error.message}</tr>}
                                    {data?.getRights.map(item => (
                                        <tr key={item.id}>
                                            <td>{i++}</td>
                                            <td>{item.name}</td>
                                            <td>{item.module_name}</td>
                                            <td>
                                                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}><FontAwesomeIcon icon={faPencil} /></button>
                                                <button className="btn btn-danger" onClick={() => handleOpenDeleteModal(item.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <DeleteModal
                                isOpen={!!deleteRightId}
                                onRequestClose={handleCloseDeleteModal}
                                onDelete={handleDelete}
                                moduleName={"Right"}
                                message={"Are you sure you want to delete this Right?"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightList;
