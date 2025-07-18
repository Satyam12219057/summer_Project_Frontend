// import React from 'react'

// const ProfilePage = () => {
//   return (
//     <div>
//         <h1></h1>
//     </div>
//   )
// }

// export default ProfilePage


import React from 'react';
import assets from '../assets/assets'; 

const ProfilePage = () => {
  const user = {
    fullName: 'Satyam Singh',
    email: 'satyam@example.com',
    bio: 'Cloud Engineer | MERN Stack Developer | DevOps Enthusiast',
    profilePic: '', 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <img
          src={user.profilePic || assets.avatar_icon}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-semibold text-gray-800">{user.fullName}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="mt-4 text-gray-700">{user.bio}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
