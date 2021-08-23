import { toast } from 'react-toastify';

export const mapError = (response: Response): any => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const handleException = (error: Error): void => {
  toast.error(error.toString());
};
