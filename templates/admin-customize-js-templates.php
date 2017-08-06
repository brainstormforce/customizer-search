<?php
/**
 * Underscore js Template for adding customizer setting for customizer search.
 *
 * @since  1.0.0
 * @package  Customizer_Search
 */

?>

<script type="text/html" id="tmpl-search-button">

	<button type="button" class="customize-search-toggle dashicons dashicons-search" aria-expanded="false"><span class="screen-reader-text">Search</span></button>

</script>

<script type="text/html" id="tmpl-search-form">
	<div id="accordion-section-customizer-search" style="display: none;">
		<h4 class="customizer-search-section accordion-section-title">
			<span class="search-input"><?php _e( 'Search', 'customizer-search' ); ?></span>
			<span class="search-field-wrapper">
				<input type="text" placeholder="<?php _e( 'Search...', 'customizer-search' ); ?>" name="customizer-search-input" autofocus="autofocus" id="customizer-search-input" class="customizer-search-input">
				<button type="button" class="button clear-search" tabindex="0"><?php _e( 'Clear', 'customizer-search' ); ?></button>
			</span>

		</h4>
	</div>
</script>
