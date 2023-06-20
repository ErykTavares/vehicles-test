import '../style/globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Deslocamento',
	description: 'Test para uma vaga feito em Nextjs usando MaterialUI'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-br'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
