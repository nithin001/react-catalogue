# Acme tech shop

This is a running document that captures design decisions, assumptions, limitations of the system. Each git commit will be atomic and looking at the git log should tell the story of this system was developed.

## Create the scaffolding
##### Set up yarn
  * Why Yarn instead of NPM?
    Yarn does a lock on the dependencies which can be achieved using shrinkwrap in NPM. This is there by default in NPM 5 along with other yarn like features.  So this is more of a preference.
##### Add webpack
  * I am going to use webpack for module loader and not going to use any script runner. My opinion here is not to add anything unless it absolutely needed.
##### Add babel
  * Adding babel support for webpack
##### Adding React
  * Ah! The important piece. Turned out to be simple. Separated webpack config into two: dev, prod. Added babel support for react. And we are good to go with React.