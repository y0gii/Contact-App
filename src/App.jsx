import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import {BsSearchHeart} from 'react-icons/bs'
import {ImUserPlus} from 'react-icons/im'
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundComponent from "./components/NotFoundComponent";
const App = () => {
  const[contacts,setContacts] = useState([]);
  const{onClose,onOpen,isOpen}=useDisclose();
  useEffect(()=>{
    const getContacts = async () => {
      try {
        const contactsRef = collection(db,"contacts");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) =>{
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setContacts(contactLists);
          return contactLists;
        })
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  },[]); 
  const filterContacts =(e)=>{
    const value = e.target.value;
    const contactsRef = collection(db,"contacts");
        onSnapshot(contactsRef,(snapshot)=>{
          const contactLists = snapshot.docs.map((doc) =>{
            return {
              id: doc.id,
              ...doc.data(),
            }
          });
          const filteredContacts = contactLists.filter((contact)=>
            contact.name.toLowerCase().includes(value.toLowerCase())
          );
          setContacts(filteredContacts);
          return filteredContacts;
        })
  }
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar/>
        <div className="flex gap-2">
          <div className="relative flex items-center flex-grow">
          <BsSearchHeart className="absolute ml-1 text-3xl text-white" />
            <input onChange={filterContacts} type="text" className="flex-grow h-10 pl-10 text-white bg-transparent border border-white"/>
          </div>
            <ImUserPlus onClick={onOpen}className="text-5xl text-white cursor-pointer"/>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          {
            contacts.length<=0?<NotFoundComponent/>:
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact}/>
            ))
          }
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
      <ToastContainer position="bottom-center" />
    </>
  )
}

export default App