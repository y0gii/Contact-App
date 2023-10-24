import {AiOutlineClose} from 'react-icons/ai'
import {createPortal} from 'react-dom'
const Modal = ({onClose,isOpen,children}) => {
  return createPortal (
      <>
        {isOpen && (
          <div
          className='absolute top-0 grid w-screen h-screen z-45 backdrop-blur place-items-center'>
            <div className='min-h-[200px] min-w-[80%] bg-white p-4 relative z-50 m-auto'>
              <div className='flex justify-end'>
                <AiOutlineClose onClick={onClose} className='text-2xl'/>
              </div>
              {children}
            </div>
          </div>
        )}
      </>,
    document.getElementById("modal-root")  
  );
};

export default Modal