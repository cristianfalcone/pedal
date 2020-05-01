function Link({ to, isActive, children }) {
    return (
        <a class={`block p-2 ${isActive ? 'bg-gray-700 text-white' : ''}`} href={to}>
            {children}
        </a>
    );
}

export default function* () {
    let active;
    const isActive = (str) => active === str;

    for (const _ of this) {
        active = this.$route.split('/')[1] || 'home';
        yield (
            <nav class="px-2">
                <ul class="flex">
                    <li>
                        <Link to="/" isActive={isActive('home')}>
                            home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" isActive={isActive('about')}>
                            about
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" isActive={isActive('blog')}>
                            blog
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
