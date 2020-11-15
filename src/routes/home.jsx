import { Fragment } from '@bikeshaving/crank';

let width, height;
let size = 42;
let text = 'edit me';

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
        const ro = new ResizeObserver(([entry]) => {
            const { offsetWidth, offsetHeight } = entry.target;
            if (width !== offsetWidth || height !== offsetHeight) {
                width = offsetWidth;
                height = offsetHeight;
                this.refresh();
            }
        });
        this.schedule((el) => ro.observe(el[4]));
        this.cleanup(() => ro.disconnect());
    }

    while (true) {
        yield (
            <Fragment>
                <input type="range" value={size} oninput={onSize} />
                <br />
                <input value={text} oninput={onText} class="form-input rounded-md shadow-sm" />

                <p class="text-sm text-gray-500 font-medium">
                    size: {width}px x {height}px
                </p>

                <div class="inline-block text-gray-500 font-medium">
                    <span style={{ 'font-size': size + 'px' }}>{text}</span>
                </div>
            </Fragment>
        );
    }
}
