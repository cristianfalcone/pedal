import { Fragment } from '@bikeshaving/crank';

let width, height;
let size = 42;
let text = 'edit me';

const observeDivSize = (ctx) => {
    let div;
    const ro = new ResizeObserver(() => {
        const { offsetWidth, offsetHeight } = div;
        if (width !== offsetWidth || height !== offsetHeight) {
            width = offsetWidth;
            height = offsetHeight;
            ctx.refresh();
        }
    });
    ctx.schedule((value) => { // better in a "setup" method?
        div = value[4]; // [input, br, input, p, div][4]
        ro.observe(div);
    });
    ctx.cleanup(() => ro.disconnect());
};

export default function* () {
    const onSize = (e) => {
        size = e.target.value;
        this.refresh();
    };

    const onText = (e) => {
        text = e.target.value;
        this.refresh();
    };

    if (this.$isClient) {
        observeDivSize(this);
    }

    while (true) {
        yield (
            <Fragment>
                <input type="range" value={size} oninput={onSize} />
                <br />
                <input value={text} oninput={onText} class="form-input rounded-md shadow-sm mt-4" />

                <p class="text-sm text-gray-500 font-medium mt-4">
                    div size: {width}px x {height}px
                </p>

                <div class="inline-block text-gray-500 font-medium">
                    <span style={{ 'font-size': size + 'px' }}>{text}</span>
                </div>
            </Fragment>
        );
    }
}
