<?php
/**
 * Plugin Name:     Customizer Search
 * Plugin URI:      https://github.com/Nikschavan/customizer-search
 * Description:     Search for settings in customizer.
 * Author:          Brainstorm Force
 * Author URI:      https://www.brainstormforce.com/
 * Text Domain:     customizer-search
 * Domain Path:     /languages
 * Version:         1.1.3
 *
 * @package         Customizer_Search
 */

define( 'BSFCS_VER', '1.1.3' );
define( 'BSFCS_DIR', plugin_dir_path( __FILE__ ) );
define( 'BSFCS_URL', plugins_url( '/', __FILE__ ) );
define( 'BSFCS_PATH', plugin_basename( __FILE__ ) );

/**
 * Load the plugin.
 */
require_once 'class-customizer-search.php';
