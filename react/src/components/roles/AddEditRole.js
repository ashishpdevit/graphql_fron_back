import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Checkbox from '../common/CheckBox';

// query to fetch
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

export const AddEditRole = () => {
    const [name, setname] = useState('');
    const [rights, setRights] = useState('');
    const [permission, setPermission] = useState({});
    const [perm, setPerm] = useState([{}]);
    var rightsJson = []

    let nameInput, rightsInput;
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_RIGHTS);
    const modulesData = useQuery(GET_MODULES);
    const modules = modulesData?.data?.getModules
    const rightsforEdit = {}
    /**
     * @Author DevIT
     * @Method handleChange
     * @Purpose To Create permission data by Selecting individual CHECKBOX option  
     * @param {e, permission, key} 
     * @Since July 2022
    */
    const handleChange = (e, permission, key) => {
        console.log(e, permission, key);
        const { name, value } = e.target;
        if (e.target.checked === true) {
            permission[key] = true
            setPermission({ ...permission, [permission[key]]: true })
            if (!perm[0][name]) {
                perm[0][name] = []
            }
            perm[0][name] = Array.from(new Set([...perm[0][name], value]))
        } else {
            permission[key] = false
            setPermission({ ...permission, [permission[key]]: false })
            if (perm[0][name]) {
                var index = perm[0][name].indexOf(value);
                if (index !== -1) {
                    perm[0][name].splice(index, 1);
                }
            }

        }
        console.log("73 ", permission);

    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // if (isEditMode) {
            //     await updateUser({ variables: { id, username, email } });
            //     toast.success("User updated successfully !");
            // } else {
            //     // await createUser({ variables: { username, email } });
            //     const response = await createUser({ variables: { username: nameInput.value, email: emailInput.value } });
            //     console.log(response);
            //     toast.success("User created successfully !");
            // }
            // setUsername('');
            // setEmail('');
            // navigate('/users');

        } catch (error) {
            // toast.error(error.message);
            // console.error('Error adding user:', error);
        }
    };
    const { id } = useParams();
    const isEditMode = !!id
    return (
        <div className="row">
            <div className="col-12 col-md-12 col-lg-12">
                <div className="card">
                    <div className="card-header">
                        <h4>{isEditMode ? 'Edit Role' : 'Add Role'}</h4>
                        {/* <form onSubmit={handleSubmit}></form> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <label>Role Name</label>
                                        {/* <input type="text" className="form-control"> */}
                                        <input type='text'
                                            className="form-control"
                                            value={name}
                                            onChange={e => setname(e.target.value)}
                                            ref={node => {
                                                nameInput = node;
                                            }}
                                            placeholder="Role name"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    {(modules || []).map((module) => {
                                        return (
                                            <div className="form-group">
                                                <div className="col-sm-6">{module.name}</div>
                                                {/* <label className="custom-control-label">{module.name}</label> */}
                                                {(data?.getRights || []).map((r, i) => {
                                                    if (module.id === r.module_id) {
                                                        return (<div className="col-sm-12">
                                                            <div className="form-check">
                                                                <div className="custom-control custom-checkbox">
                                                                    {/* <input type="checkbox" className="custom-control-input" id="customCheck2" /> */}
                                                                    {/* <label className="custom-control-label" for="customCheck2">Example Checkbox</label> */}
                                                                    <Checkbox name={module.slug} onChange={(e) => handleChange(e, rightsforEdit, r.slug, r.module_id)} label={r.name} value={r.slug} key={i + "rights"} />
                                                                </div>
                                                            </div>
                                                        </div>)
                                                    }
                                                })}
                                            </div>)
                                    })}

                                </div>
                            </div>
                        </div>
                        <div className="card-footer text-left">
                            <button className="btn btn-primary mr-1" type="submit">{isEditMode ? 'Update Role' : 'Add Role'}</button>
                            {/* <button className="btn btn-secondary mr-1" type="reset">Reset</button> */}
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
