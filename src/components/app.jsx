export default function ({ isServer, isClient, children }) {
    // TODO setup state manegement here. Maybe: https://github.com/mostjs/core
    console.log('Context: ', 'isServer ', isServer, ' - isCLient ', isClient);
    return children;
}
