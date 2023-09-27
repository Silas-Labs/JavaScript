function Message() {
  const name = null;
  if (name) {
    return <h1>Hello {name}</h1>;
  } else {
    return <h1>Hello name</h1>;
  }
}

export default Message;
