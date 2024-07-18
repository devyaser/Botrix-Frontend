import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useWindowSize } from "usehooks-ts";

import Layout from "../src/components/common/Layout";
import Body from "../src/components/dashboard/Body/index";
import RightPart from "../src/components/dashboard/RightPart";
import Footer from "../src/components/common/Footer";
import {
  LoginModal,
  SignupModal,
  VerifyAccountModal,
  CreateChannelModal,
  SearchModal,
  KnowledgeModal,
  WalletConnectModal,
  WalletQRModal,
} from "../src/components/modals";
import PopupBar from "../src/components/dashboard/PopupBar";

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [verifyAccountModalOpen, setVerifyAccountModalOpen] = useState(false);
  const [createChannelModalOpen, setCreateChannelModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [knowledgeModalOpen, setKnowledgeModalOpen] = useState(false);
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(false);
  const [walletQRModalOpen, setWalletQRModalOpen] = useState(false);
  const [knowledgeId, setKnowledgeId] = useState(0);
  const router = useRouter();
  const [session] = useSession();
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const { width } = useWindowSize();

  useEffect(() => {
    if (router.query.step === "verify-account") {
      setVerifyAccountModalOpen(true);
    }
  }, [router.query]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      // e.preventDefault();
      if ((e.metaKey || e.ctrlKey) && e.code === "KeyK") {
        handleOpenSearchModal();
      }
    });
  }, []);

  useEffect(() => {
    if (window) window.scrollTo(0, 1);
  }, []);

  const handleStartChat = () => {
    if (session) {
      setCreateChannelModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleCloseLogin = () => {
    setLoginModalOpen(false);
  };

  const handleCloseRegister = () => {
    setSignupModalOpen(false);
  };

  const handleSwitchRegister = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const handleSwitchLogin = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };

  const handleSwitchLoginFromVerify = () => {
    setLoginModalOpen(true);
    setVerifyAccountModalOpen(false);
  };

  const handleCloseVerifyAccount = () => {
    setVerifyAccountModalOpen(false);
  };

  const handleCloseCreateChannel = () => {
    setCreateChannelModalOpen(false);
  };

  const handleOpenSearchModal = () => {
    setSearchModalOpen(true);
  };

  const handleCloseSearchModal = () => {
    setSearchModalOpen(false);
  };

  const handleClickLink = (type: string, category: string, id: number): void => {
    if (category === "knowledge") {
      setKnowledgeModalOpen(true);
      setKnowledgeId(id);
    } else {
      router.push(`?type=${type}&id=${id}`);
      handleCloseSearchModal();
    }
  };

  const handleCloseKnowledgeModal = () => {
    setKnowledgeModalOpen(false);
  };

  const handleCloseWalletConnectModal = () => {
    setWalletConnectModalOpen(false);
  };

  const handleConnectWallet = () => {
    // setWalletConnectModalOpen(false);
    if (!address) {
      open();
    }
    // setWalletQRModalOpen(true);
  };

  const handleCloseWalletQRModal = () => {
    setWalletQRModalOpen(false);
  };

  if (width < 992) {
    return (
      <Layout>
        <div className="body-wrapper flex relative">
          <div className="flex-1 py-2 px-[10px] flex flex-col h-[calc(100%-72px)] lg:h-auto relative">
            <div className="mb-2 w-full relative">
              <input
                type="text"
                placeholder="What would you like to see"
                className="h-[40px] px-[15px] text-base font-medium input w-full bg-black border border-custom-border text-custom-gray"
                // disabled
                onClick={handleOpenSearchModal}
              />
              <div className="hidden lg:flex text-custom-gray absolute top-0 h-full right-3 flex-col justify-center">
                <div className="text-xl">cmd + k</div>
              </div>
            </div>
            <PopupBar handleStartChat={handleStartChat} />
            <div className="h-[calc(100%-180px)] relative">
              <Body />
            </div>
          </div>
          <RightPart />
        </div>
        <LoginModal
          open={loginModalOpen}
          hideModal={handleCloseLogin}
          switchRegister={handleSwitchRegister}
        />
        <SignupModal
          open={signupModalOpen}
          hideModal={handleCloseRegister}
          switchLogin={handleSwitchLogin}
        />
        <VerifyAccountModal
          open={verifyAccountModalOpen}
          hideModal={handleCloseVerifyAccount}
          switchLogin={handleSwitchLoginFromVerify}
        />
        <CreateChannelModal open={createChannelModalOpen} hideModal={handleCloseCreateChannel} />
        <SearchModal
          open={searchModalOpen}
          hideModal={handleCloseSearchModal}
          handleClickLink={handleClickLink}
        />
        <KnowledgeModal
          open={knowledgeModalOpen}
          hideModal={handleCloseKnowledgeModal}
          id={knowledgeId}
        />
        <WalletConnectModal
          open={walletConnectModalOpen}
          hideModal={handleCloseWalletConnectModal}
          handleConnectWallet={handleConnectWallet}
        />
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-h-[calc(100vh-96px)] flex-1 flex">
        <PopupBar handleStartChat={handleStartChat} />
        <div className="flex-1 p-2 flex flex-col">
          <div className="mb-2 w-full relative">
            <input
              type="text"
              placeholder="What would you like to see"
              className="bg-custom-lightgraythree text-xl input w-full bg-black border border-custom-border text-custom-gray"
              onClick={handleOpenSearchModal}
            />
            <div className="flex text-custom-gray absolute top-0 h-full right-3 flex-col justify-center">
              <div className="text-xl">cmd + k</div>
            </div>
          </div>
          <div className="h-[calc(100%-56px)] relative">
            <Body />
          </div>
        </div>
        <RightPart />
      </div>
      <LoginModal
        open={loginModalOpen}
        hideModal={handleCloseLogin}
        switchRegister={handleSwitchRegister}
      />
      <SignupModal
        open={signupModalOpen}
        hideModal={handleCloseRegister}
        switchLogin={handleSwitchLogin}
      />
      <VerifyAccountModal
        open={verifyAccountModalOpen}
        hideModal={handleCloseVerifyAccount}
        switchLogin={handleSwitchLoginFromVerify}
      />
      <CreateChannelModal open={createChannelModalOpen} hideModal={handleCloseCreateChannel} />
      <SearchModal
        open={searchModalOpen}
        hideModal={handleCloseSearchModal}
        handleClickLink={handleClickLink}
      />
      <KnowledgeModal
        open={knowledgeModalOpen}
        hideModal={handleCloseKnowledgeModal}
        id={knowledgeId}
      />
      <WalletConnectModal
        open={walletConnectModalOpen}
        hideModal={handleCloseWalletConnectModal}
        handleConnectWallet={handleConnectWallet}
      />
      <Footer />
      {/* <WalletQRModal open={walletQRModalOpen} hideModal={handleCloseWalletQRModal} /> */}
    </Layout>
  );
}
