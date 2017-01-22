const socket = typeof io === "undefined" ? null : io.connect(window.location.origin);

export default socket;
