class ResponseError extends Error {
  constructor(status, msg) {
    super(msg);
    this.status = status;
  }
}

export { ResponseError };
