const container = document.getElementById('container');
const btnUsername = document.getElementById('btnUsername');
const inputUsername = document.getElementById('inputUsername');

let chats = [];

// Fetch the chats data
fetch('/chats.json')
  .then(response => response.json())
  .then(data => {
    chats = data.chats; // Update chats with the fetched data
  })
  .catch(error => console.error('Error loading JSON:', error));

// button clickt handler
btnUsername.onclick = function() {
    const username = inputUsername.value;
    localStorage.setItem('username', username);

    let chatsHTML = '';
    chats.forEach((chat, index) => {
        chatsHTML += `
        <div class="chat-cnt" id="chat-cnt-${index}" data-name="${chat.name}">
            <h3>${chat.name}</h3>
        </div>
        `;
    });
    
    container.innerHTML = `<h1>Hi ${username}</h1>
    <section class="chats">
        ${chatsHTML}
    </section>`;

    chats.forEach((chat, index) => {
        const chatCnt = document.getElementById(`chat-cnt-${index}`);
        chatCnt.onclick = function() {
            const chatName = this.dataset.name;
            container.innerHTML = `<section class="chat"><h1>Chat with ${chatName}</h1>
            <section class="messages" id="messages">  
            ${chat.messages.map(message => 
                `<div class="message-bubble">
                    <p><strong>${message.sender}:</strong> ${message.message} <small>${new Date(message.timestamp).toLocaleString()}</small></p>
                </div>`).join('')}
                </section>
                <div class="message-box">
                    <input type="text" title="message" placeholder="Enter A Message" id="inputMessage">
                    <button id="btnSendMessage">Enter</button>
                </div>
                </section>`;

            const btnSendMessage = document.getElementById('btnSendMessage');
            const messageInput = document.getElementById('inputMessage');

            btnSendMessage.onclick = function() {
                const newMessage = {
                    sender: 'You', 
                    receiver: chatName,
                    timestamp: new Date().toISOString(),
                    message: messageInput.value
                }

                // Update the chat messages UI
                const messages = document.getElementById('messages');
                messages.innerHTML += `<div class="message-bubble">
                    <p><strong>${newMessage.sender}:</strong> ${newMessage.message} <small>${new Date(newMessage.timestamp).toLocaleString()}</small></p>
                </div>`;

                // Clear the input field
                messageInput.value = '';
            }
        };
    });
};
