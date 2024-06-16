import {ErrorMessage, Field, Form , Formik} from "formik";
import Model from './Model'
import { db } from "../Config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";


const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is required"),
    email:Yup.string().email("Invalid Email").required("Email is required"),

})
const AddAndUpdateContact = ({contact, isOpen , onClose , isUpdate}) => {


const addContact = async (contact)=>{
try{
    const contactRef = collection(db, "Contact")
   await addDoc(contactRef, contact);
onClose();
toast.success("Contact added successfully");

}
catch(error){
console.log(error);
}


}

const updateContact = async (contact, id)=>{
    try{
        const contactRef = doc(db, "Contact", id)
        await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated successfully");
    }
    catch(error){
    console.log(error);
    }
}


  return (
    <div>
        <Model isOpen ={isOpen} onClose={onClose}>
           <Formik
           validationSchema={contactSchemaValidation}
           initialValues={isUpdate ?
            {
            name:contact.name,
            email:contact.email
           }:
           {
            name:"",
            email:""
           }}
           onSubmit = {(values)=> {
            console.log(values)
            
            isUpdate ? updateContact({name:values.name, email:values.email}, contact.id) 
            :
            addContact({name:values.name, email:values.email});
           }}
           >
                <Form className="flex flex-col gap-4">
                   <div className="flex flex-col gap-1">
                   <label htmlFor="name">Name</label>
                    <Field name ="name" className="  focus: cursor-pointer outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ... border h-10"></Field>
                    <div className="text-xs text-red-500">
                        <ErrorMessage name = "name"/>
                    </div>
                   </div>
                   <div className="flex flex-col gap-1">
                   <label htmlFor="email">Email</label>
                    <Field name ="email" className=" focus:cursor-pointeroutline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ... border h-10"></Field>
                    <div className="text-xs text-red-500">
                    <ErrorMessage name = "email"/>
                    </div>
                   </div>
                   <button type= "submit" className="self-end bg-orange px-3 py-1.5 border 3">{isUpdate ? "Update" : "Add"} Contact</button>
                   
                   
                
                </Form>
           </Formik>

         </Model>
    </div>
  )
}

export default AddAndUpdateContact
