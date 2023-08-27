import { toast } from "react-toastify";

class Toast {
  toastSuccess(input: { message: string; timeOut?: number }) {
    toast.success(input.message, {
      position: "bottom-center",
      autoClose: input.timeOut || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  toastError(input: { message: string; timeOut?: number }) {
    toast.error(input.message, {
      position: "bottom-center",
      autoClose: input.timeOut || 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
}

export default new Toast();
