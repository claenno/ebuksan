import React from "react";

const AdminQuiz = () => {
  return (
    <>
      <div className='className="w-[670px] h-auto bg-[#fe6462] rounded-[5px] p-6'>
        <div className="">
          <p className="text-xl">Question:</p>
          <input
            className="h-11 w-[100%] rounded-[5px] border border-black bg-white px-3"
            type="text"
          />

          <p className="text-lg">Answer:</p>

          <div className="gap-3 flex flex-col">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="options"
                className="form-radio h-5 w-5 text-yellow-600"
              />
              <input
                type="text"
                placeholder="Enter custom value"
                className="h-11 w-[100%] rounded-[5px] border border-black bg-white px-3
                                 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="options"
                className="form-radio h-5 w-5 text-yellow-600"
              />
              <input
                type="text"
                placeholder="Enter custom value"
                className="h-11 w-[100%] rounded-[5px] border border-black bg-white px-3
                                 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="options"
                className="form-radio h-5 w-5 text-yellow-600"
              />
              <input
                type="text"
                placeholder="Enter custom value"
                className="h-11 w-[100%] rounded-[5px] border border-black bg-white px-3
                                 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="options"
                className="form-radio h-5 w-5 text-yellow-600"
              />
              <input
                type="text"
                placeholder="Enter custom value"
                className="h-11 w-[100%] rounded-[5px] border border-black bg-white px-3
                                 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </label>
            <div className="flex justify-between">
              <button className="w-[106px] h-[42px] bg-white rounded-[5px] border border-black ">
                Cancel
              </button>
              <button className="w-[106px] h-[42px] bg-[#81c548] rounded-[5px] border border-black">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminQuiz;
