import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Register = () => {
    const { register, handleSubmit,formState:{errors} } = useForm()

    const handleRegistration = (data) => {
        console.log("after register", data)

    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl  font-bold">Create An Account</h3>
            <p className="font-semibold">Register with chef bazar</p>
            <form
                onSubmit={handleSubmit(handleRegistration)}
                className="card-body">
                <fieldset className="fieldset">
                    {/* Email field */}
                    <label className="label">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}

                        className="input"
                        placeholder="Email"
                    />
                    {errors.email?.type==='required' && <p className='text-red-500'>Email is required</p>}


                    {/* name field */}
                    <label className="label">name</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Your name"
                    />
                    {/* Address field */}
                    <label className="label">Address</label>
                    <input
                        type="text"
                        className="input"
                        placeholder="Your Address"
                    />


                    {/* image field */}
                    <label className="label">photo</label>

                    <input
                        type="file"
                        className="file-input file-input-info"
                        placeholder="Your photo"
                    />

                    {/* password */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        {...register('password', {
                            required:true,
                            minLength: 6
                        })}
                        placeholder="Password" />
                        {errors.password?.type==='required' && <p className='text-red-500'>password is required</p>}
                        {errors.password?.type==='minLength' && <p className='text-red-500'>password must be 6 character or longer</p>}
                        {/* confirm password */}
                    <label className="label"> Confirm Password</label>
                    <input
                        type=" password"
                        className="input"
                       
                        placeholder=" ConfirmPassword" />
                    
                    <button className="btn btn-neutral mt-4">Register</button>
                    <p>Already have an account? <Link to="/login" className='text-blue-400'>Login</Link></p>
                </fieldset>

            </form>

        </div>
    );
};


export default Register;