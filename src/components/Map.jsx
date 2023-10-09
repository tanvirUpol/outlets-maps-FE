import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import L from 'leaflet';
import { Link } from 'react-router-dom';

const Map = ({data,startLat,startLng}) => {
    

    var myIconBad = L.divIcon({className: 'rounded-full bg-black border border-stone-800',iconSize:[17,17]});
    
     function setMarker(profitable,format){


          if(profitable === "Profitable" && format === "Franchise")
          {
            
            return greenTriIcon;
          }
          else if(profitable === "Loss-making" && format === "Franchise")
          {
            return redTriIcon;
          }
          else if(profitable === "Profitable" && format === "Own Outlet")
          {
            return greenCirIcon;
          }
          else if(profitable === "Loss-making" && format === "Own Outlet")
          {
            
            return redCirIcon;
          }
          else {
            return myIconBad
            
          }
      
     }

      var LeafIcon = L.Icon.extend({
      });

      var greenTriIcon = new LeafIcon({
        iconUrl: '/assets/greenTri.svg', 
      })
      var redTriIcon = new LeafIcon({
        iconUrl: '/assets/redTri.svg', 
      })
      var greenCirIcon = new LeafIcon({
        iconUrl: '/assets/greenCir.svg', 
      })
      var redCirIcon = new LeafIcon({
        iconUrl: '/assets/redCir.svg', 
      })




    const handleDirectionMapLinkClick = (lat,lng) => {
      const url = `https://www.google.com/maps/dir/${startLat},${startLng}/${lat},${lng}`;
      window.open(url);
    };

    

    function getNumberOfDays(month) {
      const lowercaseMonth = month.toLowerCase();
      // Create an object with month names as keys and their corresponding number of days as values
      const daysInMonth = {
        january: 31,
        february: 28, // Assuming it's not a leap year
        march: 31,
        april: 30,
        may: 31,
        june: 30,
        july: 31,
        august: 31,
        september: 30,
        october: 31,
        november: 30,
        december: 31
      };
      
      // Retrieve the number of days for the given month
      const numberOfDays = daysInMonth[lowercaseMonth];
      
      // Return the result
      return numberOfDays;
    }


    function roundNumber(number) {
      var decimalPart = number % 1;
      if (decimalPart >= 0.5) {
        return Math.ceil(number);
      } else {
        return Math.floor(number);
      }
    }

    function getAvg(value,day) {
      const avgValue = roundNumber(value/day)
      return avgValue
    }

    
    const calculatePercentage = (thisVal, lastVal , lastFF, day) => {
      if(lastFF>0) {
        return (((getAvg(thisVal,day)  - getAvg(lastVal,day)) / lastVal) * 100).toFixed(2);
      } else { 
        return ""
      }
    };
    
    function getAvgBS(avgSales,avgFF){
      const avgValue = roundNumber(avgSales/avgFF)
      return avgValue
    }

    

    return (
        <>
          <MapContainer 
            center={[23.897946, 90.330639]} 
            zoom={7} 
            scrollWheelZoom={true}
           
          >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
           {data.map((item,index) => 
           <Marker key={index} icon={setMarker(item.profitable,item.format)} position={[item.latitude,item.longitude]}>
            
              <Popup>
                <div className='p-1' >
                
                  <div className='text-sm leading-4' >
                      <p className={`font-semibold text-lg ${item.profitable !== 'Profitable'?"text-rose-500" : "text-teal-500" }`} >{item.name}</p>
                      {/* sales data */}
                      <p>
                        <span  className='font-semibold' >Avg Sales/day: </span>
                        <span className='mr-1' >{ getAvg(item["sales_this"],item.day) } ৳  </span>  
                        
                        <span className={`${item["sales_this"]<item["sales_last"]?"text-red-400":"text-green-500"}`} > 
                          { calculatePercentage(item["sales_this"],item["sales_last"],item["ff_last"],item.day)} 
                          <span className={`${item["ff_last"]==0?"hidden":"inline-block"}`} >%</span>
                        </span>
                          
                         
                      </p>
                      {/* FF data */}
                      <p>
                        <span  className='font-semibold' >Avg FF/day: </span>
                        <span className='mr-1' >{ getAvg(item["ff_this"],item.day) } </span>  
                        
                        <span className={`${item["ff_this"]<item["ff_last"]?"text-red-400":"text-green-500"}`} > 
                          { calculatePercentage(item["ff_this"],item["ff_last"],item["ff_last"],item.day)} 
                          <span className={`${item["ff_last"]==0?"hidden":"inline-block"}`} >%</span>
                        </span>   
                      </p>
                      {/* BS data */}
                      <p>
                        <span  className='font-semibold' >Avg BS/day: </span>
                        <span className='mr-1' >{ getAvgBS(getAvg(item["sales_this"],item.day),getAvg(item["ff_this"],item.day)) } ৳  </span>  
                        
                        <span className={`${item["bs_this"]<item["bs_last"]?"text-red-400":"text-green-500"}`} > 
                          { calculatePercentage(item["bs_this"],item["bs_last"],item["ff_last"],item.day)} 
                          <span className={`${item["bs_last"]==0?"hidden":"inline-block"}`} >%</span>
                        </span>   
                      </p>
                      {/* GPV data */}
                      <p>
                        <span  className='font-semibold' >GPV growth: </span>
                        <span className='mr-1' >{ getAvg(item["gpv_this"],item.day) } ৳  </span>  
                        
                        <span className={`${item["gpv_this"]<item["gpv_last"]?"text-red-400":"text-green-500"}`} > 
                          { calculatePercentage(item["gpv_this"],item["gpv_last"],item["ff_last"],item.day)} 
                          <span className={`${item["gpv_last"]==0?"hidden":"inline-block"}`} >%</span>
                        </span>   
                      </p>
                      
                      <p>
                        <span  className='font-semibold' >District: </span>{item.district}
                      </p>
                      <p>
                        <span  className='font-semibold' >Format: </span>{item.format}
                      </p>
                      <p>
                        <span  className='font-semibold' >Zonal: </span>{item.zonal}
                      </p>
                      
                      <p className='cursor-pointer text-blue-500' onClick={()=>handleDirectionMapLinkClick(item.latitude,item.longitude)}>  
                        Get direction on maps &rarr;
                      </p>

                      <Link className='cursor-pointer text-blue-500' to={`/outlet/${item.outlet_code}`}>  
                        View Cat Wise Details &rarr;
                      </Link>
                      <p>

                      {/* <Link className='cursor-pointer text-blue-500' to={`/compare`}>  
                        Compare Outlets &rarr;
                      </Link> */}
                      </p>
                  </div>
                </div>
              </Popup>
            </Marker> )}
          </MapContainer>
        </>
     )
}
export default Map