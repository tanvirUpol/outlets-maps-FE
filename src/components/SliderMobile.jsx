import { useState,useRef,useEffect } from "react";
import ReactSlider from 'react-slider'

const SliderMobile = ({title,screen,minValue,maxValue,handleInput,startValue,endValue,setMaxValue,setMinValue}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [value, setValue] = useState([0, 100]);

    const handleChange = (newValue) => {
        setValue(newValue);
        onChange(newValue);
    };

 



    const handleOutsideClick = (event) => {
        if (dropdownRef.current && screen==="big" && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
    };
  
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
    
        return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
        };
      }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="border-b-2 border-indigo-500 text-slate-800 font-semibold py-2  items-center text-left  w-full flex justify-between mb-3"
        onClick={toggleDropdown}
      >
        <p>{title}</p>
        <svg
          className={`fill-current h-4 w-4 ${
            isOpen ? '-rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M6 8l4 4 4-4z" />
        </svg>
      </button>
      {isOpen && (
        <div className={`z-10 w-full p-5 mt-2 bg-white border border-gray-300 rounded-md shadow-lg ${screen === "big" ? 'absolute' : 'static'} `}>


            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[startValue, endValue]}
                value={[parseFloat(minValue), parseFloat(maxValue) ]}
                max = {endValue}
                min={startValue}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                // ariaValuetext={state => `${state.valueNow}`}
                // renderThumb={(props, state) => <div {...props}> <p>{state.valueNow}</p> </div>}
                // pearling = {true}
                step={100}
                minDistance={1}
                onChange={(value, index) => handleInput(value)}
            />
            <div className="flex gap-3 justify-between items-center">
                <input type="number" value={ parseFloat(minValue).toFixed(2) } onChange={(e)=>setMinValue(e.target.value)} placeholder="min" className="bg-slate-300 py-1 px-2 w-28 rounded-sm border border-gray-500" />
                <input type="number" value={parseFloat(maxValue).toFixed(2) } onChange={(e)=>setMaxValue(e.target.value)}  placeholder="max" className="bg-slate-300 py-1 px-2 w-28 rounded-sm  border-gray-500" />
            </div>
        </div>
      )}
    </div>
  )
}
export default SliderMobile