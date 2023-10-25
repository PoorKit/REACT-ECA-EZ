import { useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { editMe } from "../services/api";
import toast from 'react-hot-toast';
import ActivityIndicator from "./activityloader";

const Profile = () => {
    const { user, setUser } = useUserContext();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserData, setEditedUserData] = useState({ ...user });
    const [isLoading, setIsLoading] = useState(false);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleEdit = () => {
        setIsLoading(true);
        editMe(editedUserData)
          .then(response => {
            setUser(response);
            setIsEditing(false);
            handleSuccess();
          })
          .catch(error => {
            handleFail();
            console.error("Error editing user data:", error);
          }).finally(() => {
            setIsLoading(false);
            
          });
    };

    const handleSuccess = () => {
        toast.success('Data Saved');
    };

    const handleFail = () => {
        toast.error("Failed Server Communication");
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 w-96 h-fit">
            <h1 className="text-2xl font-bold">{user.name.firstname} {user.name.lastname}</h1>
            <p className="text-gray-600">{user.email}</p>

            <div className="mt-4">
                <h2 className="text-lg font-semibold">Address</h2>
                {isEditing ? (
        <>
            <div className="mb-2">
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
                <input
                    type="text"
                    id="street"
                    value={editedUserData.address.street}
                    onChange={(e) => setEditedUserData({ ...editedUserData, address: { ...editedUserData.address, street: e.target.value } })}
                    className="border rounded p-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                <input
                    type="text"
                    id="number"
                    value={editedUserData.address.number}
                    onChange={(e) => setEditedUserData({ ...editedUserData, address: { ...editedUserData.address, number: parseInt(e.target.value) } })}
                    className="border rounded p-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input
                    type="text"
                    id="city"
                    value={editedUserData.address.city}
                    onChange={(e) => setEditedUserData({ ...editedUserData, address: { ...editedUserData.address, city: e.target.value } })}
                    className="border rounded p-1 w-full"
                />
            </div>
            <div className="mb-2">
                <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
                <input
                    type="text"
                    id="zipcode"
                    value={editedUserData.address.zipcode}
                    onChange={(e) => setEditedUserData({ ...editedUserData, address: { ...editedUserData.address, zipcode: e.target.value } })}
                    className="border rounded p-1 w-full"
                />
            </div>
        </>
    ) : (
                    <>
                        <p>{user.address.street}, {user.address.number}</p>
                        <p>{user.address.city}, {user.address.zipcode}</p>
                    </>)
                }
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold">Phone</h2>
                {isEditing ? (
                    <div className="mb-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            value={editedUserData.phone}
                            onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })}
                            className="border rounded p-1 w-full"
                        />
                    </div>
                ) : (
                    <p>{user.phone}</p>)
                }
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-semibold">Geolocation</h2>
                <p>Latitude: {user.address.geolocation.lat}</p>
                <p>Longitude: {user.address.geolocation.long}</p>
            </div>

            <button
                className="mt-4 bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-300"
                onClick={isEditing ? handleEdit : toggleEdit}
            >
                {isEditing ? isLoading ? <ActivityIndicator isLoading={isLoading} text={"Saving..."} /> : "Save" : "Edit"}
            </button>
        </div>
    );
};

export default Profile;
