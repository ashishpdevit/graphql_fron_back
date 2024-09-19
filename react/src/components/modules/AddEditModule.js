import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// mutation to add a new user
const ADD_MODULE = gql`
  mutation createModule($name: String!, $description: String!) {
    createModule(name: $name, description: $description){
      id
      name
      slug
      description
    }
  }
`;

const GET_MODULES = gql`
    query {
    getModules {
        id
        name
        slug
        description
      }
    }
`;

const GET_MODULE = gql`
  query GetModule($id: ID!) {
    getModule(id: $id) {
      id
      name
      slug
      description
    }
  }
`;



//mutation to update a user
const UPDATE_MODULE = gql`
  mutation updateModule($id: ID!, $name: String!, $description: String) {
    updateModule(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;


export const AddEditModule = () => {
    const { id } = useParams();
    const isEditMode = !!id
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentModule = useQuery(GET_MODULE, {
        variables: { id },
        skip: !isEditMode
    });

    useEffect(() => {
        if (isEditMode) {
            setName(currentModule?.data?.getModule.name);
            setDescription(currentModule?.data?.getModule.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [isEditMode, id, currentModule]);

    let nameInput, descriptionInput;
    const navigate = useNavigate();

    const [updateModule] = useMutation(UPDATE_MODULE);
    const [createModule] = useMutation(ADD_MODULE,
        {
            update(cache, { data: { createModule } }) {
                cache.modify({
                    fields: {
                        getModules(existingModules = []) {
                            const newModuleRef = cache.writeFragment({
                                data: createModule,
                                fragment: gql`
                                fragment NewModule on Module {
                                    id
                                    name
                                    description 
                                }
                                `
                            });
                            return [...existingModules, newModuleRef];
                        }
                    }
                });
            }
        }
    );

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(nameInput);
        try {
            if (isEditMode) {
                await updateModule({ variables: { id, name, description } });
                toast.success("Module updated successfully !");
            } else {
                const response = await createModule({ variables: { name: nameInput.value, description: descriptionInput.value } });
                console.log(response);
                toast.success("Module created successfully !");
            }
            setName('');
            setDescription('');
            navigate('/modules');

        } catch (error) {
            toast.error(error.message);
            // console.error('Error adding user:', error);
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4>{isEditMode ? 'Edit Module' : 'Add Module'}</h4>
                        {/* <form onSubmit={handleSubmit}></form> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Module Name</label>
                                        {/* <input type="text" className="form-control"> */}
                                        <input type='text'
                                            className="form-control"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            ref={node => {
                                                nameInput = node;
                                            }}
                                            placeholder="Module name"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input type='textarea'
                                            className="form-control"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            ref={node => {
                                                descriptionInput = node;
                                            }}
                                            placeholder="Description"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-left">
                            <button className="btn btn-primary mr-1" type="submit">{isEditMode ? 'Update Module' : 'Add Module'}</button>
                            {/* <button className="btn btn-secondary mr-1" type="reset">Reset</button> */}
                        </div>
                    </form>
                </div>
            </div >
        </div>
    )
}
