export default function Activity({ $app, title, activities }) {
  const $content = document.createElement("div");
  $content.className = "contentBlock";

  $content.innerHTML = `
    <div class="contentTitle">${title}</div>
    <div class="activityGraph">
    <div class="verticalLine"></div>
    ${activities
      .map((activity) => {
        return `
          <div class="activityRow">
            <div class="activityDuration ${activity.type === "big" ? "big" : "small"}">${
          activity.leftText
        }</div>
            <div class="activityCircleBlock">
                <div class="activityCircle ${
                  activity.type === "big" ? "outlineCircle" : "dot"
                }"></div>
            </div>
            <div class="activityContent">${activity.rightText}</div>
          </div>
        `;
      })
      .join("")}   
    </div>
  `;

  $app.appendChild($content);
}
