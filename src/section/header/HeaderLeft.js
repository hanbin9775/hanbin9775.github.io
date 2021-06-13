export default function HeaderLeft({ $app, koreanName, englishName, job }) {
  const $headerLeft = document.createElement("div");
  $headerLeft.className = "headerLeft";

  $headerLeft.innerHTML = `
    <div>
      <span class="krName">${koreanName}</span> 
      <span class="enName">(${englishName})</span>
    </div>
    <div>
      <span class="jobName">${job}</span>
    </div>
  `;

  $app.appendChild($headerLeft);
}
