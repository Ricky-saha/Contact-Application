import {IoIosContacts} from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";


const ContactCard = ({contact}) => {
    const {isOpen, onClose, onOpen } = useDisclouse();


    const deleteContact = async (id)=>{

        try{
            await deleteDoc(doc(db, "Contact", id))
            toast.success("Contact deleted successfully")
        }
        catch(error){
            console.log(error);
        }
    }

  return (
   <>
    <div key = {contact.id} className = "bg-yellow flex justify-between items-center p-2 rounded-lg">
           <div className=" flex gap-2">
           <IoIosContacts className="text-orange text-5xl"></IoIosContacts>
            <div className="text-black">
              <h2 className="text-medium">{contact.name}</h2>
              <p className="text-sm">{contact.email}</p>
            </div>
           </div>
            <div className="flex gap-4">
            <RiEditCircleLine onClick = {onOpen} className="text-3xl cursor-pointer" />
            <IoTrashBinSharp onClick={()=>deleteContact(contact.id)} className="text-orange text-3xl cursor-pointer"/>
            </div>
          </div>

          <AddAndUpdateContact contact={contact} isOpen={isOpen} onClose={onClose} isUpdate/>
   
   </>
         
  )
}

export default ContactCard
