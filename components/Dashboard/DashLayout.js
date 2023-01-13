import { useState, useEffect, useCallback, Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Avatar from 'react-avatar';
import { Menu, Transition } from '@headlessui/react';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { useTheme } from 'next-themes';
import { FaRegBell } from 'react-icons/fa';
import { BiTimeFive } from 'react-icons/bi'
import { ImCheckboxUnchecked } from 'react-icons/im'
import { GiMeditation } from 'react-icons/gi'
import { MdEventAvailable } from 'react-icons/md'
import { AiOutlineLogout } from 'react-icons/ai'; //as dashboard and profile and logout
import { BsJournalCheck } from 'react-icons/bs'
import { AiOutlineIdcard, AiOutlineHeart } from 'react-icons/ai'; //as resume and favourite jobs
import { MdOutlineSpaceDashboard } from 'react-icons/md'; //as applied jobs and dashboard
import { AiOutlineDelete } from 'react-icons/ai'; //as delete profile

import { FiArrowRightCircle } from 'react-icons/fi';
import { logoutUser } from '../../api/User';
import { getProfile } from '../../api/Profile';
import useSWR from 'swr'

const DashLayout = ({ children, active }) => {
  const [mounted, SetMounted] = useState(false);
  const [Navbar, setNavbar] = useState(false);
  const [lock, setlock] = useState(false);
  const [isshow, setisshow] = useState(false);
  const { theme, setTheme } = useTheme('light');

  //getting profile
  const { data } = useSWR(
    process.env.BACKEND + "/user/profile",
    async (url) => await getProfile(url), { revalidateOnFocus: false, revalidateOnReconnect: true }
  );


  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setisshow(false);
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(process.env.BACKEND + "/user/logout/");
    router.reload();
  };

  const changeBackground = () => {
    if (window.scrollY > 15) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    SetMounted(true);
    return () => SetMounted(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction);

    return () => {
      document.removeEventListener('keydown', escFunction);
    };
  }, [escFunction]);

  // const { data, error, isValidating } = useSWR(
  //   '/api/user/userprofile',
  //   async (apiURL) =>
  //     await api
  //       .get(apiURL)
  //       .then((res) => res.data)
  //       .catch((err) => console.log(err))
  // );
  // const [true, settrue] = useState(typeof data?.data?.name !== 'undefined');

  // useEffect(() => {
  //   if (typeof data !== typeof undefined) {
  //     if (data?.data?.name !== undefined) {
  //       settrue(true);
  //     } else {
  //       settrue(false);
  //     }
  //   }
  //   if (error) {
  //     settrue(false);
  //   }
  // }, [data, error, isValidating]);

  if (!mounted) {
    return null;
  }
  return (
    <div className="flex relative   h-auto w-full bg-black ">
      <div
        onMouseEnter={() => {
          setisshow(true);
        }}
        onMouseLeave={() => {
          setisshow(false);
        }}
        className={`
      
         ${isshow ? 'w-[280px]  ' : 'w-0 lg:w-[70px]'} 
        
      
        bg-whiteback dark:bg-darkback flex-none flex flex-col   h-[100vh]  overflow-hidden  transition-all duration-300 ease-in-out backdrop-blur-sm z-[100] sticky left-0 top-0 `}
      >
        <div className="min-w-[89px] px-2  object-contain flex items-center py-2 justify-between transition-all duration-300 delay-400 ease-linear ">
          {isshow ? (
            <div className="flex-none  text-white font-[700] text-[24px]">
              {/* <Image
                className=" object-contain cursor-pointer"
                src={require('../../images/logo3.png')}
                width={125}
                height={45}
                alt={'logo'}
              /> */}
              TeleCBT
            </div>
          ) : (
            <div className="flex-none  text-white font-[700] text-[15px]">
              {/* <Image
                className="object-contain cursor-pointer"
                src={require('../../images/smalllogo.png')}
                width={45}
                height={45}
                alt={'logo'}
              /> */}
              {/* T-CBT */}
            </div>
          )}
          {/* <div
            className={`${isshow
              ? 'hidden xl:flex xl:justify-center xl:items-center dark:text-white text-gray-800  rounded-full ring-2 ring-gray-800 dark:ring-white p-1 cursor-pointer'
              : 'hidden'
              }`}
            onClick={() => setlock(!lock)}
          >
            <HiOutlineMenuAlt1 className="w-8 h-8 " />
          </div> */}
        </div>
        <div className="pr-5 xl:pr-4 flex flex-col gap-2 mt-7 ">
          {dashboard.map((item) => {
            return (
              <Link key={item.id} href={item.links}>
                <div
                  key={item.id}
                  className={`py-2 px-3 flex gap-4 items-center cursor-pointer overflow-hidden  ${active === item.id ? 'bg-backgroundColor text-black' : 'text-blue-50'
                    } rounded-r-3xl hover:bg-white group `}
                >
                  <div className="">{item.icon}</div>
                  <div className="overflow-hidden whitespace-nowrap text-[16px] font-bold tracking-wider  group-hover:text-black  ">
                    {item?.title}
                  </div>
                </div>
              </Link>
            );
          })}
          <div className=""></div>
        </div>
      </div>
      <div
        className={`  ${isshow && lock ? 'p-0 ' : 'pl-0 '
          } flex flex-col w-full `}
      >
        {/*  
    navbar conatiner
    */}

        <div
          className={`gap-2 z-10 flex w-full justify-between transition-all duration-100 ease-in-out delay-100 items-center h-[67px] px-10  `}
        >
          <div
            onClick={() => setisshow(!isshow)}
            className="lg:invisible  flex-none object-contain rounded-full p-2 transition-all duration-300 cursor-pointer   "
          >
            <div className="flex-none flex items-center justify-center text-white font-[700] text-[24px] ">
              {/* <Image
                className="object-contain cursor-pointer"
                src={require('../../images/smalllogo.png')}
                width={45}
                height={45}
                alt={'logo'}
              /> */}
              TeleCBT
            </div>
          </div>
          <div className="flex items-center gap-6 px-2 ">
            <div className="text-white ">
              <FaRegBell className="w-8 h-8" />
            </div>

            <div
              className={`${true ? 'flex hover:cursor-pointer z-[10]' : 'hidden'
                }`}
            >
              <Menu
                as="div"
                className="relative inline-block text-left place-self-center "
              >
                <div>
                  <Menu.Button className="inline-flex w-full justify-center items-center  ">
                    <Avatar
                      name={data?.data?.firstName + " " + data?.data?.lastName}
                      size="31px"
                      textSizeRatio={3}
                      className="rounded-full "
                    ></Avatar>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-195"
                  enterTo="transform opacity-100 scale-200"
                  leave="transition ease-in duration-175"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-195"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y  overflow-hidden  rounded-md shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    <div className="flex flex-col items-center py-2 gap-1 bg-black   border-backgroundColor border-2 rounded-t-xl">
                      <Avatar
                        name={data?.data?.firstName + " " + data?.data?.lastName}
                        size="40px"
                        textSizeRatio={3}
                        className="rounded-full"
                      ></Avatar>
                      <div className="capitalize font-semibold text-gray-800 dark:text-gray-300">
                        {data?.data?.firstName + " " + data?.data?.lastName}
                      </div>
                    </div>

                    <div className="px-1 py-1 bg-white  rounded-b-md  ">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={`${active
                              ? 'bg-backgrtou text-white'
                              : ' text-gray-800'
                              }  flex w-full items-center group-hover:bg-indigo-800 hover:cursor-pointer hover:bg-indigo-300   rounded-md px-2 py-2 text-sm`}
                          >
                            <Link href="/dashboard/home">Home</Link>
                          </div>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <div
                            onClick={handleLogout}
                            className={`${active
                              ? 'bg-indigo-600 text-white'
                              : ' text-gray-800'
                              }  flex w-full items-center group-hover:bg-indigo-800 hover:cursor-pointer hover:bg-indigo-300   rounded-md px-2 py-2 text-sm`}
                          >
                            Logout
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        {/* 
child container */}

        <div className={``}>
          <div className="relative mr-5 mb-2">
            {children}
            <div
              onClick={() => setisshow(!isshow)}
              className={`
              ${lock ? 'hidden' : ''}
          fixed bottom-5 right-5 lg:hidden  hover:bg-gray-800/50 rounded-full text-white p-4 cursor-pointer dark:bg-gray-300 dark:text-gray-800 transition-all duration-200 
          `}
            >
              <GiHamburgerMenu
                className={` ${isshow ? 'hidden' : 'w-8 h-8 filter backdrop:blur-2xl'
                  }  `}
              />
              <GrClose
                className={` ${isshow ? 'w-8 h-8 filter backdrop:blur-2xl ' : 'hidden'
                  }  `}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashLayout;

const dashboard = [
  {
    id: 'home',
    title: 'Home',
    links: '/dashboard/home',
    icon: <MdOutlineSpaceDashboard className="w-8 h-8 text-gray-600" />,
  },
  {
    id: 'journal',
    title: 'Journal',
    links: '/dashboard/journal',
    icon: <BsJournalCheck className="w-8 h-8 text-gray-600 " />,
  },

  {
    id: 'pomodoro',
    title: 'Pomodoro',
    links: '/dashboard/pomodoro',
    icon: <BiTimeFive className="w-8 h-8 text-gray-600 " />,
  },
  {
    id: 'breathing',
    title: 'Breathing',
    links: '/dashboard/breathing',
    icon: <ImCheckboxUnchecked className="w-8 h-8 text-gray-600" />,
  },
  {
    id: 'routine',
    title: 'Routine',
    links: '/dashboard/routine',
    icon: <MdEventAvailable className="w-8 h-8 text-gray-600" />,
  },
  {
    id: 'meditation',
    title: 'Meditation',
    links: '/dashboard/meditation',
    icon: <GiMeditation className="w-8 h-8 text-gray-600" />,
  },
  {
    id: 'logout',
    title: 'logout',
    links: '/dashboard/logout',
    icon: <AiOutlineLogout className="w-8 h-8 text-gray-600 " />,
  },
];
