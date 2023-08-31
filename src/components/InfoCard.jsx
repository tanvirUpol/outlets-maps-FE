const InfoCard = ({title,value}) => {
  return (
    
        <div className={`block text-xs md:text-sm max-w-full p-6 bg-white border  border-gray-200 rounded-lg shadow hover:bg-gray-100 ${(title === "Reason" || title === "Article Name")  && "col-span-2"}`}>
           <p className=" font-bold text-gray-700 mb-2" >{title}</p>
           <p>{value}</p>
        </div>

  )
}
export default InfoCard