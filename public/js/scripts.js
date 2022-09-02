/* eslint-disable no-undef */
const socket = io('/');

let userColor = '';
let username = '';
let Url = '';
const NODE_ENV = document.getElementById('env').innerText;
if (NODE_ENV === 'local') {
  Url = 'http://localhost';
} else if (NODE_ENV === 'dev') {
  Url = 'ec2-15-164-163-243.ap-northeast-2.compute.amazonaws.com';
} else {
  Url = 'ec2 prod server';
}

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

const removeAllChats = () => {
  const restList = document.getElementById('rest');
  while (restList.firstChild) {
    restList.removeChild(restList.firstChild);
  }
};

const handleREST = () => {
  const getOneChatBtn = document.getElementById('one');
  const getAllChatBtn = document.getElementById('all');
  const deleteBtn = document.getElementById('xx');
  const restList = document.getElementById('rest');

  getOneChatBtn.addEventListener('click', () => {
    axios.get('http://localhost:8080/chat/14').then((res) => {
      removeAllChats();
      const ele = document.createElement('div');
      ele.innerText = res.data.content;
      restList.appendChild(ele);
    });
  });

  getAllChatBtn.addEventListener('click', () => {
    axios.get('http://localhost:8080/chat').then((res) => {
      removeAllChats();
      for (const chat of res.data) {
        const ele = document.createElement('div');
        ele.innerText = chat.content;
        restList.appendChild(ele);
      }
    });
  });

  deleteBtn.addEventListener('click', () => {
    removeAllChats();
  });
};

const init = () => {
  const name = prompt('What is your name?');
  username = name;
  socket.emit('new_user', username, (user) => {
    userColor = user.color;
  });
  handleChats();
  handleREST();
};

init();
