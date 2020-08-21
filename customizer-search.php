<?php
/**
 * Plugin Name:     Customizer Search
 * Plugin URI:      https://github.com/Nikschavan/customizer-search
 * Description:     Search for settings in customizer.
 * Author:          Brainstorm Force
 * Author URI:      https://www.brainstormforce.com/
 * Text Domain:     customizer-search
 * Domain Path:     /languages
 * Version:         1.1.6
 *
 * @package         Customizer_Search
 */

define( 'BSFCS_VER', '1.1.6' );
define( 'BSFCS_DIR', plugin_dir_path( __FILE__ ) );
define( 'BSFCS_URL', plugins_url( '/', __FILE__ ) );
define( 'BSFCS_PATH', plugin_basename( __FILE__ ) );

/**
 * Load the plugin.
 */
require_once 'class-customizer-search.php';

if ( is_admin() ) {
	// Admin Notice Library Settings.
	require_once 'lib/notices/class-astra-notices.php';
}

// BSF Analytics library.
if ( ! class_exists( 'BSF_Analytics_Loader' ) ) {
	require_once BSFCS_DIR . 'admin/bsf-analytics/class-bsf-analytics-loader.php';
}

$bsf_analytics = BSF_Analytics_Loader::get_instance();

$bsf_analytics->set_entity(
	array(
		'bsf' => array(
			'product_name'    => 'Customizer Search',
			'path'            => BSFCS_DIR . 'admin/bsf-analytics',
			'author'          => 'Brainstorm Force',
			'time_to_display' => '+24 hours',
		),
	)
);

