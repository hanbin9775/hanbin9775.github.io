import Header from "./section/header/Header.js";
import TwoInRow from "./section/body/TwoInRow.js";
import Project from "./section/body/Project.js";

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
        "Styled Component",
        "SVG",
        "OAuth2.0",
        "C++(PS)",
      ],
      knowleadgables: [
        "Node.js",
        "React Native",
        "AWS Lambda",
        "AWS ApiGateway",
        "Firebase",
        "Java",
        "Spring",
      ],
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
          leftText: "2016-18",
          rightText: "공군 760기 복무",
        },
        {
          type: "big",
          leftText: "2018",
          rightText: "",
        },
        {
          type: "small",
          leftText: "6-12",
          rightText: "대학생 연합 게임 개발 동아리 Bridge 활동",
        },
        {
          type: "big",
          leftText: "2019",
          rightText: "",
        },
        {
          type: "small",
          leftText: "1-6",
          rightText: "알코홀릭-술게임 App 개발 참여.",
        },
        {
          type: "small",
          leftText: "6-7",
          rightText: "트라이캐치미디어 웹개발 인턴",
        },
        {
          type: "small",
          leftText: "12-2",
          rightText: "스테이지파이브 웹개발 인턴",
        },
        {
          type: "big",
          leftText: "2020",
          rightText: "",
        },
        {
          type: "small",
          leftText: "9-12",
          rightText: "(주)아이젠 웹개발 인턴",
        },
        {
          type: "small",
          leftText: "12-4",
          rightText: "Naver Corp 인턴쉽",
        },
        {
          type: "big",
          leftText: "2021",
          rightText: "",
        },
        {
          type: "small",
          leftText: "3-ing",
          rightText: "Toy Project, Coincidence 개발 중",
        },
      ],
    },
  });

  const carrer = new Project({
    $app: $content,
    title: "경력",
    projects: [
      {
        title: "Naver Corp 인턴쉽",
        duration: "2020.12-2021.04",
        description: `검색 데이터 품질 분석 및 모니터링 툴 프론트엔드 개발. 
        분석 결과를 모니터링한다는 목적에 맞게 dashboard 형태로 구현하였음. 분석 결과를 컴포넌트화한 위젯 형태의 컨테이너에 담아 표현함. 
        효과적인 정보 전달을 위해 chart.js 라이브러리를 사용해 데이터를 시각화. 
        또한, 분석이 이루어진 페이지 결과를 남들과 공유할 수 있게끔 url을 설계하였음. 
        페이지 접근 시 외부인원 접근 제한 및 사용자 신원 확인을 목적으로 사내에서 제공하는 OAuth2.0 프로토콜을 사용해 로그인 기능을 구현하였음.`,
        techStacks: ["Vue.js", "Node.js", "Vuex", "Chart.js", "OAuth2.0"],
        accomplishment: "인턴 근무 연장 및 정직원 전환 제안",
      },
      {
        title: "(주) 아이젠 웹 개발 인턴근무",
        duration: "2020.09-2020.12",
        description: `본인의 창고를 임대하거나 등록된 창고를 대여하는 서비스를 제공하는 플랫폼을 개발. 
        웹/모바일을 모두 지원하는 플랫폼이며, 웹/모바일 각각 React/React Native로 개발함. 
        웹 플 랫폼의 이용약관, 문의하기, 창고 조회, 예약 정보 조회 페이지를 구현함. 
        모바일 플랫폼의 정산, 창고 내용 상세, 창고 조회 페이지를 구현함.`,
        techStacks: ["React.js", "React Native", "Node.js", "Firebase Functions"],
        accomplishment: "인턴 근무 연장 및 정직원 전환 제안",
      },
    ],
  });
}
