(function($) {

	const apiKey = 'c1caddf982cc2a732e21250a70fe4ab6';
	const usrId = '190730062%40N03';
	const gallery = {};

	const albums = `https://www.flickr.com/services/rest/?method=flickr.photosets.getList
		&api_key=${apiKey}
		&user_id=${usrId}
		&format=json&nojsoncallback=1`;

	$(document).ready(function () {

		$.ajax({
		  url: albums,
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

				for (photo of photos) {
					const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
					gallery[id].photos.push(imgUrl);
				}
			});
		  }

		});

		$( "#wrapper" ).delegate( ".col-md-4", "click", function(e) {
			const id = $(e.target).closest('.col-md-4').attr('data-id');
			fillGallery(id);
			$('#wrapper').toggleClass('gallery');
		});

		$('#btnBack').on( 'click', (function() {
			$('#wrapper').toggleClass('gallery');
			clearCarousel();
		}));

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
							<p class="card-text">San Francisco Bay Area</p>
						</div>
					</div>
				</div>
			`).appendTo('.category');
		}
	}

	function fillGallery(id) {
		if(gallery[id] && gallery[id].photos) {
			const imgs = gallery[id].photos;
			for(var i=0 ; i < imgs.length ; i++) {
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
	}

	function clearCarousel() {
		$('.carousel-inner').html('');
		$('.carousel-indicators').html('');
	}
})(jQuery);