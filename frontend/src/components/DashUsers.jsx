import { useEffect, useState } from 'react'
import SummaryApi from '../common/index.js'

import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import { useSelector } from 'react-redux';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])


    // console.log(allUser)
    // ==================================================== Redux state
    const {currentUser}=useSelector((state)=>state?.user)
    const fetchAllUsers = async() =>{
        try{
            const res = await fetch(SummaryApi.getUsers.url,{
                method : SummaryApi.getUsers.method,
                credentials : 'include'
            })
    
            const data = await res.json()
            console.log(data?.users)
            if(data.success){
                setAllUsers(data?.users)
            }
    
            if(!data.success){
                console.log(data.message)
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchAllUsers()
    },[currentUser?._id])

  return (
    <div className='pb-4 min-h-screen w-full mt-[4.4rem]'>
        <table className='w-full userTable bg-blue-300 p-2'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>isAdmin</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    allUser.map((user,index) => {
                        return(
                            <>
                            <tr>
                                <td>{index+1}</td>
                                <td>{user?.username}</td>
                                <td>{user?.email}</td>
                                <td>{user?.isAdmin}</td>
                                <td>{moment(user?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
            
                                    >
                                        <MdModeEdit/>
                                    </button>
                                </td>
                            </tr>
                            </>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default AllUsers