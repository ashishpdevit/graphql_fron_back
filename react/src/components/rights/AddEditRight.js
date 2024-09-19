import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './rightlist.css';

// mutation to add a new user
const ADD_RIGHT = gql`
  mutation createRight($name: String!, $moduleId: ID!, $moduleName:String!) {
    createRight(name: $name, module_id: $moduleId, module_name: $moduleName){
      id
      name
      module_id
    }
  }
`;

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

const GET_RIGHTS = gql`
    query {
    getRights {
        id
        name
        slug
        module_id
        module_name
      }
    }
`;

const GET_RIGHT = gql`
  query getRight($id: ID!) {
    getRight(id: $id) {
      id
      name
      module_id
      module_name
    }
  }
`;



//mutation to update a user
const UPDATE_RIGHT = gql`
  mutation updateRight($id: ID!, $name: String!, $module_id: ID!) {
    updateRight(id: $id, name: $name, module_id: $module_id) {
      id
      name
      module_id
    }
  }
`;


export const AddEditRight = () => {
    const { id } = useParams();
    const isEditMode = !!id
    const [name, setName] = useState('');
    const [moduleId, setModuleId] = useState('');
    const [moduleName, setModuleName] = useState('');


    const currentRight = useQuery(GET_RIGHT, {
        variables: { id },
        skip: !isEditMode
    });

    useEffect(() => {
        if (isEditMode) {
            setName(currentRight?.data?.getRight.name);
            setModuleId(currentRight?.data?.getRight.module_id);
            setModuleName(currentRight?.data?.getRight.module_name)
        } else {
            setName("");
            setModuleId("");
            setModuleName("")
        }
    }, [isEditMode, id, currentRight]);

    let nameInput, moduleIdInput;
    const navigate = useNavigate();

    const { data } = useQuery(GET_MODULES);
    const moduleList = data?.getModules
    // const [updateRight] = useMutation(UPDATE_RIGHT);

    const [updateRight] = useMutation(UPDATE_RIGHT, {
        refetchQueries: [{ query: GET_RIGHTS }] // Refetch  after deletion
    });

    const [createRight] = useMutation(ADD_RIGHT,
        {
            update(cache, { data: { createRight } }) {
                cache.modify({
                    fields: {
                        getRights(existingRights = []) {
                            const newRightRef = cache.writeFragment({
                                data: createRight,
                                fragment: gql`
                                fragment NewRight on Right {
                                    id
                                    name
                                    module_id
                                    module_name
                                }
                                `
                            });
                            return [...existingRights, newRightRef];
                        }
                    }
                });
            }
        }
    );
    const handleChange = (event) => {
        setModuleId(event.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Get form values
        const formData = new FormData(e.target);
        const formValues = {};
        formData.forEach((value, key, object) => {
            formValues[key] = value;
        });

        // Get the text value of the selected option in the <select> element
        const moduleIdSelect = e.target.querySelector('select[name="module"]');
        const selectedOption = moduleIdSelect.options[moduleIdSelect.selectedIndex];
        const selectedOptionText = selectedOption.text;
        // Add the selected option text value to formValues
        formValues['moduleName'] = selectedOptionText;

        try {
            if (isEditMode) {
                await updateRight({ variables: { id, name, module_id: moduleId, module_name: formValues['moduleName'] } });
                toast.success("Right updated successfully !");
            } else {
                // const response = await createRight({ variables: { name, moduleId } });
                const response = await createRight({ variables: { name: nameInput.value, moduleId: moduleIdInput.value, moduleName: formValues['moduleName'] } });
                toast.success("Right created successfully !");
            }
            setName('');
            setModuleId('');
            setModuleName('')
            navigate('/rights');

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4>{isEditMode ? 'Edit Right' : 'Add Right'}</h4>
                        {/* <form onSubmit={handleSubmit}></form> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Rights Name</label>
                                        {/* <input type="text" className="form-control"> */}
                                        <input type='text'
                                            className="form-control"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            ref={node => {
                                                nameInput = node;
                                            }}
                                            placeholder="Right name"
                                            name="right"
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Module</label>
                                        <select class="form-control" name="module" value={moduleId} onChange={e => handleChange(e)} ref={node => {
                                            moduleIdInput = node;
                                        }}>
                                            {moduleList?.map(item => (
                                                <option value={item.id} id={item.name}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-left">
                            <button className="btn btn-primary mr-1" type="submit">{isEditMode ? 'Update Right' : 'Add Right'}</button>
                            {/* <button className="btn btn-secondary mr-1" type="reset">Reset</button> */}
                        </div>
                    </form>
                </div>
            </div >
        </div>

        
    )
}
