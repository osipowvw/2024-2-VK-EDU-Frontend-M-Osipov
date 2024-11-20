import React, { useState } from 'react';
import styles from './CreateChatModal.module.scss';
import { Modal, Box, TextField, Button } from '@mui/material';

function CreateChatModal({ open, onClose, onCreate }) {
    const [chatName, setChatName] = useState('');

    const handleCreate = () => {
        if (chatName.trim()) {
            onCreate(chatName.trim());
            setChatName('');
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className={styles.modalContent}>
                <h3>Создать новый чат</h3>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Введите имя чата"
                    value={chatName}
                    onChange={(e) => setChatName(e.target.value)}
                />
                <div className={styles.buttons}>
                    <Button variant="contained" color="primary" onClick={handleCreate}>
                        Создать
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Отмена
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default CreateChatModal;
