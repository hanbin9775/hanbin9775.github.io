import Header from "./section/header/Header.js";
import TwoInRow from "./section/body/TwoInRow.js";

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

  //Body
  //Intro and Activity Section in a Row
  const introAndActivity = new TwoInRow({
    $app: $content,
    leftContent: {
      title: "소개",
      education: "경희대학교 컴퓨터공학과 (2015.03 - 2022.02)",
      strengths: [
        "HTML",
        "CSS",
        "JS(ES5+)",
        "Typescript",
        "Vue.js",
        "React.js",
        "SVG",
        "OAuth2.0",
        "C++(PS)",
      ],
      knowleadgables: ["Node.js", "React Native", "AWS Lambda", "AWS ApiGateway", "Java", "Spring"],
    },
    rightContent: {
      title: "활동",
      activities: [
        {
          type: "big",
          leftText: "2015",
          rightText: "",
        },
        {
          type: "small",
          leftText: "3-12",
          rightText: "교내 개발동아리 T.G Wing 활동",
        },
        {
          type: "big",
          leftText: "2016",
          rightText: "",
        },
        {
          type: "small",
          leftText: "16.01-18.01",
          rightText: "공군 760기 복무",
        },
        {
          type: "big",
          leftText: "2017",
          rightText: "",
        },
      ],
    },
  });
}
