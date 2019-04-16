# TeamCity

## Pull Request

- Build Steps: Command Line

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
