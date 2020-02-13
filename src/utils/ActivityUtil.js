import { fetchAPI } from "./FetchUtil";
import ENDPOINTS from "../config/endpoints";

export function likePost(postId) {
  return fetchAPI(
    ENDPOINTS.LIKE_POST,
    "POST",
    { postId }
  );
}

export function unlikePost(postId) {
  return fetchAPI(
    ENDPOINTS.UNLIKE_POST,
    "POST",
    { postId }
  );
}

export function dislikePost(postId) {
  return fetchAPI(
    ENDPOINTS.DISLIKE_POST,
    "POST",
    { postId }
  );
}

export function undislikePost(postId) {
  return fetchAPI(
    ENDPOINTS.UNDISLIKE_POST,
    "POST",
    { postId }
  );
}

export function likeComment(commentId) {
  return fetchAPI(
    ENDPOINTS.LIKE_COMMENT,
    "POST",
    { commentId }
  );
}

export function unlikeComment(commentId) {
  return fetchAPI(
    ENDPOINTS.UNLIKE_COMMENT,
    "POST",
    { commentId }
  );
}

export function dislikeComment(commentId) {
  return fetchAPI(
    ENDPOINTS.DISLIKE_COMMENT,
    "POST",
    { commentId }
  );
}

export function undislikeComment(commentId) {
  return fetchAPI(
    ENDPOINTS.UNDISLIKE_COMMENT,
    "POST",
    { commentId }
  );
}
