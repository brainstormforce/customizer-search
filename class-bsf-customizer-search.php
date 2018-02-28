<?php
/**
 * Initial Class for Customizer Search
 *
 * @since  1.0.0
 * @package  BSF_Customizer_Search
 */

/**
 * Handles Customizer logic for the theme builder.
 *
 * @since 1.0
 */
class BSF_Customizer_Search {

	/**
	 * Instance of BSF_Customizer_Search
	 *
	 * @var BSF_Customizer_Search
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function instance() {

		if ( ! isset( self::$instance ) ) {
			self::$instance = new BSF_Customizer_Search();

			self::$instance->hooks();
		}

		return self::$instance;
	}

	/**
	 * Initialize hooks.
	 *
	 * @since 1.0
	 * @return void
	 */
	private function hooks() {
		add_action( 'customize_controls_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'customize_controls_print_footer_scripts', array( $this, 'footer_scripts' ) );
	}

	/**
	 * Enqueues scripts for the Customizer.
	 *
	 * @since 1.0
	 * @return void
	 */
	public function enqueue_scripts() {
		wp_enqueue_style( 'customizer-search-admin', BSFCS_URL . 'assets/css/customizer-search-admin.css', array(), BSFCS_VER );
		wp_enqueue_script( 'customizer-search-admin', BSFCS_URL . 'assets/js/customizer-search-admin.compiled.js', array(), BSFCS_VER, true );
	}

	/**
	 * Renders the Customizer footer scripts.
	 *
	 * @since 1.0
	 * @return void
	 */
	public function footer_scripts() {
		include BSFCS_DIR . 'templates/admin-customize-js-templates.php';
	}
}

BSF_Customizer_Search::instance();
