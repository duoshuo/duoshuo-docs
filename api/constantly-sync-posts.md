###**接口名**

/log/list.json

###**接口说明**
该接口通过记录列表，来获取评论和评论状态变化。注意，该接口只会同步通过多说评论框或后台发布的评论及相关评论的状态变更。对于通过导入或同步进的评论，并不能通过该接口返回网站数据库。**无需开通，站点可以直接使用**，来实现同步。请参考页底的示例程序。  
同时，该接口可应用于实时同步回本地数据库功能：多说提供的Wordpress和DedeCMS插件中，多说会在用户发表评论和评论状态变更时，向站点预留的站点回调api接口地址发送请求。从而使网站在第一时间将评论数据同步回本地数据库。  
其他插件及通用站点如果需要开通实时写回功能，请在多说后台的工具->反向同步中设置你的回调地址。

###**URL**
http://api.duoshuo.com/log/list.`返回格式`

返回格式支持：`json`,`jsonp`

###**HTTP请求方式**
GET

###**是否需要登录**
否

###**请求参数**

**`short_name`** *string* 必须
    
站点注册的多说二级域名。注意：你注册了http://apitest.duoshuo.com/时，多说二级域名为**apitest**。

**`secret`** *string* 必须

站点密钥。

**`since_id`** *int64* 可选
    
同步开始的记录id，默认为`0`。请注意，`since_id` 为64位二进制整数，MySQL 数据类型建议定义为 bigInt。请单独保存已经同步的最后一个 `log_id`，作为下次的 `since_id`。注意，`log_id` 和评论的 `post_id` 并不是一个值，对于站长来说`log_id`仅用于记录下次获取log时的起始点。

**`limit`** *int* 可选
    
最大条数，范围`1 ~ 200`，默认值为`50`。

**`order`** *string* 可选
    
排序方式。`asc`：从旧到新；`desc`：从新到旧；默认为`asc`。

###**请求示例**

`http://api.duoshuo.com/log/list.json?short_name=apitest&secret=xxxxxxxx`

###**返回数据示例**

	{
		"code":0,
		"response":
		[{
			"log_id":"777888",
			"user_id":"378928",
			"action":"create",
			"meta":{
					"post_id":"7511238",
					"thread_id":"3118382",
					"author_id":"378928",
					"author_name":"多说小武",
					"author_email":"xiaowu@duoshuo.com",
					"author_url":"http://weibo.com/u/2472294147",
					"author_key":"12",
					"ip":"222.130.10.10",
					"created_at":"2012-07-13T21:58:13+08:00",
					"message":"联句每言松竹意，停杯多说古今人。",
					"status":"approved",
					"type":"",
					"parent_id":"0",
					"thread_key":"108"
				},
			"date":1342187893
		},
		{
			"log_id":"888999",
			"user_id":"378928",
			"action":"delete",
			"meta":["6142557","7511532","8511993","9621469"],
			"date":1342378758
		}]
	}

###**返回数据参数说明**

**`code`** *int* 一定返回
    
结果码。`0`为成功。失败时为错误码。

**`errorMessage`** *string*
    
错误消息。当code不为`0`时，返回错误消息。

**`response`** *object* 
    
多说api返回结果中，通常在`response`中含有主要返回数据。当code为`0`时返回。

####**response中的主要参数说明**

**`log_id`** *int64* 一定返回

记录id。按时间顺序递增。

**`user_id`** *int* 一定返回

执行该操作的用户id。

**`action`** *string* 一定返回

操作类型。

    可选值：
    create  创建评论
    approve  通过评论
    spam  标记垃圾评论
    delete  删除评论
    delete-forever  彻底删除评论

**`meta`** *object/array* 一定返回

根据操作类型不同，`meta`的类型会有变化。

当`action`为`approve,spam,delete,delete-forever`之一时，`meta`为array。数组每一个项为一条评论的id。

当`action`为`create`时，`meta`为object。为新创建的评论信息。下面为评论信息参数

**`post_id`** *int64* 一定返回

评论id。请注意，post_id为64位二进制整数，MySQL数据类型建议定义为bigInt。

**`thread_id`** *int64* 一定返回

文章在多说的id。请注意，thread_id为64位二进制整数，MySQL数据类型建议定义为bigInt。

**`thread_key`** *char* 一定返回

文章在原站点的文章标识。无记录时，为`NULL`；

**`author_id`** *int* 一定返回

作者在多说的id。0表示匿名用户。

**`author_name`** *string* 一定返回

作者显示名。有可能为空。

**`author_email`** *string* 一定返回

作者邮箱。有可能为空字符串。

**`author_url`** *string* 可能返回

作者网址。有可能为空字符串。

**`author_key`** *string* 可能返回

作者在网站中对应的id。有可能为0。

**`ip`** *string* 一定返回

作者ip地址。格式为`*.*.*.*`

**`created_at`** *string* 一定返回

评论创建日期，格式示例：`2012-07-13T21:58:13+08:00`。

**`message`** *string* 一定返回

评论内容。请注意截取。

**`status`** *string* 一定返回

评论状态。创建评论时，可能的状态：`approved`：已经通过；`pending`：待审核；`spam`：垃圾评论。

**`parent_id`** *int64* 一定返回

父评论id。请注意，thread_id为64位二进制整数，MySQL数据类型建议定义为bigInt。

**`type`** *string* 一定返回

类型。现在均为空。

**`date`** *int* 一定返回

执行该操作的时间戳。

多说已经为php和python提供了sdk和部分已开发插件作为示例，请查看：  
[我们的Github](https://github.com/duoshuo/)

###**实时同步说明：**
开通实时同步写回功能后，例如站点预留了`http://blog.apitest.com/wp-content/duoshuo/api.php`这个api地址

当有用户在站点文章页中发表评论时，我们会向该地址发起一个post请求，请求包含两个参数：

**`action`** *string* 

    同步动作，一定为'sync_log'

**`signature`** *string* 

    签名，为多说密钥和其他参数进行base64处理后的签名。

请站点在处理时，务必做好签名匹配

签名匹配请参照：[https://github.com/duoshuo/duoshuo-wordpress/blob/master/duoshuo/LocalServer.php](https://github.com/duoshuo/duoshuo-wordpress/blob/master/duoshuo/LocalServer.php) dispatch 函数

站点匹配签名成功后，即可确认有新评论或评论处理，通过访问/log/list.json来获取新内容。请站点自行保存好已经成功的`log_id`，用作以后的`since_id`参数

```php
    $secret = '基本设置当中查看';
    $short_name = '基本设置当中查看';
    $last_log_id = '上传同步是读到的ID，开发者自行维护此变量（如保存在你的数据库）。';

    /**
     *
     * 获取评论数据
     *
     */
    function sync_log() {
        if (check_signature($_POST)) {

            $limit = 20;

            $params = array(
                'limit' => $limit,
                'order' => 'asc',
            );


            $posts = array();

            if (!$last_log_id)
                $last_log_id = 0;

            $params['since_id'] = $last_log_id;
            //自己找一个php的 http 库
            $response = $http_client->request('GET', 'http://api.duoshuo.com/log/list.json', $params);

            if (!isset($response['response'])) {
                //处理错误,错误消息$response['message'], $response['code']
                //...
                
            } else {
                //遍历返回的response，你可以根据action决定对这条评论的处理方式。
                foreach($response['response'] as $log){

                    switch($log['action']){
                        case 'create':
                            //这条评论是刚创建的
                            break;
                        case 'approve':
                            //这条评论是通过的评论
                            break;
                        case 'spam':
                            //这条评论是标记垃圾的评论
                            break;
                        case 'delete':
                            //这条评论是删除的评论
                            break;
                        case 'delete-forever':
                            //彻底删除的评论
                            break;
                        default:
                            break;
                    }

                    //更新last_log_id，记得维护last_log_id。（如update你的数据库）
                    if (strlen($log['log_id']) > strlen($last_log_id) || strcmp($log['log_id'], $last_log_id) > 0) {
                        $last_log_id = $log['log_id'];
                    }

                }


            }


        }
    }

    /**
     *
     * 检查签名
     *
     */
    function check_signature($input){
        
        $signature = $input['signature'];
        unset($input['signature']);

        ksort($input);
        $baseString = http_build_query($input, null, '&');
        $expectSignature = base64_encode(hmacsha1($baseString, $secret));
        if ($signature !== $expectSignature) {
            return false;
        }
        return true;
    }

    // from: http://www.php.net/manual/en/function.sha1.php#39492
    // Calculate HMAC-SHA1 according to RFC2104
    // http://www.ietf.org/rfc/rfc2104.txt
    function hmacsha1($data, $key) {
        if (function_exists('hash_hmac'))
            return hash_hmac('sha1', $data, $key, true);

        $blocksize=64;
        if (strlen($key)>$blocksize)
            $key=pack('H*', sha1($key));
        $key=str_pad($key,$blocksize,chr(0x00));
        $ipad=str_repeat(chr(0x36),$blocksize);
        $opad=str_repeat(chr(0x5c),$blocksize);
        $hmac = pack(
                'H*',sha1(
                        ($key^$opad).pack(
                                'H*',sha1(
                                        ($key^$ipad).$data
                                )
                        )
                )
        );
        return $hmac;
    }
```
