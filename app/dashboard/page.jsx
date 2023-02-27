"use client"
import {URL} from "../globalLink"
import axios from "axios"
import React, { useEffect, useState } from "react"
import {useRouter} from 'next/navigation'
import useTranslation from "@/intl/useTranslation"

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import UserProfileModal from "./components/UserProfileModal"
import EditstatusModal from './components/EditstatusModal'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const initialFormValue = {
  type:'',
  senderEmailPhone:'',
  senderId:'',
  senderStatus:'UNVERIFIED',
  receiverEmailPhone:'',
  receiverId:'',
  receiverStatus:'UNVERIFIED',
  amount:'',
  
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Dahboard() {

  const router = useRouter()
  const { t,setLocale,locales } = useTranslation()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [currentType,setCurrentType] = useState({type:''})
  const [emailReceiverEmail,setReceiverData]= useState({email:''})
  const [cUser,setUser] = useState()
  const [allTrans, setTrans] = useState([])
  const [allType,setType] = useState([])
  const [transForm,setForm] = useState(initialFormValue)
  const [selectedLang,setLangBySelect]= useState()

  const [formConsts,setFormConsts]= useState({
      selectType:"Select transaction type",
      selectedTypeValue:false,
      senderUser:"",
      receiverUser:""
    })
    
    
const getTrans = async () => {
    try {
        const response = await axios.get(`${URL.preLink}/transaction/createdtransactions`,{withCredentials:true})
        setTrans(response.data.data)
    } catch (err) {
        // Handle the error
    }
}
const searchSenUser = async ()=>{
  try{
    let sendingData = {
      userEmailPhone:transForm.senderEmailPhone
    }
    let searchData = await axios.post(`${URL.preLink}/user/getuser`,sendingData,{withCredentials:true})
    console.log(searchData.data.data);
    if (searchData.data.data._id!='') {
      setFormConsts({...formConsts,senderUser:searchData.data.data.userName})
    }
  }
  catch(err){

  }
}

const searchRecUser = async ()=>{
  try{
    let sendingData = {
      userEmailPhone:transForm.receiverEmailPhone
    }
    let searchData = await axios.post(`${URL.preLink}/user/getuser`,sendingData,{withCredentials:true})
    console.log(searchData.data.data);
    if (searchData.data.data._id!='') {
      setFormConsts({...formConsts,receiverUser:searchData.data.data.userName})
    }
  }
  catch(err){

  }
}

const getTransType=async ()=>{
  try{
    const response = await axios.get(`${URL.preLink}/transaction/alltypes`,{withCredentials:true})
    setType(response.data.data)
  }
  catch(err){

  }
}

const alltrans = async ()=>{
    try{
        const response = await axios.get(`${URL.preLink}/transaction/usersalltransactions`,{withCredentials:true})
        setTrans(response.data.data)
    }
    catch(err){

    }
}
const handleInputType = (id,name)=>{
  setForm(initialFormValue)
  setCurrentType({...currentType,type:name})
  console.log(currentType.type);
  // setFormConsts({...formConsts,receiverUser:'',senderUser:''})
  if (name==="LoanTaken") {
    setForm({...transForm,type:id,receiverId:cUser,senderId:''})
    setFormConsts({...formConsts,selectType:name,selectedTypeValue:true,receiverUser:'User: Myself',senderUser:''})
  }else{
    setForm({...transForm,type:id,senderId:cUser,receiverId:''})
    setFormConsts({...formConsts,selectType:name,selectedTypeValue:true,senderUser:'User: Myself',receiverUser:''})
  }
  console.log(transForm);
  //write input change 
}
const onInputChange =(e)=>{
  setForm({...transForm,[e.target.name]:e.target.value})
  console.log(transForm);
}
const submitForm = async ()=>{
  
  let submitFormData = {
    type: transForm.type,
    amount:transForm.amount,
    sender:{
      senderEmailPhone:transForm.senderEmailPhone,
      senderId:transForm.senderId,
    },
    senderStatus:transForm.senderStatus,
    receiver:{
      receiverEmailPhone:transForm.receiverEmailPhone,
      receiverId:transForm.receiverId
    },
    receiverStatus: transForm.receiverStatus

  }
  
  const sendData = await axios.post(`${URL.preLink}/transaction/createtransaction`,submitFormData,{withCredentials:true})
  console.log(sendData.data);
  router.push('/dashboard')
}

const setemailSender= (a)=>{
  console.log(a);
  setReceiverData({...emailReceiverEmail,email:a})
  console.log(emailReceiverEmail);
}

useEffect(() => {
  if(!(localStorage.hasOwnProperty('c_personal_record_user'))){
    router.push('/')
  }
    console.log("its good");
    getTrans()
    getTransType()
    const userData = localStorage.getItem("c_personal_record_user")
    setUser(userData)
    if('lang' in localStorage){
      let langData = localStorage.getItem('lang')
      setLocale(langData)
    }
    else{
      localStorage.setItem('lang','en')

    }
}, [])

useEffect(() => {
    //initial mount
}, [allTrans])

const handleChange = (e) => {
  setLangBySelect(e.target.value)
  setLocale(e.target.value)
  localStorage.setItem('lang',e.target.value) 
}
    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                        <button type="button" class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2 my-2" onClick={()=>alltrans()}>{t("AllMyTransaction")}</button>
                        <button type="button" class="inline-block px-6 py-2.5 bg-gray-200 text-gray-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-300 hover:shadow-lg focus:bg-gray-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out mx-2 my-2" onClick={()=>getTrans()}> {t("MyCreatedTransaction")} </button>
                        <button type="button" class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModalCenter" >
    Create new Tranasaction
  </button>
  <FormControl style={{float:"right"}} sx={{ m: 1, minWidth: 100 }} size="small" >
        <InputLabel id="demo-simple-select-autowidth-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedLang}
          onChange={(e)=>handleChange(e)}
          
          label="Language"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'bn'}>Bengali</MenuItem>
          <MenuItem value={'ar'}>Arabic</MenuItem>
          <MenuItem value={'pt'}>Portugeese</MenuItem>
        </Select>
      </FormControl>
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            {t("Sender")}
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            {t("SenderStatus")}
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            {t("Receiver")}
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            {t("ReceiverStatus")}
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            {t("Amount")}
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            {t("TransactionStatus")}
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            {t("ChangeStatus")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allTrans.map((trns)=>(
                                        <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"  >
                                        {trns.sender.senderId!=null? 
                                        <a   >{trns.sender.senderEmailPhone}</a>
                                        :
                                        <a href="" className="text-red-700" onClick={()=>setemailSender(trns.sender.senderEmailPhone)}  data-bs-toggle="modal" data-bs-target="#exampleModalCenter2">{trns.sender.senderEmailPhone}</a>}
                                            
                                            
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {trns.senderStatus}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"  >
                                        {trns.receiver.receiverId!=null? 
                                        <a   >{trns.receiver.receiverEmailPhone}</a>
                                        :
                                        <a href="" className="text-red-700" onClick={()=>setemailSender(trns.sender.senderEmailPhone)}  data-bs-toggle="modal" data-bs-target="#exampleModalCenter2">{trns.receiver.receiverEmailPhone}</a>}
                                     
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {trns.receiverStatus}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {trns.amount}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {trns.transactionStatus}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <Button onClick={handleOpen}>Change Status</Button>
                                        </td>
                                    </tr>
                                    ))}  
                                  
                                </tbody>
                            </table>
                            <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="exampleModalCenter" tabindex="-1" aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog">
  <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
    <div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
      <div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
        <h5 class="text-base font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
          Create new transaction
        </h5>
        <button type="button"
          class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
          data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body relative p-4">
       <div className="container">
       <div>
    <div class="dropdown relative">
      <button
        class="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
        type="button"
        id="dropdownMenuButton1tx"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {formConsts.selectType}
        
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          class="w-2 ml-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </button>
      <ul
        class="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          hidden
          m-0
          bg-clip-padding
          border-none
        "
        aria-labelledby="dropdownMenuButton1tx"
      >
        {allType.map(types=>(
          <li>
          <a
            class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
            href="#"
            onClick={()=>handleInputType(types._id,types.en_typeName)}
            >{t(types.en_typeName)}</a
          >
        </li>
        ))}
        
        
      </ul>
    </div>
  </div>
       <div className="flex">
    <div class="mb-3 ">
      <label
        for="exampleFormControlInput4"
        class="form-label inline-block mb-2 text-gray-700 text-sm"
        >Sender email or phone </label>
      <input
      name="senderEmailPhone"
      onChange={(e)=>onInputChange(e)}
        type="text"
        class="
          form-control
          block
          w-full
          px-2
          py-1
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        id="exampleFormControlInput4"
        placeholder="Sender email or phone"
      />
    </div>
    <div class="mb-3 mr-3 ml-3">
      <label
        for="exampleFormControlInput4"
        class="form-label inline-block mb-2 text-gray-700 text-sm"
        >Sender profile </label> 
        <br/>
      {
      formConsts.senderUser==''? <Chip avatar={<Avatar>U</Avatar>} label="No user" />
      :
      <Chip avatar={<Avatar>M</Avatar>}color="success" label={formConsts.senderUser} />
    }
      
    </div>
    
    </div>

    {currentType.type==="LoanGiven" ? 
        
    <div class="flex  ml-0">
    <label
        for="exampleFormControlInput4"
        class="form-label inline-block mb-2 text-gray-700 text-sm"> Sender Status 
    </label>
    <div class="form-check form-check-inline">
      <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="senderStatus" id="inlineRadio1" onChange={(e)=>onInputChange(e)} value="SENT"/>
      <label class="form-check-label text-xs inline-block text-gray-600" for="inlineRadio10">LOAN SENT</label>
    </div>
   
    
  </div>
  :
  <button type="button"
  class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
   onClick={()=>{searchSenUser()}}
   >
  Search Receiver
</button>
  }
    <div className="flex">
    <div class="mb-3 ">
      <label
        for="exampleFormControlInput4"
        class="form-label inline-block mb-2 text-gray-700 text-sm"
        >Receiver email or phone </label>
      <input
      name="receiverEmailPhone"
      onChange={(e)=>onInputChange(e)}
        type="text"
        class="
          form-control
          block
          w-full
          px-2
          py-1
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        id="exampleFormControlInput4"
        placeholder="Sender email or phone"
      />
    </div>
    <div class="mb-3 mr-3 ml-3">
      <label
        for="exampleFormControlInput4"
        class="form-label inline-block mb-2 text-gray-700 text-sm"
        >Receiver profile </label> 
        <br/>
      {
      formConsts.receiverUser==''? <Chip avatar={<Avatar>M</Avatar>} label="No User" />
      :
      <Chip avatar={<Avatar>U</Avatar>}color="success" label={formConsts.receiverUser} />
    }
      
    </div>
    </div>
     {currentType.type==="LoanTaken" ? 
        
     <div class="flex  ml-0">
     <label
         for="exampleFormControlInput4"
         class="form-label inline-block mb-2 text-gray-700 text-sm"> Receiver Status 
     </label>
     <div class="form-check form-check-inline">
       <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="receiverStatus" id="inlineRadio1" onChange={(e)=>onInputChange(e)} value="ACKNOWLEDGED"/>
       <label class="form-check-label text-xs inline-block text-gray-600" for="inlineRadio10">ACKNOWLEDGED</label>
     </div>
     <div class="form-check form-check-inline">
       <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="receiverStatus" id="inlineRadio2" onChange={(e)=>onInputChange(e)} value="DECLINED"/>
       <label class="form-check-label text-xs inline-block text-gray-600" for="inlineRadio20">DECLINED</label>
     </div>
     <div class="form-check form-check-inline">
       <input class="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="receiverStatus" id="inlineRadio2" onChange={(e)=>onInputChange(e)} value="UNVERIFIED"/>
       <label class="form-check-label text-xs inline-block text-gray-600" for="inlineRadio20">UNVERIFIED</label>
     </div>
     
   </div>
   :
   <button type="button"
          class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
           onClick={()=>{searchRecUser()}}>
          Search Receiver
        </button>
   }
    <div className="container">
    <div class="mb-3 ml-2">
      <label
        for="exampleFormControlInput4"
        class="form-label inline-block mb-2 text-gray-700 text-sm"
        >Loan amount</label>
      <input
      name="amount"
      onChange={(e)=>onInputChange(e)}
        type="number"
        class="
          form-control
          block
          
          px-2
          py-1
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        id="exampleFormControlInput4"
        placeholder="loan amount"  min="0"
      />
    </div>
    </div>
    
        </div>                                
      
      </div>
      <div
        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
        <button type="button"
          class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-dismiss="modal">
          Close
        </button>
        <button onClick={()=>{submitForm()}} type="button" 
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
          Save
        </button>
      </div>
    </div>
  </div>
</div>
<UserProfileModal emailReceiverEmail={emailReceiverEmail} />

                        </div>
                    </div>
                </div>
            </div>
            <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
        </>
    )
}