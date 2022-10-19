import { Tab } from '@headlessui/react';
import React, { Fragment } from 'react';
import Login from './Login';
import Signup from './Signup';
import '../style.css';

export const Start = (): React.ReactElement => {
  return (
    <div className='flex h-auto'>
      <div className='mx-4 my-4 w-full rounded border border-gray-600 p-8 shadow-lg sm:mx-auto sm:my-8 sm:max-w-md'>
        <Tab.Group>
          <Tab.List className='grid grid-cols-3'>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div className='flex focus:outline-none'>
                  <button
                    className={`mx-auto text-2xl font-bold ${
                      selected && 'highlight'
                    }`}
                  >
                    Login
                  </button>
                </div>
              )}
            </Tab>
            <h2 className='text-center text-2xl font-bold'>|</h2>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div className='flex focus:outline-none'>
                  <button
                    className={`mx-auto text-2xl font-bold ${
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
            <Tab.Panel className='focus:outline-none'>
              <Login />
            </Tab.Panel>
            <Tab.Panel className='focus:outline-none'>
              <Signup />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Start;
