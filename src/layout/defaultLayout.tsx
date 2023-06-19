import React from 'react';

interface IDefaultLayoutProps {
	children: JSX.Element;
}

// eslint-disable-next-line react/jsx-no-useless-fragment
const DefaultLayout = ({ children }: IDefaultLayoutProps): JSX.Element => <>{children}</>;
export default DefaultLayout;
