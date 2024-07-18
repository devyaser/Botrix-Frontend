import Image from "next/image";
import ClickableCard from "../common/ClickableCard";
import { selectPinnedChats } from "../../reducers/chat/chatSlice";
import { useAppSelector } from "../../app/hooks";
import { useRouter } from "next/router";

function PinnedChatItem({ chat, handleChatClick }: { chat: any; handleChatClick: Function }) {
  return (
    <div
      className="flex gap-2 items-center cursor-pointer"
      onClick={() => handleChatClick(chat.type, chat.id)}
    >
      <div className="bg-custom-lightgrayone py-[10px] pr-5 pl-2 flex gap-2 rounded-[5px] overflow-hidden">
        <span className="text-3xl text-custom-gray text-bold">#</span>
        <p className="text-sm text-bold">
          <span className="text-white">{chat.title}&nbsp;</span>
          <span className="text-custom-sky">@Worem ipsum dolor</span>
        </p>
      </div>
      <button
        className="btn bg-transparent hover:bg-transparent border-none hover:border-none p-0"
        onClick={() => handleChatClick(chat.type, chat.id)}
      >
        <Image src="/icons/down.svg" alt="Transfer Icon" width={30} height={30} />
      </button>
    </div>
  );
}

export default function PinnedChats() {
  const pinnedChats = useAppSelector(selectPinnedChats);
  const router = useRouter();

  const handleChatClick = (type: string, id: string) => {
    router.push(`?type=${type}&id=${id}`);
  };

  const handleClick = () => {
    router.push("?type=pinned_chats");
  };

  return (
    <ClickableCard title={"Pinned Chats"} handleClick={handleClick}>
      <div className="flex flex-col gap-4">
        {pinnedChats.map((chat: any, idx: number) => (
          <PinnedChatItem key={idx} chat={chat} handleChatClick={handleChatClick} />
        ))}
      </div>
    </ClickableCard>
  );
}
