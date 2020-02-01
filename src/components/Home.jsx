import React, { useEffect, useState } from "react";

import Axios from "axios";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import Layout from "./_Layout/_Layout";

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  progressParent: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

const Home = () => {
  const [cards, setCards] = useState([]);
  const [nextPage, setNextPage] = useState(
    "https://api.rawg.io/api/games?page=1"
  );
  const [loadMore, setLoadMore] = useState("button");

  const classes = useStyles();

  function loadMoreFn() {
    setLoadMore("progress");
    initEffect();
  }

  function initEffect() {
    async function fetchGames() {
      try {
        const requestOpt = {
          method: "GET",
          url: nextPage,
          headers: {
            "content-type": "application/octet-stream",
            "User-Agent": "wf-video-games-database"
          }
        };
        const request = await Axios(requestOpt);
        let games;
        if (cards.length > 0) games = cards.concat(request.data.results);
        else games = request.data.results;
        setCards(games);
        setNextPage(request.data.next);
        setLoadMore("button");
      } catch (error) {
        console.error(error);
      }
    }
    fetchGames();
  }

  useEffect(() => {
    initEffect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseDate = date => {
    let parts = date.split("-");
    let newDate = new Date(parts[0], parts[1] - 1, parts[2]);

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ][newDate.getMonth()];

    return `${newDate.getDate()} ${month} ${newDate.getFullYear()}`;
  };

  return (
    <Layout>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Games Database
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              A database collection of video games.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={() => (window.location.href = "https://rawg.io/")}
                    variant="outlined"
                    color="primary"
                  >
                    Data Source (rawg.io)
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {cards.length > 0 ? (
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map(card => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.background_image}
                      title={card.name}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                      </Typography>
                      <Typography>
                        {`Rating: ${card.rating} / ${card.rating_top} (${card.ratings_count} ratings)`}
                      </Typography>
                      <Typography>
                        {`Release Date: ${parseDate(card.released)}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button disabled size="small" color="primary">
                        About Game - <small>&nbsp;(coming soon)</small>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  {loadMore === "progress" ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => loadMoreFn()}
                      color="primary"
                    >
                      Load More
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
          </Container>
        ) : (
          <Container className={classes.progressParent} maxWidth="md">
            <CircularProgress />
          </Container>
        )}
      </main>
    </Layout>
  );
};

export default Home;
