import Nav from '../components/nav';

export default function ({ children }) {
    return (
        <div class="h-screen flex flex-col">
            <Nav />
            <div class="flex-grow p-4">{children}</div>
        </div>
    );
}
