const path = require("path");
const fs = require("fs");

const generatePage = async () => {
  const args = process.argv.slice(2);
  const dataFile = args[0];
  const pageName = args[1];
  const title = args[2];
  const pagesDir = "../../app/src/pages/";
  const resourcesDir = "../../app/src/resources/";

  const items = require(`${resourcesDir}${dataFile}`);

  let code = "";

  code += `import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import useThemeState from "../contexts/ThemeContext";
import Logo from "./../components/Logo";
import { getFillColor } from "../library/theme";
`;

  items.map((item) => {
    let audioFile = item.key.replace(/\s/g, "") + "Audio";
    audioFile =
      audioFile.substring(0, 1).toLowerCase() + audioFile.substring(1);

    code += `import ${audioFile} from "../resources/audio/${item.audio}";\n`;
  });

  code += `
  
const ${pageName} = () => {
  const [preloading, setPreloading] = useState(true);
  const { theme, setTheme } = useThemeState();

  useEffect(() => {
    setTimeout(() => {
      setPreloading(false);
    }, Number(process.env.REACT_APP_PRELOADING_DELAY));
  }, []);
  
    return (
    <>
      <Header />
      <Sidebar />
      {preloading && (
        <div className={\`\${theme} container preloading\`}>
          <Logo fillColor={getFillColor(theme)} />
        </div>
      )}
      {!preloading && (
        <div className={\`\${theme} container main\`}>
          <h1>${title}</h1>
          <div className="resources">
`;

  items.map((item) => {
    // Generate the audio filename consistently

    let audioFile = item.key.replace(/\s/g, "") + "Audio";
    audioFile =
      audioFile.substring(0, 1).toLowerCase() + audioFile.substring(1);

    // import armAudio from "../resources/audio/Arm-Cánh-tay.mp3";

    code += `
            <div className="row">
                <div className="column key">
                <h2>${item.key}</h2>
                </div>
                <div className="column value">
                <h2>${item.value}</h2>
                </div>
                <audio controls>
                    <source src={${audioFile}} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>`;
  });

  code += `
            </div>
        </div>
      )}
    </>
  );
};

export default ${pageName};`;

  const outputFile = pageName + ".js";
  const filePath = path.join(pagesDir, outputFile);
  fs.writeFileSync(filePath, code);

  const route = title.toLowerCase().replace(/\s/g, "-");

  return `Okay, done! ${outputFile} has been created and moved to the Pages folder. 
  
Don't forget to update App\.ts.

Towards the top of the page:

import ${pageName} from "./pages/${pageName}";

Further down the page:

<Route path="/${route}" element={<${pageName} />}></Route>


Don't forget to update Sidebar.js too.

<button 
    className={location.pathname === "/${route}" ? "link-selected" : ""}
    onClick={() => {
      navigate("/${route}");
    }}>
    ${title}
</button>

  `;
};

generatePage().then((result) => {
  console.log(result);
});
