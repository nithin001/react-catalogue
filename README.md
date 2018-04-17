# Acme tech shop

This is a running document that captures design decisions, assumptions, limitations of the system. Each git commit will be atomic and looking at the git log should tell the story of this system was developed.

# Features and Functions
  * The app has all the features and functions asked.
  * There are about 120 tests. I followed TDD for the most part. Last few commits won't have tests.
  * The live blogging section below will detail almost every commit. Please read through.
  * I am archiving the .git folder along with the solution so that you will be able to look through the commit. 

# Local Setup
  * You need to have yarn installed to use the app. More details on Yarn here: https://yarnpkg.com/
  * Simply run 'yarn' in the project directory. This should install all the dependencies.
  * You should be able to start the local server by running the following command: yarn start
  * You should be able to run tests by running the following command: yarn test
  * You should be able to build (output should be in dist/index.html) the app by running the following command: yarn build
  * The app already has a build in **dist/index.html** which you can open in a browser (chrome/firefox) to view the solution.
  * There is a build without using materialize in without_framework/index.html which also can be opened in a browser.
    
 
# Live blogging begins here!
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
##### Adding CSS Preproccessor
  * I want to keep this simple here too. I didn't add any autoprefixer. Only a simple sass loader.
##### Adding test harness
  * I added enzyme because of the snapshot testing feature which I like. I also added jest which is required by enzyme.
##### Adding Lint Support 
  * As a final piece to the scaffolding, I've added eslint support for the app. I've also extended AirBnB's js style guide for the rules. I think we are all set to go. I will add redux, router when the need arises.

## Day 2: API communication
   * I have started with the API communication part for the catalog endpoint. I have used axios for communication. Other option is fetch. I used TDD for the entire piece. Always coded only on a red bar and refactored on green bar.
   * I have used JSON schema validator to handle the contract between the front end and back end. Any missing fields in the contract will be treated as a backend failure.
   * I used https://jsonschema.net/ to generate the JSON schema
   * I will handle the slow network issue at redux level
   * Completed communication part for article endoint. I was able to reuse some of the code from the catalog endpoint.
   
## Day 3: API communication (continued)
   * The get part of cart is completed. No surprises yet.
   * The put part of cart is also added. The test scenarios cover almost all the bad data part.
   * Why tests?
     I believe bad tests are worse than no tests. Tests are supposed to provide the safety net while refactoring or developing new features. If there are holes in this, it might lead to more disastrous state.
     
## Enter redux!     
   * I just love writing reducers. The most predictable part of the code. It's very simple to write tests for reducers as a reducer function should be a pure function with no side effects. Completed cart reducer. It supports three actions currently.
   * I am using Immutable JS for the data elements. It just makes everything simple and reduces the need of React's life cycle methods.
   * All the reducers are complete. I think they should be enough for all the business cases stated. If needed, we can more later.
   
## World of actions
   * Just wrote the first action file. Some considerations:
     * I am using separate dispatch for ui actions. Seems redundant but looks specific.
     * Started using sinon for stubing and spying. We need not worry about the api layer anymore.
   * Completed all the actions. Next stop: Start creating the React Components
   * BTW, I am done for the day.
   
## Components, Components, Components
   * Below is the structure of components I've decided to go with:
   ~~~~
    App
     Header
       Title
       CartTeaser
     Body
       QuoteView
         Cart
           CartItem
             QuantityBar
         Quote
           QouteItem
           Total
       CatalogView
         Catalog
           CatalogItem
       ArticleView
         Article
   ~~~~
   * I took a shot at building the Header Component. Used a mix of shallow testing and react-test-renderer.
   * The skeleton of all the components are completed. Parts that are missing:
     * Calling the APIs
     * Tie all the pieces together
     
## Tying everything together
   * This is a part of commit "tying everything together" and I didn't write tests for this part.
   * It got really messing in between. The untested parts of connected components were not glued together correctly in many places
   * Overall there are a lot of pieces in this commit that should be added to tech debt.
   * And if you rebase to this version, you should see a text based version of the app.
   
## Screw up (A little bit!)
   * I've completed styling the pages but I think I've screwed up a little bit. I could have spent more time in user interactions rather than tests.
   * The pages look simple and neat. I've added a little bit of responsiveness (The checkout part in header, the quotation section in the cart view and the description in the article view will stack one below the other in a smaller view)
   * I've decided to add a ui framework to the app. Please rebase to commit "adding styles to article page" if you want to see how the code looked before adding material ui.
   * You can also open "without_framework/index.html" to see the output.
   
## Complete!
   * If you are reading this, Thank you! This is the last commit for the coding challenge.
   * I've realised that I have to pick up on UX. Given a wireframe/design I can convert it to a webpage. But coming up with the UX design is something I've always struggled with. 
   * I threw in a little bit of materialize to jazz up the UI (I feel bad that I could not do this on my own). 
   * I learnt a few things in this challenge like validating schema and styling.
   * There are no tests for the last few commits. It would be great if those were there.
   * I haven't fixed the lint issues.
   * Looking at the git log should be interesting.
   * Overall I am satisfied with the output. Thanks again! 
   
   