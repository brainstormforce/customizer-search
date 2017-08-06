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
    var searchInputSelector = '#customizer-search-input';

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
            var searchArray = this._searchArray(),
                sections = _wpCustomizeSettings.sections;

            $(document).on('keyup', searchInputSelector, function (event) {
                event.preventDefault();
                $this = $(searchInputSelector);
                string = $this.val();

                if (string.length > 2) {
                    CustomizerSearchAdmin._searchString(string, searchArray, sections);
                } else {
                    $('li.accordion-section').removeClass('search-not-found').addClass('search-found');
                    $('li.accordion-panel').removeClass('search-not-found').addClass('search-found');
                }

            });

            $(document).on('click', '.clear-search', function (event) {
                CustomizerSearchAdmin._clearSearch();
            });

            $(document).on('click', '.customize-search-toggle', function (event) {
                CustomizerSearchAdmin._display_search_form();
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
         * Search for key inside an array.
         *
         * @since  1.0.0
         */
        _searchArray: function () {
            searchArray = [];

            searchArray.push(_wpCustomizeSettings.controls);
            searchArray.push(_wpCustomizeSettings.sections);
            searchArray.push(_wpCustomizeSettings.panels);

            return searchArray;
        },

        /**
         * Searches for the string in the given source array.
         *
         * @since  1.0.0
         * @param  {String} key         Key to be searched.
         * @param  {Array} sourceArray  Array in which the key is to be searched.
         * @param  {Array} sections     Section in the customizer.
         */
        _searchString: function (key, sourceArray, sections) {
            resultArray = []

            $.each(sourceArray, function (index, val) {
                $.each(val, function (index, val) {
                    if (typeof val.label !== "undefined") {
                        if (val.label.toLowerCase().indexOf(key) >= 0) {
                            resultArray.push(val);
                        }
                    }

                    if (typeof val.title !== "undefined") {
                        if (val.title.toLowerCase().indexOf(key) >= 0) {
                            resultArray.push(val);
                        }
                    }
                });
            });

            $.each(resultArray, function (index, val) {

                if (typeof val['section'] !== "undefined") {
                    $found = $('li#accordion-section-' + val['section']);
                    $foundPanel = $('li#accordion-panel-' + sections[val['section']]['panel']);
                    $found.addClass('search-found');
                    $foundPanel.addClass('search-found');
                    $found.siblings('.control-section').removeClass('search-found').addClass('search-not-found');
                    $foundPanel.siblings('.control-section').removeClass('search-found').addClass('search-not-found');
                }

                if (typeof val['panel'] !== "undefined") {
                    $section = $('li#accordion-section-' + val['id']);
                    $foundPanel = $('li#accordion-panel-' + val['panel']);

                    $section.addClass('search-found search-result').siblings('.control-section').not('.search-result').removeClass('search-found').addClass('search-not-found');
                    $foundPanel.addClass('search-found search-result');
                    $foundPanel.siblings('.control-section').not('.search-result').removeClass('search-found').addClass('search-not-found');
                }

                if ($('.generate-upsell-accordion-section').length > 0) {
                    $('.generate-upsell-accordion-section').removeClass('search-found').addClass('search-not-found');
                }
            });
        },

        /**
         * Clear Search input and display all the options
         *
         * @since  1.0.0
         * @access private
         */
        _clearSearch: function () {
            $('#customizer-search-input').val('');
            $('li.accordion-section').removeClass('search-not-found').addClass('search-found');
            $('li.accordion-panel').removeClass('search-not-found').addClass('search-found');
            $('.search-result').removeClass('search-result');

            $(searchInputSelector).focus();
        }
    };

    // Initialize
    $(function () {
        CustomizerSearchAdmin._init();
    });

})(jQuery);
