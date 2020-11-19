import { Raw, Fragment } from '@bikeshaving/crank';

export default async function* Article({ id }) {
    if (this.$isClient) yield (<div>Fetching article...</div>);

    let post;
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    if (this.$isSSR) {
        post = this.$data[url] || [];
    } else {
        const res = await this.$fetch(url);
        post = await res.json();

        if (this.$isServer) {
            this.$bus.emit('data', url, post);
        }
    }

    return (
        <Fragment>
            <h1>{post.title}</h1>
            <Raw value={post.body} />
        </Fragment>
    );
}
