import {env} from "process";

(async () => {
    const core = require("@actions/core")
    const exec = require("@actions/exec")

    const branch = core.getInput("branch")
    const repository = core.getInput("repository") || env.GITHUB_REPOSITORY
    if (!repository) {
        core.setFailed("`repository` input not specified, $GITHUB_REPOSITORY not set")
    }

    const keep = core.getInput("keep")

    const [ cmd, ...args ] = [
        `gh`, `api`,
        `-X`, `DELETE`,
        `/repos/${repository}/git/refs/heads/${branch}`,
    ]

    if (keep) {
        core.info(`"keep" set, skipping command: ${cmd} ${args.join(' ')}`)
    } else {
        core.info(`Running command: ${cmd} ${args.join(' ')}`)
        await exec.exec(cmd, args)
    }
})();
