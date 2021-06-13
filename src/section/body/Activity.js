export default function Activity({ $app, title, actvities }) {
  const $content = document.createElement("div");
  $content.className = "contentBlock";

  $content.innerHTML = `
    <div class="contentTitle">${title}</div>
  
  `;

  $app.appendChild($content);
}
