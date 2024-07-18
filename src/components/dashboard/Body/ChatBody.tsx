import dayjs from "dayjs";
import Image from "next/image";
import cn from "classnames";

function BodyItem({
  chat,
  showPinned,
  searchKeyword,
}: {
  chat: any;
  showPinned: boolean;
  searchKeyword: string;
}) {
  const content = searchKeyword
    ? chat.content.replaceAll(
        searchKeyword,
        `<span style="background-color: rgba(59, 130, 246, 0.8)">${searchKeyword}</span>`
      )
    : chat.content;
  return (
    <div
      className={cn(
        showPinned && chat.pinned ? "bg-custom-purple/40" : "",
        "mb-[20px] lg:mb-[25px] flex gap-2"
      )}
    >
      <div className="lg:hidden w-[27px] h-[27px] rounded-full overflow-hidden">
        <Image src={chat.avatar} alt="Light Green NFT" width={27} height={27} />
      </div>
      <div className="hidden lg:block w-[30px] h-[30px] rounded-full overflow-hidden">
        <Image src={chat.avatar} alt="Light Green NFT" width={27} height={27} />
      </div>
      <div className="flex-1">
        <div className="flex items-center py-[1.5px] lg:py-[3px]">
          <span className="text-[13px] lg:text-base text-custom-sky">{chat.username}</span>
          <span className="text-[11px] text-custom-darkgraytwo ml-2">
            {dayjs(chat.timestamp).format("hh:mm A")}
          </span>
        </div>
        <div
          className="text-custom-darkgrayfour text-[13px]"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
    </div>
  );
}

export default function ChatBody({
  chatsByDate,
  showPinned,
  searchKeyword,
}: {
  chatsByDate: any;
  showPinned: boolean;
  searchKeyword: string;
}) {
  return (
    <>
      {chatsByDate.map((item: any, dateIdx: number) => (
        <div key={dateIdx}>
          <div className="flex items-center mb-[20px] lg:mb-[25px]">
            <div className="h-[1px] flex-1 bg-custom-border"></div>
            <div className="px-[10px] border border-custom-border rounded-[5px] text-custom-darkgraytwo text-[11px]">
              {dayjs(item.date).format("MM/DD/YYYY")}
            </div>
            <div className="h-[1px] flex-1 bg-custom-border"></div>
          </div>
          {item.chats.map((chat: any, chatIdx: number) => (
            <BodyItem
              key={chatIdx}
              showPinned={showPinned}
              chat={chat}
              searchKeyword={searchKeyword}
            />
          ))}
        </div>
      ))}
    </>
  );
}
