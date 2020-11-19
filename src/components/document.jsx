export default async function* ({ children }) {
    const data = [];

    // TODO: with hydration rendering, I don't need the following
    // in order to save server rendering-time data.
    if (this.$isServer) {
        this.$bus.on('data', (id, content) => {
            data.push({ id, content: Buffer.from(JSON.stringify(content)).toString('base64')});
            this.refresh();
        });
    }

    for await ({} of this) {
        yield (
            <html>
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    {data.map(({ id, content }) => (
                        <meta name="ssr" data-id={id} data-content={content} />
                    ))}
                    <title>Pedal</title>
                    <link rel="stylesheet" href="/client.css"></link>
                </head>
                <body>
                    <div id="root" data-ssr>
                        {children}
                    </div>
                    <script src="/client.js" type="module"></script>
                </body>
            </html>
        );
    }
}
