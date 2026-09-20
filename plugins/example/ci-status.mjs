// ci-status — the last build of a branch, from the CI server this workspace uses.
//
// The file is the tool: plugins/ci-status.mjs is called ci-status. It is read when the server
// starts, so `ovai restart` after changing it. The address and the JSON shape below are stand-ins
// for whatever your CI answers.

const CI = "https://ci.example.com";

export const description =
  "The last build of a branch on CI: its state and where its log is. Read-only: it starts " +
  "nothing and cancels nothing. Refuses a branch name that is not a plain ref.";

export const inputSchema = {
  type: "object",
  properties: {
    branch: { type: "string", description: "The branch, as git names it: main, feature/login." },
  },
  required: ["branch"],
  additionalProperties: false,
};

export async function run({ branch }, { seat }) {
  if (!/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(branch)) {
    return { refused: `${branch} is not a branch name this tool asks CI about` };
  }
  const response = await fetch(`${CI}/api/builds?branch=${encodeURIComponent(branch)}&limit=1`);
  if (!response.ok) {
    return { refused: `CI answered ${response.status} for ${branch}` };
  }
  const [build] = await response.json();
  if (build === undefined) {
    return { text: `no build of ${branch} on CI yet` };
  }
  return { text: `${branch}: ${build.state}, build #${build.number}, log at ${build.url} (asked by ${seat})` };
}
