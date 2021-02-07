import React from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

import FaqQuestion from "../FaqQuestion";

const useStyles = makeStyles((theme) => ({
  pageHeading: {
    fontFamily: "'Montserrat', sans-serif",
    margin: theme.spacing(2, 0),
  },
}));

const FaqPage = () => {
  const classes = useStyles();
  const { id } = useParams();

  return (
    <Container maxWidth="lg">
      <Typography component="h1" variant="h5" className={classes.pageHeading}>
        Frequently Asked Questions
      </Typography>
      <Accordion defaultExpanded={id === "shipping"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Shipping</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FaqQuestion
            questions={[
              {
                title: "What is the delivery time & cost?",
                body: `Normally our delivery takes between 1-3 working days, 
                however due to COVID-19, our delivery times have been extended and
                may take longer than usual. An estimated delivery date will be 
                provided to you at checkout.`,
              },
              {
                title: "How do I check my order or delivery status?",
                body: `Track your parcel by following the link in your Shipment
                Confirmation email. This will be sent to you as soon as your
                parcel is shipped.`,
              },
              {
                title: "What should I do if I haven't received my package?",
                body: `If you want to find out the current status of your order you can
                easily do so with the Order tracker. We always aim to deliver your
                order within our standard delivery times, however sometimes
                unexpected factors can cause delays in your delivery.`,
              },
            ]}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={id === "refund"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Refunds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FaqQuestion
            questions={[
              {
                title: "When will I get my refund?",
                body: `Once we've received the item(s) at our warehouse, we will process
                your return. From the moment we refund you, your bank still needs
                to process it. The amount of time this takes differs per bank and
                payment method but takes approximately 14 days - see timeline
                below. We'll refund the same method you used to pay.`,
              },
              {
                title:
                  "I have used a voucher on an item I returned. Can I request a new voucher?",
                body: `If you used a voucher that gave you a percentage discount (e.g.
                  10% off), the voucher can be replaced if you return the order, or
                  part of it by simply comtacting us. Monetary amount vouchers (e.g.
                  €10) will be automatically refunded, you will receive a new email
                  for the amount applied to that part of the order.`,
              },
              {
                title: "What should I do if I haven't received my package?",
                body: `If you want to find out the current status of your order you can
                easily do so with the Order tracker. We always aim to deliver your
                order within our standard delivery times, however sometimes
                unexpected factors can cause delays in your delivery.`,
              },
            ]}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={id === "exchange"}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Exchanges</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FaqQuestion
            questions={[
              {
                title: "Can I exchange my items?",
                body: `Did you order an item you like online but is it the wrong size?
                Instead of returning it, you can exchange it for a different size
                for free within 60 days.`,
              },
              {
                title: "How do I exchange an item?",
                body: `Click on ‘Free size exchange’ tell us which item(s) you want to
                exchange and pick your right size. Pack the item(s) and bring the
                package to a drop off point within 7 days to avoid getting your
                size exchange cancelled. As soon as the package is scanned by the
                carrier, your new size(s) will be shipped. You'll receive a
                shipping confirmation email with a tracking code when it leaves
                our warehouse. We will use our standard delivery service and send
                it to your original delivery address.`,
              },
              {
                title: "Returning and exchanging items from the same order?",
                body: `No problem. You can pack all items in the same box. Please use the
                exchange label instead of the provided return label for the
                fastest process. We’ll refund you through your original payment
                method when we’ve received the package. Your exchanged item(s) are
                then already on their way to you!`,
              },
              {
                title: "When is an item excluded from exchanging?",
                body: `Personalized items are made uniquely for you and cannot be
                exchanged. If you desire your item in a different colour, please
                return the item and make a new purchase .Items purchased at a
                physical adidas store can only be exchanged in-store.`,
              },
            ]}
          />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FaqPage;
