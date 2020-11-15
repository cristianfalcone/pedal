import { Raw } from '@bikeshaving/crank';
import { Fragment } from '@bikeshaving/crank';

async function LoadingIndicator() {
    return <div>Fetching article...</div>;
}

async function Article({ id }) {
    const res = await this.$fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await res.json();
    return (
        <Fragment>
            <h1>{post.title}</h1>
            <Raw value={post.body} />
        </Fragment>
    );
}

export default async function* ({ id }) {
    for await ({} of this) {
        if (this.$isClient) yield <LoadingIndicator />;
        yield <Article id={id} />;
    }
}
