import {env} from "process"

(async () => {
    const core = require("@actions/core")
    const exec = require("@actions/exec")

    const branch = core.getInput("branch")
    const repository = core.getInput("repository") || env.GITHUB_REPOSITORY
    const sha = core.getInput("sha") || env.GITHUB_SHA

    if (!repository) {
        core.setFailed("`repository` input not specified, $GITHUB_REPOSITORY not set")
    }
    if (!sha) {
        core.setFailed("`sha` input not specified, $GITHUB_SHA not set")
    }

    const [ cmd, ...args ] = [
        `gh`, `api`,
        `-X`, `POST`,
        `/repos/${repository}/git/refs`,
        `-f`, `ref=refs/heads/${branch}`,
        `-f`, `sha=${sha}`,
    ]

    core.info(`Running command: ${cmd} ${args.join(' ')}`)
    await exec.exec(cmd, args)
})();
