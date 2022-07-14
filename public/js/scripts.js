const socket = io('/');

let userColor = '';
let username = '';

handleChats = () => {
  const form = document.querySelector('form');
  const chattings = document.getElementById('chattings');
  const input = document.querySelector('input');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target[0].value;
    const chat = document.createElement('div');
    if (userColor !== '') {
      chat.style.backgroundColor = userColor;
    }
    chat.innerText = `${username} : ${message}`;
    chattings.appendChild(chat);
    socket.emit('new_chat', message);
    input.value = '';
  });

  socket.on('new_chat', (data) => {
    const jsonData = JSON.parse(data);
    const chat = document.createElement('div');
    chat.style.backgroundColor = jsonData.userColor;
    chat.innerText = chat.innerText = `${jsonData.username} : ${jsonData.chat}`;
    chattings.appendChild(chat);
  });
};

const init = () => {
  const name = prompt('What is your name?');
  username = name;
  socket.emit('new_user', username, (user) => {
    userColor = user.color;
  });
  handleChats();
};

init();
