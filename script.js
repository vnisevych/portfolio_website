(function($) {

	const apiKey = 'c1caddf982cc2a732e21250a70fe4ab6';
	const usrId = '190730062%40N03';

	//object that will store the id of albums and photos in them;
	const gallery = {};

	const albumsUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getList
	&api_key=${apiKey}
	&user_id=${usrId}
	&format=json&nojsoncallback=1`;

	$(document).ready(function () {

		//ajax call that returns promise with response
		$.ajax({
			url: albumsUrl,
			context: document.body
		}).done(function(resp) {
			const albums = resp.photosets.photoset;

			fillCategories(albums);

			for (const album of albums) {

				const albumUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos
				&api_key=${apiKey}
				&photoset_id=${album.id}
				&user_id=${usrId}
				&format=json&nojsoncallback=1`;

				$.ajax({
					url: albumUrl,
					context: document.body
				}).done(function(resp) {
					const photos = resp.photoset.photo;
					const title = resp.photoset.title;
					const id = resp.photoset.id;

					gallery[id] = {
						title,
						photos: []
					};

					for (const photo of photos) {
					//created this link using template on flickr API (b stands for img size)
					const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
					//filling photos array with images recieved from flickr
					gallery[id].photos.push(imgUrl);
				}
			});
			}

		});

		//using Jquery method delegate to set click on dinamic element 
		$("#wrapper").delegate( ".col-md-4", "click", function(e) {
			const id = $(this).attr('data-id');
			fillGallery(id);
			$('#wrapper').toggleClass('gallery');
		});

		//back button onclick event - removing class gallery and clearing carousel
		$('#btnBack').on( 'click', (function() {
			$('#wrapper').toggleClass('gallery');
			clearCarousel();
		}));

		//setting click event on buttons left and right for carousel
		$( "#wrapper" ).delegate('.carousel-control-prev', 'click', function() {
			$('#carousel-example-generic').carousel('prev');
		});
		$( "#wrapper" ).delegate('.carousel-control-next', 'click', function() {
			$('#carousel-example-generic').carousel('next');
		});


	});

	function fillCategories(categories) {
		for(let category of categories) {
			const imgUrl = `https://live.staticflickr.com/${category.server}/${category.primary}_${category.secret}_n.jpg`;
			$(`
				<div class="col-md-4" data-id="${category.id}">
				<div class="card mb-4 shadow-sm" style="background-image: url(${imgUrl})">
				<div class="card-body">
				<p class="card-text">${category.title._content}</p>
				</div>
				</div>
				</div>
				`).appendTo('.category');
		}
	}

	function fillGallery(id) {
		if(!gallery[id] || !gallery[id].photos) {
			return;
		}
		const imgs = gallery[id].photos;

		//filling the gallery with photos and indicators
		for(let i=0 ; i < imgs.length ; i++) {
			$(`
				<div class="carousel-item">
				<img src="${imgs[i]}" class="d-block w-100" />
				</div>
				`).appendTo('.carousel-inner');
			$('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');

		}

		$('.carousel-item').first().addClass('active');
		$('.carousel-indicators > li').first().addClass('active');
		$('#carousel-example-generic').carousel();
	} 

	function clearCarousel() {
		$('.carousel-inner').html('');
		$('.carousel-indicators').html('');
	}
})(jQuery);