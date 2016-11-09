
$(document).ready(function(){

	$wrapperDesktop = $('.bnr-desktop');
	$wrapperMobile = $('.bnr-mobile');

	var banners = [
		{
			bannerDesktop: 'banner-bf-1.jpg',
			bannerMobile: 'm-banner-bf-1.jpg',
			startDate: '2016/11/09 19:24:00'
		}, {
			bannerDesktop: 'banner-bf-2.jpg',
			bannerMobile: 'm-banner-bf-2.jpg',
			startDate: '2016/11/09 19:25:00'
		}, {
			bannerDesktop: 'banner-bf-3.jpg',
			bannerMobile: 'm-banner-bf-21.jpg',
			startDate: '2016/11/09 19:26:00'
		}
	];

	function startCountDown(startDate) {
		$('.countdown-discount').countdown(startDate)
			.on('update.countdown', function(event) {
				var format = '%H:%M:%S';
				if(event.offset.totalDays > 0) {
					format = '%-d day%!d ' + format;
				}
				if(event.offset.weeks > 0) {
					format = '%-w week%!w ' + format;
				}
				$(this).html(event.strftime(format));
			}).on('finish.countdown', function(event) {
				initBannerDay();
			});
	}

	function initBannerDay() {
		console.log('init...');
		var index = searchBannerDay();
		console.log('inti banner index', index);
		if (index > -1) {
			changeBanner(index);
		}
	}

	function changeBanner(index) {
		console.log('changeBaneer', banners[index]);
		$wrapperDesktop.css('background', 'url(' + banners[index].bannerDesktop + ') no-repeat' );
		$wrapperMobile.css('background', 'url(' + banners[index].bannerMobile + ') no-repeat' );
		if (banners[index+1]) {
			startCountDown(banners[index+1].startDate);
		}
	}

	function searchBannerDay() {
		var now = moment();
		var size = banners.length;

		for (var i = 0; i < size; i++) {
			console.log('search find', now.isSame( moment(banners[i].startDate), 'minute' ), banners[i]);

			if(now.isSame( moment(banners[i].startDate), 'minute' )) {
				return i;
			}
		}

		return null;
	}


	initBannerDay();
});


