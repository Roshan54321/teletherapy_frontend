import DashLayout from '../../components/Dashboard/DashLayout';
import { MdVideocam } from 'react-icons/md';
import { AiFillPlayCircle } from 'react-icons/ai';
import { GoSettings } from 'react-icons/go';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Mood Chart',
    },
  },
};

const labels = [
  {
    day: 'Sunday',
    mood: '😔',
    data: 1,
  },
  {
    day: 'Monday',
    mood: '😠',
    data: 2,
  },
  {
    day: 'Tuesday',
    mood: '😊',
    data: 9,
  },
  {
    day: 'Wednesday',
    mood: '😭',
    data: 4,
  },
  {
    day: 'Thursday',
    mood: '😊',
    data: 9,
  },
  {
    day: 'Friday',
    mood: '😰',
    data: 4,
  },
  {
    day: 'Saturday',
    mood: '😂',
    data: 10,
  },
];
export const data = {
  labels: labels.map((item) => item.day),
  datasets: [
    {
      fill: true,
      label: 'data',
      data: labels.map((items) => items.data),
      borderColor: 'black',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      tension: 0.5,
      showLine: false,
    },
  ],
};
import Image from 'next/image';
const home = () => {
  return (
    <div className="bg-backgroundColor rounded-3xl h-fit overflow-hidden ">
      <div className="p-8  h-[140px] flex justify-between items-center relative">
        {/* <div className="absolute inset-0 opacity-70">
          <Image
            className=" object-cover"
            src={'/images/background.jpg'}
            alt=""
            fill
          />
        </div> */}

        <h1 className="font-[800] text-[35px] text-black relative overflow-hidden pb-5">
          <span className="">Good morning , Sachin</span>
        </h1>
      </div>
      <div className="rounded-t-3xl bg-[#f5f4f3] grid grid-cols-3 gap-3 -mt-8 overflow-hidden relative ">
        {/* left section */}

        <div className="col-span-2 grid grid-cols-3 grid-rows-auto  gap-2 p-5">
          <div className="col-span-3 flex gap-3">
            <div className="flex flex-1 ">
              <div className="flex space-x-1 w-full">
                <input
                  type="text"
                  className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-full focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Search..."
                />
                <button className="px-4 text-gray-800 bg-backgroundColor rounded-full py-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <div className="rounded-full w-12 h-10 bg-backgroundColor flex justify-center items-center p-1">
                  <GoSettings className="w-6 h-6 " />
                </div>
              </div>
            </div>
          </div>

          {/* mood add */}
          <div className="   flex flex-col col-span-2 mt-8 ">
            <span className="font-[700] text-[18px] ">
              How do you feel today?
            </span>
            <div className=" flex flex-wrap gap-4 rounded-3xl  bg-black p-4">
              <div className="bg-backgroundColor/50 ring-2 ring-white/60  p-1 rounded-full w-10 h-10">
                <Image
                  src="/images/sad.png "
                  className="object-contain"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>

              <div className="bg-backgroundColor/50 ring-2 ring-white/60  p-1 rounded-full w-10 h-10">
                <Image
                  src="/images/crying.png "
                  className="object-contain"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div className="bg-backgroundColor/50 ring-2 ring-white/60  p-1 rounded-full w-10 h-10">
                <Image
                  src="/images/angry.png "
                  className="object-contain"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div className="bg-backgroundColor/50 ring-2 ring-white/60  p-1 rounded-full w-10 h-10">
                <Image
                  src="/images/anxious.png "
                  className="object-contain"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div className="bg-backgroundColor/50 ring-2 ring-white/60  p-1 rounded-full w-10 h-10">
                <Image
                  src="/images/smiling.png "
                  className="object-contain"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>

              <div className="bg-backgroundColor/50 ring-2 ring-white/60  p-1 rounded-full w-10 h-10">
                <Image
                  src="/images/laughing.png "
                  className="object-contain"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* assign psycatris  */}
          <div className="col-span-3 flex gap-3 flex-col mt-5  ">
            <div className="font-[700] text-[20px] inline-flex">
              Assigned Psyciatrists
            </div>
            {/* <div className="flex items-center gap-4">
              <span className="border-black border-[3px] rounded-full group cursor-pointer relative overflow-hidden ">
                <img
                  className="rounded-full object-cover w-[120px] h-[120px] m-1"
                  src={'/images/scene1.jpg'}
                  fill
                />
                <div className="absolute group-hover:flex hidden inset-0 justify-center items-center bg-black/40">
                  <AiOutlineMessage className="text-white w-16 h-16 " />
                </div>
              </span>

              <span className="border-black border-[3px] rounded-full group cursor-pointer relative overflow-hidden ">
                <img
                  className="rounded-full object-cover w-[120px] h-[120px] m-1"
                  src={'/images/scene2.jpg'}
                  fill
                />
                <div className="absolute group-hover:flex hidden inset-0 justify-center items-center bg-black/40">
                  <AiOutlineMessage className="text-white w-16 h-16 " />
                </div>
              </span>

              <span className="group border-black border-[3px] rounded-full w-[60px] h-[60px] group cursor-pointer relative overflow-hidden flex items-center justify-center ">
                <AiOutlinePlus className="w-12 h-12 group-hover:text-black/60 " />
              </span>
            </div> */}

            <div className="flex  items-center gap-5 ">
              <div className="flex  w-2/6 p-5 items-center justify-center  rounded-2xl bg-black gap-4">
                <img
                  className="rounded-full object-cover w-[60px] h-[60px] flex-none "
                  src={'/images/scene1.jpg'}
                  fill
                />
                <div className="flex flex-col gap-1">
                  <div className="font-[700] text-[16px] text-white">
                    Sachin Sapkota
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-backgroundColor font-[700] text-center">
                    Message
                  </div>
                </div>
              </div>

              <div className="flex  w-2/6 p-5 items-center justify-center  rounded-2xl bg-black gap-4">
                <img
                  className="rounded-full object-cover w-[60px] h-[60px] flex-none "
                  src={'/images/scene1.jpg'}
                  fill
                />
                <div className="flex flex-col gap-1">
                  <div className="font-[700] text-[16px] text-white">
                    Sachin Sapkota
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-backgroundColor font-[700] text-center">
                    Message
                  </div>
                </div>
              </div>

              <span className="group  rounded-full w-[60px] h-[60px] group cursor-pointer relative overflow-hidden flex items-center justify-center bg-black">
                <AiOutlinePlus className="w-12 h-12 group-hover:text-white/60 text-white" />
              </span>
            </div>
          </div>

          {/* explore tools */}

          <div className="flex flex-col col-span-3 mt-5 ">
            <div className="font-[700] text-[18px] ">Explore tools</div>

            <div className="flex h-[200px] gap-4 mt-3">
              <div className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                <Image
                  className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                  src="/images/tools/meditation.jpg"
                  fill
                  alt=""
                />
                <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                  <span>Meditation</span>
                </div>
              </div>

              <div className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                <Image
                  className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                  src="/images/tools/journal.jpg"
                  fill
                  alt=""
                />
                <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                  <span>Journal Writing</span>
                </div>
              </div>

              <div className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                <Image
                  className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                  src="/images/tools/breathing.jpg"
                  fill
                  alt=""
                />
                <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                  <span>Breathing Practise</span>
                </div>
              </div>

              <div className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                <Image
                  className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                  src="/images/tools/pomodoro.jpg"
                  fill
                  alt=""
                />
                <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                  <span>Pomodoro</span>
                </div>
              </div>

              <div className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                <Image
                  className="absolute object-cover opacity-60   w-[500px] h-[500px] "
                  src="/images/tools/pomodoro.jpg"
                  fill
                  alt=""
                />
                <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                  <span>Pomodoro</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 flex flex-col mt-5">
            <div className="font-[700] text-[18px] ">
              Today's compilation for you
            </div>
            <div className="flex gap-3  bg-gray-100 h-[200px] mt-2  ">
              <div className="flex p-5 w-2/5 flex-col bg-white rounded-2xl gap-3 ">
                <div className="flex gap-4 items-center">
                  <div className=" rounded-full w-12 h-12 bg-black flex-none flex items-center justify-center ">
                    <MdVideocam className="text-white w-8 h-8" />
                  </div>
                  <span className="font-[700] text-[18px]">
                    Emotions associated with drive
                  </span>
                </div>
                <p className="text-sm font-[500]">
                  In this part of the series it helps you understand the
                  different emotions associated with drive.
                </p>
              </div>
              <div className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                <Image
                  className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                  src="/images/scene2.jpg"
                  width={400}
                  height={400}
                  alt=""
                />
                <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                  <span>Anxiety</span>
                  <AiFillPlayCircle className="text-white w-7 h-7 " />
                </div>
              </div>
              <div className="relative w-2/5 rounded-2xl bg-black overflow-hidden">
                <Image
                  className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                  src="/images/scene3.jpg"
                  width={500}
                  height={500}
                  alt=""
                />
                <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                  <span>Building Confidence</span>
                  <AiFillPlayCircle className="text-white w-7 h-7 " />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-3 h-[320px] p-5 bg-white rounded-2xl flex mt-5">
            <Line options={options} data={data} />
            <div className="flex  flex-col">
              <div className="flex ">1</div>
            </div>
          </div>
        </div>

        {/* right section */}

        <div className="p-5 flex flex-col w-full h-[250px]">
          <div className="flex flex-col ">
            <h1 className="font-[700] text-[20px] "> Thought of the day</h1>
            <div className="relative w-full rounded-2xl bg-white overflow-hidden h-[160px] ">
              {/* <Image
                className="absolute object-cover opacity-60   w-[500px] h-[500px] "
                src="/images/scene4.jpg"
                fill
                alt=""
              /> */}
              <div className="font-[600] text-[22px] flex gap-3 absolute  items-center justify-center text-black p-5 font-poppins  ">
                <div>
                  "यदि तिमी जतिबेला पनि रिसाउंछौ वा गुनासो गछौँ भने, मानिसहरुसग
                  तिम्रो लागि समय हुनेछैन।"
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5 w-full">
            <h1 className="font-[700] text-[20px] "> Featured Articles</h1>

            <div className="flex-col items-center justify-center ">
              <div className="group border-b-2 relative border-[#AF9F9F]/30 mx-auto w-[310px] h-[290px]">
                <Link href={`/articles/article1`}>
                  <div className="rounded-xl overflow-hidden w-full h-[170px] relative cursor-pointer ">
                    <img
                      className="object-cover absolute object-center group-hover:scale-110 group-hover:rotate-1 transition-all duration-500 "
                      alt=""
                      src={'/images/boxBreathing.png'}
                      fill
                    />
                  </div>
                </Link>
                <p className="text-[#756868] font-semibold ">Mental Health</p>

                <p className="text-gray-800 font-bold  hover:text-gray-800/80 cursor-pointer ">
                  Box Breathing – Relaxation through Square Breathing Technique
                </p>

                <p className="text-[#645F5F] font-semibold bottom-1  absolute">
                  Friday, Jan 13
                </p>
              </div>
            </div>

            <div className="flex-col items-center justify-center mt-4 ">
              <div className="group border-b-2 relative border-[#AF9F9F]/30 mx-auto w-[310px] h-[300px]">
                <Link href={`/articles/article2`}>
                  <div className="rounded-xl overflow-hidden w-full h-[170px] relative cursor-pointer ">
                    <img
                      className="object-cover absolute object-center group-hover:scale-110 group-hover:rotate-1 transition-all duration-500 "
                      alt=""
                      src={'/images/therapy.jpg'}
                      fill
                    />
                  </div>
                </Link>
                <p className="text-[#756868] font-semibold ">Mental Health</p>

                <p className="text-gray-800 font-bold  hover:text-gray-800/80 cursor-pointer ">
                  Cognitive Behavioral Therapy (CBT) manage your problems by
                  changing the way you think
                </p>

                <p className="text-[#645F5F] font-semibold bottom-1  absolute ">
                  Thursday, Jan 12
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
home.getLayout = function getLayout(page) {
  return <DashLayout active="home">{page}</DashLayout>;
};
