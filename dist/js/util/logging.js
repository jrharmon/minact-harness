//track errors and logs, injecting them into a div, so they are visible per-iframe

//track errors
window.onerror = function(message, source, lineno, colno, error) {
    appendToConsole('error: ' + message, "error");
}

//track console logs
var log = console.log;
var logOutputNode = document.getElementById('consolelog');
console.log = function () {
    log.apply(this, Array.prototype.slice.call(arguments));
    appendToConsole(arguments[0]);
};

function appendToConsole(text, className) {
    let logText = document.createElement('div');
    logText.innerText = text;
    if (className) {
        logText.className = className;
    }
    logOutputNode.appendChild(logText);
}