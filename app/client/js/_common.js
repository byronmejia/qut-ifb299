global.openNav = module.exports.openNav = function openNav() {
  document.getElementsByTagName("nav")[0].style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
};

global.closeNav = module.exports.closeNav = function closeNav() {
  document.getElementsByTagName("nav")[0].style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
};
