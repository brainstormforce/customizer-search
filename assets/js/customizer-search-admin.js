( function( $ ) {

	var searchInputSelector = '#customizer-search-input';

	/**
	 * Handles logic for the admin customize interface.
	 *
	 * @class CustomizerSearchAdmin
	 * @since 1.0.0
	 */
	CustomizerSearchAdmin = {

		/**
		 * Initializes the admin customize interface.
		 *
		 * @since 1.0.0
		 * @access private
		 * @method _init
		 */
		_init: function()
		{
			this._bind();
			var searchArray = this._searchArray(),
				sections    = _wpCustomizeSettings.sections;

			$(document).on('keyup', searchInputSelector, function(event) {
				event.preventDefault();
				$this 	= $( searchInputSelector );
				string 	= $this.val();

				if ( string.length > 2 ) {
					CustomizerSearchAdmin._searchString( string, searchArray, sections );
				} else {
					$( 'li.accordion-section' ).removeClass('search-not-found').addClass('search-found');
					$( 'li.accordion-panel' ).removeClass('search-not-found').addClass('search-found');
				}

			});

			$( document ).on('click', '.clear-search', function(event) {
				CustomizerSearchAdmin._clearSearch();
			});
		},

		/**
		 * Binds admin customize events.
		 *
		 * @since 1.0.0
		 * @access private
		 * @method _bind
		 */
		_bind: function()
		{
			wp.customize.previewer.targetWindow.bind( $.proxy( this._showHeaderFooterMessage, this ) );
		},

		/**
		 * Shows the message that is shown for when a header
		 * or footer is already set for this page.
		 *
		 * @since 1.0.0
		 * @access private
		 * @method _showHeaderFooterMessage
		 */
		_showHeaderFooterMessage: function()
		{
			var template = wp.template( 'fl-theme-builder-header-footer-message' );
			$( '#accordion-section-themes' ).after( template() );
		},

		/**
		 * Search for key inside an array.
		 *
		 * @since  1.0.0
		 */
		_searchArray: function()
		{
			searchArray = _wpCustomizeSettings.controls;
			
			$.each(searchArray, function(index, val) {
				// We are removing 'nav_menu_item' options from searchArray.
				if (index.toLowerCase().indexOf("nav_menu_item") >= 0) {
					delete searchArray[index];
				}

				// We are removing 'theme_' options from searchArray.
				if (index.toLowerCase().indexOf("theme_") >= 0) {
					delete searchArray[index];
				}
			});

			return searchArray;
		},

		_searchString: function( key, sourceArray, sections ) {
			resultArray = []

			$.each(sourceArray, function(index, val) {
				if ( typeof val.label !== "undefined" ) {
					if (val.label.toLowerCase().indexOf(key) >= 0) {
						resultArray.push( sourceArray[index] );
					}
				}
			});

			$.each(resultArray, function(index, val) {
				$found 		= $('li#accordion-section-' + val['section']);
				$foundPanel = $('li#accordion-panel-' + sections[val['section']]['panel']);
				$found.addClass('search-found');
				$foundPanel.addClass('search-found');
				$found.siblings('.control-section').removeClass('search-found').addClass('search-not-found');
				$foundPanel.siblings('.control-section').removeClass('search-found').addClass('search-not-found');
			});
		},

		/**
		 * Clear Search input and display all the options
		 *
		 * @since  1.0.0
		 * @access private
		 */
		_clearSearch: function() {
			$( '#customizer-search-input' ).val('');
			$( 'li.accordion-section' ).removeClass('search-not-found').addClass('search-found');
			$( 'li.accordion-panel' ).removeClass('search-not-found').addClass('search-found');

			$( searchInputSelector ).focus();
		}
	};

	// Initialize
	$( function() { CustomizerSearchAdmin._init(); } );

} )( jQuery );
