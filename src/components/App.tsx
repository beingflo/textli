import React from 'react';
import Editor from './Editor';
import Sidebar from './Sidebar';
import ActionGroup from './ActionGroup/ActionGroup';
import { NoteStatus } from './NoteStatus';

const App = (): React.ReactElement => {
  const [query, setQuery] = React.useState('');

  return (
    <div className="h-auto flex justify-between w-full relative">
      <div className="w-12">
        <Sidebar query={query} setQuery={setQuery} />
      </div>
      <div className="max-w-xxs sm:max-w-md md:min-w-sm lg:max-w-6xl">
        <Editor />
      </div>
      <div className="pr-6 pt-6 h-auto">
        <ActionGroup />
      </div>
      <NoteStatus />
    </div>
  );
};

export default App;
