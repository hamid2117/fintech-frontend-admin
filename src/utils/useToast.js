import { toast } from 'react-toastify'

export const useToast = (type, text) => {
  return toast.type(text, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
