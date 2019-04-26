#!/bin/bash

TAG_VERSION=`git describe --abbrev=0 $BUILD_VCS_NUMBER --tags`
GIT_HASH_SHORT=${BUILD_VCS_NUMBER:0:7}

echo "##teamcity[buildNumber '$TAG_VERSION ($GIT_HASH_SHORT.$BUILD_NUMBER)']"

exit 0