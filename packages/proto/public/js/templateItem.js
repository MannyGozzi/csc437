import { prepareTemplate } from "./template";
const templateContent = prepareTemplate(
  "<template><p>Example template item!</p></template>",
);
const templateContainer = document.getElementById("template-container");
templateContainer.appendChild(templateContent.cloneNode(true));
