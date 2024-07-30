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

// Set up the button click handler
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
            container.innerHTML = `<h1>Chat with ${chatName}</h1>
            ${chat.messages.map(message => 
                ` <div class="messageBubble">
                    <p><strong>${message.sender}:</strong> ${message.message} <small>${new Date(message.timestamp).toLocaleString()}</small></p></div>
                `).join('')}`;
        };
    });
};
