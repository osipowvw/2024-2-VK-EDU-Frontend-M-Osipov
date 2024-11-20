import React, { useState } from 'react';
import styles from './ChatListScreen.module.scss';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatItem from '../ChatItem/ChatItem.jsx';
import CreateChatModal from '../CreateChatModal/CreateChatModal.jsx';

function ChatListScreen({ chats, onChatSelect, onCreateChat }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredChats = chats.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.chatListScreen}>
            <header className={styles.header}>
                <h2>Чаты</h2>
                <TextField
                    variant="outlined"
                    placeholder="Поиск чата"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                />
            </header>
            <div className={styles.chatList}>
                {filteredChats.map((chat) => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        onClick={() => onChatSelect(chat.id, chat.name)}
                    />
                ))}
            </div>
            <IconButton
                className={styles.floatingButton}
                onClick={() => setIsModalOpen(true)}
                aria-label="Добавить чат"
            >
                <AddIcon fontSize="large" />
            </IconButton>
            <CreateChatModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreate={onCreateChat}
            />
        </div>
    );
}

export default ChatListScreen;
