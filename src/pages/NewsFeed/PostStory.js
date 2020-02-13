import React from "react";
import { CountryConnect } from "../CountryWrapper";
import { AuthConnect } from "../AuthWrapper";
import { Button, Input, Form } from "antd";
import ReactQuill from 'react-quill';
import Notification from "../Notification";
import postTypes from "../../config/postTypes";
import $ from "jquery";

import "react-quill/dist/quill.snow.css";
import "./../../css/NewsFeed.css";
import "./../../css/NewArticle.css";

const defaultArticleState = {
  postTitle: "",
  postSummary: "",
  postContent: ""
}

const defaultState = {
  postType: postTypes.STORY,
  story: "",
  busy: false,
  ...defaultArticleState
};

const colourSet = [
  "black", 
  "darkgrey",
  "grey", 
  "lightgrey",
  "white", 
  "darkred",
  "red", 
  "brown",
  "orange",
  "yellow", 
  "olive",
  "darkgreen",
  "green", 
  "lightgreen",
  "turquoise",
  "cyan",
  "darkblue",
  "blue", 
  "lightblue",
  "purple",
  "pink",
];

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ "list": "ordered" }, { "list": "bullet" }],
  [{ "script": "sub" }, { "script": "super" }],
  ["blockquote", "code-block"],
  [{ "size": ["small", false, "large", "huge"] }],
  [{ "header": [1, 2, 3, 4, 5, 6, false] }],
  [{ "color": colourSet }, { "background": colourSet }],
  [{ "font": [] }],
  [{ "align": "justify" }, { "align": "center"}, { "align": "right" }],
  [{ "direction": "rtl" }],
  ["link"],
  ["image"],
  ["clean"]
];

class PostStory extends React.PureComponent {
  state = defaultState;

  postTypeChange = type => {
    if (this.state.postType == type) {
      return;
    }

    this.setState({
      postType: type
    });
  }

  handleEditorChange = postContent => {
    this.setState({
      postContent
    });
  }

  handleInputChange = ({ target: { value, name }}) => {
    this.setState({
      [name]: value
    });
  }

  createStory = async ({ target: createPostButton }) => {
    if (this.state.busy) {
      return;
    }
    
    const { country, blockDetail } = this.props;
    const { story, busy } = this.state;

    this.setState({
      busy: true
    });

    const newStory = {
      title: story,
      summary: story,
      content: story,
      countryId: country.id,
      blockId: blockDetail.id,
      postType: "story"
    };

    const addedPost = await this.props.addNewPost(newStory);

    this.setState({
      busy: false
    });

    if (!addedPost) {
      Notification.displayErrorMessage("Error while creating new post!");

      return;
    }
    
    Notification.displaySuccessMessage(
      "New story has been created successfully..."
    );
    
    this.setState(defaultState);
  }

  createArticle = async ({ target: createPostButton }) => {
    if (this.state.busy) {
      return;
    }

    const { country, blockDetail } = this.props;
    const { 
      postTitle, 
      postSummary, 
      postContent,
      busy 
    } = this.state;

    this.setState({
      busy: true
    });
    
    const postObj = {
      title: postTitle,
      summary: postSummary,
      content: postContent,
      countryId: country.id,
      blockId: blockDetail.id,
      postType: "article"
    };

    const addedPost = await this.props.addNewPost(postObj);

    this.setState({
      busy: false
    });

    if (!addedPost) {
      Notification.displayErrorMessage("Error while creating new post!");

      return;
    }
    
    Notification.displaySuccessMessage(
      "New post has been created successfully..."
    );

    this.postTypeChange(postTypes.STORY);

    this.setState(defaultState);
  }

  cancelArticle = () => {
    this.postTypeChange(postTypes.STORY);
    this.setState(defaultArticleState);
  }

  renderBody = () => {
    const { 
      postType, 
      story,
      postTitle, 
      postSummary, 
      postContent,
      busy
    } = this.state;

    switch(postType) {
      case postTypes.STORY: 
        return (
          <Form className="cmp-form-status">
            <Form.Item className="story">
              <Input.TextArea
                placeholder="Write a quick story and earn money"
                name="story"
                value={story}
                onChange={this.handleInputChange}
                autoSize
              />
            </Form.Item>
            <Form.Item className="buttons">
              {/* <div className="privacy-settings">
                <div className="privacy is-public">Public</div>
              </div> */}
              <Button
                className="activity button"
                type="primary"
                onClick={this.createStory}
                loading={busy}
                disabled={busy}
              >
                Post
              </Button>
            </Form.Item>
          </Form>
        );

      case postTypes.ARTICLE:
        return (
          <Form className="cmp-form-status">
            <Form.Item label="Title">
              <Input
                name="postTitle"
                value={postTitle}
                onChange={this.handleInputChange}
                className="input-text"
              />
            </Form.Item>
            <Form.Item label="Summary">
              <Input.TextArea
                name="postSummary"
                value={postSummary}
                onChange={this.handleInputChange}
                className="input-text"
                rows="4"
                autoSize
              />
            </Form.Item>
            <Form.Item label="Content">
              <ReactQuill
                modules={{
                  toolbar: toolbarOptions
                }}
                value={postContent}
                onChange={this.handleEditorChange}
              />
            </Form.Item>
            <Form.Item className="buttons">
              <Button
                onClick={this.createArticle}
                type="primary"
                loading={busy}
                disabled={busy}
              >
                Post
              </Button>
              <Button
                onClick={this.cancelArticle}
                disabled={busy}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        );
    }
  }

  render() {
    const { postType } = this.state;

    return (
      <div className="composer">
        <div className="com-header">
          <a 
            className={`cmp-btn cmp-btn-status ${postType == postTypes.STORY ? "is-active" : ""}`}
            onClick={() => this.postTypeChange(postTypes.STORY)}
          >
            Create Story
          </a>
          <a
            className={`cmp-btn cmp-btn-status ${postType == postTypes.ARTICLE ? "is-active" : ""}`}
            onClick={() => this.postTypeChange(postTypes.ARTICLE)}
          >
            Create Article
          </a>
        </div>
        <div className="com-content">
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default CountryConnect(AuthConnect(PostStory));