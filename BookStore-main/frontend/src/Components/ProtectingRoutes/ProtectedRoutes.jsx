import React from 'react'

export default function ProtectedRoutes({children}) {

if (localStorage.getItem("token")==null){

    return (
        <div className="flex justify-center items-center min-h-screen " style={{backgroundColor:'#F5F3EE'}}>
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-serif pb-4">Access Denied</h2>
            <p className="mb-4 text-gray-600">
              You do not have permission to access this page. Please log in to continue.
            </p>
            <a href="/login" className="text-blue-500 hover:underline">
              Go to Login
            </a>
          </div>
        </div>
      );
}


  return (
    <>
          {children}
    </>
  )
}
