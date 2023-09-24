import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
    const api_url = import.meta.env.VITE_REACT_APP_API_URL;
    const [zuser, setZuser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuthContext();


    useEffect(() => {
        // Fetch user data from your API
        fetch(`${api_url}/user/profile`, {
            headers: {
                Authorization: `'Bearer ${user.token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setZuser(data); // Set the user data
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }


    console.log(zuser);


    return (
        <div className="flex flex-col items-start h-screen p-4">
             <div className="">
                <div className="mb-4">
                    <Link to={`/changepass/${zuser._id}`} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 rounded-md">
                        Change Password
                    </Link>
                </div>
                
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg mb-4 md:mr-4 w-full">
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">{zuser.zonal}</h2>
                    <p className="text-gray-600">{zuser.email}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Outlets:</h3>
                    <ul className="flex flex-wrap justify-start items-center">
                        {zuser.outlets.map((outlet) => (
                            <li className="p-2 bg-teal-500 text-white m-2 rounded text-sm" key={outlet}>{outlet}</li>
                        ))}
                    </ul>
                </div>
            </div>
           
        </div>
    );
}

export default Profile;