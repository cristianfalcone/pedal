export default function* () {
    const isActive = (path, exact) => {
        let active = this.$route || '/';
        return exact ? active === path : active.startsWith(path);
    };

    const links = [
        ['/', 'Home', true],
        ['/about', 'About', false],
        ['/blog', 'Blog', false],
    ];

    while (true) {
        yield (
            <nav class="px-2">
                <ul class="flex">
                    {links.map(([path, label, exact]) => (
                        <li>
                            <a class={`block p-2 ${isActive(path, exact) ? 'bg-gray-700 text-white' : ''}`} href={path}>
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}
