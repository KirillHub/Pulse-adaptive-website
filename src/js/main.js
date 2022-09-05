'use strict';

$(document).ready(function () {
	$('.carousel__inner').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 300,

		prevArrow: '<button type="button" class="slick-prev"><img src="./src/../img/watch-block/left-arrow.png"></img></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="./src/../img/watch-block/right-arrow.png"></img></button>',

		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: true
				}
			}
		]
	});

	$(window).resize(() => {
		let window_width = $(window).width();

		if (window_width > 1024) {
			$('button.slick-prev').empty().append('<img src="./src/../img/watch-block/left-arrow.png"></img>');
			$('button.slick-next').empty().append('<img src="./src/../img/watch-block/right-arrow.png"></img>');
			$('button.slick-prev').css({ width: "31", height: "50", display: "inline" })
		} else {
			$('button.slick-prev > img').remove();
			$('button.slick-next > img').remove();
		};
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active')
			.eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleFunc(className) {
		$(className).each(function (i) {
			$(this).on('click', (event) => {
				event.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
			})
		});
	};

	toggleFunc('.catalog-item__back');
	toggleFunc('.catalog-item__link');

	// Modal
	$('[data-modal=consultation]').on('click', () => {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', () => {
		$('.overlay, #consultation, #thanks, #order').fadeOut('fast');
	});


	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	const direction = (event) => {
		if (event.keyCode == 27) {
			$('.overlay, #consultation, #thanks, #order').fadeOut('fast');
		}
	};
	$('#consultation, overlay, #thanks, #order ').on('keydown', direction);


	function valideForms(form) {

		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: {
					required: true,
					minlength: 10
				}
			},

			messages: {
				name: {
					required: "Это обязательное поле",
					minlength: jQuery.validator.format("Имя не может содержать меньше {0} символов!"),
				},
				phone: {
					required: "Это обязательное поле",
					minlength: jQuery.validator.format("Введите полный номер телефона из {0} символов!")
				},
				email: {
					required: "Это обязательное поле",
					email: "Не верный формат адреса электронной почты"
				}
			}
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	// валидация формы, проверка отправки писем на бэк
	$('form').submit((e) => {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(() => {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$("form").trigger('reset');
		});
		return false;
	});


	// Smooth scroll and pageup:
	$(window).scroll(() => $(this).scrollTop() > 1600 ? $('.pageup').fadeIn() :
		$('.pageup').fadeOut());


	new WOW().init();
});


