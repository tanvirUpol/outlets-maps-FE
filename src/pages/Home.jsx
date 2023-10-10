import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


// components
import Loading from "../components/Loading";
import FilterButtonDropdown from "../components/FilterButtonDropdown.jsx";
import Cards from "../components/Cards";
import DropDownMobile from "../components/DropDownsMobile.jsx";
import Map from "../components/Map";

const Home = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;

  const [selectedZonal, setSelectedZonal] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState([]);
  const [selectedProfitable, setSelectedProfitablet] = useState([]);
  const [selectedFF, setSelectedFF] = useState([]);
  const [fullScreen, setFullScreen] = useState(true);

  const hamMenuRef = useRef();
  const hamMenuButtonRef = useRef();

  const [startLat, setStartLat] = useState("");
  const [startLng, setStartLng] = useState("");



  const [isOpen, setIsOpen] = useState(false);
  const footFallGrowth = ["Positive", "Negative"];

  

  // fetch data
  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000, // 5 seconds
      };

      navigator.geolocation.getCurrentPosition(
        position => {
          setStartLng(position.coords.longitude);
          setStartLat(position.coords.latitude);
        },
        error => {
          console.error(error);
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/outlets`, {
          headers: {
            Authorization: `'Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          // console.log(json);
          setData(json);
        }
      }
      catch (error) {
        console.error('Error fetching data:', error);

      }
    };
    if (user) {
      fetchData();
    }

  }, []);

  // handle outside click for ham menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isButtonClick = event.target === hamMenuButtonRef.current;
      const isOutsideMenu =
        hamMenuRef.current && !hamMenuRef.current.contains(event.target);

      if (isOutsideMenu && !isButtonClick) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  
  
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // handle full screen for mobile
  const handleScreenChange = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFullScreen(!fullScreen);
  };

  

  if (!data) {
    return <Loading />;
  }

  // console.log(data);

  const uniqueZonal = [
    ...new Set(
      data.map((item) => {
        return item.zonal;
      })
    ),
  ];
  const uniqueDivision = [
    ...new Set(
      data.map((item) => {
        return item.division;
      })
    ),
  ];
  const uniqueDistrict = [
    ...new Set(
      data.map((item) => {
        return item.district;
      })
    ),
  ];
  const uniqueFormat = [
    ...new Set(
      data.map((item) => {
        return item.format;
      })
    ),
  ];
  const uniqueProfitable = [
    ...new Set(
      data.map((item) => {
        return item.profitable;
      })
    ),
  ];

  const uniqueOutlets = [
    ...new Set(
      data.map((item) => {
        return item.outlet_code;
      })
    ),
  ];

  localStorage.setItem('outlets', JSON.stringify(uniqueOutlets))

  // console.log(uniqueOutlets);


  // add FF growth
  data.forEach((item) => {
    const ffGrowth = item["ff_this"] - item["ff_last"];
    item["FFGrowth"] = ffGrowth >= 0 ? "Positive" : "Negative";
  });

  // console.log(data);
  const filteredData = data.filter(
    (item) =>
      (selectedZonal.length === 0 || selectedZonal.includes(item.zonal)) &&
      (selectedDivision.length === 0 ||
        selectedDivision.includes(item.division)) &&
      (selectedDistrict.length === 0 ||
        selectedDistrict.includes(item.district)) &&
      (selectedFormat.length === 0 || selectedFormat.includes(item.format)) &&
      (selectedProfitable.length === 0 ||
        selectedProfitable.includes(item.profitable)) &&
      (selectedFF.length === 0 || selectedFF.includes(item.FFGrowth)) 
  );

  console.log(filteredData);







  return (
    <main>
    {/* Grid Display */}
    <div className="pt-0 grid grid-cols-2 grid-rows-6 gap-2 md:grid-cols-4 lg:grid-cols-6  relative">
      <div
        ref={hamMenuRef}
        className={`flex md:hidden flex-col overscroll-contain gap-5 z-50 py-5 px-8 absolute top-0 right-0 h-full w-full bg-gray-200 shadow-lg transform transition-transform overflow-y-auto duration-200 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <br />
        <br />
        <DropDownMobile
          screen={"mobile"}
          setSelectedValue={setSelectedDistrict}
          selectedValue={selectedDistrict}
          options={uniqueDistrict}
          title={"District"}
        />

        <DropDownMobile
          screen={"mobile"}
          setSelectedValue={setSelectedProfitablet}
          selectedValue={selectedProfitable}
          options={uniqueProfitable}
          title={"Profitability"}
        />
        <DropDownMobile
          screen={"mobile"}
          setSelectedValue={setSelectedZonal}
          selectedValue={selectedZonal}
          options={uniqueZonal}
          title={"Zonal"}
        />

        <DropDownMobile
          screen={"mobile"}
          setSelectedValue={setSelectedDivision}
          selectedValue={selectedDivision}
          options={uniqueDivision}
          title={"Division"}
        />
        <DropDownMobile
          screen={"mobile"}
          setSelectedValue={setSelectedFormat}
          selectedValue={selectedFormat}
          options={uniqueFormat}
          title={"Format"}
        />
        <DropDownMobile
          screen={"mobile"}
          setSelectedValue={setSelectedFF}
          selectedValue={selectedFF}
          options={footFallGrowth}
          title={"FF Growth"}
        />
      </div>
      {/* map and filters */}
      <div className="flex  flex-col col-span-2 row-span-4   gap-3 md:col-span-4 md:row-span-3 lg:col-span-4 lg:row-span-7 relative">
        {/* Desktop Filters */}
        <div className="hidden filters md:flex items-center justify-end  gap-3">

          <FilterButtonDropdown
            screen={"big"}
            setSelectedValue={setSelectedDistrict}
            selectedValue={selectedDistrict}
            options={uniqueDistrict}
            title={"District"}
          />
          <FilterButtonDropdown
            screen={"big"}
            setSelectedValue={setSelectedZonal}
            selectedValue={selectedZonal}
            options={uniqueZonal}
            title={"Zonal"}
          />

          <FilterButtonDropdown
            screen={"big"}
            setSelectedValue={setSelectedDivision}
            selectedValue={selectedDivision}
            options={uniqueDivision}
            title={"Division"}
          />
          <FilterButtonDropdown
            screen={"big"}
            setSelectedValue={setSelectedFormat}
            selectedValue={selectedFormat}
            options={uniqueFormat}
            title={"Format"}
          />
          <FilterButtonDropdown
            screen={"big"}
            setSelectedValue={setSelectedProfitablet}
            selectedValue={selectedProfitable}
            options={uniqueProfitable}
            title={"Profitability"}
          />
          <FilterButtonDropdown
            screen={"big"}
            setSelectedValue={setSelectedFF}
            selectedValue={selectedFF}
            options={footFallGrowth}
            title={"FF Growth"}
          />
        </div>

        {/* ham menu */}
        <div className="md:hidden z-50 absolute top-4 right-6 ">
          <button
            ref={hamMenuButtonRef}
            onClick={toggleDrawer}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full"
          >
            <svg
              className="w-6 h-6 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        {/* ham menu end */}

        {/* full screen button */}
        <button
          onClick={() => {
            handleScreenChange();
          }}
          className="md:hidden z-40 bg-gray-500 p-2 rounded-md absolute mb-4 bottom-4 right-6"
        >
          {fullScreen === true ? (
            <img src="/assets/full-screen-exit.svg" alt="" />
          ) : (
            <img src="/assets/full-screen-button.svg" alt="" />
          )}
        </button>

        {/* legend */}
        <div className="w-36 h-28 absolute bottom-2 left-3 z-30">
          <img src="/assets/legend.svg" alt="" />
        </div>
        {/* map */}
        <div
          className={`${fullScreen ? "h-[92dvh]" : "h-full"
            } md:h-full  w-full z-0`}
        >
          <Map data={filteredData} startLat={startLat} startLng={startLng} />
        </div>
      </div>
      {/* Info Cards */}
      <Cards filteredData={filteredData} />
    </div>
  </main>
  );
};
export default Home;
