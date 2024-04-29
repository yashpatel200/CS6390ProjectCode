/* ----------------------------------------------------------------------------- 

  AnyPicker - Customizable Picker for Mobile OS
  Version 2.0.9
  Copyright (c)2017 Lajpat Shah
  Contributors : https://github.com/nehakadam/AnyPicker/contributors
  Repository : https://github.com/nehakadam/AnyPicker
  Homepage : https://nehakadam.github.io/AnyPicker

 ----------------------------------------------------------------------------- */

// --------------------------------- Global Variables : AnyPicker.Core Start --------------------------------------

//"use strict";

interface AnyPickerOptions {
    mode: string;
    parent: string;
    layout: string;
    hAlign: string;
    vAlign: string;
    relativeTo: any;
    inputElement: any;
    inputChangeEvent: string;
    lang: string;
    rtl: boolean;
    animationDuration: number;
    setButton: ButtonOptions;
    clearButton: ButtonOptions;
    nowButton: ButtonOptions;
    cancelButton: ButtonOptions;
    headerTitle: TextOptions;
    viewSections: ViewSectionsOptions;
    i18n: I18nOptions;
    theme: string;
    onInit: (() => void) | null;
    onBeforeShowPicker: (() => void) | null;
    onShowPicker: (() => void) | null;
    onBeforeHidePicker: (() => void) | null;
    onHidePicker: (() => void) | null;
    parseInput: (() => void) | null;
    formatOutput: (() => void) | null;
    setOutput: any;
    onSetOutput: (() => void) | null;
    buttonClicked: (() => void) | null;
}

interface ButtonOptions {
    markup: string;
    markupContentWindows: string;
    type: string;
    action?: (() => void) | null;
}

interface TextOptions {
    markup: string;
    type: string;
    contentBehaviour: string;
    format: string;
}

interface ViewSectionsOptions {
    header: string[];
    contentTop: string[];
    contentBottom: string[];
    footer: string[];
}

interface I18nOptions {
    headerTitle: string;
    setButton: string;
    clearButton: string;
    nowButton: string;
    cancelButton: string;
    dateSwitch: string;
    timeSwitch: string;
}

interface AnyPickerTempDefaults {
    sOrientation: string;
    overlayClass: string;
    overlaySelector: string;
    iExt: number;
    dir: string;
    sElemTag: string;
    oElemValid: {
        bIsInput: boolean;
        bIsListItem: boolean;
        bIsSelect: boolean;
    };
    sInputElemTag: string;
    oInputElemValid: {
        bIsInput: boolean;
        bIsListItem: boolean;
        bIsSelect: boolean;
    };
    prevActive: any;
    bFirst: boolean;
    sDateTimeTab: string;
    iCompDragStart: number;
    headerTitleDefined: boolean;
    bIsiPad: boolean;
    bModified: {
        set: boolean;
        cancel: boolean;
        clear: boolean;
        now: boolean;
    };
    tabKey: boolean;
}

interface AnyPickerExtra {
    sArrModes: string[];
    sArrLayout: string[];
    sArrHAlign: string[];
    sArrVAlign: string[];
    sArrViewSections: string[];
    oArrInputChangeEvent: string[];
    sArrThemes: string[];
    bIsTouchDevice: boolean;
    sClickHandler: string;
    sClickHandlerButtons: string;
    bHasCSS3D: boolean;
    sCSSTransform: string;
    sCSSTransformStyle: string;
    sCSSTransition: string;
    bHasCSSAnimation: boolean;
    sMouseWheel: string[];
    bHasIE10Pointer: boolean;
    bHasPointer: boolean;
    bIsiPad: boolean;
}

interface AnyPickerConstructor {
    new(element: Element, options: AnyPickerOptions): AnyPicker;
}

interface AnyPicker {
    elem: Element;
    setting: AnyPickerOptions;
    tmp: AnyPickerTempDefaults;
}

interface JQuery {
    AnyPicker(options: AnyPickerOptions): any;
}

const $: any = {}; // Dummy declaration to mimic jQuery

$.CF = {

    setPropertiesStyle(sProp: string, sArrProps: string[]): string {
        let oTest = window.getComputedStyle(document.documentElement, '');
        for (let iProp in sArrProps) {
            if (oTest[sArrProps[iProp]] !== undefined) {
                let sPrefix = "";

                if (sArrProps[iProp].search("Webkit") !== -1)
                    sPrefix = "-webkit-";
                else if (sArrProps[iProp].search("Moz") !== -1)
                    sPrefix = "-moz-";
                else if (sArrProps[iProp].search("O") !== -1)
                    sPrefix = "-o-";
                else if (sArrProps[iProp].search("ms") !== -1)
                    sPrefix = "-ms-";

                return sPrefix + sProp;
            }
        }
    },

    testProperties(sProp: string, sArrProps: string[], bReturnProp: boolean): boolean | string {
        let oTest = window.getComputedStyle(document.documentElement, '');
        for (let iProp in sArrProps) {
            if (oTest[sArrProps[iProp]] !== undefined) {
                if (bReturnProp) {
                    return sArrProps[iProp];
                } else
                    return true;
            }
        }
        if (bReturnProp)
            return "";
        else
            return false;
    },

    compareDataType(oVariable: any, sDataType: string): boolean {
        if (typeof oVariable === sDataType.toLocaleLowerCase())
            return true;
        return false;
    },

    compareStrings(sString1: string, sString2: string): boolean {
        let to = this;
        if (sString1 !== null && sString1 !== undefined && sString2 !== null && sString2 !== undefined) {
            if (typeof sString1 === "string" && typeof sString2 === "string") {
                if (sString1.toLocaleLowerCase() === sString2.toLocaleLowerCase())
                    return true;
            }
            return false;
        } else {
            if ((sString1 === null && sString2 === null) || (sString1 === undefined && sString2 === undefined))
                return true;
            else
                return false;
        }
    },

    isValid(oValue: any): boolean {
        if (oValue !== undefined && oValue !== null && oValue !== "")
            return true;
        else
            return false;
    }

};

$.AnyPicker = $.AnyPicker || {

    name: "AnyPicker", // Plugin Name

    version: "2.0.3", // Plugin Version

    i18n: // Internationalization Strings
    { 

    },

    defaults: // Defaults Settings
    {
        mode: "datetime",

        parent: "body",
        layout: "popup",
        hAlign: "left",
        vAlign: "bottom",
        relativeTo: null,
        inputElement: null,
        inputChangeEvent: "onSet",

        lang: "",
        rtl: false,
        animationDuration: 500,

        // View Section Components Start

        setButton: 
        {
            markup: "<a id='ap-button-set' class='ap-button'>Set</a>",
            markupContentWindows: "<span class='ap-button-icon ap-icon-set'></span><span class='ap-button-text'>set</span>",
            type: "Button"
            // action: function(){}
        },

        clearButton: 
        {
            markup: "<a id='ap-button-clear' class='ap-button'>Clear</a>",
            markupContentWindows: "<span class='ap-button-icon ap-icon-clear'></span><span class='ap-button-text'>clear</span>",
            type: "Button"
            // action: function(){}
        },

        nowButton: 
        {
            markup: "<a id='ap-button-now' class='ap-button'>Now</a>",
            markupContentWindows: "<span class='ap-button-icon ap-icon-now'></span><span class='ap-button-text'>now</span>",
            type: "Button"
            // action: function(){}
        },

        cancelButton: 
        {
            markup: "<a id='ap-button-cancel' class='ap-button'>Cancel</a>",
            markupContentWindows: "<span class='ap-button-icon ap-icon-cancel'></span><span class='ap-button-text'>cancel</span>",
            type: "Button"
            // action: function(){}
        },

        headerTitle:
        {
            markup: "<span class='ap-header__title'>Select</span>",
            type: "Text",
            contentBehaviour: "Static", // Static or Dynamic
            format: "" // DateTime Format
        },

        // View Section Components End

        viewSections:
        {
            header: ["headerTitle"],
            contentTop: [],
            contentBottom: [],
            footer: ["cancelButton", "setButton"]
        },

        i18n:
        {
            headerTitle: "Select",
            setButton: "Set",
            clearButton: "Clear",
            nowButton: "Now",
            cancelButton: "Cancel",
            dateSwitch: "Date",
            timeSwitch: "Time"
        },

        theme: "Default",

        //------------------ Callback Functions Start --------------------------

        onInit: null, // ()

        onBeforeShowPicker: null, // ()
        onShowPicker: null, // ()

        onBeforeHidePicker: null, // ()
        onHidePicker: null, // ()

        parseInput: null, // ()
        formatOutput: null, // ()

        setOutput: null,
        onSetOutput: null,

        buttonClicked: null 

        //------------------ Callback Functions End --------------------------
    },

    tempDefaults: // Plugin-level Variables required to maintain state across methods
    {
        sOrientation: "portrait",
        overlayClass: "",
        overlaySelector: "",
        iExt: 2,
        dir: "ltr",
        sElemTag: "",
        oElemValid: {
            bIsInput: false,
            bIsListItem: false,
            bIsSelect: false
        },
        sInputElemTag: "",
        oInputElemValid: {
            bIsInput: false,
            bIsListItem: false,
            bIsSelect: false
        },
        prevActive: null,
        bFirst: true,
        sDateTimeTab: "date",
        iCompDragStart: 0,
        headerTitleDefined: false,
        bIsiPad: false,
        bModified: {
            set: false,
            cancel: false,
            clear: false,
            now: false
        },
        tabKey: false
    },

    extra: // Common Temporary Variables
    {
        sArrModes: ["select", "datetime"], // Modes of AnyPicker
        sArrLayout: ["popup", "relative", "fixed", "inline"], // Type of AnyPicker Layout
        sArrHAlign: ["left", "center", "right"], // Horizontal Alignment of View
        sArrVAlign: ["top", "middle", "bottom"], // Vertical Alignment of View
        sArrViewSections: ["header", "contentTop", "contentBottom", "footer"],
        oArrInputChangeEvent: ["onChange", "onSet"],
        sArrThemes: ["Default", "iOS", "Android", "Windows"],

        bIsTouchDevice: "ontouchstart" in document.documentElement,
        sClickHandler: ("ontouchstart" in document.documentElement ? "click" : "click"),
        sClickHandlerButtons: ("ontouchstart" in document.documentElement ? "touchstart" : "click"),

        bHasCSS3D: $.CF.testProperties("perspective", ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective", "perspective", "perspectiveProperty"], false),
        sCSSTransform: $.CF.testProperties("transform", ["WebkitTransform", "MozTransform", "OTransform", "msTransform", "transform"], true),
        sCSSTransformStyle: $.CF.setPropertiesStyle("transform", ["WebkitTransform", "MozTransform", "OTransform", "msTransform", "transform"]),
        sCSSTransition: $.CF.testProperties("transition", ["WebkitTransition", "MozTransition", "OTransition", "msTransition", "transition"], true),
        bHasCSSAnimation: $.CF.testProperties("animation", ["WebkitAnimation", "MozAnimation", "OAnimation", "msAnimation", "animation"], false),
        sMouseWheel: ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'], //"MozMousePixelScroll DOMMouseScroll mousewheel wheel"
        bHasIE10Pointer: window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
        bHasPointer: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        bIsiPad: navigator.userAgent.match(/iPad/i) !== null
    }

};

// --------------------------------- Global Variables : AnyPicker.Core End --------------------------------------

(function (factory) 
{
    if (typeof define === 'function' && define.amd) // AMD. Register as an anonymous module.
    {   
        define(['jquery'], factory);
    }
    else if (typeof exports === 'object') // Node/CommonJS
    {
        module.exports = factory(require('jquery'));
    } 
    else // Browser globals
    {
        factory(jQuery);
    }
}
(function ($) 
{
    $.fn.AnyPicker = function(options: AnyPickerOptions) 
    {
        var oAnyPicker = $(this).data();

        var sArrDataKeys = Object.keys(oAnyPicker),
            iKey, sKey;
        if(options === null || options === undefined) // return AnyPicker object
        {
            if(sArrDataKeys.length > 0)
            {
                for(iKey in sArrDataKeys)
                {
                    sKey = sArrDataKeys[iKey];
                    if(sKey.search("plugin_AnyPicker_") !== -1)
                    {
                        return oAnyPicker[sKey];
                    }
                }
            }
            else
                console.log("No AnyPicker Object Defined For This Element");
        }
        else if(typeof options === "string") // call methods using AnyPicker object
        {           
            if(oAnyPicker !== null || oAnyPicker !== undefined)
            {
                if(sArrDataKeys.length > 0)
                {
                    if(options === "destroy")
                    {
                        if(sArrDataKeys.length > 0)
                        {
                            for(iKey in sArrDataKeys)
                            {
                                sKey = sArrDataKeys[iKey];
                                if(sKey.search("plugin_AnyPicker_") !== -1)
                                {
                                    oAnyPicker = oAnyPicker[sKey];
                                    $(window).off("blur." + oAnyPicker.setting.timestamp);
                                    var oInput = $(oAnyPicker.setting.inputElement);
                                    $(oInput).off("focus." + oAnyPicker.setting.timestamp);
                                    $(oInput).off("blur." + oAnyPicker.setting.timestamp);

                                    $(".ap-overlay-" + sKey.replace("plugin_AnyPicker_", "")).remove(); // Remove AnyPicker DOM appended for a particular AnyPicker object
                                    $(this).removeData(sKey);
                                
                                    //console.log("Destroyed AnyPicker Object");
                                    //console.log(oAnyPicker);

                                    break;
                                }
                            }
                        }
                        else
                            console.log("No AnyPicker Object Defined For This Element");
                        
                        // ** Destoy AnyPicker Object **
                        // unbind events
                        // remove data attached to Element
                        // remove AnyPicker Object from the $.AnyPicker.extra.oArrAnyPicker
                    }
                }
                else
                    console.log("No AnyPicker Object Defined For This Element");
            }
        }
        else // create a new AnyPicker object
        {
            return this.each(function()
            {
                var iTimeStamp = (new Date()).getTime();
                if(!$.data(this, "plugin_AnyPicker_" + iTimeStamp)) 
                {
                    options.timestamp = iTimeStamp;
                    oAnyPicker = new AnyPicker(this, options);
                    $.data(this, "plugin_AnyPicker_" + iTimeStamp, oAnyPicker);
                    oAnyPicker.init();
                
                    //console.log("Created AnyPicker Object ");
                    //console.log(oAnyPicker);
                }
                else
                {
                    if(sArrDataKeys.length > 0)
                    {
                        for(iKey in sArrDataKeys)
                        {
                            sKey = sArrDataKeys[iKey];
                            if(sKey.search("plugin_AnyPicker_") !== -1)
                            {
                                return oAnyPicker[sKey];
                            }
                        }
                    }
                    else
                        console.log("No AnyPicker Object Defined For This Element");
                }
            });
        }
    };
}));

// AnyPicker Constructor
class AnyPicker 
{
    elem: Element;
    setting: AnyPickerSettings;
    tmp: any; // Define tmp type properly

    constructor(element: Element, options: AnyPickerOptions) 
    {
        var apo = this;

        apo.elem = element;
        var sLang = (options.lang !== undefined || options.lang !== null) ? options.lang : $.CalenStyle.defaults.lang,
        io18n = $.extend(true, {}, $.AnyPicker.defaults.i18n, $.AnyPicker.i18n[sLang], options.i18n),
        oDefaults = $.extend(true, {}, $.AnyPicker.defaults);

        io18n = {
            i18n: io18n
        };
        oDefaults.i18n = {};
        options.i18n = {};

        apo.setting = $.extend({}, oDefaults, options, io18n);
        apo.tmp = $.extend({}, $.AnyPicker.tempDefaults);

        apo.tmp.overlayClass = "ap-overlay-" + apo.setting.timestamp;
        apo.tmp.overlaySelector = "." + apo.tmp.overlayClass;
        apo.tmp.sOrientation = apo._getDeviceOrientation();

        //----------- Theme-wise Changes In Settings -------------------

        if($.CF.isValid(options.headerTitle))
            apo.tmp.headerTitleDefined = true;

        if($.CF.compareStrings(apo.setting.theme, "Android"))
        {
            if(!$.CF.isValid(options.rowHeight))
                apo.setting.rowHeight = 50;

            if(!$.CF.isValid(options.visibleRows))
                apo.setting.visibleRows = 3;
        }
        else if($.CF.compareStrings(apo.setting.theme, "iOS"))
        {
            if(!$.CF.isValid(options.rowHeight))
                apo.setting.rowHeight = 36;

            if(!$.CF.isValid(options.visibleRows))
                apo.setting.visibleRows = 5;

            if(!$.CF.isValid(options.viewSections))
            {
                if($.CF.compareStrings(apo.setting.layout, "fixed"))
                {
                    apo.setting.viewSections = {
                        header: [],
                        contentTop: [],
                        contentBottom: [],
                        footer: ["cancelButton", "headerTitle", "setButton"]
                    };
                }
                else
                {
                    apo.setting.viewSections = {
                        header: ["cancelButton", "headerTitle", "setButton"],
                        contentTop: [],
                        contentBottom: [],
                        footer: []
                    };
                }
            }

            if($.AnyPicker.extra.bIsiPad)
                apo.tmp.bIsiPad = true;
            if(apo.tmp.bIsiPad && $.CF.compareStrings(apo.setting.layout, "popup"))
                apo.setting.layout = "popover";
        }
        else if($.CF.compareStrings(apo.setting.theme, "Windows"))
        {
            apo.setting.layout = "popup";
            apo.setting.visibleRows = 5;
            apo.setting.rowHeight = 100;

            if(!$.CF.isValid(options.viewSections))
            {
                apo.setting.viewSections = {
                    header: ["headerTitle"],
                    contentTop: [],
                    contentBottom: [],
                    footer: ["setButton", "cancelButton"]
                };
            }
        
            if($.CF.isValid(options.setButton))
                apo.tmp.bModified.set = true;
            if($.CF.isValid(options.cancelButton))
                apo.tmp.bModified.cancel = true;
            if($.CF.isValid(options.nowButton))
                apo.tmp.bModified.now = true;
            if($.CF.isValid(options.clearButton))
                apo.tmp.bModified.clear = true;
        }

        //--------------------------------------------------------------

        apo.tmp.iExt = Math.floor(apo.setting.visibleRows / 2);
        apo.tmp.sDir = apo.setting.rtl ? "rtl" : "ltr";

        $.AnyPicker.extra.dToday = apo._getCurrentDate();
        if(apo.tmp.selectedDate === null)
            apo.tmp.selectedDate = $.AnyPicker.extra.dToday;
        if(apo.setting.maxYear === 0)
            apo.setting.maxYear = $.AnyPicker.extra.dToday.getFullYear();
        if($.CF.isValid(apo.setting.components) && apo.tmp.numOfComp === 0)
            apo.tmp.numOfComp = apo.setting.components.length;

        $.AnyPicker.extra.sStartEv = ($.AnyPicker.extra.bHasPointer ? ($.AnyPicker.extra.bHasIE10Pointer ? 'MSPointerDown' : 'pointerdown') : ($.AnyPicker.extra.bIsTouchDevice ? 'touchstart' : 'mousedown touchstart'));
        $.AnyPicker.extra.sMoveEv = ($.AnyPicker.extra.bHasPointer ? ($.AnyPicker.extra.bHasIE10Pointer ? 'MSPointerMove' : 'pointermove') : ($.AnyPicker.extra.bIsTouchDevice ? 'touchmove' : 'mousemove touchmove'));
        $.AnyPicker.extra.sEndEv = ($.AnyPicker.extra.bHasPointer ? ($.AnyPicker.extra.bHasIE10Pointer ? 'MSPointerUp' : 'pointerup') : ($.AnyPicker.extra.bIsTouchDevice ? 'touchend' : 'mouseup touchend'));
        $.AnyPicker.extra.sLeaveEv = ($.AnyPicker.extra.bHasPointer ? ($.AnyPicker.extra.bHasIE10Pointer ? 'MSPointerLeave' : 'pointerleave') : ($.AnyPicker.extra.bIsTouchDevice ? 'touchleave' : 'mouseleave'));

        apo.setting.onInit.call(apo.elem);

        return apo;
    }

    init() {
        let apo = this;

        apo._bindInputEvents();
        apo._bindOverlayEvents();

        $(window).on("resize", function () {
            apo._refreshPickerPosition();
        });
    }

    _bindInputEvents() {
        let apo = this;

        $(apo.setting.inputElement).on("focus", function () {
            apo._showPicker();
        });

        $(apo.setting.inputElement).on("blur", function () {
            apo._hidePicker();
        });

        $(apo.setting.inputElement).on("click", function () {
            apo._showPicker();
        });

        $(apo.setting.inputElement).on("change", function () {
            apo.setting.parseInput();
        });
    }

    _bindOverlayEvents() {
        let apo = this;

        $(document).on("keydown", function (e) {
            if (e.keyCode === 9) {
                apo.tmp.tabKey = true;
            }
        });

        $(document).on("keyup", function (e) {
            if (e.keyCode === 9) {
                apo.tmp.tabKey = false;
            }
        });

        $(document).on("blur", function () {
            if (!apo.tmp.tabKey) {
                apo._hidePicker();
            }
        });

        $(document).on("touchend click", apo.tmp.overlaySelector, function (e) {
            e.stopPropagation();
        });

        $(document).on("touchend click", function (e) {
            apo._hidePicker();
        });
    }

    _showPicker() {
        let apo = this;

        apo.setting.onBeforeShowPicker.call(apo.elem);

        // Logic to show the picker

        apo.setting.onShowPicker.call(apo.elem);
    }

    _hidePicker() {
        let apo = this;

        apo.setting.onBeforeHidePicker.call(apo.elem);

        // Logic to hide the picker

        apo.setting.onHidePicker.call(apo.elem);
    }

    _refreshPickerPosition() {
        let apo = this;

        // Logic to refresh picker position
    }

    _getCurrentDate() {
        return new Date();
    }

    _getDeviceOrientation() {
        return "portrait";
    }
}
