function Footer() {
  const today = new Date();
  return <p className="footer">&copy;{today.getFullYear()}</p>;
}

export default Footer;
