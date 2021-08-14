import { toast } from 'react-toastify';

export const mapError = (response: any): any => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const handleException = (error: any): void => {
  toast.error(error.toString());
};
