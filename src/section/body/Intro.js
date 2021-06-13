export default function Intro({ $app, title, education, strengths, knowleadgables }) {
  const $content = document.createElement("div");
  $content.className = "contentBlock";

  $content.innerHTML = `
    <div class="contentTitle">${title}</div>
    <div>${education}</div>
    <div>Technical Skills</div>
    <div class="techSkillBlock">
        <div class="techSubtitle">Strong </div>
        <div class="skills"> ${strengths.join(" / ")}</div>
    </div>
    <div class="techSkillBlock">
        <div class="techSubtitle">Knowleadgable</div>
        <div class="skills"> ${knowleadgables.join(" / ")}</div>
    </div>

  `;

  $app.appendChild($content);
}
