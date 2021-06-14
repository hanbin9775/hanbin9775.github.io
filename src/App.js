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
          leftText: "11.13-14",
          rightText: "교내 해커톤(Khuthon) 참여. 대상 수상",
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
        title: "(주)아이젠 웹 개발 인턴",
        duration: "2020.09-2020.12",
        description: `본인의 창고를 임대하거나 등록된 창고를 대여하는 서비스를 제공하는 플랫폼을 개발. 
        웹/모바일을 모두 지원하는 플랫폼이며, 웹/모바일 각각 React/React Native로 개발함. 
        웹 플랫폼의 이용약관, 문의하기, 창고 조회, 예약 정보 조회 페이지를 구현함. 
        모바일 플랫폼의 정산, 창고 내용 상세, 창고 조회 페이지를 구현함.`,
        techStacks: ["React.js", "React Native", "Node.js", "Firebase Functions"],
        accomplishment: `웹 : <a target="blank" href="https://myzzym.com/">https://myzzym.com/ </a>
        앱 : <a target="blank" href="https://play.google.com/store/apps/details?id=com.myzzymcp">https://play.google.com/store/apps/details?id=com.myzzymcp </a>
        `,
      },
      {
        title: "스테이지파이브 웹 개발 인턴",
        duration: "2019.12-2020.02",
        description: `외부인의 기업 안내를 맡는 키오스크 웹 어플리케이션 개발. 
        첫 화면에서 방문 목적을 선택하고, 담당자 혹은 특정 사내 근무자를 호출할 수 있는 기능을 구현. 
        AWS Lambda, API Gateway 를 활용한 서버리스 아키텍쳐에서 사내 근무자 목록을 조회하는 HTTP API 호출하도록 구현.
        근무자 호출 기능은 사내 알림 서비스 API를 연동하여 구현하였음.`,
        techStacks: ["Vue.js", "Node.js", "AWS API Gateway", "AWS Lambda", "JWT"],
      },
    ],
  });

  const project = new Project({
    $app: $content,
    title: "프로젝트",
    projects: [
      {
        title: "Coincidence",
        duration: "2021.03-ing",
        description: `사용자의 나이, 최근 7년 동안 좋고 나쁨을 표현한 그래프를 입력받아 가장 유사한 형태의 그래프의 코인을 찾아주는 웹 서비스 개발 중.
        Lint, Prettier로 코드 컨벤션부터, element 컴포넌트화, typescript로 변수 타입 제어, svg를 코드단에서 제어해 그래프 형태 그리기,
        context api로 전역 상태 제어, firebase deploy로 배포까지 프로젝트를 진행하면서 발생하는 이슈들을 github issue로 기록하며 개발 진행 중.
        개발은 본인 혼자서 담당.
        `,
        techStacks: ["React.js", "Node.js", "SVG", "Cross-Device", "Firebase Deploy"],
        accomplishment: `<a target="blank" href="https://simple-website-9b56c.web.app/">https://simple-website-9b56c.web.app/</a> `,
        githubRepo: `<a target="blank" href="https://github.com/hanbin9775/simple-website">https://github.com/hanbin9775/simple-website</a> `,
      },
      {
        title: "Khust Dance",
        duration: "2020.11.13-2020.11.14",
        description: `‘AI’에 관한 모든 주제라는 해커톤의 주제를 만족하기 위해 Google Teachable Machine 오픈소스를 이용한 리듬 게임 웹 어플리케이션을 개발. 
        음악을 선택하는 화면에서 Styled-components와 keyframe을 이용하여 음악 목록이 자연스럽게 바뀌도록 구현. 
        음악 목록에서 음악을 선택하면 인게임 화면으로 넘어감. 인게임 화면은 ‘Just Dance’ 게임 화면 영상, 포즈 판정 부분, 다음에 취할 포즈를 보여주는 부분으로 이루어져 있음. 
        Google Teachable Machine을 이용해서 포즈들을 학습시킴. 일정한 타이밍마다 학습시킨 포즈를 정확히 취할 경우 점수가 올라갑니다. 게임이 끝나면 배점을 통해 자신의 결과가 결과 페이지에 보임. 
        결과는 닉네임을 입력해 저장하면 Firebase에 저장되며, 이는 실시간으로 랭킹에 업데이트됨.`,
        techStacks: ["React.js", "Node.js", "Teachable Machine", "Firebase Store"],
        accomplishment: `대상 수상 <a href="https://www.youtube.com/watch?v=BXyxNx0uqLU">https://www.youtube.com/watch?v=BXyxNx0uqLU</a>`,
        githubRepo: `<a target="blank" href="https://github.com/1Seok2/khu-thon-2020">https://github.com/1Seok2/khu-thon-2020</a>`,
      },
    ],
  });
}
