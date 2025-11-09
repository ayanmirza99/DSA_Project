import { spawn } from "child_process";
import path from "path";

export default function runCpp(programName, students) {
  return new Promise((resolve, reject) => {
    const exePath = path.resolve("compiled", `${programName}.exe`);
    const cpp = spawn(exePath);

    students.forEach((s) => {
      cpp.stdin.write(`${s.name} ${s.grade} ${s.roll}\n`);
    });
    cpp.stdin.end();

    let output = "";
    let error = "";

    cpp.stdout.on("data", (data) => {
      output += data.toString();
    });

    cpp.stderr.on("data", (data) => {
      error += data.toString();
    });

    cpp.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(`C++ exited with code ${code}: ${error}`));
      }

      try {
        const clean = output.trim();
        const json = JSON.parse(clean);
        resolve(json);
      } catch (err) {
        console.error("Raw C++ Output:", output);
        reject(new Error("Invalid JSON from C++ program"));
      }
    });
  });
}
