# tmp-branch-action
Github Action that creates a branch (remotely, via the GitHub API), then deletes it in a "post" step

## Usage

```yaml
steps:
  - name: Initialize test branch
    uses: runsascoded/tmp-branch-action@v1
    with:
      branch: ${{ env.branch }}
      sha: ${{ env.init }}
```
([from runsascoded/update-submodules](https://github.com/runsascoded/update-submodules/blob/main/.github/workflows/test.yml#L28-L32))
