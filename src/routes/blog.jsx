async function LoadingIndicator() {
    return <div>Fetching posts...</div>;
}

async function Blog() {
    const res = await this.$fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await res.json();
    return (
        <ul>
            {posts.map((post) => (
                <li>
                    <a href={`/blog/${post.id}`}>{post.title}</a>
                </li>
            ))}
        </ul>
    );
}

export default async function* () {
    for await (const _ of this) {
        if (this.$isClient) yield <LoadingIndicator />;
        yield <Blog />;
    }
}
