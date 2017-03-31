# 实现redmine的下拉框搜索

## 方法一
使用了chosen插件：https://harvesthq.github.io/chosen/

实现步骤
### 1、下载该插件

### 2、添加文件到项目目录中
* 将 `chosen.jquery.js` 文件添加到 `./apps/redmine/htdocs/public/javascripts/`
* 将 `chosen.css、chosen-sprite.png` 添加到 `./apps/redmine/htdocs/public/stylesheets/`  

### 3、引入js文件
* 编辑—— `./apps/redmine/htdocs/app/helpers/application_helper.rb`
* 在下面方法处加入：
```js
def javascript_heads
	tags = javascript_include_tag('jquery-1.11.1-ui-1.11.0-ujs-3.1.1', 'application', 'chosen.jquery')
	unless User.current.pref.warn_on_leaving_unsaved == '0'
	  tags << "\n".html_safe + javascript_tag("$(window).load(function(){ warnLeavingUnsaved('#{escape_javascript l(:text_warn_on_leaving_unsaved)}'); });")
	end
	tags
end
```

### 4、引入css文件
* 编辑—— `./apps/redmine/htdocs/app/views/layouts/base.html.erb`		
* 在 `<head>` 标签处加入：
```css
<%= stylesheet_link_tag 'chosen', :media => 'all' %>
```
### 5、实现
* 在 `./apps/redmine/htdocs/public/javascripts/application.js` 文件中添加实现


## 方法二
1、加入拼音支持

2、实现
* 在 `./apps/redmine/htdocs/public/javascripts/application.js` 文件中添加实现
