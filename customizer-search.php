<?php
/**
 * Plugin Name:     Customizer Search
 * Plugin URI:      https://github.com/Nikschavan/customizer-search
 * Description:     Search all the options in customizer.
 * Author:          Brainstorm Force
 * Author URI:      https://www.brainstormforce.com/
 * Text Domain:     customizer-search
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         Customizer_Search
 */

define( 'CS_VER', '1.0.0' );
define( 'CS_DIR', plugin_dir_path( __FILE__ ) );
define( 'CS_URL', plugins_url( '/', __FILE__ ) );
define( 'CS_PATH', plugin_basename( __FILE__ ) );

/**
 * Load the plugin.
 */
require_once 'class-customizer-search.php';