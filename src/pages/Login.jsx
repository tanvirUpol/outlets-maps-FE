import { useLogin } from "../hooks/useLogin"
import { useForm } from "react-hook-form";

// assets
import logo from "../assets/logo.svg";

const Login = () => {
    const { login, error, isloading } = useLogin()
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {


        await login(data.email, data.password)

    }

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
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-gray-900 focus:border-teal-600 focus:ring-teal-600 sm:text-sm"
                                        {...register("password", { required: true })}
                                    />
                                </div>
                                {errors.password?.type === "required" && (
                                    <small className="m-0 p-0 text-rose-500">
                                        *password is required
                                    </small>
                                )}

                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-teal-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
                                >
                                    {<span>Sign in</span>}
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