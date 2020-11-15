function Link({ to, isActive, children }) {
    return (
        <a class={`block p-2 ${isActive ? 'bg-gray-700 text-white' : ''}`} href={to}>
            {children}
        </a>
    );
}

export default function* () {
    let active;
    const isActive = (str, exact) => (exact ? active === str : active.startsWith(str));
    const links = [
        ['/', 'Home', true],
        ['/about', 'About', false],
        ['/blog', 'Blog', false],
    ];

    for (const _ of this) {
        active = this.$route || '/';
        yield (
            <nav class="px-2">
                <ul class="flex">
                    {links.map(([to, label, exact]) => (
                        <li>
                            <Link to={to} isActive={isActive(to, exact)}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}
