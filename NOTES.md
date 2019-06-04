# Build Notes

![](https://media.giphy.com/media/iXDe1s3spQUZG/giphy.gif)

## TODO:

- [ ]  Blog Index
    - [x]  Pagination
        - [x]  Use MUI pagination component
    - [ ]  Filtering
    - [ ]  Search
    - [ ]  Hero Title Centering/Styling
- [ ]  Blog Post
    - [ ]  Title Styling
    - [ ]  Comments?
    - [ ]  Sharing
    - [ ]  Content WP-BLOCK styling...
        - [ ]  Add image styling
        - [ ]  Add toLeft and toRight organization with text
        - [ ]  Add gallery arrangement
        - [ ]  Add Css filter Gradient?
- [ ]  Cards
    - [ ]  Card Styling
    - [ ]  Add preview images
- [ ]  Sermon Index
- [ ]  Sermon Post
- [ ]  Gallery Index
    - [ ]  Setup instagram like infinite scroll: LOAD THUMBNAILS!!! SMALL
    - [ ]  Modal popup with selected image?
        - [ ]  Share functionality
- [ ]  Gallery Post
    - [ ]  Sharing Disqus?
    - [ ]  Comments?
- [ ]  Contact Form
    - [ ]  Zapier - Gmail Integration
    - [ ]  Zapier - Disqus?
    - [ ]  Contact Component
    - [ ]  Disqus Integration?
- [ ]  Events Pages
    - [ ]  Events Index
    - [ ]  Event Post
    - [ ]  MapBox integration
        - [ ]  API key
        - [ ]  Custom Styles
    - [ ]  Event Location Geocoding?
    - [ ]  WP-BLOCK STYLING
    - [ ]  Calendar View
        - [ ]  GQL ➡ Event Post Data, Title, and Description
        - [ ]  Map over map coordinates?

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