#!/bin/bash

TAG_VERSION=`git describe --abbrev=0 $BUILD_VCS_NUMBER --tags`
GIT_HASH_SHORT=${BUILD_VCS_NUMBER:0:7}

echo "##teamcity[buildNumber '$GIT_HASH_SHORT.$BUILD_NUMBER ($TAG_VERSION)']"

exit 0