import React, { Fragment } from "react";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<Fragment>
			<Header />
			<main className="container mt-3">{children}</main>
		</Fragment>
	);
};

export default Layout;
