import { get, update } from 'idb-keyval';
import { useAtom } from 'jotai';
import React from 'react';
import { showKeypromptState } from '../../state';
import { AddIcon, FilledStarIcon, StarIcon } from '../../../icons';

export const Workspaces = (): React.ReactElement => {
  const [workspaces, setWorkspaces] = React.useState<[any]>();
  const [defaultWS, setDefaultWS] = React.useState();
  const [,setShowKeyprompt] = useAtom(showKeypromptState);

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

  React.useEffect(() => {
    update('workspaces', (workspaces) => {
      return workspaces?.map((workspace: any) => {
        if (workspace?.name === defaultWS) {
          return { ...workspace, default: true };
        } else {
          return { ...workspace, default: false };
        }
      });
    });
  }, [workspaces, defaultWS]);

  React.useEffect(() => {
    const defaultWorkspace = workspaces?.find(
      (workspace: any) => workspace?.default === true
    );
    setDefaultWS(defaultWorkspace?.name);
  }, [workspaces]);

  const handleAddNew = React.useCallback(() => {
    setShowKeyprompt(true);
  }, [setShowKeyprompt]);

  return (
    <>
      <ul className="space-y-4">
        {workspaces?.map((workspace: any) => (
          <li key={workspace?.name} className="flex flex-row justify-between">
            <div className="flex flex-row space-x-4">
              <button
                onClick={() => setDefaultWS(workspace?.name)}
                className=""
              >
                {workspace?.name === defaultWS ? (
                  <FilledStarIcon className="w-4 h-4 self-baseline text-yellow-400 transform scale-110" />
                ) : (
                  <StarIcon className="w-4 h-4 self-baseline" />
                )}
              </button>
              <span className="truncate font-semibold">{workspace?.name}</span>
            </div>
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
