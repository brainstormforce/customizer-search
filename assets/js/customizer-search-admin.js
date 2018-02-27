/**
 * Customizer Admin JS
 *
 * @since  1.0.0
 * @package Customizer_Search
 */

(function ($) {

    /**
     * Selector for the search field
     * @type {String}
     */
    const searchInputSelector = '#customizer-search-input';

    /**
     * innerHTML of all the customizer panels.
     * @type {String}
     */
    let customizerPanels = '';

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
        _init: function () {
            this._bind();

            const controls = $.map(_wpCustomizeSettings.controls, function(value, index) {
                return [value];
            });

            customizerPanels = document.getElementById('customize-theme-controls');

            customizePanelsParent = $('#customize-theme-controls');
            customizePanelsParent.after('<div id="search-results"></div>');

            $(document).on('keyup', searchInputSelector, function (event) {
                event.preventDefault();
                $this = $(searchInputSelector);
                string = $this.val();

                if (string.length > 0) {
                    CustomizerSearchAdmin.displayMatches(string, controls);
                } else {
                    CustomizerSearchAdmin._clearSearch();
                }

            });

            $(document).on('click', '.clear-search', function (event) {
                CustomizerSearchAdmin._clearSearch();
            });

            $(document).on('click', '.customize-search-toggle', function (event) {
                CustomizerSearchAdmin._display_search_form();
            });
        },

        displayMatches: function (stringToMatch, controls) {
            const matchArray = CustomizerSearchAdmin.findMatches(stringToMatch, controls);

            if ( 0 === matchArray.length ) return; // Return if empty results.

            console.log(matchArray);
            // const lis = Array.from(document.querySelectorAll('.accordion-section'));
            // lis.forEach(li => li.classList.add('search-not-found'));

            html = matchArray.map(function(index, elem) {
                return `
                    <li id="accordion-section-title_tagline" class="accordion-section control-section control-section-default customizer-search-results" aria-owns="sub-accordion-section-title_tagline" style="">
                        <h3 class="accordion-section-title customize-partial-edit-shortcut-blogname" tabindex="0">
                            ${index.label}
                            <span class="screen-reader-text">Press return or enter to open this section</span>
                        </h3>
                    </li>
                `;
            }).join('');

            customizerPanels.classList.add('search-not-found');
            document.getElementById('search-results').innerHTML = `<ul id="customizer-search-results">${html}</ul>`;
        },

        findMatches: function (stringToMatch, controls) {
          return controls.filter(control => {
            // here we need to figure out if the city or state matches what was searched
            const regex = new RegExp(stringToMatch, 'gi');
            return control.label.match(regex)
          });
        },

        /**
         * Binds admin customize events.
         *
         * @since 1.0.0
         * @access private
         * @method _bind
         */
        _bind: function () {
            wp.customize.previewer.targetWindow.bind($.proxy(this._showSearchButtonToggle, this));
        },

        /**
         * Shows the message that is shown for when a header
         * or footer is already set for this page.
         *
         * @since 1.0.0
         * @access private
         * @method _showSearchButtonToggle
         */
        _showSearchButtonToggle: function () {
            var template = wp.template('search-button');
            if ($('#customize-info .accordion-section-title .customize-search-toggle').length == 0) {
                $('#customize-info .accordion-section-title').append(template());
            }

            var template = wp.template('search-form');
            if ($('#customize-info #accordion-section-customizer-search').length == 0) {
                $('#customize-info .customize-panel-description').after(template());
            }
        },

        _display_search_form: function () {

            if ($('#accordion-section-customizer-search').hasClass('open')) {
                $('#accordion-section-customizer-search').removeClass('open')
                $('#accordion-section-customizer-search').slideUp('fast');
            } else {
                $('.customize-panel-description').removeClass('open');
                $('.customize-panel-description').slideUp('fast');

                $('#accordion-section-customizer-search').addClass('open');
                $('#accordion-section-customizer-search').slideDown('fast');
            }

        },

        /**
         * Clear Search input and display all the options
         *
         * @since  1.0.0
         * @access private
         */
        _clearSearch: function () {
            // $('#customizer-search-input').val('');
            // const lis = Array.from(document.querySelectorAll('.accordion-section'));
            // lis.forEach(li => li.classList.remove('search-not-found'));
            // document.getElementById('customize-theme-controls').innerHTML = customizerPanels;
            

            customizerPanels.classList.remove('search-not-found');
            customizerPanels.classList.add('search-found');
            document.getElementById('search-results').innerHTML = '';

            $(searchInputSelector).focus();
        }
    };

    // Initialize
    $(function () {
        CustomizerSearchAdmin._init();
    });

})(jQuery);
