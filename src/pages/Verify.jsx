import { useLogin } from "../hooks/useLogin"
import { useForm } from "react-hook-form";
import { useState } from "react";
// assets
import logo from "../assets/logo.svg";
import { useVerify } from "../hooks/useVerify";

const Verify = () => {
    const { verify, error, isLoading } = useVerify()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const vuser =   JSON.parse(localStorage.getItem('verify'));

    const onSubmit = async (data) => {
        await verify(vuser.email, data.vcode)
    }

    // console.log(isLoading);

    return (
        <>
            <section>
                <div className="font-roboto-slab mx-auto flex flex-col items-center justify-center px-6 py-8">
                    <a
                        href="#"
                        className="mb-6 flex items-center text-2xl font-semibold text-gray-900"
                    >
                        <img className="mr-2 h-8 w-8" src={logo} alt="logo" />
                        Outlets Map
                    </a>
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-lg mb-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Check your email for
                                
                                 Verification Code
                            </h1>
                            <p className="text-rose-600" >* please check your spam folder as well</p>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <label
                                        htmlFor="vcode"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Verification Code
                                    </label>
                                    <input
                                        type="vcode"
                                        name="vcode"
                                        id="vcode"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-teal-600 focus:ring-teal-600 sm:text-sm"
                                        placeholder="Verification Code"
                                        autoComplete="on"
                                        {...register("vcode", { required: true })}
                                    />
                                </div>
                                
                                {errors.vcode?.type === "required" && (
                                    <small className="m-0 p-0 text-rose-500">
                                        *Verification code is required
                                    </small>
                                )}

                                

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-teal-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                                    disabled={isLoading}
                                >
                                    {!isLoading && <span>Verify</span>}
                                    {isLoading && <span>Loading...</span>}
                                </button>
                                {error && (
                                    <p className="rounded-md border border-red-700 bg-red-100 p-4  text-red-600">
                                        {error}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
export default Verify