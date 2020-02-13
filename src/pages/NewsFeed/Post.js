import React, { Component } from "react";
// import { EditorState, convertToRaw, ContentState } from "draft-js";
// import { Link, navigate, Redirect } from "@reach/router";
// import { Editor } from "react-draft-wysiwyg";
import { 
  Typography,
  List,
  Card,
  Avatar,
  Comment,
  Badge,
  Divider,
  Form,
  Button,
} from "antd";
import { navigate } from "@reach/router";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import imageAvatar from "./../../assets/images/portrait.png";
import postImage from "./../../assets/images/post_img01.jpg";
import gameImage from "./../../assets/images/games_img01.jpg";
import adImage from "./../../assets/images/ads_img01.jpg";
import { dateToLocale } from "../../utils/DateTime";
import CommentSection from "../../components/CommentSection"
import TextArea from "antd/lib/input/TextArea";
import { AuthConnect } from "../AuthWrapper";
import { 
  likePost, 
  unlikePost, 
  dislikePost, 
  undislikePost 
} from "../../utils/ActivityUtil";
import PostActivity from "../../components/PostActivity";
import Notification from "../Notification";
import { Link } from "@reach/router";
// import { resolve } from "../../../node_modules/@reach/router/lib/utils";
// import Cookies from "js-cookie";
// import $ from "jquery";
// import Notification from "./../Notification";

const {
  Title,
  Text,
  Paragraph
} = Typography;

class Post extends Component {
  state = {
    showComments: false,
  };

  // TODO: Note:
  // We want to allow users to open posts in a new tab.
  // We want to be able to pass state if possible, but this doesn't seem possible
  // if they open in another tab.
  // We want to improve navigating back from postDetail, if possible.
  // goToPostDetail = e => {
  //   const { post, country, blockDetail, navigate } = this.props;
  //   navigate(`../../../postDetail/${post.id}`, {
  //     state: { post, blockDetail, country }
  //   });
  // }

  likePost = async () => {
    try {
      const response = await likePost(this.props.post.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing like");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.props.post));
      updatedPost.isLiked = true;
      updatedPost.isDisliked = false;

      this.props.onUpdate(updatedPost);
    } catch (error) {
      console.error(error);
    }
  }

  unlikePost = async () => {
    try {
      const response = await unlikePost(this.props.post.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing like");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.props.post));
      updatedPost.isLiked = false;
      updatedPost.isDisliked = false;
      
      this.props.onUpdate(updatedPost);
    } catch (error) {
      console.error(error);
    }
  }

  dislikePost = async () => {
    try {
      const response = await dislikePost(this.props.post.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing dislike");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.props.post));
      updatedPost.isDisliked = true;
      updatedPost.isLiked = false;
      
      this.props.onUpdate(updatedPost);
    } catch (error) {
      console.error(error);
    }
  }

  undislikePost = async () => {
    try {
      const response = await undislikePost(this.props.post.id);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing dislike");

        return;
      }

      Notification.displaySuccessMessage("Success");

      let updatedPost = JSON.parse(JSON.stringify(this.props.post));
      updatedPost.isDisliked = false;
      updatedPost.isLiked = false;
      
      this.props.onUpdate(updatedPost);
    } catch (error) {
      console.error(error);
    }
  }

  toggleComments = () => {
    this.setState(state => ({
      showComments: !state.showComments
    }));
  }

  render() {
    const { post } = this.props;
    const { showComments } = this.state;
    const {
      isLiked,
      isDisliked,
    } = post;

    return (
      <List.Item>
        <Card 
          className="post"
          cover={post.featuredImage && (
            <div className="image">
              <img src={post.featuredImage} alt={post.summary} />
            </div>
          )}
          title={(
            <PostHeader post={post} />
          )}
        >
          <Link
            to={`../../../postDetail/${post.id}`}
          >
            <div className="post-content">
              <div
                className={
                  post.postType == "Story"
                    ? "story-post"
                    : null
                }
              >
                {post.postType == "Story"
                  ? post.content
                  : post.summary}
              </div>
            </div>
          </Link>
          <PostActivity 
            post={post} 
            isLiked={isLiked}
            isDisliked={isDisliked}
            isComments={showComments}
            onLike={this.likePost} 
            onUnlike={this.unlikePost}
            onDislike={this.dislikePost}
            onUndislike={this.undislikePost}
            onComments={this.toggleComments} 
          />
          {showComments && (
            <div className="post-comment">
              <Divider />
            </div>
          )}
          <div className="comments">
            <CommentSection post={post} visible={showComments} />
          </div>       
        </Card>
      </List.Item>
    );
  }
}

function PostHeader({ post }) {
  const date = dateToLocale(post.createdOn);
  
  return (
    <div className="post-header">
      <div className="author-image">
        <Badge dot color="#39a142">
          <Avatar 
            size="large" 
            src={post.owner.profileImageUrl || imageAvatar} 
            alt={post.owner.nickName} 
          />
        </Badge>
      </div>
      <div className="post-details">
        <div className="post-title">
          {post.title}
        </div>
        <div className="post-meta">
          <div className="author-name">{post.owner.nickName}</div>
          <div className="post-date">{date}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthConnect(Post);
