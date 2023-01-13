import { useEffect, useRef, useState } from 'react';
import { FiSend, FiVideo } from 'react-icons/fi';
const socketIo = require('socket.io-client');
const socket = socketIo.connect('http://localhost:5000');

import axios from 'axios';
import { useRouter } from 'next/router';

export default function Chat() {
  const router = useRouter();
  const send_container = useRef(null);

  const [schedule, setSchedule] = useState(false);
  const [zoomData, setZoomData] = useState(null);
  const [online, setOnline] = useState(false);

  var user = {
    email: 'roshanneupane54321@gmail.com',
    type: 1,
  };

  const scheduleMeeting = async () => {
    try {
      const data = await axios.post(
        process.env.BACKEND + '/user/schedule-meeting',
        user,
        { withCredentials: true }
      );
      setZoomData(data?.data?.data);
      console.log(data.data);
      setSchedule(true);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMeeting = () => {
    socket.emit('meeting', zoomData);
    setSchedule(false);
  };

  useEffect(() => {
    const form = send_container.current;
    const messageInput = document.getElementById('send__container__message');

    const messageContainer = document.querySelector('.messagearea');
    const add = (message, position) => {
      const messageElement = document.createElement('div');
      messageElement.innerHTML = message;
      messageElement.classList.add('container__message');
      messageElement.classList.add(position);
      messageContainer.append(messageElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (messageInput.value) {
        const message = messageInput.value;
        add(`You: ${message}`, 'container__right');
        socket.emit('send', message);
        messageInput.value = '';
      }
    });

    socket.on('user-joined', (name) => {
      // add(`${name} joined the chat`, 'container__middle')
    });

    socket.on('receive', (data) => {
      add(`${data.name}: ${data.message}`, 'container__left');
    });

    socket.on('left', (data) => {
      if (data) {
        // add(`${data.name} left the chat`, 'container__middle')
      }
    });

    socket.on('meetingReceive', (data) => {
      const data1 = data?.message;
      if (data1) {
        add(
          `${data.name}: <div class="flex flex-col gap-1"><div>Meeting Url:&nbsp;<a class="text-blue-400" target="__blank" href="${data1.join_url}">${data1.join_url}</a></div><div>Password: ${data1.password}</div></div>`,
          'container__left'
        );
      }
    });
  }, [socket]);

  useEffect(() => {
    if (router.query.name) {
      socket.emit('new-user-joined', {
        name: router.query.name,
        user1: router.query.id1,
        user2: router.query.id2,
      });
    }
  }, [router]);

  return (
    <div className="relative rounded-t-2xl  overflow-hidden">
      {schedule ? (
        <div className="absolute bg-white rounded-2xl  bottom-0 inset-0 w-[440px]  m-auto  h-[170px] p-5 ">
          <div className="flex flex-col text-sm gap-1">
            <div>Meeting Topic: {zoomData?.topic}</div>
            <div>
              Meeting Url:&nbsp;
              <span className="text-blue-600">{zoomData?.join_url}</span>
            </div>
            <div>Password: {zoomData?.password}</div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => setSchedule(false)}
              className="my-4 text-sm float-right bg-blue-300 p-1 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={sendMeeting}
              className="my-4 text-sm float-right bg-blue-300 p-1 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="container">
        <div className="bg-gray-50  rounded-t-2xl h-20 items-center flex justify-between px-5">
          <div className="flex gap-4 items-center">
            <img
              src={'/images/scene1.jpg'}
              className="rounded-full w-[40px] h-[40px]"
              fill
              alt=""
            />
            <h2 className="font-[700] text-[18px] ">Sachin Sapkota</h2>
          </div>
          <div
            className="text-black font-[700]  cursor-pointer flex px-2 py-1 items-center gap-3 border-black border-2 rounded-2xl "
            onClick={scheduleMeeting}
          >
            <div>Schedule Meeting</div> <FiVideo className="w-7 h-7" />
          </div>
        </div>
        <div className="messagearea rounded-b-2xl mb-1 scrollbar-thin scrollbar-thumb-backgroundColor scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-gray-800 bg-gray-200"></div>
      </div>
      <div className="send">
        <form ref={send_container} className="flex w-[900px] m-auto gap-1 ">
          <input
            id="send__container__message"
            type="text"
            name="message"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-transparent focus:border-transparent block w-full p-2.5  required rounded-2xl h-[50px] pl-5"
          />
          <button
            className="bg-gray-200  w-[50px]  h-[50px] flex items-center justify-center p-1 rounded-2xl "
            type="submit"
          >
            <FiSend className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
