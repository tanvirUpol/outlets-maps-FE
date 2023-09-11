import { useState, useEffect } from "react";
import { read, utils } from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";

const UploadFile = () => {
  const [name, setName] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [submitLoad, setSubmitLoading] = useState(false);
  const { user } = useAuthContext();
  const api_url = import.meta.env.VITE_REACT_APP_API_URL;
  const [fileLoad, setFileLoad] = useState(false);




  const expectedHeaders = [
    "Outlet Code",
    "Name",
    "Longitude",
    "Latitude",
    "Assortment",
    "Available",
    "Availibility %",
    "Format",
    "Zonal",
    "Sales Contribution",
    "This Net Profit",
    "Profitable",
    "FF This",
    "FF Last",
    "BS This",
    "BS Last",
    "GPV This",
    "GPV Last",
    "Sales This",
    "Sales Last",
    "Month",
    "Division",
    "District",
  ];


  const expectedHeaders2 = [
    "Outlet Code",
    "Outlet Name",
    "Outlet Format",
    "ZONAL HEAD",
    "Master Category",
    "CAT 1",
    "Cat 3",
    "FF This",
    "FF Last",
    "Basket Size This",
    "Basket Size This",
    "Sales This",
    "Sales Last",
    "POS GPV This",
    "POS GPV Last",
    "Format Sales GR%",
    "Format FF GR%",
    "Format BS GR%",
    "Format GPV GR%",
  ];


  const keyMapping = {
    "Outlet Code": "outlet_code",
    "Name": "name",
    "Longitude": "longitude",
    "Latitude": "latitude",
    "Assortment": "assortment",
    "Available": "available",
    "Availibility %": "availability_percent",
    "Format": "format",
    "Zonal": "zonal",
    "Sales Contribution": "sales_contribution",
    "This Net Profit": "this_net_profit",
    "Profitable": "profitable",
    "FF This": "ff_this",
    "FF Last": "ff_last",
    "BS This": "bs_this",
    "BS Last": "bs_last",
    "GPV This": "gpv_this",
    "GPV Last": "gpv_last",
    "Sales This": "sales_this",
    "Sales Last": "sales_last",
    "Month": "month",
    "Division": "division",
    "District": "district"
  };

  const keyMappingCatWise = {
    "Outlet Code": "outlet_code",
    "Outlet Name": "name",
    "Outlet Format": "format",
    "ZONAL HEAD": "zonal",
    "Master Category": "master_category",
    "CAT 1": "cat_1",
    "Cat 3": "cat_3",
    "FF This": "ff_this",
    "FF Last": "ff_last",
    "Basket Size This": "bs_this",
    "Basket Size Last": "bs_last",
    "POS GPV This": "pos_gpv_this",
    "POS GPV Last": "pos_gpv_last",
    "Sales This": "sales_this",
    "Sales Last": "sales_last",
    "Format Sales GR%": "format_sales_gr",
    "Format FF GR%": "format_ff_gr",
    "Format BS GR%": "format_bs_gr",
    "Format GPV GR%": "format_pos_gpv_gr",
  };


  const dataTypes = {
    "outlet_code": "string",
    "name": "string",
    "longitude": "integer",
    "latitude": "integer",
    "assortment": "integer",
    "available": "integer",
    "availability_percent": "integer",
    "format": "string",
    "zonal": "string ",
    "sales_contribution": "integer",
    "this_net_profit": "integer",
    "profitable": "string",
    "ff_this": "integer",
    "ff_last": "integer",
    "bs_this": "integer",
    "bs_last": "integer",
    "gpv_this": "integer",
    "gpv_last": "integer",
    "pos_gpv_this": "integer",
    "pos_gpv_last": "integer",
    "sales_this": "integer",
    "sales_last": "integer",
    "month": "string",
    "division": "string",
    "district": "string",
    "outlet_format": "string",
    "zonal_head": "string",
    "master_category": "string",
    "cat_1": "string",
    "cat_3": "string",
    "format_sales_gr": "integer",
    "format_ff_gr": "integer",
    "format_bs_gr": "integer",
    "format_pos_gpv_gr":"integer",
  };



  const handleFileChange = (file) => {
    setFileLoad(true)
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = read(data, { type: "array" });
      let json
      if(file.name == "outletSum.xlsx" ){
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
         json = utils.sheet_to_json(worksheet, {
          header: 0,
          defval: "not given",
        });
      }else if(file.name == "outletCatWise.xlsb" || file.name == "outletCatWiseSPLM.xlsb" ) {
        const worksheetName = workbook.SheetNames[2];
        const worksheet = workbook.Sheets[worksheetName];
         json = utils.sheet_to_json(worksheet, {
          header: 0,
          defval: "not given",
        });
      }
      const headers = json[0];
      const actualHeaders = Object.keys(headers).map(header => header.trim());
      // console.log(actualHeaders);
      let isCorrectFormat = false;
      console.log(file.name);
      if (file.name === "outletSum.xlsx") {
        console.log(file);
        isCorrectFormat = expectedHeaders.every((expectedHeader) => actualHeaders.includes(expectedHeader));
      } else if (file.name == "outletCatWise.xlsb" || file.name == "outletCatWiseSPLM.xlsb" ) {
        isCorrectFormat = expectedHeaders2.every(expectedHeader => actualHeaders.includes(expectedHeader));
      }

      if (!isCorrectFormat) {
        console.log("Wrong file format");
        setSubmitLoading(false);
        toast.error("😢 Wrong file format.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const file = document.querySelector(".file");
        file.value = "";
        setName("");
        setJsonData("");
        setFileLoad(false)
        return;
      }

      // console.log(json);
      let transformedData;



      if (file.name == "outletSum.xlsx") {
        transformedData = json.map(item => {
          const transformedItem = {};
          for (const key in item) {
            if (keyMapping[key]) {
              transformedItem[keyMapping[key]] = item[key];
            }
          }
          return transformedItem;
        });
      }
      if (file.name == "outletCatWise.xlsb" || file.name == "outletCatWiseSPLM.xlsb" ) {
        transformedData = json.map(item => {
          const transformedItem = {};
          // console.log("item: ", item);
          for (const key in item) {
            // console.log("key: ", key);
            if (keyMappingCatWise[key.trim()]) {
              transformedItem[keyMappingCatWise[key.trim()]] = item[key];
            }
          }
          return transformedItem;
        });
      }

      // console.log(transformedData);

      function trimKeys(obj) {
        const newObj = {};
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const trimmedKey = key.trim();
            newObj[trimmedKey] = obj[key];
          }
        }
        return newObj;
      }

      const trimmedArray = transformedData.map(obj => trimKeys(obj));
      

      // Iterate through the user info array
      const modifiedUserInfo = trimmedArray.map((user) => {
        const modifiedUser = { ...user };
      
        for (const key in modifiedUser) {
          if (modifiedUser[key] === "not given" || modifiedUser[key] === "" || modifiedUser[key] === undefined) {
            // console.log(key,"paisi");
            if (dataTypes[key] === "string") {
              // console.log("string paisi");
              modifiedUser[key] = "Not available";
            } else if (dataTypes[key] === "integer") {
              // console.log("integer paisi");
              modifiedUser[key] = 0;
            }
          }
        }

        // console.log(modifiedUser);
      
        return modifiedUser;
      });
      





      const hasNotAvailable = modifiedUserInfo.some((row) => {
        // console.log(row);
        return Object.values(row).includes("not available")

      }
      );

      console.log(hasNotAvailable);


      if (hasNotAvailable) {
        console.log("some values have problems or not available");
        setSubmitLoading(false);
        toast.error("😢 few values have problems", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        const file = document.querySelector(".file");
        file.value = "";
        setName("");
        setJsonData("");
        // return;
      }

      // console.log(updatedUserInfoArray);

      console.log(modifiedUserInfo);
      setJsonData(modifiedUserInfo);
      setFileLoad(false)
    };

    reader.readAsArrayBuffer(file);
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setName(file.name);
      handleFileChange(file);
    }
  };

  const removeFile = (event) => {
    const file = document.querySelector(".file");
    file.value = "";
    setName("");
    setJsonData("");
    setSubmitLoading(false);
  };

  const handdleSubmit = async () => {
    // console.log(jsonData);
    setSubmitLoading(true);

    let custom_url;
    // upload data
    if (name == "outletSum.xlsx") {
      custom_url = `${api_url}/outlets/`
    } else if (name == "outletCatWise.xlsb") {
      custom_url = `${api_url}/cat/`
    } else if (name == "outletCatWiseSPLM.xlsb") {
      custom_url = `${api_url}/catm/`
    }
    console.log(jsonData);
    const response = await fetch(custom_url, {
      method: "POST",
      body: JSON.stringify(jsonData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `'Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      setSubmitLoading(false);
      toast.error("😢 File not submitted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (response.ok) {
      setSubmitLoading(false);
      toast.success("File uploaded successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    const file = document.querySelector(".file");
    file.value = "";
    setName("");
    setJsonData("");
  };

  if (!user) {
    return (
      <div className="flex flex-col gap-1 items-center justify-center mt-52">
        <img
          className="animate-bounce w-20 mb-6"
          src="/assets/loadin-earth.svg"
          alt=""
        />
        <p className="text-lg font-medium"> Loading... </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {!jsonData && !fileLoad && (
        <label
          className="cursor-pointer flex flex-col justify-center items-center gap-5 bg-green-100 py-14 rounded-md border-2 bor border-dashed border-green-700"
          htmlFor="upload"
        >
          <img className="w-18" src="/assets/excel-document.svg" alt="" />
          <span className="text-green-700 underline underline-offset-4 und text-lg font-medium">
            Click to Upload Excel (.xlsx){" "}
          </span>
        </label>
      )}

      {!jsonData && fileLoad && (
        <div
          className="cursor-pointer flex flex-col justify-center items-center gap-5 bg-green-100 py-14 rounded-md border-2 bor border-dashed border-green-700"
          
        >
          <img className="w-18" src="/assets/excel-document.svg" alt="" />
          <span className="text-green-700 underline underline-offset-4 und text-lg font-medium">
            Loading...
          </span>
        </div>
      )}

      {jsonData && (
        <div className="flex flex-col justify-center items-center baseline gap-5 bg-green-100 py-14 rounded-md border-2 bor border-dashed border-green-700">
          <img className="w-18" src="/assets/excel-document.svg" alt="" />
          <div className="flex items-center justify-between gap-8 p-3 bg-green-200 rounded">
            <span>File Name: {name}</span>
            <button
              className="bg-red-400 text-white py-1 px-3 rounded"
              onClick={() => removeFile()}
            >
              remove
            </button>
          </div>
        </div>
      )}

      {jsonData && (
        <button
          disabled={submitLoad}
          className="bg-green-500 p-3 w-full text-white mt-5 font-medium rounded"
          onClick={() => handdleSubmit()}
        >
          {submitLoad == true ? "Loading..." : "Submit"}
        </button>
      )}
      <input
        className="hidden file"
        name="upload"
        id="upload"
        type="file"
        accept=".xlsx, .xlsb"
        onChange={handleChange}
      />
      <ToastContainer />
    </div>
  );
};
export default UploadFile;
