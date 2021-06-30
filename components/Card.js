import Link from "next/link";
import styles from "../styles/Card.module.css";

const Card = ({ title, description, image, date, slug }) => {
	return (
		<div className={styles.card}>
			<img className={styles.card_img} src={image} alt={title} />
			<h3 className={styles.card_title}>{title}</h3>
			<p className={styles.card_description}>{description}</p>
			<p className={styles.card_date}>
				<small>{date}</small>
			</p>
			<Link href={`/blog/${slug}`}>
				<button className="btn btn-primary rounded">Read More...</button>
			</Link>
		</div>
	);
};

export default Card;
