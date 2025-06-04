import React from 'react';

const PowerPointHolder = ({ title, description, type, url }) => {
  return (
      <div className="w-[216.62px] min-h-[140px] bg-gradient-to-b from-[#bb0c8a] to-[#90066a] rounded-[5px]">
        <div className="p-3">
          <div className="flex justify-between pb-3">
            <div className="w-[44.21px] h-[41.45px] bg-[#e63363] rounded-[5px] flex items-center justify-center">
              <img
                  className="w-[18px] h-[21px]"
                  src="./images/pptIcon.png"
                  alt="ppt"
              />
            </div>
            <a
                href={url}
                download
                className="w-[64.64px] h-[24.34px] bg-[#f1aa2e] rounded-[5px] items-center px-1 mt-3 flex justify-center"
            >
              Save
              <img
                  className="w-[18.09px] h-[18.09px]"
                  src="./images/downloadIcon.png"
                  alt="download"
              />
            </a>
          </div>
          <hr />
          <div className="flex flex-col gap-3 mt-1">
            <p className="text-white text-xs font-bold">{title}</p>
            <p className="text-white text-[11px] font-normal">{description}</p>
            <p className="text-white text-[11px] font-normal">{type}</p>
          </div>
        </div>
      </div>
  );
};

export default PowerPointHolder;