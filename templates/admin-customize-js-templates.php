<?php
/**
 * Underscore js Template for adding customizer setting for customizer search.
 *
 * @since  1.0.0
 * @package  Customizer_Search
 */

?>

<script type="text/html" id="tmpl-fl-theme-builder-header-footer-message">
	<div id="accordion-section-customizer-search" style="display: block;">
		<h3 class="customizer-search-section accordion-section-title">
			<span class="search-input"><?php _e( 'Search', 'customizer-search' ); ?></span>
			<span class="search-field-wrapper">
				<input type="text" placeholder="<?php _e( 'Search...', 'customizer-search' ); ?>" name="customizer-search-input" autofocus="autofocus" id="customizer-search-input" class="customizer-search-input">
				<button type="button" class="button clear-search" tabindex="0"><?php _e( 'Clear', 'customizer-search' ); ?></button>
			</span>

		</h3>
	</div>
	<style type="text/css">
		#accordion-section-customizer-search {
			margin-bottom: 0;
		}

		#accordion-section-customizer-search .accordion-section-title:after{
			content: none;
		}

		.search-not-found {
			display: none;
		}

	</style>
</script>
