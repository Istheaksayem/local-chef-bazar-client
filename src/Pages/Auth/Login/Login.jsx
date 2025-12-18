import React from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
     const { register, handleSubmit, formState: { errors } } = useForm();
     const {signInUser} =useAuth()
     const navigate=useNavigate()

     const handleLogin = (data) => {
        console.log("form data", data)
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                toast.success("Login successful")
                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
          <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center font-bold">Welcome Back to local chef bazar</h3>
            <p className="font-semibold text-center">Login with chef bazar</p>
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">
                    {/* email  field */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />

                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true, minLength: 6 })} className="input" placeholder="Password" />

                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or longer</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                    <p>New to chef bazar? <Link to="/register" className='text-blue-400'>Register</Link></p>
                </fieldset>
            </form>
        </div>
    );
    
};
    


export default Login;