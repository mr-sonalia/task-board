/** @format */

import { NextPage } from "next";
import Head from "next/head";

type Props = {};

const DocHead: NextPage = (props: Props) => {
	return (
		<Head>
			<title>TasksBoard</title>
			<link rel="icon" href="/favicon.ico" />

			<meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="ie=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="description" content="TasksBoard project" />

			{/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
			{/* <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
			{/* eslint-disable-next-line @next/next/no-page-custom-font */}
			{/* <link
				href="https://fonts.googleapis.com/css2?family=Lexend:wght@100;200;300;400;500;600;700;800;900&display=swap"
				rel="stylesheet"
			/> */}
		</Head>
	);
};

export default DocHead;
