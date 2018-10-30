import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
    state = {
        articles: [],
        search: "",
        title: "",
        link: "",
        section: "",
        pubDate: "",
        snippet: ""
    };

    // componentDidMount() {
    //     this.setState({ search: "pandas" });
    //     this.searchArticles();
    // }

    searchArticles = () => {
        API.searchArticles(this.state.search)
            .then(res => {
                console.log(res.data);
                this.setState({ articles: res.data });
            })
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state.search);
        this.searchArticles(this.state.search);
    };

    handleSave = event => {
        event.preventDefault();
        let articleInfo = event.target.parentElement.children;
        let title = articleInfo[0].innerText;
        let link = articleInfo[0].attributes[1].value;
        let section = articleInfo[1].innerText;
        let pubDate = articleInfo[2].innerText;
        let snippet = articleInfo[3].innerText;
        API.saveArticle({
            title: title,
            link: link,
            section: section,
            pubDate: pubDate,
            snippet: snippet
        });
        alert("Article saved!");
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="sm-12">
                        <Jumbotron>
                            <h1>Search NYT</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.search}
                                onChange={this.handleInputChange}
                                name="search"
                                placeholder="Search (required)"
                            />
                            <FormBtn
                                disabled={!(this.state.search)}
                                onClick={this.handleFormSubmit}
                            >
                                Search
              </FormBtn>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-12">
                        <h1>Results</h1>
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map((article, id) => (
                                    <ListItem key={id}>
                                        <a className="title" href={article.web_url} target="_blank">{article.headline.print_headline}</a>
                                        <p className="section">{article.section_name}</p>
                                        <p className="pubDate">{article.pub_date}</p>
                                        <p className="snippet">{article.snippet}</p>
                                        <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Articles;
