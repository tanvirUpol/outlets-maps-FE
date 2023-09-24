// src/components/ChangePassword.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuthContext";
import toast, { Toaster } from 'react-hot-toast';

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, watch,reset } = useForm();
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const { user } = useAuthContext();
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  const [resError,setResError] = useState(null)

  const onSubmit = async (data) => {
    // Add logic to send a request to your backend to change the password
    // You can use a library like Axios to make API requests
    console.log(data);

    try {
        const response = await fetch(`${api_url}/user/changep/${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `'Bearer ${user.token}`,
          },
          body: JSON.stringify(data),
        });
  
        if (response.status === 200) {
          // Password change successful
          // You can handle success as needed (e.g., show a success message)
          toast.success('Password Changed Successfully!')
          console.log("success!");
          setResError(null)
        } else {
          // Handle API error responses (e.g., show an error message)
          const responseData = await response.json();
          console.error("API Error:", responseData.error);
          setResError(responseData.error)
        }
      } catch (error) {
        // Handle network errors (e.g., request failed)
        console.error("Network Error:", error);
        setResError(error)
      }

      
    // Clear the form fields after submission
    // reset();
  };

  return (
    <div className="min-h-screen flex items-start  justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 mt-20 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className={`mt-1 p-2 w-full border rounded-md ${errors.currentPassword ? 'border-red-500' : ''}`}
              placeholder="Current Password"
              {...register("currentPassword", { required: "Current Password is required" })}
            />
            {errors.currentPassword && (
              <p className="text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className={`mt-1 p-2 w-full border rounded-md ${errors.newPassword ? 'border-red-500' : ''}`}
              placeholder="New Password"
              {...register("newPassword", {
                required: "New Password is required",
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500">{errors.newPassword.message}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`mt-1 p-2 w-full border rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Change Password
            </button>
          </div>
        </form>
        {resError && <p className="rounded-md border border-red-700 bg-red-100 p-4  text-red-600 mt-2" >{resError}</p>}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default ChangePassword;
