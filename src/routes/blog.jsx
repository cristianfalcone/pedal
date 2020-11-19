export default async function* () {
    if (this.$isClient) yield (<div>Fetching posts...</div>);

    let posts;
    const url = 'https://jsonplaceholder.typicode.com/posts';

    if (this.$isSSR) {
        posts = this.$data[url] || [];
    } else {
        const res = await this.$fetch(url);
        posts = await res.json();

        if (this.$isServer) {
            this.$bus.emit('data', url, posts);
        }
    }

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
