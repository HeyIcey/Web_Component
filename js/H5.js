var H5 = function () {
	this.id = ('h5_'+Math.random()).replace('.','_');
	this.el = $('<div class = "h5" id="'+this.id+'">').hide();
	this.page = [];
	$('body').append(this.el);
	/**
	 * [addPage 新增一个页]
	 * @param {[string]} name [组件的名称，会加入到ClassName中]
	 * @param {[string]} text [页内的默认文本]
	 * @return {h5} [h5对象， 可以重复使用H5对象支持的方法]
	 */
	this.addPage = function(name,text){
		var page = $('<div class="h5_page section">');
		if(name!=undefined){
			page.addClass('h5_paage_'+name);
		}
		if(text!=undefined){
			page.text(text);
		}
		this.el.append(page);
		this.page.push(page);
		if(typeof this.whenAddPage === 'function'){
			this.whenAddPage();
		}
		return this;
	};
	/**
	 * [addComponent description]
	 * @param {[type]} name [description]
	 * @param {[type]} cft  [description]
	 */
	this.addComponent = function(name,cfg){
		var cfg = cfg || {};
		cfg = $.extend({
			type:'base'
		},cfg);
		var component; //定义一个变量 存储 组件元素
		var page = this.page.slice(-1)[0];
		switch(cfg.type){
			case 'base':
				component  = new H5ComponentBase(name,cfg);
				break;
			case 'polyline':
				component  = new H5ComponentPolyline(name,cfg);
				break;
			case 'pie':
				component  = new H5ComponentPie(name,cfg);
				break;
			case 'bar':
				component  = new H5ComponentBar(name,cfg);
				break;
			case 'bar_v':
				component  = new H5ComponentBar_v(name,cfg);
				break;
			case 'radar':
				component  = new H5ComponentRadar(name,cfg);
				break;
			case 'ring':
				component  = new H5ComponentRing(name,cfg);
				break;
			case 'point':
				component  = new H5ComponentPoint(name,cfg);
				break;
			default:
				break;
		};
		page.append(component);
		return this;
	};
	/*H5对象初始化呈现*/
	this.loader = function(firstPage){
		this.el.fullpage({
			onLeave: function(index,nextIndex,direction){//当前页面离开时的回调
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(anchorLink,index,nextIndex,direction){//当前页面加载完成后的回调
				$(this).find('.h5_component').trigger('onLoad');
			}
		});		
		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	};
	return this;
};