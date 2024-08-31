
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link} from 'react-router-dom';

const DashSidebar = () => {
    const {currentUser}= useSelector(state => state?.user)

    // console.log(currentUser)

  return (
    <div className='min-h-screen mt-[4.4rem] md:flex hidden fixed w-[12rem]'>
        <aside className='bg-blue-300 min-h-full w-full  max-w-60 customShadow'>
                <div className='h-32  flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center border-2 border-blue-500 rounded-full '>
                        {
                        currentUser ? (
                            <img src={currentUser?.profile} className='w-20 h-20 rounded-full' alt={currentUser?.validUser?.username} />
                        ) : (
                            <FaRegCircleUser/>
                        )
                        }
                    </div>
                    <p className='capitalize text-lg font-semibold'>{currentUser?.username}</p>
                    <p className='text-sm'>{currentUser?.isAdmin}</p>
                </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                      <Link to="/dashboard?tab=profile">پروفایل</Link>
                      {
                        currentUser && currentUser?.isAdmin && (
                          <>
                          <Link to="/dashboard?tab=users" className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                          <Link to="/dashboard?tab=all-products" className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                          </>
                        )
                      }
                    </nav>
                </div>  
        </aside>
    </div>
  )
}

export default DashSidebar