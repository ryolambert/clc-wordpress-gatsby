# Build Notes

![](https://media.giphy.com/media/iXDe1s3spQUZG/giphy.gif)

## TODO:

- [ ]  Testing/Optimizations
    - [ ]  Tests
        - [x]  Husky (Pre-commit)
        - [ ]  Cypress
        - [ ]  Jest
    - [ ]  gatsby-plugin-netlify-cache
    - [ ]

[How to write tests for your Gatsby sites and apps with Kent C. Dodds - Learn With Jason](https://youtu.be/BzRAYt7BHRw)

- [x]  ⭐Search
    - [x]  Downshift w/Elastic Lunr Index
    - [x]  Styling
        - [x]  Title ⇒ blue gradient
        - [x]  Flex: format 2 column rows
        - [x]  AppBar location media queries
            - [x]  Order last desktop
            - [x]  Order first mobile
        - [ ]  ✨Add flex columns to split the title from description?
- [ ]  🌟Events
    - [ ]  Events Pages
        - [ ]  Events Index
        - [ ]  Event Post
        - [ ]  MapBox integration
            - [ ]  API key
                - [ ]  AIzaSyCp8aJ6-c7UwVvh-tVeXsWQ3nYQrQ4c3r4
            - [ ]  Custom Styles
        - [ ]  Event Location Geocoding?
        - [x]  WP-BLOCK STYLING
        - [ ]  Calendar View
            - [ ]  GQL ➡ Event Post Data, Title, and Description
            - [ ]  Map over map coordinates?
    - [ ]
- [ ]  🌟Contact Form
    - [ ]  Zapier - Gmail Integration
        - [x]  Setup form
        - [x]  Setup Zap
        - [x]  Integrate Components
        - [ ]  Testing...
        - [ ]  Debug
    - [ ]  Zapier - Disqus?
    - [ ]  Contact Component
    - [ ]  Disqus Integration?
- [ ]  🌟Landing Page
    - [ ]  ACF fields
    - [ ]  Hero Design
        - [ ]  Carousel?
    - [ ]  Video modal?
    - [ ]  Testimonial
    - [ ]  Staff
    - [ ]  Contact Form
    - [ ]  Map box map
    - [ ]  Footer
- [ ]  Sermons
    - [ ]  Sermon Cards Slim
    - [ ]  Embed audio player
    - [ ]  Podcast integration
    - [x]  Sermon Index
        - [x]  🚫 Sermon Post (Dont need kill from templates)
- [ ]  Gallery
    - [ ]  Gallery Index
        - [x]  Setup instagram like infinite scroll: LOAD THUMBNAILS!!! SMALL
        - [x]  Modal popup with selected image?
    - [ ]  Gallery Post → Gallery Modal for popup
        - [ ]  Sharing Disqus?
        - [ ]  Comments?
- [ ]  General Components
    - [ ]  ⚡️SEO Header Component
    - [ ]  ⚡️Back Button
    - [ ]  ⚡️Scroll Top Button
    - [ ]
    - [ ]  ⭐Cards
        - [ ]  Card Styling Landscape
        - [ ]  Add tags
        - [ ]  Add Grid view
        - [x]  Add preview images
    - [ ]  ⭐Filtering
        - [ ]  Tags
        - [ ]  Categories
    - [x]  ⭐Content WP-BLOCK styling...
        - [x]  Add image styling
        - [x]  Add toLeft and toRight organization with text
        - [x]  Add gallery arrangement
        - [x]  Add Css filter Gradient?
    - [ ]  ✨Comments
    - [ ]  ✨Share
        - [ ]  Twitter
        - [ ]  Facebook
        - [ ]  Pinterest
        - [ ]  Instagram? 🤵
    - [x]  Pagination
        - [x]  Use MUI pagination component
    - [ ]  ⭐️Animations
        - [x]  🌟Page Transitions
            - [ ]  ✨Gradient shape/swipe
        - [ ]  ✨Custom Hover
        - [ ]  ✨Static Animations
            - [ ]  ✨Shapes/Art
- [ ]  Blog
    - [ ]  Blog Index
        - [ ]  Hero Title Centering/Styling Bump from -5vh to 0vh?
    - [ ]  Blog Post
        - [x]  Title Styling
        - [ ]  Comments?
        - [ ]  Sharing

---

![](https://media.giphy.com/media/nrNqeGB1sxlZe/giphy.gif)

## Dev Experience Issues/Bottlenecks/Compatibility Problems

1. Getting the WP REST API to map properly to Graphql
2. Figuring out how to pass state/props between Gatsby/MUI
3. Styling with MUI's JSS
4. 😭 Getting WP content to map over to gatsby!!!
5. Getting this thing setup up...
    - WP IS SLOWWWW
    - Backtracking!!!! 😩🤯
    - Styling WP to Gatsby
    - Plugin compatibility both Gatsby & WP!!!
6. Figuring out how to get server-rendered html content from gutenberg blocks to translate over the WP Rest API to the gatsby-source-wordpress GraphQL transfer.
    - Desperately, needs a gatsby-transform-gutenberg plugin
    - 🤦‍♂️ This complication, especially in light of how sparse the current theming options are, really limits the user and dev experience to narrow or overly complex UI interactions or development work-arounds.
    - 💡 Gatsby-Gutenberg-WP-Block transform plugin: ports over styling and html content from REST API for one-to-one setup.
        - No needed styling mods of CMS content by user or dev.
        - Great use case to wean the aging PHP platform into the enlightened land of JS!!! 🙌🙌🙌
        -
7. 🌟Gatsby's use of higher order directory structures to pass state/props into statically generated components.
    - I.e. Differences in build/develop compiling
        - ⚠ Browser APIs like window or document are unavailable to the SSR compilation.
        - 💥💥💥Use gatsby-browser and ssr files to circumvent those build constraints and give access to logic or wrappers that otherwise are inaccessible to the server side of things when generating static files?
        - They're basically a Gatsby's version of a HoC/Context provider that work around React's one-way data-binding, from what I can gather.