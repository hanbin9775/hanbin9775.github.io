import HeaderLeft from "./HeaderLeft.js";
import HeaderRight from "./HeaderRight.js";

export default function Header({
  $app,
  koreanName,
  englishName,
  job,
  birthDay,
  phoneNumber,
  email,
  githubUrl,
}) {
  const $header = document.createElement("header");
  $header.className = "header";
  $app.appendChild($header);

  const headerLeft = new HeaderLeft({
    $app: $header,
    koreanName: koreanName,
    englishName: englishName,
    job: job,
  });
  const headerRight = new HeaderRight({
    $app: $header,
    birthDay: birthDay,
    phoneNumber: phoneNumber,
    email: email,
    githubUrl: githubUrl,
  });
}
