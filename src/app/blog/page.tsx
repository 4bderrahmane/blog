import {getAllPosts, formatDate} from "@/lib/blog";
import {site} from "@/lib/site";

export default async function BlogIndex() {
    const posts = await getAllPosts();

    return (
        <div className="mx-auto max-w-2xl">
            <h1 className="font-serif text-3xl font-semibold tracking-tight">Writing</h1>
            <p className="mt-3 text-muted">Notes on what I&apos;m building and thinking about.</p>

            {posts.length === 0 ? (
                <p className="mt-8 text-muted">No posts yet — check back soon.</p>
            ) : (
                <ul className="mt-10 space-y-8">
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <a
                                href={`${site.blogUrl}/${post.slug}`}
                                className="font-serif text-xl font-medium hover:underline"
                            >
                                {post.title}
                            </a>
                            <p className="mt-1 text-sm text-muted">{formatDate(post.date)}</p>
                            <p className="mt-2 text-muted">{post.summary}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
