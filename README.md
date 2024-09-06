Simple checklist to solve the initial problem:
(for TypeScript and Jest)

Make sure you have @types/jest and @types/node installed.
Make sure you have linked these types in tsconfig.json so that: "types": ["jest", "node"]
Make sure you don't have your tests or the tests directory excluded from tsconfig.json configuration in excluded property.
Side effect on transpilation
If you transpile from TypeScript to JavaScript using tsc or any custom module that relies on tsconfig.json then you may notice that your tests will be transpiled too in such case (you'll see their .js correspondence in your build directory).

However, in most cases you will have either:

separate tsconfig.prod.json with a configuration that overwrites the default one. There are many settings like inlineSource, sourceMaps, inlineSourceMaps which you'd probably want to disable too and then use tsc --project tsconfig.prod.json to build
terminal (npm/yarn script) command that overwrites the default configuration with the specific flags. Example: npx tsc --inlineSourceMap false --declarationMap false --inlineSources false --sourceMap false. At that point you can use --excludeFiles or --excludeDirectories flag to exclude your tests from the build as per documentation.
The alternative is to use package like rimraf and delete unnecessary files as a part of the build process. It might be less complex than overwriting the configuration and easier to maintain as a build step. In such a case, you may use the command: yarn rimraf build/**/*.test.js.

IDE or TypeScript service restart
Note that sometimes it may take a moment for your IDE (or exactly TypeScript service) to pick up the changes. Give it a few seconds to sink in. At the right bottom frame of your IDE (VSCode or WebStorm) you can find an annotation e.g. "TypeScript 4.2.1". Click on this and select: "Restart service" to be sure that the solution is working on not before you move on.

Share
Improve this answer
Follow
edited Mar 16, 2023 at 9:37
answered Apr 8, 202