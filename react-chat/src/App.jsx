import React, { useState, useEffect } from 'react';
import ChatListScreen from './components/ChatListScreen/ChatListScreen.jsx';
import ChatScreen from './components/ChatScreen/ChatScreen.jsx';
import './App.scss';
import { formatTime } from './utils/utils.js';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [chats, setChats] = useState(JSON.parse(localStorage.getItem('chats')) || []);
    const [messageContainers, setMessageContainers] = useState(JSON.parse(localStorage.getItem('messageContainers')) || {});
    const [currentChatId, setCurrentChatId] = useState(null);
    const [currentUser, setCurrentUser] = useState('Максим');
    const [isSwitched, setIsSwitched] = useState(false);
    const [currentChatName, setCurrentChatName] = useState('');

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        localStorage.setItem('messageContainers', JSON.stringify(messageContainers));
    }, [messageContainers]);

    const handleCreateChat = (chatName) => {
        const newChat = {
            id: `chat-${Date.now()}`,
            name: chatName,
            lastMessage: '',
            time: '',
            readStatus: true,
        };
        setChats([newChat, ...chats]);
        setMessageContainers({ ...messageContainers, [newChat.id]: [] });
    };

    const openChat = (chatId, chatName) => {
        setCurrentChatId(chatId);
        setCurrentChatName(chatName);
        setCurrentUser('Максим');
    };

    const goBackToChatList = () => {
        setCurrentChatId(null);
    };

    const switchUser = () => {
        if (!isSwitched) {
            setCurrentUser(currentChatName);
            setMessageContainers((prev) => ({
                ...prev,
                [currentChatId]: prev[currentChatId].map((msg) =>
                    msg.sender === 'Максим' ? { ...msg, readStatus: true } : msg
                ),
            }));
        } else {
            setCurrentUser('Максим');
        }
        setIsSwitched(!isSwitched);
    };

    const updateChatInfo = (chatId, lastMessage, time) => {
        setChats((prevChats) => {
            const updatedChats = prevChats.map((chat) =>
                chat.id === chatId ? { ...chat, lastMessage, time: formatTime(time) } : chat
            );

            const chatToMove = updatedChats.find(chat => chat.id === chatId);
            const otherChats = updatedChats.filter(chat => chat.id !== chatId);
            return [chatToMove, ...otherChats];
        });
    };

    return (
        <div className="app-container">
            {currentChatId ? (
                <ChatScreen
                    chatId={currentChatId}
                    chatName={currentChatName}
                    messages={messageContainers[currentChatId] || []}
                    currentUser={currentUser}
                    onBack={goBackToChatList}
                    onSwitchUser={switchUser}
                    onSendMessage={(messageText) => {
                        const now = new Date();
                        const newMessage = {
                            id: uuidv4(),
                            sender: currentUser,
                            text: messageText,
                            timestamp: now.toISOString(),
                            readStatus: false,
                        };
                        setMessageContainers((prev) => ({
                            ...prev,
                            [currentChatId]: [...(prev[currentChatId] || []), newMessage],
                        }));
                        updateChatInfo(currentChatId, messageText, now);
                    }}
                />
            ) : (
                <ChatListScreen
                    chats={chats}
                    onChatSelect={openChat}
                    onCreateChat={handleCreateChat}
                />
            )}
        </div>
    );
}

export default App;
