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
   * innerHTML of all the customizer panels.
   * @type {String}
   */

  var customizerPanels = '';
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
    _init: function _init() {
      this._bind();

      var controls = $.map(_wpCustomizeSettings.controls, function (control, index) {
        $.map(_wpCustomizeSettings.sections, function (section, index) {
          if (control.section == section.id) {
            $.map(_wpCustomizeSettings.panels, function (panel, index) {
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
    expandSection: function expandSection(setting) {
      var sectionName = this.getAttribute('data-section');
      var section = wp.customize.section(sectionName);

      CustomizerSearchAdmin._clearSearch();

      section.expand();
    },
    displayMatches: function displayMatches(stringToMatch, controls) {
      var matchArray = CustomizerSearchAdmin.findMatches(stringToMatch, controls);
      if (0 === matchArray.length) return; // Return if empty results.

      html = matchArray.map(function (index, elem) {
        if ('' === index.label) return; // Return if empty results.

        return "\n                    <li id=\"accordion-section-".concat(index.section, "\" class=\"accordion-section control-section control-section-default customizer-search-results\" aria-owns=\"sub-accordion-section-").concat(index.section, "\" data-section=\"").concat(index.section, "\">\n                        <h3 class=\"accordion-section-title\" tabindex=\"0\">\n                            ").concat(index.label, "\n                            <span class=\"screen-reader-text\">Press return or enter to open this section</span>\n                        </h3>\n                        <span class=\"search-setting-path\">").concat(index.panelName, " \u25B8 ").concat(index.sectionName, "</i></span>\n                    </li>\n                ");
      }).join('');
      customizerPanels.classList.add('search-not-found');
      document.getElementById('search-results').innerHTML = "<ul id=\"customizer-search-results\">".concat(html, "</ul>");
      var searchSettings = document.querySelectorAll('#search-results .accordion-section');
      searchSettings.forEach(function (setting) {
        return setting.addEventListener('click', CustomizerSearchAdmin.expandSection);
      });
    },
    findMatches: function findMatches(stringToMatch, controls) {
      return controls.filter(function (control) {
        // here we need to figure out if the city or state matches what was searched.
        if (control.panelName == null) control.panelName = '';
        if (control.sectionName == null) control.sectionName = '';
        var regex = new RegExp(stringToMatch, 'gi');
        return control.label.match(regex) || control.panelName.match(regex) || control.sectionName.match(regex);
      });
    },

    /**
     * Binds admin customize events.
     *
     * @since 1.0.0
     * @access private
     * @method _bind
     */
    _bind: function _bind() {
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
    _showSearchButtonToggle: function _showSearchButtonToggle() {
      var template = wp.template('search-button');

      if ($('#customize-info .accordion-section-title .customize-search-toggle').length == 0) {
        $('#customize-info .accordion-section-title').append(template());
      }

      var template = wp.template('search-form');

      if ($('#customize-info #accordion-section-customizer-search').length == 0) {
        $('#customize-info .customize-panel-description').after(template());
      }
    },
    _display_search_form: function _display_search_form() {
      if ($('#accordion-section-customizer-search').hasClass('open')) {
        $('#accordion-section-customizer-search').removeClass('open');
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
    _clearSearch: function _clearSearch() {
      var panels = document.getElementById('customize-theme-controls');
      panels.classList.remove('search-not-found');
      document.getElementById('search-results').innerHTML = '';
      document.getElementById('customizer-search-input').value = '';
      $(searchInputSelector).focus();
    }
  }; // Initialize

  $(function () {
    CustomizerSearchAdmin._init();
  });
})(jQuery);
