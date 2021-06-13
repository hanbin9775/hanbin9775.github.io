import Intro from "./Intro.js";
import Activity from "./Activity.js";

export default function TwoInRow({ $app, leftContent, rightContent }) {
  const $content = document.createElement("div");
  $content.className = "twoInRow";
  $app.appendChild($content);

  const intro = new Intro({
    $app: $content,
    title: leftContent.title,
    education: leftContent.education,
    strengths: leftContent.strengths,
    knowleadgables: leftContent.knowleadgables,
  });

  //   const intro2 = new Intro({
  //     $app: $content,
  //     title: leftContent.title,
  //     education: leftContent.education,
  //     strengths: leftContent.strengths,
  //     knowleadgables: leftContent.knowleadgables,
  //   });

  const activity = new Activity({
    $app: $content,
    title: rightContent.title,
    actvities: rightContent.actvities,
  });
}
