import fs from "fs";
import path from "path";
import Game from "./components/Game";

export default function Home() {
  const imagesDirectory = path.join(process.cwd(), "public/images");
  const allFiles = fs.readdirSync(imagesDirectory);
  const gameIcons = allFiles.filter((file) => file.endsWith(".svg"));

  return <Game gameIcons={gameIcons}/>;
}
