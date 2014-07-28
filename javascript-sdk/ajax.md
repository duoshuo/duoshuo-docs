## 发起API请求的方法

### DUOSHUO.API.ajax(method, apiPath, data, successCallback, errorCallback)
  *例子*
    // 在已经定义var duoshuoQuery，并加载了http://static.duoshuo.com/embed.js 的情况下
    var data = {thread_key : 123};
    var successCallback = function(json){
      // render json
    };
    var errorCallback = function(json){
      alert(json.message);
    };
    DUOSHUO.API.ajax('GET', 'threads/listPosts', data, successCallback, errorCallback);

### DUOSHUO.API.get(apiPath, data, successCallback, errorCallback)
  效果等同于DUOSHUO.API.ajax('GET', apiPath, data, successCallback, errorCallback)

### DUOSHUO.API.post(apiPath, data, successCallback, errorCallback)
  效果等同于DUOSHUO.API.ajax('POST', apiPath, data, successCallback, errorCallback)
