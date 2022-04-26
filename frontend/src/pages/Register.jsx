import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser, reset } from '../features/auth/authSlice';
import { GrFormView } from 'react-icons/gr';
import Spinner from '../components/Spinner';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData;
    const { isLoading, isSuccess, isError, msg } = useSelector(state => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(msg)
        }

        dispatch(reset());
    }, [isError, msg, isSuccess])

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password
            }

            dispatch(registerUser(userData));
        }
    }

    if (isSuccess) {
        return <Navigate to='/dashboard' />
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="flex justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mx-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 h-3/4 mt-28">
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-sky-600" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-center">Sign Up</h3>
                    <form onSubmit={onSubmit}>
                        <div className="mt-4">
                            <div>
                                <label className="block" htmlFor="Name">Name</label>
                                <input type="text" placeholder="Name"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    name="name"
                                    value={name}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="email">Email</label>
                                <input type="email" placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <div className='relative'>
                                    <input type={showPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        required
                                    />
                                    <GrFormView className='absolute text-3xl bottom-1 right-3 cursor-pointer' onClick={() => setShowPassword(prevState => !prevState)} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block">Confirm Password</label>
                                <div className='relative'>
                                    <input type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Password"
                                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
                                        name="password2"
                                        value={password2}
                                        onChange={onChange}
                                        required
                                    />
                                    <GrFormView className='absolute text-3xl bottom-1 right-3 cursor-pointer' onClick={() => setShowConfirmPassword(prevState => !prevState)} />
                                </div>
                            </div>
                            <div className="flex">
                                <button type='submit' className="w-full px-6 py-2 mt-4 text-white bg-sky-500 rounded-lg hover:bg-teal-700 transition duration-200">
                                    Create Account
                                </button>
                            </div>
                            <div className="mt-6 text-grey-dark">
                                <span className="mr-2">Already have an account?</span>
                                <Link to='/login' className="text-sky-600 hover:underline font-bold">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Register;
