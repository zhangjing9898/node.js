angular.module('webapp')
    .controller('NewsController',['$scope','NewsService',NewsController]);

//scope 是模型。
//scope 是一个 JavaScript 对象，带有属性和方法，这些属性和方法可以在视图和控制器中使用。

function NewsController($scope,NewsService) {
    $scope.list=[];
    $scope.current={};
    $scope.new={};

    $scope.save=function () {
        if(!$scope.new.title){
            $scope.editorMessage='Title is required';
            return;
        }

        if(!$scope.new.content){
            $scope.editorMessage='Content is required';
            return;
        }

        $scope.editorMessage='';

        NewsService.save($scope.new).then(
            function (data) {
                $("#modal-editor").modal('hide');
                $scope.loadNews();
            },
            function (err) {
                $scope.editorMessage=err;
            }
        );
    };

    $scope.createNews=function () {
        $("#modal-editor").modal("show");
    };

    $scope.openNewsDetail=function (id) {
        $scope.loadDetail(id);
        $('#modal-detail').modal("show");
    };
    
    $scope.loadDetail=function (id) {
        // console.log("id:"+id);
        NewsService.detail(id).then(
            function (data) {
                console.log(data);
                $scope.current=data;
                console.log($scope.current);
            },
            function (err) {}

        )
    };
    
    $scope.formatTime=function (time) {
        return moment(time).format('l');
    };
    
    $scope.loadNews=function () {
        NewsService.list().then(
            function (data) {
                $scope.list=data;
            },
            function (err) {

            }
        )
    };

    $scope.loadNews();


}