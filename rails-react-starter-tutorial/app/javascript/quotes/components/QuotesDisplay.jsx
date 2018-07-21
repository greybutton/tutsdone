import React from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

class QuotesDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      quote: {}
    };
  }

  fetchQuote(id) {
    axios
      .get(`api/quotes/${id}`)
      .then(response => {
        this.setState({ quote: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    const { quote } = queryString.parse(this.props.location.search);
    if (quote) {
      this.fetchQuote(quote);
    } else {
      this.fetchQuote(this.props.startingQuoteId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { quote } = queryString.parse(nextProps.location.search);
    this.fetchQuote(quote);
  }

  render() {
    const { quote } = this.state;
    const nextQuoteId = quote.next_id;
    const previousQuoteId = quote.previous_id;

    return (
      <div>
        {previousQuoteId && (
          <Link to={`/?quote=${previousQuoteId}`}>Previous</Link>
        )}
        {nextQuoteId && <Link to={`/?quote=${nextQuoteId}`}>Next</Link>}
        <p>{quote.text}</p>
        <p>{quote.author}</p>
      </div>
    );
  }
}

export default QuotesDisplay;
