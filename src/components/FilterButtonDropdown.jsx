import { useState, useRef, useEffect } from "react";

const FilterButtonDropdown = ({
  selectedValue,
  setSelectedValue,
  options,
  title,
  screen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    const isSelected = selectedValue.includes(option);
    console.log(isSelected);

    if (isSelected) {
      setSelectedValue(selectedValue.filter((item) => item !== option));
    } else {
      setSelectedValue([...selectedValue, option]);
    }
  };

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      screen === "big" &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="inline-flex items-center rounded bg-indigo-500 px-4 py-2 text-xs font-semibold text-white lg:text-sm"
        onClick={toggleDropdown}
      >
        {title}
        <svg
          className={`ml-2 h-4 w-4 fill-current ${
            isOpen ? "-rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M6 8l4 4 4-4z" />
        </svg>
      </button>
      {isOpen && (
        <div
          className={`z-10 mt-2 rounded-md border border-gray-300 bg-white shadow-lg ${
            screen === "big" ? "absolute" : "static"
          } `}
        >
          <ul className="w-44 p-3">
            {options.map((item, index) => (
              <li key={index} className="">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={selectedValue.includes(item)}
                    onChange={() => handleOptionChange(item)}
                  />
                  <span className="ml-2">{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default FilterButtonDropdown;
