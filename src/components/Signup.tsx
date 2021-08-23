import React from 'react';

const Signup = (): React.ReactElement => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [email, setEmail] = React.useState('');

  const submit = (event: any) => {
    console.log(username);
    console.log(password);
    console.log(passwordConfirm);
    console.log(email);

    event.preventDefault();
  };

  const passwordMatch: boolean =
    password === passwordConfirm && password !== '';
  const passwordNoMatch: boolean =
    password !== passwordConfirm && (password !== '' || passwordConfirm !== '');

  const submitDisabled = !passwordMatch || !username;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-sm rounded-md mx-2 sm:mx-auto my-auto w-full sm:max-w-md">
        <h2 className="text-2xl font-bold text-center">Signup</h2>
        <div className="mt-8">
          <form className="grid grid-cols-1 gap-6" onSubmit={submit}>
            <label className="block">
              <span className="text-gray-700 text-sm">Username</span>
              <input
                type="text"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
                placeholder="Choose a username"
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
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event?.target?.value)}
              />
            </label>
            <label className="block">
              <span className="text-gray-700 text-sm">Confirm Password</span>
              <div className="relative">
                <input
                  type="password"
                  className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  value={passwordConfirm}
                  onChange={(event) => setPasswordConfirm(event?.target?.value)}
                />
                {passwordMatch && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke-width="2"
                    className="fill-current text-green-500 absolute top-3 right-3"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm4.768 9.14a1 1 0 1 0-1.536-1.28l-4.3 5.159-2.225-2.226a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.475-.067l5-6z"
                    />
                  </svg>
                )}
                {passwordNoMatch && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke-width="2"
                    className="fill-current text-red-500 absolute top-3 right-3"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm3.707 8.707a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293a1 1 0 1 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293z"
                    />
                  </svg>
                )}
              </div>
            </label>
            <label className="block mt-4">
              <span className="text-gray-500 text-sm">
                Email address (optional)
              </span>
              <input
                type="email"
                className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-gray-400 placeholder-gray-400"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event?.target?.value)}
              />
            </label>
            <button
              type="submit"
              disabled={submitDisabled}
              className="w-full py-3 mt-10 bg-gray-800 disabled:bg-gray-400 rounded-md
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
