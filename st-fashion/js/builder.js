var STB = {
	init: function() {
		this.Main.init();
		if(window.shop.template == 'index'){
			this.Index.init();
		}
		if(window.shop.template == 'collection'){
			this.Collection.init();
		}
		if(window.shop.template == 'product'){
			this.Product.init();
		}
		if(window.shop.template == 'cart'){
			this.Cart.init();
		}
	},
	resize: function() {
		this.actionResize.init();
	},
	load: function() {
		this.loadPage.init();
	}
}
$(window).on('load', function(){
	STB.load();
})
$(document).ready(function() {
	STB.init();
})
$(window).on('load resize', function(){
	STB.resize();
})
/* js for all */
STB.Main = {
	init: function(){
		this.fastClick();
		this.actionAddCart();
		this.replaceImageLoop();
		this.scrollReplaceRegExpImg();
		this.menuAction();
	},
	fastClick: function(){
		$(function() {
			FastClick.attach(document.body);
		});
	},
	actionAddCart: function(){
		var $this = this;
		$(document).on('click','.Addcart', function(){
			var qty = 1,
					variantID = $(this).attr('data-variantid');
			$this.ajaxAddCart(qty,variantID,true);
		})
		$(document).on('click','#quick-view-modal .btn-addcart', function(){
			var qty = parseInt($('#quick-view-modal .form-input input[type=number]').val()),
					variantID = $('#quick-view-modal #p-select').val();
			$this.ajaxAddCart(qty,variantID,true);
			$('#quick-view-modal').modal('hide');
		})
	},
	ajaxAddCart: function(qty,id,target){
		var cartItem = parseInt($('#labelCartCount').text());
		var params = {
			type: 'POST',
			url: '/cart/add.js',
			data: 'quantity=' + qty + '&id=' + id,
			dataType: 'json',
			success: function(line_item) { 
				if(target){
					let total = cartItem + qty;
					$('.cartItemCount').html(total).attr('data-count',total).removeClass('hidden');
					if(total > 9 ){
						$('.cartItemCount').text('+9');
					}
					$('#addCartModal').modal('show');
				}else{
					window.location = '/checkout';
				}
			},
			error: function(XMLHttpRequest, textStatus) {
				Haravan.onError(XMLHttpRequest, textStatus);
			}
		};
		jQuery.ajax(params);
	},
	replaceImageLoop: function(){
		var imgArr = ['_thumb','_compact','_medium','_large'],
				time = 1500,
				index = 0,
				key = '_icon';
		var timeReplace = setInterval(function(){
			$('.imgLoopItem').each(function(){
				var imgSrc = $(this).attr('src'),
						imgReg = imgSrc.replace(key,imgArr[index]);
				$(this).attr('src',imgReg);
			})
			key = imgArr[index];
			index++;
			if( index >= imgArr.length ){
				$('.imgLoopItem').attr('data-reg',true).css('width','auto');
				clearInterval(timeReplace);
				return;
			}
		},time);
	},
	scrollReplaceRegExpImg: function(){
		var $imgEl = $('.imgLoopItem');
		$(window).scroll(function(){
			var sizeReplace = $('.imgLoopItem[data-reg="false"]').length;
			if(sizeReplace == 0){
				$imgEl.css('width','auto');
				return;
			}
			$imgEl.each(function(index, el){
				var src = $(el).attr('src'),
						regKey = /icon|thumb|compact|medium|large/gi,
						check = regKey.test(src);
				if(check){
					var regExp = src.replace(regKey, "large");
					$(el).attr({'data-reg': true, 'src': regExp});
				} 
			});
		})
	},
	menuAction: function(){
		$(document).on('click','.btnMBToggleNav, .closeNav, .overlayMenu', function(){
			$('body').toggleClass('openNav');
		});
		$(document).on('click','.navSiteMain ul.nav-navbar li a i', function(e){
			e.preventDefault();
			$(this).parent().toggleClass('open').next().slideToggle();
		});
	}
};
/* js for index */
STB.Index = {
	init: function(){
		this.slideBlogHome();
		this.bannerSlider();
		this.slideBlockHome();
		this.sliderBrandsHome();
	},
	slideBlogHome: function(){
		if($('.slideBlogHome').children().size() > 0 ){
			var owl = $('.slideBlogHome');
			owl.owlCarousel({
				items: 3,
				loop: false,
				autoplay: false,
				margin: 15,
				responsiveClass: true,
				dots: false,
				nav : true,
				navText: ['‹' , '›'],
				responsive: {
					0: {
						items: 1
					},
					320: {
						items: 1
					},
					480: {
						items: 1
					},
					767: {
						items: 2
					},
					992: {
						items: 3
					},
					1200: {
						items: 3
					}
				}
			});
			owl.find('.owl-prev').addClass('disabled')
			owl.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
				if (!event.namespace) return;
				var carousel = event.relatedTarget,
						element = event.target,
						current = carousel.current();
				$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
				$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
			})
		}
	},
	bannerSlider: function(){
		var owlslider = $('.bannerSlider');
		if(owlslider.children().size() > 1 ){
			owlslider.owlCarousel({
				items: 1,
				loop: false,
				autoplay: false,
				margin: 0,
				responsiveClass: true,
				dots: false,
				nav : true,
				navText: ['‹' , '›'],
			});
			owlslider.find('.owl-prev').addClass('disabled')
			owlslider.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
				if (!event.namespace) return;
				var carousel = event.relatedTarget,
						element = event.target,
						current = carousel.current();
				$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
				$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
			})
		}
	},
	slideBlockHome: function(){
		/* Banner */ 
		var owlSlideProduct = $('.homeBannerProduct');
		$.each(owlSlideProduct, function(i,el){
			if($(el).children().size() > 1 ){
				$(el).owlCarousel({
					items: 1,
					loop: false,
					autoplay: false,
					margin: 0,
					responsiveClass: true,
					dots: true,
					nav : false,
				});
				$(el).find('.owl-prev').addClass('disabled')
				$(el).on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
					if (!event.namespace) return;
					var carousel = event.relatedTarget,
							element = event.target,
							current = carousel.current();
					$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
					$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
				});
			}
		});
		/* Product */
		var slideProduct = $('.homeSlideProduct');
		$.each(slideProduct, function(i,el){
			if($(el).children().size() > 1 ){
				$(el).owlCarousel({
					items: 4,
					loop: false,
					autoplay: false,
					margin: 15,
					responsiveClass: true,
					dots: false,
					nav : true,
					navText: ['‹' , '›'],
					responsiveClass:true,
					responsive: {
						0: {
							items: 1
						},
						320: {
							items: 2
						},
						768: {
							items: 3
						},
						992: {
							items: 4,
							margin: 10,
						},
						1200: {
							items: 4
						}
					}
				});
				$(el).find('.owl-prev').addClass('disabled')
				$(el).on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
					if (!event.namespace) return;
					var carousel = event.relatedTarget,
							element = event.target,
							current = carousel.current();
					$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
					$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
				})
			}else{
				$(el).addClass('row').children().addClass('col-md-3 col-sm-6 col-xs-6');
			}
		})
	},
	sliderBrandsHome: function(){
		var owlBrands = $('.s-brand');
		if(owlBrands.children().size() > 1 ){
			owlBrands.owlCarousel({
				items: 6,
				loop: false,
				autoplay: true,
				autoplayTimeout:4000,
				responsiveClass: true,
				autoplayHoverPause:true,
				margin: 15,
				nav : true,
				navText: ['‹' , '›'],
				responsive: {
					0: {items: 2},
					450: {items: 3},
					550: {items: 4},
					767: {items: 5},
					992: {items: 6},
					1200: {items: 7}
				}
			});
			owlBrands.find('.owl-prev').addClass('disabled')
			owlBrands.on('initialized.owl.carousel changed.owl.carousel refreshed.owl.carousel', function (event) {
				if (!event.namespace) return;
				var carousel = event.relatedTarget,
						element = event.target,
						current = carousel.current();
				$('.owl-next', element).toggleClass('disabled', current === carousel.maximum());
				$('.owl-prev', element).toggleClass('disabled', current === carousel.minimum());
			})
		}
	}
	/*	slidePromotion: function(){
		var slidePromotion = $('.block-promotion');
		slidePromotion.owlCarousel({
			items: 1,
			loop: true,
			autoplay: false,
			margin: 15,
			responsiveClass: true,
			dots: true,
			nav : false,
		})
	},*/
};
/* js for collection */
STB.Collection = {
	init: function(){
		this.actionFilter();
		this.loadView();
		this.changeView();
	},
	actionFilter: function(){
		var $this = this;
		$('.check-box-list li > input').click(function(){
			jQuery(this).parent().toggleClass('active');
			var _url = $this.get_Query() + '&view=filter&page=1';
			$this.get_Product(_url);
		})
		$(document).on('click','.content_sortPagiBar.pagiFilter li a', function(e){
			e.preventDefault();
			$this.get_Product($(this).attr('href'))
		});
		$(document).on('click', '.fil_mobile a, .overlayFilter.filter', function(){
			$('body').toggleClass('open_drawer_filter');
		})
	},
	get_Product: function(str){
		jQuery.ajax({
			url : str,
			success: function(data){
				jQuery("#pd_collection").html(data);
				var $imgEl = $('.imgLoopItem');
				$imgEl.each(function(index, el){
					var src = $(el).attr('src'),
							regKey = /icon|thumb|compact|medium|large/gi,
							check = regKey.test(src);
					if(check){
						var regExp = src.replace(regKey, "large");
						$(el).attr({'data-reg': true, 'src': regExp});
					} 
				});
			}
		})
	},
	get_Query: function(){
		var _query = '', _price = '', _vendor = '', _color = '', _size = '', _id = '';
		_id = $('#coll-handle').val();
		var _str = '/search?q=filter=';
		_query = "("+_id+")";

		jQuery('.filter-price ul.check-box-list li.active').each(function(){
			_price = _price + jQuery(this).find('input').data('price') + '||';
		})
		_price=_price.substring(0,_price.length -2);
		if(_price != ""){
			_price='('+_price+')';
			_query+='&&'+_price;
		}

		jQuery('.filter-brand ul.check-box-list li.active').each(function(){
			_vendor = _vendor + jQuery(this).find('input').data('vendor') + '||';
		})
		_vendor=_vendor.substring(0,_vendor.length -2);

		if(_vendor != ""){
			_vendor='('+_vendor+')';
			_query+='&&'+_vendor;
		}

		jQuery('.filter-color ul.check-box-list li.active').each(function(){
			_color = _color + jQuery(this).find('input').data('color') + '||';
		})
		_color=_color.substring(0,_color.length -2);
		if(_color != ""){
			_color='('+_color+')';
			_query+='&&'+_color;
		}

		jQuery('.filter-size ul.check-box-list li.active').each(function(){
			_size = _size + jQuery(this).find('input').data('size') + '||';
		})
		_size=_size.substring(0,_size.length -2);
		if(_size != ""){
			_size='('+_size+')';
			_query+='&&'+_size;
		}
		_str += encodeURIComponent(_query);
		return _str;
	},
	changeView: function(){
		$(document).on('click','.view-product-list .display-product-option li', function(){
			$('#pd_collection').hide();
			$('.view-product-list .display-product-option li').removeClass('selected');
			$(this).addClass('selected');
			sessionStorage.page_view = $(this).data('view');
			if(sessionStorage.page_view.indexOf('view_grid') != -1 ){
				$('.filter').removeClass('view_list').addClass('view_grid');
			}else{
				$('.filter').removeClass('view_grid').addClass('view_list');
			}
			setTimeout(function(){
				$('#pd_collection').fadeIn(300);
				$(window).trigger('resize');
			},500)
		})
	},
	loadView: function(){
		$('.view-product-list .display-product-option li').removeClass('selected');
		if(sessionStorage.page_view == 'undefined' || sessionStorage.page_view == null){
			sessionStorage.page_view = 'view_grid';
		}
		if(sessionStorage.page_view == 'view_grid' ){
			$('.filter').removeClass('view_list').addClass('view_grid');
			$('.view-product-list .display-product-option li.view-as-grid').addClass('selected');
		}else{
			$('.filter').removeClass('view_grid').addClass('view_list');
			$('.view-product-list .display-product-option li.view-as-list').addClass('selected');
		}
	}
};
/* js for product */
STB.Product = {
	init: function(){
		this.imageFancybox();
		this.productAcction();
	},
	imageFancybox: function(){
		$("a.pdFancybox").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200
		});
	},
	productAcction: function(){
		/*jQuery('.contentRelatedPd').owlCarousel({
			items: 5,
			loop: false,
			autoplay: false,
			margin: 0,
			responsiveClass: true,
			nav : true,
			navText: ['‹' , '›'],
			responsive: {
				0: {
					items: 1
				},
				320: {
					items: 2
				},
				600: {
					items: 3
				},
				767: {
					items: 3
				},
				992: {
					items: 5
				},
				1200: {
					items: 5
				}
			}
		})*/
		$(".imgThumb a").click(function(){
			$(".imgThumb").removeClass('active');
			$(this).parents('li').addClass('active');
			$(".featureImg img").attr("src",$(this).attr("data-image"));
			$("a.pdFancybox").attr('href',$(this).attr("data-fancybox"));
		});
		if($('.shortDesc .desc').html().trim() == '' ){
			$('.shortDesc').hide()
		}
		$('.qtyControl').click(function(){
			var $parent = $(this).parent(),
					$input = $parent.find('#pdQuantity'),
					valIn = parseInt($input.val()),
					typePlus = $(this).hasClass('plus');
			if(typePlus){
				$input.val(valIn + 1);
			}else{
				if(valIn > 1){
					$input.val(valIn - 1);
				}
			}
		})
		if($('.pdTopIndex.random').size() > 0 ){
			$('#starNumber').html(Math.floor((Math.random() * 100) + 1));
		}
		$(document).on('click','.btn-addCart', function(){
			var qty = parseInt($('.wrapBlockInfo .groupQty input').val()),
					variantID = $('#product-select').val();
			STB.Main.ajaxAddCart(qty,variantID,true);
		})
		$(document).on('click','.btn-Buynow', function(){
			var qty = parseInt($('.wrapBlockInfo .groupQty input').val()),
					variantID = $('#product-select').val();
			STB.Main.ajaxAddCart(qty,variantID,false);
		})
	}
};
/* js for cart */
STB.Cart = {
	init: function(){
		this.actionCart();
	},
	actionCart: function(){
		$(document).on('keypress change','textarea#CartSpecialInstructions', function(){
			$.ajax({
				type: "POST",
				url: '/cart/update.js',
				data: {"note": $(this).val()},
				dataType: 'json',
				success: function() {

				} 
			});
		})
		$(document).on('change','.ajaxcart__qty-num',function(){
			var $this = $(this);
			var qty = $this.val();
			var id = $this.data('id');
			if( qty == 0){
				$this.val(1);
			}
			STB.Cart.updateCart(id,qty);
		});
	},
	updateCart: function (id,qty){
		var params = {
			type: 'POST',
			url: '/cart/change.js',
			data: 'quantity='+ qty +'&id=' + id,
			dataType: 'json',
			success: function(cart) {
				STB.Cart.updateMoney(id);
				$('.cartCount').html(cart.item_count);
			}
		};
		jQuery.ajax(params);
	},
	updateMoney: function(id){
		$.ajax({
			url : "/cart?view=mini",
			success: function(data){
				var parsed = $.parseHTML(data);
				console.log(parsed);
				$('.cartCount').attr('data-price', $(parsed).filter('.moneyNotF').val());
				$('.ajaxcart .list_button_cart p span.money').html($(parsed).filter('.wrap__total_money').val()); 
				$('.list_product_cart[data-id="'+id+'"] .cpro_item_inner .money_line span.money').html($(parsed).filter('.line_money_temp[data-id="'+id+'"]').val()); 
			}
		})
	}
};
/* js for resize */
STB.actionResize = {
	init: function(){
		//this.fixheightItem();
		if(window.shop.template == 'product' ){
			this.fixheightThumbProduct();
		}
	},
	fixheightItem: function(){
		$('.elementFixHeight').css('height','auto');
		setTimeout(function(){
			$('.elementFixHeight').each(function(i,el){
				var elWidth = $(el).width();
				$(el).height(elWidth);
			})
		},500)
	},
	fixheightThumbProduct: function(){
		var $el = $('.pdImgThumbs');
		if($el.size() > 0 ){
			$el.css('height','auto').removeClass('autoHeight');
			setTimeout(function(){
				var elHeight = $el.height(),
						feaHeight = $('#imgFeatured').height() + 70;
				if(elHeight > feaHeight){
					$el.css('height',$('#imgFeatured').height()).addClass('autoHeight');
				}
			},500)
		}
	},
}
/* js load page */
STB.loadPage = {
	init : function(){
		this.pageLoad();
	},
	pageLoad: function(){
		$('#insLoadpage').delay(1000).fadeOut('slow');
	}
}

