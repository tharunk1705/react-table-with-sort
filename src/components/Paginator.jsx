/* eslint-disable react/prop-types */
const Paginator = ({
  MAX_ROWS,
  currentPageIndex,
  coinsLength,
  handleNext,
  handlePrevious,
  handlePageChange,
}) => {
  return (
    <div className="flex flex-row justify-between w-4/5 p-4 bg-white ">
      <div>
        Displaying {currentPageIndex * MAX_ROWS + 1}-
        {(currentPageIndex + 1) * 10} of {coinsLength} records
      </div>
      <div className="space-x-3">
        <button
          href="#"
          className="bg-gray-500 shadow-lg px-3 text-center py-1 rounded-sm text-white"
          onClick={handlePrevious}
          disabled={currentPageIndex <= 0}
        >
          &laquo;
        </button>
        {Array.from(Array(Math.ceil(coinsLength / 10)).keys()).map((num) => (
          <button
            key={num + 1}
            className={
              currentPageIndex === num
                ? "bg-blue-500 text-white px-3 py-1 rounded-sm text-center   duration-150 transition-all"
                : "px-1 py-1"
            }
            onClick={() => handlePageChange(num)}
          >
            {num + 1}
          </button>
        ))}
        <button
          href="#"
          className="bg-gray-500 px-3 text-center py-1 rounded-sm text-white shadow-lg disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={currentPageIndex + 1 >= Math.ceil(coinsLength / MAX_ROWS)}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default Paginator;
