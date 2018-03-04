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

            const controls = $.map(_wpCustomizeSettings.controls, function(control, index) {
                $.map(_wpCustomizeSettings.sections, function(section, index) {
                    if (control.section == section.id) {
                        $.map(_wpCustomizeSettings.panels, function(panel, index) {
                            if ('' == section.panel) {
                                control.panelName = section.title;
                            }

                            if (section.panel == panel.id) {
                                control.sectionName = section.title;
                                control.panel = section.panel;
                                control.panelName = panel.title;
                            }
                        });
                     }
                });

                return [control];
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

        expandSection: function(setting) {
            const sectionName = this.getAttribute('data-section');
            const section = wp.customize.section( sectionName );
            CustomizerSearchAdmin._clearSearch();
            section.expand();            
        },

        displayMatches: function (stringToMatch, controls) {
            const matchArray = CustomizerSearchAdmin.findMatches(stringToMatch, controls);

            if ( 0 === matchArray.length ) return; // Return if empty results.
            
            html = matchArray.map(function(index, elem) {
                
                if ( '' === index.label ) return; // Return if empty results.

                let settingTrail = index.panelName;
                if ("" != index.sectionName) {
                    settingTrail = `${settingTrail} ▸ ${index.sectionName}`;
                }

                const regex = new RegExp(stringToMatch, 'gi');

                const label = index.label.replace(regex, `<span class="hl">${stringToMatch}</span>`);
                settingTrail = settingTrail.replace(regex, `<span class="hl">${stringToMatch}</span>`);

                return `
                    <li id="accordion-section-${index.section}" class="accordion-section control-section control-section-default customizer-search-results" aria-owns="sub-accordion-section-${index.section}" data-section="${index.section}">
                        <h3 class="accordion-section-title" tabindex="0">
                            ${label}
                            <span class="screen-reader-text">Press return or enter to open this section</span>
                        </h3>
                        <span class="search-setting-path">${settingTrail}</i></span>
                    </li>
                `;
            }).join('');

            customizerPanels.classList.add('search-not-found');
            document.getElementById('search-results').innerHTML = `<ul id="customizer-search-results">${html}</ul>`;

            const searchSettings = document.querySelectorAll('#search-results .accordion-section');
            searchSettings.forEach( setting => setting.addEventListener('click', CustomizerSearchAdmin.expandSection) );
        },

        findMatches: function (stringToMatch, controls) {
          return controls.filter(control => {
            
            if (control.panelName == null) control.panelName = '';
            if (control.sectionName == null) control.sectionName = '';

            // Search for the stringToMatch from control label, Panel Name, Section Name.
            const regex = new RegExp(stringToMatch, 'gi');
            return control.label.match(regex) || control.panelName.match(regex) || control.sectionName.match(regex)
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

            $(searchInputSelector).focus();

        },

        /**
         * Clear Search input and display all the options
         *
         * @since  1.0.0
         * @access private
         */
        _clearSearch: function () {
            const panels = document.getElementById('customize-theme-controls');
            panels.classList.remove('search-not-found');
            document.getElementById('search-results').innerHTML = '';
            document.getElementById('customizer-search-input').value = '';

            $(searchInputSelector).focus();
        }
    };

    // Initialize
    $(function () {
        CustomizerSearchAdmin._init();
    });

})(jQuery);
