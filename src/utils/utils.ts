function randID() {
  return crypto.randomUUID().slice(0, 5);
}

export { randID };
