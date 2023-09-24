const $showMsg = function(title = "加载失败",duration = 1500,icon = "none"){
	this.showToast({
		title,
		icon,
		duration
	})
	
}

export default $showMsg