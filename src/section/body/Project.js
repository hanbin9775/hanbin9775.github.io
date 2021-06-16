export default function Project({ $app, title, projects }) {
  const $content = document.createElement("div");
  $content.className = "project";
  $app.appendChild($content);

  $content.innerHTML = `
    <div class="contentTitle">${title}</div>

    ${projects
      .map((project) => {
        return `
        <div class="projectTitle">
					${project.title}
					<span class="projectDuration">${" | " + project.duration}</span>
				</div>
				<div class="projectDescription">${project.description}</div>
				<div class="projectIndent">기술 스택 <span class="projectStacks">${
          " | " + project.techStacks.join(" / ")
        }</span></div>
				${
          project.accomplishment
            ? `
            <div class="projectIndent">
              성과 <span class="projectStacks">${" | " + project.accomplishment}</span>
            </div>
          `
            : ""
        }
				${
          project.githubRepo
            ? ` 
				<div class="projectIndent">
					Github Repo 
					<span class="projectStacks">${" | " + project.githubRepo}</span>
				</div>`
            : ""
        } 
        `;
      })
      .join("")}
  `;

  $app.appendChild($content);
}
