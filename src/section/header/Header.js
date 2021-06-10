import HeaderLeft from "./HeaderLeft.js";
import HeaderRight from "./HeaderRight.js";

export default function Header({ $app }) {
  const $header = document.createElement("header");
  $header.className = "header";
  $app.appendChild($header);

  const headerLeft = new HeaderLeft({
    $app: $header,
    koreanName: "김한빈",
    englishName: "Hanbin Kim",
    job: "Frontend Developer",
  });
  const headerRight = new HeaderRight({
    $app: $header,
    birthDay: "1995.09.15",
    phoneNumber: "010-XXXX-XXXX",
    email: "dnffkrktyd@gmail.com",
    githubUrl: "https://github.com/hanbin9775",
  });
}
