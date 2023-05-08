import React, { useContext, useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { format } from "timeago.js";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { client } from "../lib/client";
import { TwitterContext } from "../context/TwitterContext";
import { ethers } from "ethers";
import { moderationABI, moderationAddress } from "../lib/constants";
import { Button } from "semantic-ui-react";

declare let window: any;

let metamask: any;

// if (typeof window !== "undefined") {
//   metamask = window.ethereum;
// }
// useEffect(()=>{
//   if (typeof window !== "undefined") {
//     metamask = window.ethereum;
//   }
// })

const getEthereumContract = async () => {
  // if (!metamask) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(provider);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    moderationAddress,
    moderationABI,
    signer
  );
  return transactionContract;
};

const style = {
  wrapper: `flex py-20 px-6`,
  profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
  postMain: `flex-1 px-4`,
  headerDetails: `flex items-center`,
  name: `font-bold mr-1`,
  verified: `text-[0.8rem]`,
  handleAndTimeAgo: `text-[#8899a6] ml-1`,
  tweet: `my-2`,
  image: `rounded-3xl`,
  footer: `flex justify-between mr-28 mt-4 text-[#8899a6]`,
  footerIcon: `rounded-full text-lg p-2`,
  redButton: `bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 border border-red-700 rounded`,
  finalizeButton: `bg-blue-500 hover:bg-red-700 text-white font-bold py-1 px-4 border border-blue-700 rounded`,
  greenButton: `bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 border border-green-700 rounded`,
};

function ModerationDashboard() {
  const [tweet, setTweet] = useState("");
  const [author, setAuthor] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [profileImageLink, setProfileImageLink] = useState("");
  const [isProfileImageNft, setIsProfileImageNft] = useState(false);
  const {currentAccount } = useContext(TwitterContext);
  const [accountsVoted, setAccountsVoted] = useState(0);
  const [isSafe, setIsSafe] = useState(true);
  const [id, setId]= useState("");

  const query = `
    *[_type == "tweets" && isReported == true]{
      "author": author->{name, walletAddress, profileImage, isProfileImageNft},
      tweet,
      timestamp,
      _id
    }|order(timestamp desc)
  `;
  client.fetch(query).then((res) => {
    setAuthor(res[0].author.name);
    setWalletAddress(res[0].author.walletAddress);
    setTweet(res[0].tweet);
    setIsProfileImageNft(res[0].author.isProfileImageNft);
    setId(res[0]._id);
    
    if (res[0].author.isProfileImageNft) {
      setProfileImageLink(
        "https://gateway.pinata.cloud/ipfs/" + res[0].author.profileImage
      );
    } else {
      setProfileImageLink(res[0].author.profileImage);
    }
  });

  async function callGreenContract() {
    const contract: any = await getEthereumContract();
    // console.log(contract);
    let price=ethers.utils.parseEther("2");
    console.log(price);
    await contract.voterModeration(true,{value:price}).then((r)=>{
      console.log(r);
    })
    // const transactionParameters = {
    //   to: moderationAddress,
    //   from: currentAccount,
    //   date: await contract.voterModeration(true),
    // };
    // try {
    //   await metamask.request({
    //     method: 'eth_sendTransaction',
    //     params: [transactionParameters],
    //   })
    //   console.log(accountsVoted);
    //   setAccountsVoted(accountsVoted + 1)
    //   console.log(accountsVoted);
      
    //   if (accountsVoted >= 1) {
    //     try {
    //       const returnFromContract = await metamask.request({
    //         method: 'eth_call',
    //         params: [{
    //           to: moderationAddress,
    //         }]
    //       })
    //       setIsSafe(returnFromContract)
    //       console.log(isSafe);
    //     } catch (error:any) {
    //       console.log(error)
    //     }
    // } }catch (error: any) {
    //   console.log(error)
    // }
  }

  async function callRedContract() {
    const contract: any = await getEthereumContract();
    let price=ethers.utils.parseEther("2");
    console.log(price);
    await contract.voterModeration(false,{value:price}).then((r)=>{
      console.log(r);
    })
    // const contract: any = await getEthereumContract();
    // const transactionParameters = {
    //   to: moderationAddress,
    //   from: currentAccount,
    //   date: await contract.voterModeration(false),
    // };
    // try {
    //   await metamask.request({
    //     method: 'eth_sendTransaction',
    //     params: [transactionParameters],
    //   })
    //   setAccountsVoted(accountsVoted + 1)
    // } catch (error: any) {
    //   console.log(error)
    // }
  }
  async function finalize() {
    const contract: any = await getEthereumContract();
    console.log(contract);
    let answer;
    await contract.finalize().then((r)=>{
      answer=r;
      console.log(r);
    })
    await contract.payUser(answer).then((r)=>{
      console.log(r);
    })
    await contract.reset().then((r)=>{
      console.log(r);
    })
    // console.log(answer);
    console.log(id);
    
   
    // await client.patch(id).unset([tweet._id=id]).commit().then((r)=>{
    //   answer = r;
    // })

    return answer;
  }
  return (
    <div className={style.wrapper}>
      <div>
        <img
          src={profileImageLink}
          alt={author}
          className={
            isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
        />
      </div>
      <div className={style.postMain}>
        <div>
          <span className={style.headerDetails}>
            <span className={style.name}>{author}</span>
            {isProfileImageNft && (
              <span className={style.verified}>
                <BsFillPatchCheckFill />
              </span>
            )}
            <span className={style.handleAndTimeAgo}>
              @{walletAddress.slice(0, 4)}...{walletAddress.slice(0, 2)}
            </span>
          </span>
          <div className={style.tweet}>{tweet}</div>
        </div>
        <div className={style.footer}>
          <div
            className={style.greenButton}
            onClick={async () => {
              await callGreenContract();
            }}
          >
            Safe
          </div>
          <div
            className={style.redButton}
            onClick={async () => {
              await callRedContract();
            }}
          >
            Not Safe
          </div>
          <div
            className={style.finalizeButton}
            onClick={async () => {
              await finalize().then((r)=>{
                console.log(r);
              })
            }}
          >
            Finalize
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModerationDashboard;
