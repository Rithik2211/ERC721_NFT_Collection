import { ConnectWallet, useAddress, useDisconnect, useContract, useNFTs, ThirdwebNftMedia, useNetworkMismatch, useNetwork, useMetamask, ChainId } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const address = useAddress();
  const ConnectWithMetamask = useMetamask()
  const disconnect = useDisconnect();
  const { contract } = useContract("0x049b302086F184Cb7F354E2EdBe06d054dE31151");
  const { data : nfts, isLoading : isLoadingNfts} = useNFTs(contract?.nft);
  const { mutate : mintNft, isLoading : isMinting } = useNFTs(contract?.nft);

  const isWrongNetwork = useNetworkMismatch();
  const [ ,switchNetwork] = useNetwork();

  const mintAnNft = async () => {
    if(!address) {
      <ConnectWithMetamask />
      return;
    }

    if(isWrongNetwork) {
      switchNetwork(ChainId.Goerli);
      return;
    }

    mintNft(
    {
      metadata : {
        name : "Yellow Start",
        image : "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fstars-line-art-icon-sparkle-star-icons-shine-icons_751874-1118.jpg&tbnid=rRKmac_vQ2OG9M&vet=12ahUKEwi4zMaE3cWFAxU9pWMGHaSCArUQMygAegQIARBD..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fyellow-star&docid=Ky9_yHjJ9sPb7M&w=626&h=626&q=free%20stars%20yellow&ved=2ahUKEwi4zMaE3cWFAxU9pWMGHaSCArUQMygAegQIARBD"
      },
      to : address
    },
    {
      onSuccess(data){
        alert("Successfully Minted NFT!!");
      }
    })
  }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", height: "100vh"}}>
      {
        address ? 
        <div>
          <button style={{margin: "5px", borderRadius: "8px", all: "unset", cursor: "pointer", padding: "16px 16px", fontSize: "16px", fontWeight: "500", background: "hsl(256, 6.0%, 93.2%)", maxWidth: "100%", color: "black", transition : "border 200ms ease", animation : "animation-plwpox 300ms ease"}} onClick={disconnect}>
            <div className={styles.gradientText0}>
              Disconnect Wallet
            </div>
          </button>
          <div style={{margin: "5px"}} className={styles.gradientText0}>your address is : {address}</div>
          {
            isLoadingNfts ? 
            (<div className={styles.nftBoxGrid}> 
            {
              nfts?.map((nft)=> (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}> 
                <ThirdwebNftMedia 
                  metadata={nft.metadata}
                  className={styles.nftMedia}
                />
                <h3>{nft.metadata.name}</h3>
                <p>Owner : {nft.owner.slice(0,6)}</p>
                </div>
              ))
            }
            </div>) : 
            (<p>Loading NFTs ...</p>) 
          }
          <button
            onClick={mintAnNft}
            className={`${styles.mainbutton} ${styles.spacerTop}`}
          >
            {isMinting ? "Minting..." : "Mint NFT"}
          </button>
        </div> : 
        <div>
        <div style={{margin: "5px"}} className={styles.gradientText0}>  Login to NFT Collection </div>
        <div style={{margin: "5px"}}> <ConnectWallet /> </div>
        </div>
      }
    </div>
  );
}
