/**
 * This handler function is a simple function that handles basic routing for my website's amazon cloudfront distribution.
 * @param {Object} event The message to fetch a file for the user.
 */
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    if (uri === '/200' || uri === '/200/' || uri === '/200.html') {
        request.uri = '/200.html';
    } else if (uri === '/404' || uri === '/404/' || uri === '/404.html') {
        request.uri = '/404.html';
    } else if (uri.endsWith('/')) {
        request.uri += 'index.html';
    } else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    return request;
}