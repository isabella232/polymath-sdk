package polymath_studios_polymath_sdk.buildTypes

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.PullRequests
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.commitStatusPublisher
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.pullRequests
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.exec
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.vcs
import polymathnetwork_polymath_sdk_git

object polymath_sdk_pull_request : BuildType({
    id = AbsoluteId("polymath_sdk_pull_request")
    name = "Pull Request"

    vcs {
        root(polymathnetwork_polymath_sdk_git)

        buildDefaultBranch = false
    }

    steps {
        exec {
            path = ".teamcity/compute-version.sh"
        }
    }

    triggers {
        vcs {
            branchFilter = ""
        }
    }

    features {
        commitStatusPublisher {
            vcsRootExtId = "${polymathnetwork_polymath_sdk_git.id}"
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "zxx64490436b9ed1d68622bd4fb64cb1b952eaed55086223af317afa2ba0540fc129b87c496ff297e0d775d03cbe80d301b"
                }
            }
        }
        pullRequests {
            vcsRootExtId = "${polymathnetwork_polymath_sdk_git.id}"
            provider = github {
                authType = token {
                    token = "zxx64490436b9ed1d68622bd4fb64cb1b952eaed55086223af317afa2ba0540fc129b87c496ff297e0d775d03cbe80d301b"
                }
                filterAuthorRole = PullRequests.GitHubRoleFilter.EVERYBODY
            }
        }
    }
})
