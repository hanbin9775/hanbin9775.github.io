export default function Header({ $app }) {
  const $header = document.createElement("header");
  $header.className = "header";

  $header.innerHTML = "hi";

  $app.appendChild($header);
}
