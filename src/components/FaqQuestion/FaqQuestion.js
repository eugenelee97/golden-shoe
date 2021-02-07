import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  questionTitle: {
    fontSize: "16px",
    fontWeight: theme.typography.fontWeightBold,
    fontFamily: "'Montserrat', sans-serif",
  },
  questionBody: {
    marginBottom: theme.spacing(2),
  },
}));

const FaqQuestion = ({ questions }) => {
  const classes = useStyles();

  return (
    <div className="question">
      {questions.map(({ title, body }) => (
        <>
          <div className={classes.questionTitle}>{title}</div>
          <div className={classes.questionBody}>{body}</div>
        </>
      ))}
    </div>
  );
};

export default FaqQuestion;
