import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { Component } from "react";


Component.propTypes = {
    title: PropTypes.string,
    mainData: PropTypes.number,
    diff: PropTypes.number,
    percentage: PropTypes.number
}

const Card = ({title,mainData,diff,percentage, path}) => {
    const numFor = Intl.NumberFormat('en-US');

    return (
        <>
            <Link to={path} className="block mx-1 w-full p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                <h5 className="mb-1 text-sm lg:text-lg font-bold tracking-tight text-gray-600">{title}</h5>
                <p className="mb-1 font-semibold text-gray-950 text-lg lg:text-2xl">{ numFor.format( Math.round(mainData) )}</p>
                <span className={`flex text-xs gap-1 font-semibold ${diff < 0 ? "text-rose-500":"text-green-600"}`} ><p>{numFor.format(diff) }</p> | <p>{percentage} %</p> </span>
            </Link>
        </>
    )
}
export default Card