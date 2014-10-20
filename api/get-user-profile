###**接口名称**
/users/profile 

###**接口说明**
获取多说用户信息。

###**URL**
http://api.duoshuo.com/users/profile.`返回格式`

返回格式支持：`json`, `jsonp`

###**HTTP请求方式**
GET

###**是否需要登陆**
否

###**请求参数**
`user_id` *string*  **必须**
用户id

###**请求示例**
http://api.duoshuo.com/users/profile.json?user_id=378333

###**返回数据示例**

```javascript
{
	"response": {
		"user_id": "378333",
		"name": "欢喜佛祖",
		"url": "http:\/\/t.qq.com\/hsu5199",
		"avatar_url": "http:\/\/app.qlogo.cn\/mbloghead\/d4aab6bf54582d4f7a18\/50",
		"threads": 0,
		"comments": 0,
		"social_uid": {
			"qq": "83B14496C07AFD09ABA30EE8BA7A284C"
		},
		"post_votes": "0",
		"connected_services": {
			"qqt": {
				"name": "欢喜佛祖",
				"email": "602532062@qq.com",
				"avatar_url": "http:\/\/app.qlogo.cn\/mbloghead\/d4aab6bf54582d4f7a18\/50",
				"url": "http:\/\/t.qq.com\/hsu5199",
				"description": "我是台湾台北人現定居大連，所有了解我認識我的朋友們都叫我(佛祖)，所以您叫我(佛祖)这名稱就好，我个人處世之道嗎！就是：人與人相處之道,誠信相交,以誠相待,信義為本.....",
				"service_name": "qqt"
			},
			"qzone": {
				"name": "欢喜佛祖",
				"avatar_url": null,
				"service_name": "qzone"
			}
		}
	},
	"code": 0
}
```

### **返回数据参数说明**
`code` *int* 一定返回

结果码。`0`为成功。失败时为错误码。

`errorMessage` *string*

错误消息。当code不为`0`时，返回错误消息。

`response` *object* 

json对象。当code为`0`时，返回请求到的json对象。


