$( document ).ready( function() {
	// tus funciones/metodos ejemplo
	// cuando le den click en el text de titulo
	// crecera 50px y se ira al centro
	$( '#init-title' ).on( 'click', function() {
		$( this ).css({
			'font-size': '50px',
			'text-align': 'center'
		});
	});
});