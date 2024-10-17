import { toast } from "react-toastify";

export const useToast = () => {
  const notify = (message: any) => toast(message);

  return {
    notify,
  };
};
