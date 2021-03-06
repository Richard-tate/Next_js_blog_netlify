import Head from "next/head";
import Layout from "../components/Layout";
import Card from "../components/Card";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { useEffect } from "react";

function Home({ posts }) {
	useEffect(() => {
		if (window.netlifyIdentity) {
			window.netlifyIdentity.on("init", (user) => {
				if (!user) {
					window.netlifyIdentity.on("login", () => {
						document.location.href = "/admin/";
					});
				}
			});
		}
	}, []);
	return (
		<Layout>
			<Head>
				<title>Next JS Blog</title>
				<script
					src="https://identity.netlify.com/v1/netlify-identity-widget.js"
					defer></script>
			</Head>

			<h2 className="text-center">Featured Posts</h2>

			<section className="grid-3 mt-3">
				{posts.map((post, index) => {
					const { title, excerpt, cover_image, date } = post.frontmatter;
					return (
						<Card
							key={index}
							slug={post.slug}
							title={title}
							description={excerpt}
							image={cover_image}
							date={date}
						/>
					);
				})}
			</section>
		</Layout>
	);
}

export async function getStaticProps() {
	// get files from  the posts dir //
	const files = fs.readdirSync(path.join("posts"));

	const posts = files.map((filename) => {
		const slug = filename.replace(".md", "");

		const markdownWithMeta = fs.readFileSync(
			path.join("posts", filename),
			"utf-8",
		);

		const { data: frontmatter } = matter(markdownWithMeta);

		return {
			slug,
			frontmatter,
		};
	});

	return {
		props: {
			posts: posts,
		},
	};
}

export default Home;
