<?php

/**
 * Handles Customizer logic for the theme builder.
 *
 * @since 1.0
 */
class Customizer_Search {

	/**
	 * Instance of Customizer_Search
	 *
	 * @var Customizer_Search
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function instance() {

		if ( ! isset( self::$instance ) ) {
			self::$instance = new Customizer_Search();

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
		add_action( 'customize_controls_enqueue_scripts',       array( $this, 'enqueue_scripts' ) );
		add_action( 'customize_controls_print_footer_scripts',  array( $this, 'footer_scripts' ) );
	}

	/**
	 * Enqueues scripts for the Customizer.
	 *
	 * @since 1.0
	 * @return void
	 */
	public function enqueue_scripts() {
		$slug = 'customizer-search-admin';

		wp_enqueue_style( $slug, CS_URL . 'assets/css/' . $slug . '.css', array(), CS_VER );
		wp_enqueue_script( $slug, CS_URL . 'assets/js/' . $slug . '.js', array(), CS_VER, true );
	}

	/**
	 * Renders the Customizer footer scripts.
	 *
	 * @since 1.0
	 * @return void
	 */
	public function footer_scripts() {
		include CS_DIR . 'templates/admin-customize-js-templates.php';
	}
}

Customizer_Search::instance();
