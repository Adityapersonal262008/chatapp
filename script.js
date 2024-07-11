const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('username');
const loginButton = document.getElementById('login-button');
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');

let username;
const socket = io();

loginButton.addEventListener('click', () => {
    username = usernameInput.value;
    if (username) {
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'block';
        socket.emit('user joined', username);
    }
});

sendButton.addEventListener('click', () => {
    const message = chatInput.value;
    if (message) {
        socket.emit('chat message', { user: username, message });
        chatInput.value = '';
    }
});

socket.on('chat message', ({ user, message }) => {
    displayMessage(user, message);
});

socket.on('user joined', (user) => {
    displayMessage('System', `${user} has joined the chat`);
});

function displayMessage(user, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${user}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
