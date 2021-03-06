///^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1
var classNameHelper={
	none:'none',//display:none
	contentWidth1:'contentWidth1',//ratingSection2出现时的高度
	contentWidth2:'contentWidth2',//ratingSection3出现时的高度
	fadeOut:'ratingSectionDisappear',//ratingSection消失时的动画
	fadeIn: 'ratingSectionAppear',//ratingSection出现时的动画
	errorText: 'intelligent-error',//错误字
	loginErrorText: 'login-error'
};//定义所需样式class
function loginInit(){
	var loginButton=document.getElementsByClassName('login')[0],
	registerButton=document.getElementsByClassName('register')[0];
	cancelButton=document.getElementById('cancel-btn');
	loginUser=document.getElementById('account'),
	loginConfirmButton=document.getElementById('come');
	cancelButton.addEventListener('click',function(){window.location.href="file:///F:/school/class-social-contaction/login.html"},false);
	loginButton.addEventListener('click',function(){swapToSection('section1')},false);
	registerButton.addEventListener('click',function(){swapToSection('section2')},false);
	loginUser.addEventListener('blur',isDataCorrect,false);
	loginUser.addEventListener('focus',removeErrorFormat,false);
	loginConfirmButton.addEventListener('click',ajaxCheck,false);
}
function swapToSection(section){
	var sectionName,tempNode,contentWidth;
	switch(section){
		case 'section1':
			sectionName='ratingSection2';
			contentWidth=classNameHelper.contentWidth1;
		break;
		case 'section2':
			sectionName='ratingSection3';
			contentWidth=classNameHelper.contentWidth2;
		break;
	}
	tempNode=document.getElementById(sectionName);
	content=document.getElementById('content');
	ratingSection1=document.getElementById('ratingSection1');
	DOMhelp.cssjs('add',ratingSection1,classNameHelper.fadeOut);
	ratingSection1.addEventListener('animationend',function(){DOMhelp.cssjs('add',ratingSection1,classNameHelper.none);DOMhelp.cssjs('remove',tempNode,classNameHelper.none);},false);
	DOMhelp.cssjs('add',content,contentWidth);
	DOMhelp.cssjs('add',tempNode,classNameHelper.fadeIn);
}//登录注册切换
//登录验证
function isDataCorrect(e){
	var target=e.target,
	targetValue=target.value,
	errorLabel=document.getElementById('email_error');
	if (targetValue.search(/^\w+@\w+\.\w+\.?\w*$/)==-1) {
		errorLabel.innerHTML="邮箱格式不正确";
		DOMhelp.cssjs('add',errorLabel,classNameHelper.errorText);
	}
	else{
		removeErrorFormat();
	}
}
//移除错误提示
function removeErrorFormat(){
	var 
	errorLabel=document.getElementById('email_error'),
	loginErrorLabel=document.getElementById('login-error-label');
	errorLabel.innerHTML="";
	loginErrorLabel.innerHTML="";
	DOMhelp.cssjs('remove',loginErrorLabel,classNameHelper.loginErrorText);
	DOMhelp.cssjs('remove',errorLabel,classNameHelper.errorText);
}
//登录提交&验证
function ajaxCheck(e){
	var loginUser=document.getElementById('account'),
	loginPasswd=document.getElementById('password'),
	userValue=loginUser.value,
	password=loginPasswd.value;
	if (userValue!=''&&password!='') {
		password=MD5(password);
		var loginReq = new XMLHttpRequest();
			loginReq.onreadystatechange = function(){//登录ajax验证
				if(loginReq.readyState=4 && loginReq.status == 200){
					responseObject=JSON.parse(loginReq.responseText);
					if (responseObject.restate==="true") {
						/*________________________________*/
					}
					else{
						DOMhelp.cancelClick(e);
						loginErrorLabel=document.getElementById('login-error-label');
						DOMhelp.cssjs('add',loginErrorLabel,classNameHelper.loginErrorText);
						loginErrorLabel.innerHTML="用户名或密码错误";
					}
				}
				else{
					DOMhelp.cancelClick(e);
						loginErrorLabel=document.getElementById('login-error-label');
						DOMhelp.cssjs('add',loginErrorLabel,classNameHelper.loginErrorText);
						loginErrorLabel.innerHTML="对不起，网络请求错误，请稍后再试";
				}
			}
		loginReq.open("POST","./php/getdata.php?action=log_in",true);
		loginReq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		loginReq.send("email="+userValue+"passwd="+password);
	};
	DOMhelp.cancelClick(e);
}
window.addEventListener('load',loginInit,false);