import DashLayout from '../../components/Dashboard/DashLayout';
import { MdVideocam } from 'react-icons/md';
import { AiFillPlayCircle } from 'react-icons/ai';
import { GoSettings } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import useSWR, { mutate } from 'swr';
import { getProfile } from '../../api/Profile';
import axios from 'axios';
import { useEffect } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

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

const Home = () => {
  const [moodData, setMoodData] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //getting profile
  const { data: profileData, error: profileError } = useSWR(
    process.env.BACKEND + '/user/profile',
    async (url) => await getProfile(url),
    { revalidateOnFocus: false, revalidateOnReconnect: true }
  );

  //getting assigned psychiatrists
  const { data: psychiatristData, error: psychiatristError } = useSWR(
    process.env.BACKEND + "/user/psychiatrist/assigned/list", async (url) => await axios.get(url, { withCredentials: true }), { revalidateOnFocus: false, revalidateOnReconnect: true }
  );

  //getting assigned patients
  const { data: patientsData, error: patientsError } = useSWR(
    process.env.BACKEND + "/user/psychiatrist/assigned/patients/list", async (url) => await axios.get(url, { withCredentials: true }), { revalidateOnFocus: false, revalidateOnReconnect: true }
  );

  console.log(patientsData)


  const { data: mood, error } = useSWR(process.env.BACKEND + "/user/get-emoji", async (url) => await axios.get(url, { withCredentials: true }))

  const submitFeeling = (emojiValue) => {
    try {
      const res = axios.post(
        process.env.BACKEND + '/user/update-emoji',
        { value: emojiValue },
        { withCredentials: true }
      );
      setMoodData(emojiValue);
    } catch (e) {
      setErrorMessage(e.response?.data?.message);
    }
  };

  useEffect(() => {
    if (typeof mood !== 'undefined') {
      setMoodData(mood?.data?.data?.value);
    }
  }, [mood])

  useEffect(() => {
    if (typeof profileData !== 'undefined') {
      if (profileData?.data?.type == "user") {
        setIsOpen(true)
      }
    }
  }, [profileData])

  const today = new Date()
  const curHr = today.getHours()

  return (
    <div className="bg-backgroundColor rounded-3xl h-fit overflow-hidden ">
      <Head>
        <title>Dashboard | TeleCBT</title>
      </Head>
      <div className="p-8  h-[140px] flex justify-between items-center relative">
        <h1 className="font-[800] text-[35px] text-black relative overflow-hidden pb-5">
          <span className="">{curHr < 12 ? "Good morning " : curHr < 18 ? "Good afternoon " : "Good evening "} , {profileData?.data?.firstName + " " + profileData?.data?.lastName}</span>
        </h1 >
      </div >
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
          {profileData?.data?.type == "user" ?
            <div className="flex flex-col col-span-2 mt-8 ">
              <span className="font-[700] text-[18px] ">
                How do you feel today?
              </span>
              <div className=" flex flex-wrap gap-4 rounded-3xl  bg-black p-4 w-fit">
                <div className={`bg-backgroundColor/50 cursor-pointer ring-2 ${moodData === 0 ? "ring-white scale-110" : "ring-white/60"} p-1 rounded-full w-10 h-10`} onClick={() => submitFeeling(0)}>
                  <Image
                    src="/images/sad.png "
                    className="object-contain"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>

                <div className={`bg-backgroundColor/50 cursor-pointer ring-2 ${moodData === 1 ? "ring-white scale-110" : "ring-white/60"} p-1 rounded-full w-10 h-10`} onClick={() => submitFeeling(1)}>
                  <Image
                    src="/images/crying.png "
                    className="object-contain"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <div className={`bg-backgroundColor/50 cursor-pointer ring-2 ${moodData === 2 ? "ring-white scale-110" : "ring-white/60"} p-1 rounded-full w-10 h-10`} onClick={() => submitFeeling(2)}>
                  <Image
                    src="/images/angry.png "
                    className="object-contain"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <div className={`bg-backgroundColor/50 cursor-pointer ring-2 ${moodData === 3 ? "ring-white scale-110" : "ring-white/60"} p-1 rounded-full w-10 h-10`} onClick={() => submitFeeling(3)}>
                  <Image
                    src="/images/anxious.png "
                    className="object-contain"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>
                <div className={`bg-backgroundColor/50 cursor-pointer ring-2 ${moodData === 4 ? "ring-white scale-110" : "ring-white/60"} p-1 rounded-full w-10 h-10`} onClick={() => submitFeeling(4)}>
                  <Image
                    src="/images/smiling.png "
                    className="object-contain"
                    width={40}
                    height={40}
                    alt=""
                  />
                </div>

                <div className={`bg-backgroundColor/50 cursor-pointer ring-2 ${moodData === 5 ? "ring-white scale-110" : "ring-white/60"} p-1 rounded-full w-10 h-10`} onClick={() => submitFeeling(5)}>
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
            :
            <></>
          }

          {/* assign psychiatrist  */}
          <div className="col-span-3 flex gap-3 flex-col mt-5  ">
            <div className="font-[700] text-[20px] inline-flex">
              {profileData?.data?.type == "user" ?
                "Assigned Psychiatrists"
                :
                "Assigned Patients"
              }
            </div>

            <div className="flex  items-center gap-5 ">
              {profileData?.data?.type == "user" ? psychiatristData?.data?.data?.map((psychiatrist, i) =>
                <div className="flex  w-2/6 p-5 items-center justify-center  rounded-2xl bg-black gap-4">
                  <img
                    className="rounded-full object-cover w-[60px] h-[60px] flex-none "
                    src={psychiatrist?.profilePicture}
                    fill
                  />
                  <div className="flex flex-col gap-1">
                    <div className="font-[700] text-[16px] text-white">
                      {psychiatrist?.firstName + " " + psychiatrist?.lastName}
                    </div>
                    <Link href={`/dashboard/chat/${profileData?.data?._id}/${psychiatrist?._id}?name=${profileData?.data?.firstName + " " + profileData?.data?.lastName}`} legacyBehavior>
                      <a className="px-3 py-2 rounded-xl bg-backgroundColor font-[700] text-center">
                        Message
                      </a>
                    </Link>
                  </div>
                </div>
              )
                :
                patientsData?.data?.data?.map((patient, i) =>
                  <div className="flex  w-2/6 p-5 items-center justify-center  rounded-2xl bg-black gap-4">
                    <img
                      className="rounded-full object-cover w-[60px] h-[60px] flex-none "
                      src={patient?.profilePicture}
                      fill
                    />
                    <div className="flex flex-col gap-1">
                      <div className="font-[700] text-[16px] text-white">
                        {patient?.firstName + " " + patient?.lastName}
                      </div>
                      <Link href={`/dashboard/chat/${profileData?.data?._id}/${patient?._id}?name=${profileData?.data?.firstName + " " + profileData?.data?.lastName}`} legacyBehavior>
                        <a className="px-3 py-2 rounded-xl bg-backgroundColor font-[700] text-center">
                          Message
                        </a>
                      </Link>
                    </div>
                  </div>
                )}

              {profileData?.data?.type == "user" ?
                <Link href="/dashboard/psychiatrists" legacyBehavior>
                  <a className="group  rounded-full w-[60px] h-[60px] group cursor-pointer relative overflow-hidden flex items-center justify-center bg-black">
                    <AiOutlinePlus className="w-12 h-12 group-hover:text-white/60 text-white" />
                  </a>
                </Link>
                :
                <></>
              }
            </div>
          </div>

          {/* explore tools */}

          <div className="flex flex-col col-span-3 mt-5 ">
            <div className="font-[700] text-[18px] ">Explore tools</div>

            <div className="flex h-[200px] gap-4 mt-3">
              <Link href="meditation" legacyBehavior>
                <a className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                  <Image
                    className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                    src="/images/tools/meditation.jpg"
                    fill
                    alt=""
                  />
                  <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                    <span>Meditation</span>
                  </div>
                </a>
              </Link>

              <Link href="journal" legacyBehavior>
                <a className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                  <Image
                    className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                    src="/images/tools/journal.jpg"
                    fill
                    alt=""
                  />
                  <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                    <span>Journal Writing</span>
                  </div>
                </a>
              </Link>

              <Link href="breathing" legacyBehavior>
                <a className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                  <Image
                    className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                    src="/images/tools/breathing.jpg"
                    fill
                    alt=""
                  />
                  <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                    <span>Breathing Practise</span>
                  </div>
                </a>
              </Link>

              <Link href="pomodoro" legacyBehavior>
                <a className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                  <Image
                    className="absolute object-cover opacity-60  w-[500px] h-[500px] "
                    src="/images/tools/pomodoro.jpg"
                    fill
                    alt=""
                  />
                  <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                    <span>Pomodoro</span>
                  </div>
                </a>
              </Link>

              <Link href="routine" legacyBehavior>
                <a className="relative w-1/5 rounded-2xl bg-black overflow-hidden">
                  <Image
                    className="absolute object-cover opacity-60   w-[500px] h-[500px] "
                    src="/images/tools/routine.jpg"
                    fill
                    alt=""
                  />
                  <div className="font-[600] text-[18px] flex gap-3 absolute left-4 bottom-4 text-white items-center">
                    <span>Routine</span>
                  </div>
                </a>
              </Link>
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

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 text-center"
                  >
                    Your health score is {8}
                  </Dialog.Title>
                  <div className="mt-2 text-center">
                    <p className="text-sm text-gray-500">
                      People with this score may experience{' '}
                      {
                        'low mood , moderate signs of worry or social discomfort.'
                      }
                    </p>
                    <p className="text-sm text-gray-500">
                      We recommend you to speak with our Psyciatrists to
                      understand what you're going through, a little better!
                    </p>

                    <div className="border-black/5 border-t-2 mt-3 pt-3 flex flex-col gap-1 items-center">
                      <div className="font-[700] text-[18px]">
                        Recommendation
                      </div>
                      <p className="text-[16px] font-[600]">
                        Talk to our Psyciatrists
                      </p>
                      <div className="flex  w-[250px] p-5 items-center justify-center  rounded-2xl bg-black gap-4">
                        <img
                          className="rounded-full object-cover w-[60px] h-[60px] flex-none "
                          src={psychiatristData?.data?.data[0]?.profilePicture}
                          fill
                        />
                        <div className="flex flex-col gap-1">
                          <div className="font-[700] text-[16px] text-white">
                            {psychiatristData?.data?.data[0]?.firstName + " " + psychiatristData?.data?.data[0]?.lastName}
                          </div>
                          <Link href={`/dashboard/chat/${profileData?.data?._id}/${psychiatristData?.data?.data[0]?._id}?name=${profileData?.data?.firstName + " " + profileData?.data?.lastName}`} legacyBehavior>
                            <a className="px-3 py-2 rounded-xl bg-backgroundColor font-[700] text-center">
                              Message
                            </a>
                          </Link>
                        </div>
                      </div>

                      <p>Or</p>
                      <div className="flex flex-col">
                        <p className="font-[700] text-[18px]">
                          Call Helpline at:
                        </p>
                        <h1 className="font-[800] text-[20px]">
                          1660 010 2005
                        </h1>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex  justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Home;

Home.getLayout = function getLayout(page) {
  return <DashLayout active="home">{page}</DashLayout>;
};
