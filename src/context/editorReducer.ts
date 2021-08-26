import { Editor } from '@tiptap/react';
import { State, useAppState, AppDispatch } from '.';

export type EditorAction = {
  type: string;
  editor: Editor;
};

export const EDITOR_SET_EDITOR = 'set-editor';

export const EditorReducer = (state: State, action: EditorAction): any => {
  switch (action.type) {
    case EDITOR_SET_EDITOR: {
      return {
        ...state,
        editor: action.editor,
      };
    }
    default:
      return state;
  }
};

export const useAppEditor = (): Editor | null => {
  const { editor } = useAppState();
  return editor;
};

export const setAppEditor = (
  editor: Editor | null,
  dispatch: AppDispatch
): void => {
  dispatch({
    type: EDITOR_SET_EDITOR,
    editor: editor,
  });
};
