#!/bin/bash

TAG_VERSION=`git describe --abbrev=0 --tags`

echo "TAG_VERSION: $TAG_VERSION"
echo "##teamcity[buildNumber '$TAG_VERSION']"

exit 0