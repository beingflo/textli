import { get, update } from 'idb-keyval';
import React from 'react';
import { useAppDispatch } from '../../../context';
import { setShowKeyprompt } from '../../../context/showKeypromtReducer';
import { AddIcon } from '../../../icons';

export const Workspaces = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [workspaces, setWorkspaces] = React.useState<[any]>();

  const getWorkspaces = () => {
    get('workspaces').then((workspaces) => setWorkspaces(workspaces));
  };

  React.useEffect(() => getWorkspaces(), []);

  const deleteWorkspace = React.useCallback(
    (name: string) => {
      update('workspaces', (workspaces) => {
        return workspaces?.filter((workspace: any) => workspace?.name !== name);
      });
      getWorkspaces();
    },
    [workspaces]
  );

  const handleAddNew = React.useCallback(() => {
    setShowKeyprompt(true, dispatch);
  }, [dispatch, setShowKeyprompt]);

  return (
    <>
      <ul className="space-y-4">
        {workspaces?.map((workspace: any) => (
          <li key={workspace?.name} className="flex flex-row justify-between">
            <span className="truncate font-semibold">{workspace?.name}</span>
            <button
              onClick={() => deleteWorkspace(workspace?.name)}
              className="text-yellow-400"
            >
              Delete
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleAddNew}
            className="inline-flex flex-row px-2 py-1 bg-gray-100 rounded-md"
          >
            <AddIcon className="w-4 h-4 self-center" />
            Add new
          </button>
        </li>
      </ul>
    </>
  );
};

export default Workspaces;
