const { execFileSync } = require("node:child_process");

const git = (...args) => execFileSync("git", args, { stdio: "inherit" });
const gitOut = (...args) => execFileSync("git", args).toString().trim();

const paths = process.env.STATE_add.split("\n")
    .map(path => path.trim())
    .filter(Boolean);

git("add", "--", ...paths);

if (!gitOut("diff", "--cached", "--name-only")) {
    console.log("No changes to commit");
} else {
    git(
        "-c",
        "user.name=github-actions[bot]",
        "-c",
        "user.email=41898282+github-actions[bot]@users.noreply.github.com",
        "commit",
        "-m",
        process.env.STATE_message,
    );
    git("push");
}
