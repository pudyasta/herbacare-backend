class ResponseError extends Error {
  constructor(status, msg) {
    super(msg);
    this.status = status;
    this.message = msg;
  }
}

export { ResponseError };
