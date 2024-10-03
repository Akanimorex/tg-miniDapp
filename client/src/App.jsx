import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  coreDao,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";


import HelloWorld from './HelloWorld';


const config = getDefaultConfig({
  appName: 'Core DAO Hello World',
  projectId: '2c22698ed6fa65b5ab4a6acb4af0b952',
  chains: [coreDao],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

// const { connectors } = getDefaultWallets({
//   appName: 'Core DAO Hello World',
//   projectId: '2c22698ed6fa65b5ab4a6acb4af0b952', // Get this from WalletConnect
//   chains:[mainnet,coreDao,polygon,optimism,arbitrum,base]
// });

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   publicClient
// });

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider  modalSize='wide'>
          <HelloWorld />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;