import Layout from "../../components/Layout";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Head from "next/head";
import styles from "../../styles/CardPost.module.css";

export async function getStaticPaths() {
	const files = fs.readdirSync(path.join("posts"));

	const paths = files.map((filename) => {
		return {
			params: {
				slug: filename.replace(".md", ""),
			},
		};
	});

	return {
		paths: paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const markdownWithMeta = fs.readFileSync(
		path.join("posts", slug + ".md"),
		"utf-8",
	);
	const { data: frontmatter, content } = matter(markdownWithMeta);
	return {
		props: {
			frontmatter: frontmatter,
			slug: slug,
			content: content,
		},
	};
}

const PostPage = ({ frontmatter, slug, content }) => {
	const { title, date, cover_image } = frontmatter;
	return (
		<Layout>
			<Head>
				<title>Next JS blog | {slug}</title>
			</Head>
			<article className={styles["card-page"]}>
				<h1 className={styles["post-title"]}>{title}</h1>
				<div className={styles["post-date"]}>{`Posted on: ${date}`}</div>
				<div className={styles["post_img"]}>
					<img src={cover_image} alt={title} />
				</div>
				<div className={styles["post-body"]}>
					<div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
				</div>
			</article>
		</Layout>
	);
};
export default PostPage;
