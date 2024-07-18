import { FaCross, FaSpinner, FaTimes } from "react-icons/fa";
import Image from "next/image";

export default function LargeCard({
  title,
  subHeader,
  avatar,
  symbol = "#",
  actions,
  children,
  me,
  close,
  handleClose,
}: {
  title?: string;
  subHeader: any;
  avatar?: string;
  symbol?: string;
  actions: any;
  children?: any;
  me?: boolean;
  close?: boolean;
  handleClose?: Function;
}) {
  return (
    <div className="rounded-t-[5px] border border-custom-border bg-custom-lightgraytwo flex flex-col flex-1 pt-3 pb-1 lg:py-3 px-[10px] lg:px-5 h-full mx-[-8px] lg:m-0">
      <div className="flex gap-[5px] lg:gap-5 lg:mb-5 border-b border-custom-border lg:border-b-0 pb-[11px] lg:pb-[17px] relative">
        <div className="bg-custom-contentgray w-[50px] h-[50px] lg:w-[96px] lg:h-[96px] flex justify-center items-center rounded-full overflow-hidden">
          {avatar ? (
            <Image src={avatar} width={96} height={96} alt="Avatar" />
          ) : (
            <span className="text-[50px] leading-none lg:text-7xl text-white text-bold">
              {symbol}
            </span>
          )}
        </div>
        <div className="lg:border-b border-custom-border flex-1 flex flex-col justify-center lg:pb-0">
          <div className="flex mb-1 justify-between items-center">
            <div className="flex gap-5">
              <div className="text-base font-medium lg:text-[26px] text-white">{title}</div>
              {me && (
                <div className="rounded-[5px] px-3 py-2 bg-custom-default flex gap-1">
                  <Image src="/images/five-star-badge.png" width={20} height={20} alt="Five star" />
                  <span className="text-[13px] text-white text-semibold">MYSELF</span>
                </div>
              )}
            </div>
            {/* <button
              className="px-[10px] min-h-fit normal-case h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone text-white"
              onClick={toggleFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </button> */}
          </div>
          {subHeader}
          {close && (
            <>
              <div className="absolute right-0 top-1 hidden lg:block">
                <button
                  className="btn min-h-fit h-auto bg-transparent hover:bg-transparent border-none hover:border-none p-0 min-h-auto cursor-pointer"
                  onClick={() => handleClose && handleClose()}
                >
                  <Image src="/icons/close.svg" width={30} height={30} alt="Five star" />
                </button>
              </div>
              <div className="absolute right-0 top-[-8px] lg:hidden">
                <button
                  className="btn min-h-fit h-auto bg-transparent hover:bg-transparent border-none hover:border-none p-0 min-h-auto cursor-pointer"
                  onClick={() => handleClose && handleClose()}
                >
                  <Image src="/icons/close.svg" width={25} height={25} alt="Five star" />
                </button>
              </div>
            </>
          )}
          <div className="absolute right-0 bottom-[11px] lg:bottom-[30px]">{actions}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
