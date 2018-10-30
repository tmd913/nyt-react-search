import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
    state = {
        articles: []
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res => {
                console.log(res.data);
                this.setState({ articles: res.data });
            })
            .catch(err => console.log(err));
    };

    deleteArticle = id => {
        API.deleteArticle(id)
          .then(res => this.loadArticles())
          .catch(err => console.log(err));
      };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="sm-12">
                        <Jumbotron>
                            <h1>Saved Articles</h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col size="sm-12">
                        {this.state.articles.length ? (
                            <List>
                                {this.state.articles.map((article, id) => (
                                    <ListItem key={id}>
                                        <a className="title" href={article.link} target="_blank">{article.title}</a>
                                        <p className="section">{article.section}</p>
                                        <p className="pubDate">{article.pubDate}</p>
                                        <p className="snippet">{article.snippet}</p>
                                        <span className="btn btn-danger" onClick={() => this.deleteArticle(article._id)}>X</span>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h3>No Articles to Display</h3>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Articles;
