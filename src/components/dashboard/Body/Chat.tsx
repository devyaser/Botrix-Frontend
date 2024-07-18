import LargeCard from "../../common/LargeCard";
import Image from "next/image";
import ChatBody from "./ChatBody";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import cn from "classnames";
import { useWindowSize } from "usehooks-ts";

const topCheers = [
  { medal: "/images/gold-medal.png", username: "Zekken", point1: 1200, point2: 30 },
  { medal: "/images/gold-medal-2.png", username: "Zekken", point1: 800, point2: 20 },
  { medal: "/images/gold-medal-3.png", username: "Zekken", point1: 110, point2: 10 },
];

export default function Chat({
  title,
  chats,
  isFollowed,
  handleFollow,
}: {
  title: string;
  chats: any;
  isFollowed: boolean;
  handleFollow: Function;
}) {
  const [message, setMessage] = useState("");
  const [chatsByDate, setChatsByDate] = useState(chats);
  const [showPinned, setShowPinned] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [keyword, setKeyword] = useState("");
  const messagesEndRef = useRef(null);
  const { width } = useWindowSize();

  const togglePinned = () => {
    setShowPinned(!showPinned);
  };

  const scrollToBottom = () => {
    (messagesEndRef.current as any).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const subHeader = () => {
    return (
      <div className="flex gap-1.5 items-center">
        <div className="lg:hidden w-[25px] h-[25px]">
          <Image src="/images/drone.gif" alt="Light Green NFT" width={25} height={25} />
        </div>
        <div className="hidden lg:block">
          <Image src="/images/drone-1.gif" alt="Light Green NFT" width={54} height={48} />
        </div>
        <span className="text-[13px] lg:text-base font-bold text-custom-sky">Worem</span>
      </div>
    );
  };

  const handleSearch = () => {
    setKeyword(searchKeyword);
  };

  const handleKeywordKeydown = (e: any) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  const actions = () => {
    return (
      <div className="flex gap-2 h-auto">
        {/* <div
            className={cn(
              "px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] ",
              isFollowed
                ? "bg-custom-default hover:bg-custom-default"
                : "bg-custom-lightgrayone hover:bg-custom-lightgrayone"
            )}
            onClick={() => handleFollow()}
          >
            <Image src="/icons/preview-open.svg" alt="Follow" width={18} height={18} />
          </div> */}
        <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          >
            <Image src="/icons/preview-open.svg" alt="Crown" width={18} height={18} />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu p-5 shadow bg-custom-lightgraythree rounded-box w-[610px] h-[116px]"
          >
            <div className="flex w-full justify-between mb-2">
              <div className="text-sm font-bold text-custom-default">
                Yorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="text-[11px] text-custom-darkgraytwo">05/21/2023 5:45 AM</div>
            </div>
            <div className="text-[13px] text-custom-darkgrayfour">
              Worem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis.
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          >
            <Image src="/icons/crown-three.svg" alt="Crown" width={18} height={18} />
          </label>
          {width < 992 ? (
            <div
              tabIndex={0}
              className="dropdown-content translate-x-24 translate-y-1 z-[1] menu px-[10px] py-[15px] block shadow bg-custom-lightgraythree rounded-box w-[370px] gap-2 items-center"
            >
              <div className="flex mb-[15px] px-[15px] items-center justify-between">
                <div className="text-sm font-bold text-white">Top Cheerers</div>
                <button
                  className="btn min-h-fit h-auto p-[6px] text-xs normal-case text-white bg-custom-purple hover:bg-custom-purple border-custom-purple hover:border-custom-purple"
                  onClick={handleSearch}
                >
                  Cheer with BTIX
                </button>
              </div>
              <div className="flex flex-col gap-2 px-[11px]">
                {topCheers.map((cheer, idx) => (
                  <div className="flex gap-2 px-2" key={idx}>
                    <div className="flex gap-0.5">
                      <Image src={cheer.medal} alt="Gold Medal" width={20} height={20} />
                      <span className="text-sm text-white">@{cheer.username}</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point1.svg" alt="Point1" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point1} BTIX</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point2.svg" alt="Point2" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point2} BTIX</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-5 shadow bg-custom-lightgraythree rounded-box w-[620px] h-[116px] flex flex-row gap-2 items-center"
            >
              <div className="flex px-[30px] flex-col justify-center">
                <div className="text-sm font-bold text-white">Top Cheerers</div>
              </div>
              <div className="flex flex-col gap-2">
                {topCheers.map((cheer, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <div className="flex gap-0.5">
                      <Image src={cheer.medal} alt="Gold Medal" width={20} height={20} />
                      <span className="text-sm text-white">@{cheer.username}</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point1.svg" alt="Point1" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point1} BTIX</span>
                    </div>
                    <div className="flex gap-0.5">
                      <Image src="/icons/point2.svg" alt="Point2" width={12} height={15} />
                      <span className="text-sm text-white">{cheer.point2} BTIX</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <button
                  className="btn normal-case text-white bg-custom-purple hover:bg-custom-purple border-custom-purple hover:border-custom-purple"
                  onClick={handleSearch}
                >
                  Cheer with BTIX
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="dropdown dropdown-bottom dropdown-end">
          <label
            tabIndex={0}
            className="px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          >
            <Image src="/icons/search.svg" alt="Search" width={18} height={18} />
          </label>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu px-[50px] py-5 shadow bg-custom-lightgraythree rounded-box w-[610px] flex flex-row gap-4 items-center"
          >
            <input
              type="text"
              placeholder="Search in #: @person, keyword"
              className="input flex-1 bg-black border border-custom-border text-custom-gray"
              value={searchKeyword}
              onKeyDown={handleKeywordKeydown}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="btn bg-custom-default hover:bg-custom-default border-custom-default hover:border-custom-default mr-8"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div
          className={cn(
            "px-[10px] min-h-fit h-[26px] btn btn-ghost rounded-[5px] ",
            showPinned
              ? "bg-custom-default hover:bg-custom-default"
              : "bg-custom-lightgrayone hover:bg-custom-lightgrayone"
          )}
          onClick={togglePinned}
        >
          <Image src="/icons/pin.svg" alt="Pin" width={18} height={18} />
        </div>
      </div>
    );
  };

  const handleChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleKeydown = (e: any) => {
    if (e.keyCode === 13) {
      const date = dayjs().format("YYYY-MM-DD");
      let updatedChats = chatsByDate.slice();
      const idx = chatsByDate.findIndex((chat: any) => chat.date === date);
      const new_chat = {
        avatar: "/images/Avatar 13.png",
        username: "Zekken",
        timestamp: dayjs().format("YYYY-MM-DD hh:mm A"),
        content: message,
      };
      if (idx !== -1) {
        updatedChats[idx].chats = [...updatedChats[idx].chats, new_chat];
      } else {
        updatedChats = [
          ...updatedChats,
          {
            date: date,
            chats: [new_chat],
          },
        ];
      }
      setChatsByDate(updatedChats);
      setMessage("");
      setTimeout(() => {
        scrollToBottom();
      }, 300);
    }
  };

  return (
    <LargeCard title={title} subHeader={subHeader()} actions={actions()}>
      <div className="relative max-h-[calc(100%-50px)] overflow-auto no-scrollbar">
        <ChatBody chatsByDate={chatsByDate} showPinned={showPinned} searchKeyword={keyword} />
        <div ref={messagesEndRef} />
        <div className="sticky bottom-0 left-0 right-0 w-full bg-custom-lightgraytwo z-10">
          <div className="mb-[6px] lg:mb-4 w-full relative">
            <input
              type="text"
              placeholder="Send A Message"
              className="input w-full bg-custom-lightgraythree border-2 border-custom-lightgraythree text-[13px] lg:text-base font-medium text-white p-[10px] h-[42px] lg:px-[25px] lg:py-[10px] hover:border-custom-purple transition ease-in-out duration-500"
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeydown}
            />
            <div className="text-custom-gray absolute top-0 h-[42px] right-[10px] lg:right-[25px] flex flex-col justify-center">
              <div className="p-0 min-h-fit h-auto btn btn-ghost hover:bg-transparent">
                <Image src="/icons/bowling.svg" alt="Bowling" width={18} height={18} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex pl-1 p-2 gap-0.5 lg:gap-2 items-center">
              <Image src="/icons/point1.svg" alt="Transfer Icon" width={12} height={15} />
              <Image src="/icons/point2.svg" alt="Transfer Icon" width={12} height={15} />
              <span className="text-xs leading-[15px] lg:text-[13px] text-white">
                Claim Your BTIX
              </span>
            </div>
            <div className="lg:hidden flex gap-[15px]">
              <div className="p-[6px] leading-[15px] min-h-fit h-auto btn text-white font-medium text-xs normal-case border-none bg-custom-purple hover:bg-custom-purple">
                <Image src="/icons/gift.svg" alt="Gift" width={15} height={15} />
                Gift BTIX
              </div>
              <div className="p-[6px] min-h-fit h-auto btn text-white font-medium text-xs normal-case border-none bg-custom-purple hover:bg-custom-purple">
                Chat
              </div>
            </div>
            <div className="hidden lg:flex gap-[15px]">
              <div className="p-[6px] lg:py-2 lg:px-3 min-h-fit h-auto btn text-white font-medium text-xs lg:text-[13px] normal-case border-none bg-custom-purple hover:bg-custom-purple">
                <Image src="/icons/gift.svg" alt="Gift" width={20} height={20} />
                Gift BTIX
              </div>
              <div className="p-[6px] lg:py-2 lg:px-3 min-h-fit h-auto btn text-white font-medium text-xs lg:text-[13px] normal-case border-none bg-custom-purple hover:bg-custom-purple">
                Chat
              </div>
            </div>
          </div>
        </div>
      </div>
    </LargeCard>
  );
}
