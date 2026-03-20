import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const InMemoryChat = ({ currentUserId, otherUserId, otherUserName }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const API_BASE_URL = import.meta.env.VITE_DIRECT_BACKEND_URL;

    useEffect(() => {
        fetchMessages();
        // Poll for new messages every 3 seconds
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, [currentUserId, otherUserId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/user/messages/conversation/${currentUserId}/${otherUserId}`
            );
            setMessages(response.data);
            
            // Mark as read if there are messages
            if (response.data.length > 0) {
                await axios.put(`${API_BASE_URL}/api/user/messages/mark-read/${currentUserId}`);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/api/messages/send`, {
                senderId: currentUserId,
                receiverId: otherUserId,
                content: newMessage
            });
            setNewMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h3>💬 Chat with {otherUserName}</h3>
                <span className="online-status">● Online</span>
            </div>
            
            <div className="messages-area">
                {messages.length === 0 ? (
                    <div className="no-messages">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`message ${msg.senderId === currentUserId ? 'sent' : 'received'}`}
                        >
                            <div className="message-bubble">
                                <div className="message-content">{msg.content}</div>
                                <div className="message-time">
                                    {formatTime(msg.sentAt)}
                                    {msg.read && msg.senderId === currentUserId && ' ✓✓'}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={sendMessage} className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send →'}
                </button>
            </form>
        </div>
    );
};

export default InMemoryChat;