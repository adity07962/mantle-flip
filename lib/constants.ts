export const MANTLE_CHAIN_ID = "0x138b"; // 5000 in decimal
export const MANTLE_RPC_URL = "https://rpc.sepolia.mantle.xyz";

export const MANTLE_CHAIN_CONFIG = {
  chainId: MANTLE_CHAIN_ID,
  chainName: "Mantle",
  nativeCurrency: {
    name: "MANTLE",
    symbol: "MNT",
    decimals: 18,
  },
  rpcUrls: [MANTLE_RPC_URL],
  blockExplorerUrls: ["https://explorer.sepolia.mantle.xyz"],
};