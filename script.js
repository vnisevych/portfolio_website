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

		  for (const album of albums) {

			const albumUrl = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos
				&api_key=${apiKey}
				&photoset_id=${album.id}
				&user_id=${usrId}
				&format=json&nojsoncallback=1`;

		  	$.ajax({
			  url: albumUrl,
			  context: document.body
			}).done(function(	) {
				console.log(resp);
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

				console.log(gallery);
			});
		  }

		});

		$('.col-md-4').on( 'click', (function() {
			$('#wrapper').toggleClass('gallery');
			console.log('ive changed my color');
		}));

		$('#btnBack').on( 'click', (function() {
			$('#wrapper').toggleClass('gallery');
			console.log('I pushed the btn')
		}));

		


	});

})(jQuery);