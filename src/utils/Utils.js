export default class Utils {
  static getTheme(themeNumber) {
    switch (themeNumber) {
      case "1":
        return "https://cdn.dribbble.com/users/329207/screenshots/4232597/2001_bemocs_sp_lunar_woods_dribbble_1x.jpg";
      case "2":
        return "https://cdn.dribbble.com/users/329207/screenshots/3364859/bemocs_rei_end_of_season_dribbble_1x.jpg";
      case "3":
        return "https://cdn.dribbble.com/users/329207/screenshots/3222707/bemocs_rei_january_clearance_dribbble_1x.jpg";
      case "4":
        return "https://cdn.dribbble.com/users/329207/screenshots/1805103/bemocs_space_dribbble_1x.jpg";
      case "5":
        return "https://cdn.dribbble.com/users/329207/screenshots/1928498/bemocs_nhm_seamobile_dribbble_1x.jpg";
      case "6":
        return "https://cdn.dribbble.com/users/5031/screenshots/3232835/owl-mikael-gustafsson-dribbble.gif";
      default:
        break;
    }
  }

  static getCostPerBlockInWei(){
    return 500000000000000; //0.0005 Ether
  }

  static getCostPerTokenInWei(){
    return 20000000000000; 
  }

  static getCostPerBlockInEther(){
    return 0.0005;
  }

  static getCostPerTokenInEther(){
    return 0.00002;
  }

  static getTokenRequiredPerBlock(numberOfBlock){
    return 1000 * parseInt(numberOfBlock);
  }
}
