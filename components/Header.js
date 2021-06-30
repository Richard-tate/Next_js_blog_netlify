import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = () => {
	return (
		<header className={styles.header}>
			<Link href="/">
				<a className={styles.navbar_link}>Next JS Blog</a>
			</Link>
		</header>
	);
};

export default Header;
