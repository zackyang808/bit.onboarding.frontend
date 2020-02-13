import React, { Component } from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Link, navigate, Redirect } from "@reach/router";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./../../css/NewsFeed.css";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import imageProfile from "./../../assets/images/portrait.png";
import imageAssistant from "./../../assets/images/assistant_picture.png";
import postImage from "./../../assets/images/post_img01.jpg";
import gameImage from "./../../assets/images/games_img01.jpg";
import adImage from "./../../assets/images/ads_img01.jpg";
import imageAvatar from "./../../assets/images/portrait.png";
import renderHTML from "react-render-html";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import { CountryConnect } from "../CountryWrapper";
import { 
  Row, 
  Col, 
  Breadcrumb, 
  Divider, 
  Spin, 
  Card, 
  Badge, 
  Avatar, 
  Icon,
} from "antd";
import { Link } from "@reach/router";
import { AuthConnect } from "../AuthWrapper";
import { dateToLocale } from "../../utils/DateTime";
import CountryHeader from "../../components/CountryHeader";
import CommentSection from "../../components/CommentSection";
import PostActivity from "../../components/PostActivity";
import { 
  likePost, 
  unlikePost, 
  dislikePost, 
  undislikePost 
} from "../../utils/ActivityUtil";
import Notification from "../Notification";

// import { resolve } from "../../../node_modules/@reach/router/lib/utils";
// import Cookies from "js-cookie";
// import $ from "jquery";
// import Notification from "./../Notification";

class PostDetail extends Component {
  state = {
    post: this.props.location.state ? this.props.location.state.post : null,
    blockDetail: this.props.location.state ? this.props.location.state.blockDetail : null,
    loading: true,
  };

  componentDidMount() {
    if (!(this.state.post && this.state.blockDetail)) {
      this.loadData();
    } else {
      this.setState({
        loading: false
      });
    }
  }

  loadData = async () => {
    this.setState({
      loading: true
    });

    await this.loadPostData();
    await this.loadBlockData();

    this.setState({
      loading: false
    });
  }

  loadPostData = async () => {
    try {
      const response = await fetchAPI(`${ENDPOINTS.GET_POST_BY_ID}?postId=${this.props.id}`);

      if (!response.isSuccess) {
        throw Error("Error retrieving post data");
      }

      this.setState({
        post: response.post,
      });
    } catch (error) {
      console.error(error);
    }
  }

  loadBlockData = async () => {
    try {
      const response = await fetchAPI(`${ENDPOINTS.GET_BLOCK_BY_ID}?blockId=${this.state.post.blockId}`);

      if (!response.isSuccess) {
        throw Error("Error retrieving post data");
      }

      this.setState({
        blockDetail: response.block
      });
    } catch (error) {
      console.error(error);
    }
  }

  likePost = async () => {
    try {
      const response = await likePost(this.props.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing like");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.state.post));
      updatedPost.isLiked = true;
      updatedPost.isDisliked = false;
      
      this.setState({
        post: updatedPost
      });
    } catch (error) {
      console.error(error);
    }
  }

  unlikePost = async () => {
    try {
      const response = await unlikePost(this.props.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing like");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.state.post));
      updatedPost.isLiked = false;
      updatedPost.isDisliked = false;
      
      this.setState({
        post: updatedPost
      });
    } catch (error) {
      console.error(error);
    }
  }

  dislikePost = async () => {
    try {
      const response = await dislikePost(this.props.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing dislike");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.state.post));
      updatedPost.isDisliked = true;
      updatedPost.isLiked = false;
      
      this.setState({
        post: updatedPost
      });
    } catch (error) {
      console.error(error);
    }
  }

  undislikePost = async () => {
    try {
      const response = await undislikePost(this.props.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing dislike");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.state.post));
      updatedPost.isDisliked = false;
      updatedPost.isLiked = false;
      
      this.setState({
        post: updatedPost
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
          <Spin size="large" />
        </div>
      );
    }

    const { 
      country
    } = this.props;
    const { 
      post, 
      blockDetail, 
      loading,
    } = this.state;
    const {
      isLiked,
      isDisliked,
    } = post;
    const topicName = blockDetail.name;

    if (loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <div className="page-post-detail">
        <div className="wrapper">
          <CountryHeader country={country} />
          <Row className="l-home">
            <Col className="col-main" span={20} push={2}>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="../../">
                    {country.name}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`../../block/${post.blockId}/feed`}>
                    {topicName}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {post.title}
                </Breadcrumb.Item>
              </Breadcrumb>
              <div className="post">
                <div className="post-header">
                  <Card.Meta
                    avatar={(
                      <Badge count="100" color="#39a142">
                        <Avatar size="large" src={post.owner.profileImageUrl || imageAvatar} alt={post.owner.nickName} />
                      </Badge>
                    )}
                    title={<h3 className="post-title">{post.title}</h3>}
                    description={(
                      <div className="user-info">
                        <div className="name">{post.owner.nickName}</div>
                        <div className="presentation">
                          {dateToLocale(post.createdOn)}
                        </div>
                      </div>)
                    }
                  />
                </div>
                <Divider />
                <div className="post-content">
                  {/* {post.featuredImage == null ? null : (
                    <div className="image">
                      <img src={post.featuredImage} alt={post.summary} />
                    </div>
                  )} */}
                  <div
                    className={
                      post.postType != null && post.postType == "Story"
                        ? "story-post"
                        : null
                    }
                  >
                    {post.postType != null && post.postType == "Story"
                      ? post.summary
                      : renderHTML(post.content)}
                  </div>
                </div>
                <PostActivity
                  post={post} 
                  isLiked={isLiked}
                  isDisliked={isDisliked}
                  onLike={this.likePost} 
                  onUnlike={this.unlikePost}
                  onDislike={this.dislikePost}
                  onUndislike={this.undislikePost}
                />
                <div className="post-comment">
                  <Divider orientation="left">
                    <h3>Comments</h3>
                  </Divider>
                  <CommentSection post={post} visible />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AuthConnect(CountryConnect(PostDetail));
