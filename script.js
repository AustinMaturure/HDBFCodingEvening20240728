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
    localStorage.setItem('username', username);console.log(chats)
    let storedChats = JSON.parse(localStorage.getItem('chats'));
    
    console.log(storedChats)
   
   


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

                const Recieved = {
                    sender: chatName, 
                    receiver: 'You',
                    timestamp: new Date().toISOString(),
                    message: 'Thank You For Your Message'
                }

                // Update the chat messages UI
                const messages = document.getElementById('messages');
                messages.innerHTML += `<div class="message-bubble">
                    <p><strong>${newMessage.sender}:</strong> ${newMessage.message} <small>${new Date(newMessage.timestamp).toLocaleString()}</small></p>
                </div>
                <div class="message-bubble">
                    <p><strong>${Recieved.sender}:</strong> ${Recieved.message} <small>${new Date(Recieved.timestamp).toLocaleString()}</small></p>
                </div>`;

                // Clear the input field
                messageInput.value = '';
                const chatsFromStorage = JSON.parse(localStorage.getItem('chats')) || [];
                const chatIndex = chatsFromStorage.findIndex(c => c.name === chatName);
    
    if (chatIndex !== -1) {
        chatsFromStorage[chatIndex].messages.push(newMessage);
    } else {
        chatsFromStorage.push({
            name: chatName,
            messages: [newMessage]
        });
    }
    
    localStorage.setItem('chats', JSON.stringify(chatsFromStorage));
            }
        };
    });
};
