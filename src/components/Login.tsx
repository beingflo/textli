import React from 'react';

const Login = (): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submit = (event: any) => {
    console.log(username);
    console.log(password);

    event.preventDefault();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-sm rounded-md mx-2 sm:mx-auto my-auto w-full sm:max-w-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div className="mt-8">
          <form className="grid grid-cols-1 gap-6" onSubmit={submit}>
            <label className="block">
              <span className="text-gray-700 text-sm">Username</span>
              <input
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event?.target?.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Password</span>
              <input
                type="password"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event?.target?.value)}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
