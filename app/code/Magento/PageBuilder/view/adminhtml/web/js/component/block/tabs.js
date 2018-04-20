/*eslint-disable */
define(["mage/translate", "underscore", "Magento_PageBuilder/js/content-type-factory", "Magento_PageBuilder/js/component/config", "Magento_PageBuilder/js/component/event-bus", "Magento_PageBuilder/js/component/stage/structural/options/option", "Magento_PageBuilder/js/content-type-collection"], function (_translate, _underscore, _contentTypeFactory, _config, _eventBus, _option, _contentTypeCollection) {
  function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

  var Tabs =
  /*#__PURE__*/
  function (_ContentTypeCollectio) {
    _inheritsLoose(Tabs, _ContentTypeCollectio);

    function Tabs() {
      return _ContentTypeCollectio.apply(this, arguments) || this;
    }

    var _proto = Tabs.prototype;

    /**
     * Return an array of options
     *
     * @returns {Array<OptionInterface>}
     */
    _proto.retrieveOptions = function retrieveOptions() {
      var options = _ContentTypeCollectio.prototype.retrieveOptions.call(this);

      options.push(new _option.Option(this, "add", "<i class='icon-pagebuilder-add'></i>", (0, _translate)("Add"), this.addTab, ["add-child"], 10));
      return options;
    };
    /**
     * Add a tab
     */


    _proto.addTab = function addTab() {
      var _this = this;

      this.preview.setActiveTab(this.children().length - 1);
      (0, _contentTypeFactory)(_config.getContentTypeConfig("tab-item"), this, this.stageId).then(function (tab) {
        _underscore.defer(function () {
          var mountFunction = function mountFunction(event, params) {
            if (params.id === tab.id) {
              _this.preview.setFocusedTab(_this.children().length - 1);

              _eventBus.off("tab-item:block:dropped:create", mountFunction);
            }
          };

          _eventBus.on("tab-item:block:dropped:create", mountFunction);

          _this.addChild(tab, _this.children().length); // Update the default tab title when adding a new tab


          _this.parent.store.updateKey(tab.id, (0, _translate)("Tab") + " " + (_this.children.indexOf(tab) + 1), "tab_name");
        });
      });
    };
    /**
     * Bind events for the current instance
     */


    _proto.bindEvents = function bindEvents() {
      var _this2 = this;

      _ContentTypeCollectio.prototype.bindEvents.call(this); // Block being mounted onto container


      _eventBus.on("tabs:block:ready", function (event, params) {
        if (params.id === _this2.id && _this2.children().length === 0) {
          _this2.addTab();
        }
      }); // Block being removed from container


      _eventBus.on("tab-item:block:removed", function (event, params) {
        if (params.parent.id === _this2.id) {
          // Mark the previous slide as active
          var newIndex = params.index - 1 >= 0 ? params.index - 1 : 0;

          _this2.preview.setFocusedTab(newIndex);
        }
      }); // Capture when a block is duplicated within the container


      var duplicatedTab;
      var duplicatedTabIndex;

      _eventBus.on("tab-item:block:duplicate", function (event, params) {
        if (params.duplicate.parent.id === _this2.id) {
          duplicatedTab = params.duplicate;
          duplicatedTabIndex = params.index;
        }
      });

      _eventBus.on("tab-item:block:mount", function (event, params) {
        if (duplicatedTab && params.id === duplicatedTab.id) {
          _this2.preview.setFocusedTab(duplicatedTabIndex, true);

          duplicatedTab = duplicatedTabIndex = null;
        }

        if (_this2.id === params.block.parent.id) {
          _this2.updateTabNamesInDataStore();

          _this2.parent.store.subscribe(function () {
            _this2.updateTabNamesInDataStore();
          }, params.block.id);
        }
      });
    };
    /**
     * Update data store with active options
     */


    _proto.updateTabNamesInDataStore = function updateTabNamesInDataStore() {
      var activeOptions = [];
      this.children().forEach(function (tab, index) {
        var tabData = tab.store.get(tab.id);
        activeOptions.push({
          label: tabData.tab_name.toString(),
          labeltitle: tabData.tab_name.toString(),
          value: index
        });
      });
      this.parent.store.updateKey(this.id, activeOptions, "_default_active_options");
    };

    return Tabs;
  }(_contentTypeCollection);

  return Tabs;
});
//# sourceMappingURL=tabs.js.map
