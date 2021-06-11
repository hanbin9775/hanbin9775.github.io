import Header from "./section/header/Header.js";
// import EducationAndCarrer from "./section/body/EducationAndCarrer.js";

export default function App($app) {
  const $content = document.createElement("div");
  $content.className = "content";
  $app.appendChild($content);

  //Header Section
  const header = new Header({
    $app: $content,
    koreanName: "김한빈",
    englishName: "Hanbin Kim",
    job: "Frontend Developer",
    birthDay: "1995.09.15",
    phoneNumber: "010-XXXX-XXXX",
    email: "dnffkrktyd@gmail.com",
    githubUrl: "https://github.com/hanbin9775",
  });

  //Education and Carrer Section
  // const educationAndCarrer = new EducationAndCarrer({ $app: $content });
}
