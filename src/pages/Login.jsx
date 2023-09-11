import { useLogin } from "../hooks/useLogin"
import { useForm } from "react-hook-form";
import { useState } from "react";
// assets
import logo from "../assets/logo.svg";

const Login = () => {
    const { login, error, isLoading } = useLogin()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        await login(data.email, data.password)
    }

    console.log(isLoading);

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
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign in to your account
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-teal-600 focus:ring-teal-600 sm:text-sm"
                                        placeholder="name@email.com"
                                        autoComplete="on"
                                        {...register("email", { required: true })}
                                    />
                                </div>
                                {errors.email?.type === "required" && (
                                    <small className="m-0 p-0 text-rose-500">
                                        *email is required
                                    </small>
                                )}

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="mb-2 block text-sm font-medium text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className="mt-2 box-border block w-full rounded border border-gray-300 px-3 py-2 text-sm"
                                            {...register("password", { required: true })}
                                        />
                                        <div
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-3 flex cursor-pointer items-center"
                                        >
                                            {showPassword ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                {errors.password?.type === "required" && (
                                    <small className="m-0 p-0 text-rose-500">
                                        *password is required
                                    </small>
                                )}

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-teal-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                                    disabled={isLoading}
                                >
                                    {!isLoading && <span>Sign in</span>}
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
export default Login