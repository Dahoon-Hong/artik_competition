
/*
 * GET home page.
 */


exports.index = function(req, res){
  res.render('index', { title: 'Your Smart POT' , name:'address_here'});
};
