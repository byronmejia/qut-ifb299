/**
 * Created by byron on 30/07/2016.
 */

module.exports=function(app){
    app.get('/',function(req,res){
        res.send('Hello heroku');
    });
};