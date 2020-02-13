import React, { useState, useCallback } from "react";
import {
  List,
  Comment,
  Avatar,
  Divider,
  Form,
  Button,
  Input,
  Empty,
  Icon,
} from "antd";
import { dateToLocale } from "../../utils/DateTime";
import { AuthConnect } from "../../pages/AuthWrapper";
import {
  likeComment,
  unlikeComment,
  dislikeComment,
  undislikeComment,
} from "../../utils/ActivityUtil";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import Notification from "../../pages/Notification";

const {
  TextArea
} = Input;

class CommentSection extends React.PureComponent {
  state = {
    loading: false,
    posting: false,
    comments: [],
    offset: 0,
    allLoaded: false,
  }

  componentDidMount() {
    const {
      allLoaded
    } = this.state;

    if (allLoaded) {
      return;
    }

    if (this.state.comments.length == 0 && this.props.visible) {
      this.loadComments();
    }
  }

  componentDidUpdate() {
    const {
      allLoaded
    } = this.state;

    if (allLoaded) {
      return;
    }

    if (this.state.comments.length == 0 && this.props.visible) {
      this.refreshComments();
    }
  }

  refreshComments = () => {
    this.loadMoreComments(0);
  }

  loadComments = () => {
    if (this.state.allLoaded) {
      return;
    }

    this.loadMoreComments(this.state.offset);
  }

  loadMoreComments = async offset => {
    if (this.state.loading) {
      return;
    }

    const {
      post
    } = this.props;

    this.setState({
      loading: true
    });

    try {
      const response = await fetchAPI(`${ENDPOINTS.GET_COMMENTS_BY_POST}?postId=${post.id}&offset=${offset}`);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error retrieving comments");

        return;
      }

      // Note for line below:
      // Since comments are ordered chronologically (newest at top) and we fetch from the end.
      // When a new post is added and we try to load more, we'll end up with the last posts
      // being duplicated.
      if (response.comments.length > 0) {
        this.setState(state => ({
          offset: offset + response.comments.length, // See note above.
          comments: offset > 0 ? state.comments.concat(response.comments) : response.comments,
          allLoaded: false
        }));
      } else {
        this.setState({
          allLoaded: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        loading: false
      });
    }
  }

  createComment = async (content) => {
    if (this.state.posting) {
      return;
    }

    const {
      post,
      user
    } = this.props;

    this.setState({
      posting: true
    });

    try {
      const response = await fetchAPI(
        ENDPOINTS.CREATE_COMMENT,
        "POST",
        { postId: post.id, content }
      );

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while creating new comment!");

        return;
      }

      Notification.displaySuccessMessage("New comment has been created successfully...");
      
      this.refreshComments();
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({
        posting: false
      });
    }
  }

  likeComment = async commentId => {
    try {
      const response = await likeComment(commentId);

      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing like");

        return;
      }

      Notification.displaySuccessMessage("Success");

      this.setState(state => {
        const updatedComments = state.comments.map(comment => {
          if (comment.id != commentId) {
            return comment;
          }

          let updatedComment = JSON.parse(JSON.stringify(comment));
          updatedComment.isLiked = true;
          updatedComment.isDisliked = false;

          return updatedComment;
        });

        return {
          comments: updatedComments
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  unlikeComment = async commentId => {
    try {
      const response = await unlikeComment(commentId);
      
      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing like");

        return;
      }

      Notification.displaySuccessMessage("Success");
      
      this.setState(state => {
        const updatedComments = state.comments.map(comment => {
          if (comment.id != commentId) {
            return comment;
          }

          let updatedComment = JSON.parse(JSON.stringify(comment));
          updatedComment.isLiked = false;
          updatedComment.isDisliked = false;

          return updatedComment;
        });

        return {
          comments: updatedComments
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  dislikeComment = async commentId => {
    try {
      const response = await dislikeComment(commentId);
      
      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing dislike");

        return;
      }

      Notification.displaySuccessMessage("Success");
      
      this.setState(state => {
        const updatedComments = state.comments.map(comment => {
          if (comment.id != commentId) {
            return comment;
          }

          let updatedComment = JSON.parse(JSON.stringify(comment));
          updatedComment.isDisliked = true;
          updatedComment.isLiked = false;

          return updatedComment;
        });

        return {
          comments: updatedComments
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  undislikeComment = async commentId => {
    try {
      const response = await undislikeComment(commentId);
      
      if (!response.isSuccess) {
        Notification.displayErrorMessage("Error while processing dislike");

        return;
      }

      Notification.displaySuccessMessage("Success");
      
      this.setState(state => {
        const updatedComments = state.comments.map(comment => {
          if (comment.id != commentId) {
            return comment;
          }

          let updatedComment = JSON.parse(JSON.stringify(comment));
          updatedComment.isDisliked = false;
          updatedComment.isLiked = false;

          return updatedComment;
        });

        return {
          comments: updatedComments
        };
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { user, visible } = this.props;
    const { comments, posting, loading, allLoaded } = this.state;

    return visible && (
      <>
        {comments.length > 0 ? (
          <List
            dataSource={comments}
            renderItem={comment => {
              const isAuthor = comment.author.walletAddress == user.walletAddress;

              return (
                <Comment 
                  author={comment.author.nickName}
                  avatar={<Avatar src={comment.author.profileImageUrl} />}
                  content={comment.content}
                  datetime={dateToLocale(comment.createdOn)}
                  actions={[
                    <span className="btn-action">
                      <a 
                        onClick={() => { comment.isLiked ? this.unlikeComment(comment.id) : this.likeComment(comment.id) }} 
                        //disabled={isAuthor}
                      >
                        <Icon type="like" theme={comment.isLiked ? "filled" : "outlined"} />
                        {comment.likes || 0}
                      </a>
                    </span>,
                    <span className="btn-action">
                      <a 
                        onClick={() => { comment.isDisliked ? this.dislikeComment(comment.id) : this.dislikeComment(comment.id) }} 
                        //disabled={isAuthor}
                      >
                        <Icon type="dislike" theme={comment.isDisliked ? "filled" : "outlined"} />
                        {comment.dislikes || 0}
                      </a>
                    </span>
                  ]}
                />
              )
            }}
            loading={posting || loading}
            footer={!allLoaded && <a onClick={this.loadComments}>Load more...</a>}
          />
        ) : (
          <Empty
            description="No comments"
          />
        )}
        <Divider>Post a comment</Divider>
        <CommentForm user={user} busy={posting} createComment={this.createComment} />
      </>
    );
  }
}

const CommentForm = ({user, busy, createComment}) => {
  const [content, setContent] = useState("");
  const handleChange = useCallback(({ target: { value } }) => {
    setContent(value);
  }, [setContent]);

  const handleComment = useCallback(() => {
    createComment(content);
    setContent("");
  }, [content, createComment]);

  return (
    <Comment
      avatar={user.profileImageUrl}
      content={(
        <Form>
          <Form.Item>
            <TextArea
              rows={4}
              value={content}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item className="post-comment-actions">
            <Button
              type="primary"
              icon="edit"
              loading={busy}
              disabled={busy}
              onClick={handleComment}
            >
              Comment
            </Button>
          </Form.Item>
        </Form>
      )}
    />
  );
}

export default AuthConnect(CommentSection);
