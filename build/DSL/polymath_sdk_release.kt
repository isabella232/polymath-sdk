package polymath_studios_polymath_sdk.buildTypes

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.buildFeatures.swabra
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.exec
import jetbrains.buildServer.configs.kotlin.v2018_2.buildSteps.script
import jetbrains.buildServer.configs.kotlin.v2018_2.triggers.vcs

object polymath_sdk_release : BuildType({
    id = AbsoluteId("polymath_sdk_release")
    name = "Release"

    vcs {
        root(polymathnetwork_polymath_sdk_https)
    }

    steps {
        exec {
            name = "compute-version.sh"
            path = ".teamcity/compute-version.sh"
        }
        script {
            name = "yarn install"
            scriptContent = "yarn install"
        }
        script {
            name = "yarn build:prod"
            scriptContent = "yarn build:prod"
        }
        script {
            name = "yarn semantic-release"
            scriptContent = """
                VCSROOT_URL=%vcsroot.url%
                VCSROOT_BRANCH=%vcsroot.branch%
                
                echo "vcsroot.url: ${'$'}VCSROOT_URL"
                echo "vcsroot.branch: ${'$'}VCSROOT_BRANCH"
                
                yarn semantic-release --debug
            """.trimIndent()
        }
        script {
            name = "teamcity[buildNumber '${'$'}TAG_VERSION']"
            scriptContent = """
                #!/bin/bash
                
                TAG_VERSION=`git describe --abbrev=0 %build.vcs.number% --tags`
                
                echo "TAG_VERSION: ${'$'}TAG_VERSION"
                echo "##teamcity[buildNumber '${'$'}TAG_VERSION']"
                
                exit 0
            """.trimIndent()
        }
    }

    triggers {
        vcs {
            branchFilter = ""
        }
    }

    features {
        swabra {
            verbose = true
        }
    }

    requirements {
        equals("system.agent.name", "22c909467fe8")
    }
})
