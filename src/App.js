import Header from "./section/header/Header.js";

export default function App($app) {
  const $content = document.createElement("div");
  $content.className = "content";
  $app.appendChild($content);

  const header = new Header({
    $app: $content,
  });

  console.log(header);
}
