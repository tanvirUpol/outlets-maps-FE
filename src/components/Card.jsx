import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Component } from "react";

Component.propTypes = {
  title: PropTypes.string,
  mainData: PropTypes.number,
  diff: PropTypes.number,
  percentage: PropTypes.number,
};

const Card = ({ title, mainData, diff, percentage, path }) => {
  const numFor = Intl.NumberFormat("en-US");

  function toKebabCase(input) {
    // Replace spaces with hyphens and convert to lowercase
    return input.replace(/\s+/g, "-").toLowerCase();
  }

  return (
    <>
      <Link
        to={path}
        className="mx-1 block w-full rounded-lg border border-gray-200 bg-white p-5 shadow hover:bg-gray-100"
      >
        <h5 className="mb-1 text-sm font-bold tracking-tight text-gray-600 lg:text-lg">
          {title}
        </h5>
        <p className={`mb-1 text-lg font-semibold text-gray-950 lg:text-2xl`}>
          {numFor.format(Math.round(mainData))}
        </p>
        {
          <span
            className={`flex gap-1 text-xs font-semibold ${
              diff < 0 ? "text-rose-500" : "text-green-600"
            }`}
          >
            <p>{numFor.format(diff)}</p>|<p>{percentage}</p> <span>%</span>
          </span>
        }
      </Link>
    </>
  );
};
export default Card;
