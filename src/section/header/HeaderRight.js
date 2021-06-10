export default function HeaderRight({ $app, birthDay, phoneNumber, email, githubUrl }) {
  const $headerRight = document.createElement("div");
  $headerRight.className = "headerRight";

  $headerRight.innerHTML = `
      <div>
        <div class="cake_icon"></div>
        <div>${birthDay}</div>
      </div>
      <div>
        <div class="phone_icon"></div>
        <div>${phoneNumber}</div>
      </div>
      <div>
        <div class="email_icon"></div>
        <div>${email}</div>
      </div>
      <div>
        <div class="github_icon"></div>
        <a href="${githubUrl}">${githubUrl}</a>
      </div>
    `;

  $app.appendChild($headerRight);
}
