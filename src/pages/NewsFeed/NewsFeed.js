import React, { Component } from "react";
import { 
  Row,
  Col,
  Typography,
  Badge,
  Avatar,
  Button,
  List,
} from "antd";
import "./../../css/NewsFeed.css";
import Post from "./../NewsFeed/Post";
import Status from "../../components/Status";
import Cookies from "js-cookie";
import imageProfile from "./../../assets/images/portrait.png";
import imageAssistant from "./../../assets/images/assistant_picture.png";
import postImage from "./../../assets/images/post_img01.jpg";
import gameImage from "./../../assets/images/games_img01.jpg";
import adImage from "./../../assets/images/ads_img01.jpg";
import $ from "jquery";
import Notification from "./../Notification";
import { navigate } from "../../../node_modules/@reach/router";
import ENDPOINTS from "../../config/endpoints";
import { fetchAPI } from "../../utils/FetchUtil";
import { DAppConnect } from "../DAppWrapper";
import { AuthConnect } from "../AuthWrapper";
import { CountryConnect } from "../CountryWrapper";
import CountryHeader from "../../components/CountryHeader";
import PostStory from "./PostStory";
import CountryLeftCol from "../../components/CountryLeftCol";

const {
  Title,
  Text,
  Paragraph
} = Typography;

class NewsFeed extends Component {
  state = {
    story: "",
    loading: false,
    offset: 0,
    posts: [],
    isBusy: false,
  };

  componentDidMount() {
    this.refreshPosts();
    window.addEventListener("scroll", this.handleScroll);
  }

  refreshPosts = () => {
    this.loadPosts(0);
  }

  loadMorePosts = () => {
    if (this.state.allLoaded) {
      return;
    }

    this.loadPosts(this.state.offset);
  }

  loadPosts = async (offset) => {
    if (this.state.isBusy) {
      return false;
    }

    this.setState({
      loading: true,
      isBusy: true
    });

    let postObj = {
      blockId: this.props.id,
      offset,
      allLoaded: false
    };

    try {
      const response = await fetchAPI(
        ENDPOINTS.GET_POSTS,
        "POST",
        postObj
      );

      if (!response.isSuccess) {
        throw Error("Error retrieving posts");
      }

      // Note for line below:
      // Since posts are ordered chronologically (newest at top) and we fetch from the end.
      // When a new post is added and we try to load more, we'll end up with the last posts
      // being duplicated.
      if (response.posts.length > 0) {
        this.setState(state => ({
          offset: offset + response.posts.length, // See note above.
          posts: offset > 0 ? state.posts.concat(response.posts) : response.posts,
          allLoaded: false
        }));
      } else {
        this.setState({
          allLoaded: true,
        });
      }
    } catch (error) {
      console.error(error);
      navigate("/dapp/setting");
    } finally {
      this.setState({
        loading: false,
        isBusy: false
      })
    }
  }

  handleScroll = () => {
    const win = $(window);
    
    if (
      $(document).height() - win.height() == Math.round(win.scrollTop()) ||
      $(document).height() - win.height() - Math.round(win.scrollTop()) == 1
      ) {
      if (this.state.allLoaded) {
        return false;
      } else {
        this.loadMorePosts();
      }
    }
  }

  addNewPost = async newStory => {
    try {
      const response = await fetchAPI(
        ENDPOINTS.CREATE_POST, 
        "POST",
        newStory
      );

      if (!response.isSuccess) {
        throw Error("Error creating new post");
      }

      this.refreshPosts()

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  handlePostUpdate = async postUpdate => {
    this.setState(state => {
      const updatedPosts = state.posts.map(post => {
        if (post.id != postUpdate.id) {
          return post;
        }

        return postUpdate;
      })

      return {
        posts: updatedPosts
      };
    })
  }

  render() {
    const { country, blockDetail, isOwner } = this.props;
    const { posts } = this.state;

    return (
      <div className="posts">
        <List
          header={isOwner && <PostStory addNewPost={this.addNewPost} country={country} blockDetail={blockDetail} />}
          dataSource={posts}
          split={false}
          loading={this.state.loading}
          renderItem={(item) => (
            <Post 
              key={item.id} 
              post={item} 
              blockDetail={blockDetail} 
              country={country} 
              onUpdate={this.handlePostUpdate} 
              navigate={this.props.navigate} 
            />
          )}
        />
      </div>
    );
  }
}

export default DAppConnect(AuthConnect(CountryConnect(NewsFeed)));
