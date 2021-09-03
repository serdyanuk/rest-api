const allowedHttpMethods = {
  GET: 'GET',
  POST: 'POST',
};

class Router {
  constructor() {
    this.routes = new Map();
  }

  handler(req, res) {
    let listener = null;
    const route = this.routes.get(req.url);
    if (route) {
      if (!allowedHttpMethods[req.method]) {
        this.#sendError(res, 405, 'method not allowed');
        return;
      }
      listener = route[req.method];
    }
    if (listener) {
      listener(req, res);
    } else {
      this.#send404(res);
    }
  }

  get(path, listener) {
    this.#setRoute(path, listener, allowedHttpMethods.GET);
  }

  post(path, listener) {
    this.#setRoute(path, listener, allowedHttpMethods.POST);
  }

  #send404(res) {
    this.#sendError(res, 404, 'page not found');
  }

  #sendError(res, code, message) {
    res.writeHead(code, { 'Content-type': 'plain/text' });
    res.end(message);
  }

  #setRoute(path, listener, method) {
    this.routes.set(path, {
      [method]: listener,
    });
  }
}

module.exports = Router;
