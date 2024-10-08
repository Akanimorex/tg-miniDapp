import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContractRead, useSendTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './HelloWorld.css'; 

// Import ABI from JSON file
import HelloWorldABI from './Contract-ABI/HelloWorld.json';

// Import the logo image
import logo from './core-dao-logo.png';

// Replace with your contract's address
const contractAddress = "0xBF46BAA6210Ae6c9050F5453B996070209f69830";

function HelloWorld() {
    const [newMessage, setNewMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    // Contract config
    const contractConfig = {
        address: contractAddress,
        abi: HelloWorldABI.abi,
    };

    // Read the current message from the contract
    const { data: message, refetch: refetchMessage } = useContractRead({
        ...contractConfig,
        functionName: 'message',
        onSuccess(data) {
            toast.success('Message retrieved successfully!');
            setShowMessage(true);
        },
        onError(error) {
            toast.error('Failed to retrieve message. Please try again.');
            console.error('Error retrieving message:', error);
        }
    });

    // UseSendTransaction to send transaction
    const { sendTransaction } = useSendTransaction({
        onSuccess() {
            toast.success('Message sent successfully!');
            setNewMessage(''); // Clear the input field
            refetchMessage();  // Refresh the message after sending
        },
        onError(error) {
            toast.error('Failed to send the transaction. Please try again.');
            console.error('Error sending transaction:', error);
        }
    });

    const handleSendMessage = async () => {
        try {
            // Prepare transaction to invoke the setMessage function from the contract
            const iface = new ethers.Interface(HelloWorldABI.abi);
            const data = iface.encodeFunctionData('setMessage', [newMessage]);

            sendTransaction?.({
                to: contractAddress,
                data, // Encoded function data for setMessage
            });
        } catch (error) {
            console.error('Error preparing transaction:', error);
            toast.error('Failed to prepare transaction. Please try again.');
        }
    };

    return (
        <div>
           
            <div className="flex justify-center items-center w-full h-screen">
                <div className='border-white'>
                    <div className='mx-2'>
                        <img src={logo} alt="Core DAO Logo" className="logo" />
                    </div>
                    <ConnectButton/>
                    <ToastContainer /> {/* Add ToastContainer to display notifications */}

                    {showMessage && (
                        <div className="text-[#e67e22]">{message?.toString()}</div>
                    )}
                    <button className="w-full bg-[#e67e22] my-2" onClick={refetchMessage}>Retrieve Current Message</button>
                    <br />
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full h-10 p-2 my-3"
                        placeholder="Enter new message"
                    />
                    <button className="w-full bg-[#e67e22]" onClick={handleSendMessage}>Send New Message</button>
                </div>
            </div>
        </div>
    );
}

export default HelloWorld;
