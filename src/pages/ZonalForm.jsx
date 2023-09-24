import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ZonalForm = () => {
    const api_url = import.meta.env.VITE_REACT_APP_API_URL;

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Convert comma-separated outlets to an array
            const outletsArray = data.outlets.split(',').map((outlet) => outlet.trim());

            // Prepare the data to send
            const requestData = {
                zonal: data.zonalName,
                email: data.zonalEmail,
                password: data.password,
                is_zonal: data.isZonal,
                outlets: outletsArray,
            };

            console.log(requestData);

            // Make the API request using the Fetch API
            const response = await fetch(`${api_url}/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                toast.success("successful!", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                
                reset(); // Clear the form after successful submission
            } else {
                console.log(response);
                console.error('Failed to submit form');
                toast.error("😢 there was a problem siging up!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div>

            <h1 className='text-2xl my-5 text-center' >User Registration Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mt-8 shadow bg-slate-50 p-4 rounded">
                <div className="mb-4">
                    <label htmlFor="zonalName" className="block mb-2">
                        Zonal Name
                    </label>
                    <Controller
                        name="zonalName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Zonal Name is required' }}
                        render={({ field }) => (
                            <div>
                                <input {...field} type="text" id="zonalName" className="w-full px-4 py-2 border rounded" />
                                {errors.zonalName && <p className="text-red-500">{errors.zonalName.message}</p>}
                            </div>
                        )}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="zonalEmail" className="block mb-2">
                        Zonal Email
                    </label>
                    <Controller
                        name="zonalEmail"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: 'Zonal Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => (
                            <div>
                                <input {...field} type="text" id="zonalEmail" className="w-full px-4 py-2 border rounded" />
                                {errors.zonalEmail && <p className="text-red-500">{errors.zonalEmail.message}</p>}
                            </div>
                        )}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">
                        Password
                    </label>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Password is required' }}
                        render={({ field }) => (
                            <div>
                                <input {...field} type="password" id="password" className="w-full px-4 py-2 border rounded" />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>
                        )}
                    />
                </div>
                <div className="mb-4">
                    {/* <label htmlFor="isZonal" className="block mb-3">
                        Is Zonal
                    </label> */}
                    <Controller
                        name="isZonal"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <div className='flex items-center'>
                                <span>Is this zonal?</span>
                                <input {...field} type="checkbox" id="isZonal" className="ml-2 my-4 w-4 h-4" />
                            </div>
                        )}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="outlets" className="block mb-2">
                        Outlets (Comma-separated)
                    </label>
                    <Controller
                        name="outlets"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Outlets are required' }}
                        render={({ field }) => (
                            <div>
                                <input {...field} type="text" id="outlets" className="w-full px-4 py-2 border rounded" />
                                {errors.outlets && <p className="text-red-500">{errors.outlets.message}</p>}
                            </div>
                        )}
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </div>
            </form>
            <ToastContainer />                   
        </div>
    );
};

export default ZonalForm;
