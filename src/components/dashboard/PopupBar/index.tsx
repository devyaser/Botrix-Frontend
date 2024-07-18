import { useSession } from "next-auth/client";
import Image from "next/image";
import { useEffect, useState } from "react";

import PinnedChats from "../PinnedChats";
import MyChats from "../MyChats";
import Leaderboard from "../Leaderboard";
import Trending, { TrendingItem } from "../Trending";
import { useWindowSize } from "usehooks-ts";
import { current } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { trendings } from "../../../mock-data";
import { Carousel } from "react-responsive-carousel";

export default function PopupBar({ handleStartChat }: { handleStartChat: Function }) {
  const types = ["pinned chats", "leaderboard", "trending"];
  const [currentType, setCurrentType] = useState(2);
  const router = useRouter();

  const increaseType = () => {
    setCurrentType(currentType < types.length - 1 ? currentType + 1 : 0);
  };

  const decreaseType = () => {
    setCurrentType(currentType > 0 ? currentType - 1 : types.length - 1);
  };

  const handleClick = () => {
    switch (types[currentType]) {
      case "pinned chats":
        router.push("?type=pinned_chats");
        break;
      case "leaderboard":
        router.push("?type=leaderboard");
        break;
      case "trending":
        router.push("?type=all_chats");
        break;
    }
  };

  const { width } = useWindowSize();

  if (width < 992) {
    const type = types[currentType];
    return (
      <>
        <div className="py-2 flex lg:hidden border-y border-custom-border gap-[6px]">
          <button
            className="p-[6px] btn normal-case h-auto min-h-fit text-xs font-medium bg-custom-primary hover:bg-custom-primary text-white border-custom-primary hover:border-custom-primary"
            onClick={() => handleStartChat()}
          >
            Start A Chat
          </button>
        </div>
        <div className="flex items-center h-[40px] lg:hidden border-b gap-2 py-[5px] border-custom-border">
          <button
            className="btn min-h-fit h-auto bg-transparent hover:bg-transparent border-none hover:border-none p-0"
            onClick={() => decreaseType()}
          >
            <Image src="/icons/arrow-left.svg" width={24} height={24} alt="Left Arrow" />
          </button>
          <div className="text-sm text-custom-darkgraythree font-bold uppercase">{type}</div>
          <div className="flex-1" onClick={() => handleClick()}>
            {/* {type === "trending" && ( */}
            <Carousel
              axis="vertical"
              autoPlay
              interval={1000}
              infiniteLoop
              showStatus={false}
              showArrows={false}
              showIndicators={false}
              showThumbs={false}
            >
              {trendings.map((trendingItem, leaderIdx) => (
                <div key={leaderIdx} className="h-[28px]">
                  <TrendingItem rank={leaderIdx + 1} key={leaderIdx} label={trendingItem.label} />
                </div>
              ))}
            </Carousel>
          </div>
          <button
            className="btn min-h-fit h-auto bg-transparent hover:bg-transparent border-none hover:border-none p-0"
            onClick={() => increaseType()}
          >
            <Image src="/icons/arrow-right.svg" width={24} height={24} alt="Right Arrow" />
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="w-[275px] p-2 lg:block hidden">
      <div className="border-b border-custom-border p-2 pb-4">
        <button
          className="btn normal-case font-medium text-base btn-block bg-custom-primary hover:bg-custom-primary text-white border-custom-primary hover:border-custom-primary"
          onClick={() => handleStartChat()}
        >
          Start a Chat
        </button>
      </div>
      <div className="max-h-[calc(100%-56px)] overflow-auto no-scrollbar">
        <PinnedChats />
        <MyChats />
        <Leaderboard />
        <Trending />
      </div>
    </div>
  );
}
