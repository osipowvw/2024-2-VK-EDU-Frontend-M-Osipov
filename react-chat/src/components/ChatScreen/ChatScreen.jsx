import React, { useEffect, useRef } from 'react';
import styles from './ChatScreen.module.scss';
import { Header } from '../Header/Header';
import { MessageItem } from '../MessageItem/MessageItem';
import { MessageForm } from '../MessageForm/MessageForm';

export function ChatScreen({
    chatId,
    chatName,
    messages,
    currentUser,
    onBack,
    onSwitchUser,
    onSendMessage,
}) {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    return (
        <div className={styles.chatScreen}>
            <Header
                chatName={chatName}
                onBack={onBack}
                onSwitchUser={onSwitchUser}
            />
            <div className={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <MessageItem
                        key={index}
                        message={message}
                        isOwnMessage={message.sender === currentUser}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageForm onSendMessage={onSendMessage} />
        </div>
    );
}
