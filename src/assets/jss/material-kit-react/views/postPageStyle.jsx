import { container, title } from "../../material-kit-react.jsx";

import imagesStyle from "../imagesStyles";

const postPageStyle = theme => ({
  container,
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },

  name: {
    marginTop: "-80px"
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "20"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("sm")]: {
      margin: "-60px 0px 0px"
    }
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  },
  cardContent: {
    padding: "0.9375rem 1.875rem",
    flex: "1 1 auto"
  },
  content: {
    padding: "auto",
    alignItems: "center"
  },
  parallaxContainer: {
    position: "fixed",
    zIndex: "1",
    color: "#FFFFFF",
    padding: "auto",
    top: "0",
    right: "0",
    left: "0",
    width: "100%",
    height: "100%",
    maxHeight: "1000px",
    ...container
  },
  parallaxWrapper: {
    height: "100%",
    alignItems: "center"
  },
  parallaxTitle: {
    ...title,
    order: "-1",
    textAlign: "left",
    fontSize: "2.5rem",
    color: "#FFFFFF",
    marginTop: "30px",
    minHeight: "12px",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.25rem",
      lineHeight: "1.5em",
      "&:after": {
        fontSize: "2rem",
        lineHeight: "1.4em"
      }
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5635rem",
      lineHeight: "1.4em",
      "&:after": {
        fontSize: "1.124rem",
        lineHeight: "1.5em"
      }
    }
  },
  parallaxSubtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    display: "block",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
    zIndex: "12",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
      "&:after": {
        fontSize: "0.8em"
      }
    },
    fontFamily: "Roboto",
    margin: "0px 10% 0"
  }
});

export default postPageStyle;
