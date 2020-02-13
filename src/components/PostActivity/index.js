import React from "react";
import { Icon } from "antd";

const buttonClass = "action-btn";
const activeButtonClass = buttonClass + " active";

export default function PostActivity(props) {
  const { 
    post, 
    isLiked, 
    isDisliked, 
    isComments, 
    onLike, 
    onUnlike, 
    onDislike, 
    onUndislike, 
    onComments 
  } = props;

  return (
    <div className="post-bottom">
      <a 
        className={isLiked ? activeButtonClass : buttonClass} 
        onClick={isLiked ? onUnlike : onLike}
      >
        <Icon type="like" theme={isLiked ? "filled" : "outlined"} /> <span className="likes">{post.likes || 0}</span>
      </a>
      <a 
        className={isDisliked ? activeButtonClass : buttonClass} 
        onClick={isDisliked ? onUndislike : onDislike }
      >
        <Icon type="dislike" theme={isDisliked ? "filled" : "outlined"} /> <span className="dislikes">{post.dislikes || 0}</span>
      </a>
      <a className="action-btn">
        <Icon type="dollar" theme="outlined" /> <span className="earned">{post.earned || 0}</span>
      </a>
      <a className="action-btn">
        <Icon type="eye" theme="outlined" /> <span className="views">{post.views || 0}</span>
      </a>
      { onComments &&
        <a className={isComments ? activeButtonClass : buttonClass} onClick={onComments}>
          <Icon type="message" theme={isComments ? "filled" : "outlined"} /> <span className="comments">comments</span>
        </a>
      }
    </div>
  );
}
