import {RiEditCircleLine} from 'react-icons/ri'
import {IoMdTrash} from 'react-icons/io'
import {HiOutlineUserCircle} from 'react-icons/hi'
import { deleteDoc, doc } from 'firebase/firestore'
import {db} from '../config/firebase'
import AddAndUpdateContact from './AddAndUpdateContact'
import useDisclose from '../hooks/useDisclose'
import { toast } from 'react-toastify'
const ContactCard = ({contact}) => {
    const{onClose,isOpen,onOpen}=useDisclose();
    const deleteContact = async(id)=>{
        try {
            await deleteDoc(doc(db,"contacts",id));
            toast.success("Contact Deleted Successfully ♻️")
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
    <div key={contact.id} className="flex items-center justify-between p-2 rounded-lg bg-yellow" >
              <div className="flex gap-1">
                <HiOutlineUserCircle className="text-4xl text-orange"/>
                <div className="">
                  <h2 className="font-semibold">{contact.name}</h2>
                  <p className="text-sm">{contact.email}</p>
                </div>
              </div>
              <div className="flex text-3xl">
                <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
                <IoMdTrash onClick={()=>deleteContact(contact.id)} className="cursor-pointer text-orange"/>
              </div>
        </div>
        <AddAndUpdateContact 
        contact={contact} 
        isUpdate 
        isOpen={isOpen} 
        onClose={onClose}
        />
    </>    
  )
}

export default ContactCard