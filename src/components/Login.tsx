import React from 'react';

const Login = (): React.ReactElement => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-sm rounded-md m-auto w-1/2 max-w-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700 text-sm">Username</span>
              <input
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
                placeholder="Enter your username"
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Password</span>
              <input
                type="password"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </label>
            <button
              type="submit"
              className="w-full py-3 mt-10 bg-gray-800 rounded-md
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
