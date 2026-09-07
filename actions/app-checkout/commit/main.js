// Stash the inputs for the post step, which is where the work actually happens
const { appendFileSync } = require("node:fs");

const save = (name, value) => appendFileSync(process.env.GITHUB_STATE, `${name}<<__EOF__\n${value}\n__EOF__\n`);

save("add", process.env.INPUT_ADD);
save("message", process.env.INPUT_MESSAGE);
