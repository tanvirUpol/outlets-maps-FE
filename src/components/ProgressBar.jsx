

const ProgressBar = ({ currentCount, actualCount }) => {
  return (
    <div className="w-full  bg-gray-200 rounded-md">
      <div
        className="p-1 flex items-center justify-center text-center  text-white bg-purple-500 rounded-sm"
        style={{ width: `${(currentCount / actualCount) * 100}%` }}
      >
       <p className='text-xs' >{`${currentCount}`}</p> 
      </div>
    </div>
  );
};

export default ProgressBar;