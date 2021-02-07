import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { makeStyles } from "@material-ui/core/styles";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const useStyles = makeStyles((theme) => ({
  userRating: {
    margin: theme.spacing(1, 0),
  },
  title: {
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeightBold,
    fontSize: "14px",
  },
}));

const UserRating = ({ title, rating }) => {
  const classes = useStyles();

  return (
    <div className={classes.userRating}>
      <Typography className={classes.title}>{title}</Typography>
      <Rating
        defaultValue={rating}
        getLabelText={(rating) => customIcons[rating].label}
        IconContainerComponent={IconContainer}
        readOnly
      />
    </div>
  );
};

export default UserRating;
