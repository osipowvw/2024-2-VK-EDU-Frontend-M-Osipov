import React from 'react';
import styles from './Header.module.scss';
import { IconButton, Avatar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export function Header({ chatName, onBack, onSwitchUser }) {
    return (
        <header className={styles.chatHeader}>
            <IconButton onClick={onBack} className={styles.backButton}>
                <ArrowBackIcon />
            </IconButton>
            <Avatar className={styles.avatar}>{chatName.charAt(0).toUpperCase()}</Avatar>
            <div className={styles.headerInfo}>
                <h2>{chatName}</h2>
                <p>онлайн</p>
            </div>
            <div className={styles.headerActions}>
                <IconButton onClick={onSwitchUser}>
                    <SwapHorizIcon />
                </IconButton>
            </div>
        </header>
    );
}
