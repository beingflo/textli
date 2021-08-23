import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react';
import Login from './Login';
import Signup from './Signup';
import '../style.css';

export const Start = (): React.ReactElement => {
  return (
    <div className="flex h-auto">
      <div className="p-8 shadow-2xl rounded-md mx-2 sm:mx-auto my-8 w-full sm:max-w-md">
        <Tab.Group>
          <Tab.List className="grid grid-cols-3">
            <Tab as={Fragment}>
              {({ selected }) => (
                <div className="flex">
                  <button
                    className={`text-2xl font-bold mx-auto ${
                      selected && 'highlight'
                    }`}
                  >
                    Login
                  </button>
                </div>
              )}
            </Tab>
            <h2 className="text-2xl font-bold text-center">|</h2>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div className="flex">
                  <button
                    className={`text-2xl font-bold mx-auto ${
                      selected && 'highlight'
                    }`}
                  >
                    Sign up
                  </button>
                </div>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Login />
            </Tab.Panel>
            <Tab.Panel>
              <Signup />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Start;
