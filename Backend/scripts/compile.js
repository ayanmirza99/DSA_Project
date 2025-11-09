import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cppDir = path.join(__dirname, "..", "cpp");
const outDir = path.join(__dirname, "..", "compiled");

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

fs.readdir(cppDir, (err, files) => {
  if (err) throw err;

  const cppFiles = files.filter((f) => f.endsWith(".cpp") && f !== "storage.cpp");

  cppFiles.forEach((file) => {
    const fileName = path.parse(file).name;
    const outputPath = path.join(outDir, `${fileName}.exe`);

    const cmd = `g++ ./cpp/${file} ./cpp/storage.cpp -o "${outputPath}" -static -static-libgcc -static-libstdc++`;

    console.log(chalk.magenta(`Compiling: ${chalk.cyan(file)} → ${chalk.yellow(fileName + ".exe")}`));

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Failed to compile: ${file}`));
        console.error(chalk.gray(stderr));
      } else {
        console.log(chalk.green(`Successfully Compiled: ${chalk.yellow(fileName + ".exe")}`));
      }
    });
  });
});
