// export const BASE_URL = process.env.REACT_APP_DEV_URL;
// export const BASE_URL = "http://localhost:51701";
export const BASE_URL = "http://bitonboarding-zack.azurewebsites.net";

export default {
  SIGN_UP: "/authentication/authentication/signup",
  SIGN_IN: "/authentication/authentication/signin",
  AUTHENTICATED: "/authentication/authentication/getUser",
  CHECK_ACCOUNT_CREATED: "/authentication/authentication/checkAccountCreated",
  CREATE_COUNTRY: "/country/country/createCountry",
  GET_COUNTRIES: "/country/country/getCountries",
  GET_COUNTRIES_BY_USER: "/country/country/getCountriesByUser",
  GET_COUNTRY_BY_TOPIC: "/country/country/getCountryByTopic",
  GET_COUNTRY: "/country/country/getCountry",
  SEARCH_COUNTRIES: "/country/country/search",
  PURCHASE_BLOCK: "/country/country/purchaseBlock",
  GET_BLOCKS_BY_COUNTRY: "/country/country/getBlocksByCountry",
  GET_BLOCK_BY_ID: "/country/country/getBlockById",
  GET_SURROUNDING_BLOCKS_BY_BLOCK: "/country/country/getSurroundingBlocksByBlock",
  GET_WELCOME_MESSAGE: "/country/country/getWelcomeMessage",
  UPDATE_WELCOME_MESSAGE: "/country/country/updateWelcomeMessage",
  SEND_INVITATION_EMAIL: "/email/email/sendInvitationEmail",
  CREATE_TOPIC: "/post/post/createTopic",
  CREATE_POST: "/post/post/createNewPost",
  UPDATE_POST_PHOTO: "/post/post/updatePhoto", // TODO: Currently unimplemented
  GET_POSTS: "/post/post/getPosts",
  GET_POST_BY_ID: "/post/post/getPostById",
  LIKE_POST: "/post/post/likePostById",
  UNLIKE_POST: "/post/post/unlikePostById",
  DISLIKE_POST: "/post/post/dislikePostById",
  UNDISLIKE_POST: "/post/post/undislikePostById",
  GET_COMMENTS_BY_POST: "/post/post/getCommentsByPostId",
  CREATE_COMMENT: "/post/post/createNewComment",
  LIKE_COMMENT: "/post/post/likeCommentById",
  UNLIKE_COMMENT: "/post/post/unlikeCommentById",
  DISLIKE_COMMENT: "/post/post/dislikeCommentById",
  UNDISLIKE_COMMENT: "/post/post/undislikeCommentById",
  GET_USER: "/authentication/authentication/getUser",
  GET_TOKEN_BALANCE: "/profile/profile/getTokenBalance",
  GET_RULES_BY_COUNTRY: "/country/country/getActivityRules",
  UPDATE_RULES: "/country/country/updateActivityRules"
};
