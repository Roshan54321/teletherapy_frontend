import React from 'react';
import Chat from '../../../../components/Chat';
import DashLayout from '../../../../components/Dashboard/DashLayout';
import Head from 'next/head';

export default function ChatWeb() {
  return (
    <div className="flex items-end justify-center">
      <Head>
        <title>Chat | TeleCBT</title>
      </Head>
      <Chat />
    </div>
  );
}

ChatWeb.getLayout = function getLayout(page) {
  return <DashLayout>{page}</DashLayout>;
};
