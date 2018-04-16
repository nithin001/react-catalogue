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
     Footer
   ~~~~
   * I took a shot at building the Header Component. Used a mix of shallow testing and react-test-renderer.
   * [Assumption] The total number of items in the cart is the distinct SKUs present in the cart. This can be easily changed to include the count of each item also.
   * The skeleton of all the components are completed. Parts that are missing:
     * Calling the APIs
     * Tie all the pieces together
     
## Tying everything together
   * This is a part of commit "tying everything together" and I didn't write tests for this part.
   * It got really messing in between. The untested parts of connected components were not glued together correctly in many places
   * Overall there are a lot of pieces in this commit that should be added to tech debt.
   * And if you rebase to this version, you should see a text based version of the app.
   
   