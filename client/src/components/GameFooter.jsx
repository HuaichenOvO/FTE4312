import React from "react";

export function Link({ uri, text }) {
  return <a href={uri} >{text}</a>;
}

export function Footer() {
  return (
    <footer>
      <h2>Other pages</h2>
      {/* <Link uri={"../index.html"} text={"Index"} /> */}
      {/* <Link uri={"../demo.html"} text={"Demo"} /> */}
      <Link uri={"../profile.html"} text={"Profile"} />
      <Link uri={"../garden.html"} text={"Farm"} />
    </footer >
  );
}

export default Footer;
