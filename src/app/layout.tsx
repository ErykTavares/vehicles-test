import '../style/globals.scss';
import { Roboto } from 'next/font/google';
import '../style/tailwind.css';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata = {
	title: 'Deslocamento',
	description: 'Test para uma vaga feito em Nextjs usando MaterialUI'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='pt-br'>
			<body className={roboto.className}>{children}</body>
		</html>
	);
}
