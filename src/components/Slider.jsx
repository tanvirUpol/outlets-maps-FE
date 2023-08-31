import { useState,useRef,useEffect } from "react";
import ReactSlider from 'react-slider'

const Slider = ({title,screen,minValue,maxValue,handleInput,startValue,endValue,setMaxValue,setMinValue}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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
        className="bg-indigo-500 text-sm text-white font-semibold py-2 px-4 rounded inline-flex items-center"
        onClick={toggleDropdown}
      >
        {title}
        <svg
          className={`fill-current h-4 w-4 ml-2 ${
            isOpen ? '-rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M6 8l4 4 4-4z" />
        </svg>
      </button>
      {isOpen && (
        <div className={`z-10 max-w-72 p-5 mt-2 bg-white border border-gray-300 rounded-md shadow-lg ${screen === "big" ? 'absolute' : 'static'} `}>


            <ReactSlider
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                defaultValue={[startValue, endValue]}
                value={[parseFloat(minValue), parseFloat(maxValue) ]}
                renderThumb={(props, state) => <div {...props} />}
                max = {endValue}
                min={startValue}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                ariaValuetext={state => `${state.valueNow}`}
                // renderThumb={(props, state) => <div {...props}> <p>{state.valueNow}</p> </div>}
                pearling = {true}
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
export default Slider