import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Loading from "../components/Loading";

const HomeAdmin = () => {
  const { user } = useAuthContext()

  if (!user) {
    return <Loading />
  }

  return (
    <>
      <h2 className='text-xl font-bold text-center md:text-left my-6' >Admin Homepage</h2>
      {/* <div className='flex flex-col md:flex-row items-center w-full  gap-5'>
        <Link className='flex justify-center items-center bg-green-50 w-full py-5 gap-5 rounded border border-green-400' to={`/uploadFile`}>
          <img className='w-10' src="/assets/excel-document.svg" alt="" />
          <span className='text-lg font-bold ml-4' >Upload Excel File</span>
          <img src="/assets/arrow-right.svg" alt="" />
        </Link>
        <Link className='flex justify-center items-center bg-blue-50 w-full py-5 gap-5 rounded border border-blue-400' to={`/submissions`}>
          <img className='w-10' src="/assets/List.svg" alt="" />
          <span className='text-lg font-bold ml-4' >View Submissions</span>
          <img src="/assets/arrow-right.svg" alt="" />
        </Link>
      </div> */}
    </>

  )
}
export default HomeAdmin