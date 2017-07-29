<?php
/**
 * Plugin Name:     Customizer Search
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     customizer-search
 * Domain Path:     /languages
 * Version:         0.1.0
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