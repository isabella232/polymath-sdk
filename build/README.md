# TeamCity Build Configurations

## Pull Request

- VCS Root: `git@github.com:PolymathNetwork/polymath-sdk.git`
  - Branch specification: `EMPTY`
- VCS:
  - Allow builds in the default branch: `FALSE`
- Build Steps:
  - Command Line: Version script (see below)
- Triggers:
  - VCS Trigger:
    - BranchFilter: `EMPTY`
- Features:
  - Commit Status Publisher
  - Pull Requests:
    - Filter Author Role: `EVERYBODY`

## Release

- VCS Root: `https://github.com/PolymathNetwork/polymath-sdk.git`
  - Branch specification:
    ```
    +:refs/heads/(master)
    +:refs/heads/(beta)
    +:refs/heads/(next)
    ```
- VCS:
  - Allow builds in the default branch: `TRUE`
- Build Steps:
  - Command Line:
    - Version scripts (see below)
    - Build scripts
- Triggers:
  - VCS Trigger
    - BranchFilter: `EMPTY`
- Features:
  - Swabra

# Versioning Scripts

## `$TAG_VERSION-$GIT_HASH_SHORT.$BUILD_NUMBER`

- Custom script:

  ```
  #!/bin/bash

  TAG_VERSION=`git describe --abbrev=0 %build.vcs.number% --tags`
  GIT_HASH=%build.vcs.number%
  GIT_HASH_SHORT=${GIT_HASH:0:7}
  BUILD_COUNTER=%build.counter%

  echo "##teamcity[buildNumber '$TAG_VERSION-$GIT_HASH_SHORT.$BUILD_COUNTER']"

  exit 0
  ```

- Command executable: _.teamcity/compute-version.sh_

  There is no environment variable equivalent to `%build.counter%` (no `BUILD_COUNTER`).
  Here we have to satisfy ourselved with `BUILD_VCS_NUMBER` and ensure that the build definition assigns `%build.counter%` to the **Build number format** in **General Settings**.

  ```
  #!/bin/bash

  TAG_VERSION=`git describe --abbrev=0 $BUILD_VCS_NUMBER --tags`
  GIT_HASH_SHORT=${BUILD_VCS_NUMBER:0:7}

  echo "##teamcity[buildNumber '$TAG_VERSION-$GIT_HASH_SHORT.$BUILD_NUMBER']"

  exit 0
  ```

## `$TAG_VERSION` only

```
#!/bin/bash

TAG_VERSION=`git describe --abbrev=0 %build.vcs.number% --tags`

echo "TAG_VERSION: $TAG_VERSION"
echo "##teamcity[buildNumber '$TAG_VERSION']"

exit 0
```

## semantic-release

- Custom script:

  ```
  VCSROOT_URL=%vcsroot.url%
  VCSROOT_BRANCH=%vcsroot.branch%

  echo "vcsroot.url: $VCSROOT_URL"
  echo "vcsroot.branch: $VCSROOT_BRANCH"

  yarn semantic-release --debug
  ```
