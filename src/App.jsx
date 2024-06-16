import Navbar from "./components/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import { FaPlusCircle  } from "react-icons/fa";
import {collection, getDocs, onSnapshot} from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "./Config/firebase"
import ContactCard from "./components/ContactCard";

import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer } from "react-toastify";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {

  const [contacts, setContacts] = useState([])

  const {isOpen, onClose, onOpen} = useDisclouse();

  useEffect(()=>{

    const getContacts = async()=>{
    try{
      const contactRef = collection (db, "Contact")

      // const contactsSnapshot = await getDocs(contactRef)

      onSnapshot(contactRef,(snapshot) => {
        const contactsList = snapshot.docs.map(doc =>{
          return (
          {
            id: doc.id,
            ...doc.data(),
          }
        )
        });
      setContacts(contactsList);
      return contactsList;
      })

      

    }catch(error){
      console.log(error);
    }
    }

    getContacts();
  },[])


  const filterContacts= (e) => {
    const value = e.target.value;
    const contactRef = collection (db, "Contact")

    // const contactsSnapshot = await getDocs(contactRef)

    onSnapshot(contactRef,(snapshot) => {
      const contactsList = snapshot.docs.map(doc =>{
        return (
        {
          id: doc.id,
          ...doc.data(),
        }
      )
      });
   
    const filteredContacts = contactsList.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));

    setContacts(filteredContacts);
    return filteredContacts;
    })
  }
  return (
    <>
    <div className = "mx-auto max-w-[370px] px-4">

<Navbar>
  
</Navbar>

<div className="flex gap-2">
    

  <div className= "flex relative items-center flex-grow">
          <IoSearchSharp  className="ml-1 text-white text-3xl absolute "/>
          <input onChange = {filterContacts} placeholder = "Search Contact" type="text" className="text-white pl-9 border border-white bg-transparent rounded-md h-10 flex-grow" />
  </div>



    <FaPlusCircle onClick={onOpen} className="text-white text-5xl cursor-pointer" />


</div>

<div className="mt-4 gap-3 flex flex-col" >
  { contacts.length <=0 ? <NotFoundContact/> :
    contacts.map((contact)=>(
    <ContactCard key = {contact.id} contact={contact}/>
  ) 
   )
  }
</div>

</div>

<AddAndUpdateContact isOpen={isOpen} onClose={onClose}/>
<ToastContainer position ="bottom-center"/>
    </>
  )
}
export default App;
