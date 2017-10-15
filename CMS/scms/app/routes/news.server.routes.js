var NewController=require('../controllers/news.server.controller')

module.exports=function (app) {
    app.route('/news')
        .get(NewController.list)
        .post(NewController.create);

    app.route('/news/:nid')
        .get(NewController.get);

    app.param('nid',NewController.getById);
}