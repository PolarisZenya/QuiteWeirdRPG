//=============================================================================
// NekoGakuen_FontManager.js
// Version: 2.7.1
//=============================================================================
/*:zh
 * @target MZ
 * @plugindesc 指定自訂字型 (Ver 2.7.1)
 * @author Mirai
 * @version 2.7.1
 * @url https://nekogakuen.blogspot.com
 * @help
 * 
 * ─ 插件簡介 ─
 * 在RPG Maker MV/MZ中用來設定指定的字型顯示。
 * 
 * 
 * ─ 更新履歷 ─
 * V2.7.1 更新插件使用條款。 
 * V2.7.0 新增MZ版本的支援和字體粗細參數，以及修正字型讀取時的一些BUG。
 * V2.6.1 更新插件使用條款。
 * V2.6.0 修正無法成功讀取電腦內建字型的問題。
 * V2.5.0 新增字型副檔名格式選項參數及修改部分程式碼。
 * V2.2.0 更新插件說明及部分程式碼。
 * V2.1.0 修正標題畫面的標題文字顯示問題。
 * V2.0.0 全面簡化插件參數並移除十國語言的部分。
 * V1.0.0 初次版本的插件發佈。
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV/MZ的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 
 * 
 * ─ 版權聲明 ─
 * 修改或翻譯本插件無需向作者事前告知，但修改後的版本禁止再次發佈。
 * 如果官方的版本有BUG，可以跟作者回報。
 * 
 * 禁止利用本插件進行非法販售及詐騙。
 * 作者只單純提供此插件，如有本插件以外的問題發生請使用者自行負責所有責任。
 * 本插件著作權為貓咪學園(Neko Gakuen)的程式人員Mirai(快閃小強)所有。
 * 
 * --------------------
 * -來源標示：【△ 不需要，但有的話會很感謝。 (註1)】
 * -授權方式：【√ 免費】
 * -商業營利：【√ 允許】
 * -改作許可：【√ 允許】
 * -二次配佈：【× 禁止】
 * -成人用途：【√ 允許】
 * -使用範圍：【※ 僅RPG Maker系列】
 * 
 * ※註1：但如有註明的話，可以註明「NekoGakuen」即可。
 * --------------------
 * 
 * @param Font Group
 * @text 字型參數設定
 * 
 * @param Custom Fontlist
 * @text 自訂字型清單
 * @desc 將字型檔案放在專案目錄fonts資料夾內，在此參數輸入該字型檔的檔名(不包括副檔名)，用不到此參數就空白即可。
 * 但如果選擇「系統內建字型」時，直接輸入「字型名稱」(例如：微軟正黑體等)即可。
 * @parent Font Group
 * @type struct<fonts>[]
 * @default []
 * 
 * @param Font Size
 * @text 顯示字型大小
 * @desc 設定目前在電腦上顯示字型大小的設定。
 * @parent Font Group
 * @type number
 * @default 28
 * 
 * @param Fonts Weight
 * @text 指定字型粗細
 * @desc 指定字型顯示時的粗細樣式，可以直接輸入指定的數值範圍100~900之間。
 * @parent Font Group
 * @type combo
 * @default normal
 * @option normal
 * @option bold
 * @option bolder
 * @option lighter
 * 
 */
/*~struct~fonts:zh
 * 
 * @param Fonts File
 * @text 指定字型檔案名稱
 * @desc 指定字型檔案名稱(不含副檔名)，如選擇「系統內建字型」，則抓取電腦系統本身已安裝好的字型。
 * @type string
 * @default mplus-1m-regular
 * 
 * @param Fonts Format
 * @text 指定字型格式
 * @desc 指定字型的副檔名格式，如選擇「系統內建字型」，則抓取電腦系統本身已安裝好的字型。
 * @type select
 * @default ttf
 * @option 系統內建字型
 * @value local
 * @option OTF (OpenType Font)
 * @value otf
 * @option TTF (TrueType Font)
 * @value ttf
 * @option WOFF (Web Open Font Format)
 * @value woff
 * @option SVG (Scalable Vector Graphics font)
 * @value svg
 * 
 */
//=============================================================================

'use strict';
if (Utils.RPGMAKER_NAME === "MZ") {
    (() => {
        let NekoGakuen = {};
        const pluginName = "NekoGakuen_FontManager";
        NekoGakuen.FontManager = {};
        NekoGakuen.FontManager.Parameters = PluginManager.parameters(pluginName);
        NekoGakuen.FontManager.font_size = Number(NekoGakuen.FontManager.Parameters['Font Size'] || 28);
        NekoGakuen.FontManager.font_size = Number(NekoGakuen.FontManager.Parameters['Font Size'] || 28);
        NekoGakuen.FontManager.fonts_weight = (NekoGakuen.FontManager.Parameters['Fonts Weight'] || 'normal');
        NekoGakuen.FontManager.cfl = JSON.parse(NekoGakuen.FontManager.Parameters['Custom Fontlist']);
        NekoGakuen.FontManager.fonts_file = Array();
        NekoGakuen.FontManager.fonts_format = Array();
        NekoGakuen.FontManager.fonts_family = "GameFont";
        const checkFontFile = function (url) {
            if (Utils.isNwjs()) {
                const fs = require('fs');
                if (fs.existsSync(url)) {
                    return true;
                } else {
                    return false;

                }
            } else {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", url, false);
                xmlhttp.send(null);
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }

        Graphics.loadFontWs = function (name, url, weight) {
            const style = document.createElement('style');
            const head = document.getElementsByTagName('head');
            switch (weight) {
                case 'normal':
                    weight = 'normal';
                    break;
                case 'bold':
                    weight = 'bold';
                    break;
                case 'bolder':
                    weight = 'bolder';
                    break;
                case 'lighter':
                    weight = 'lighter';
                    break;
                default:
                    break;
            }
            const rule = '@font-face { font-family: "' + name + '"; src: url("' + url + '"); font-weight: ' + weight + '; }';
            style.type = 'text/css';
            head.item(0).appendChild(style);
            style.sheet.insertRule(rule, 0);
        };

        Graphics.localFontWs = function (name, weight) {
            const style = document.createElement('style');
            const head = document.getElementsByTagName('head');
            switch (weight) {
                case 'normal':
                    weight = 'normal';
                    break;
                case 'bold':
                    weight = 'bold';
                    break;
                case 'bolder':
                    weight = 'bolder';
                    break;
                case 'lighter':
                    weight = 'lighter';
                    break;
                default:
                    break;
            }
            const rule = '@font-face { font-family: "' + name + '"; src: local("' + name + '"); font-weight: ' + weight + '; }';
            style.type = 'text/css';
            head.item(0).appendChild(style);
            style.sheet.insertRule(rule, 0);
        };

        for (let i = 0; i < NekoGakuen.FontManager.cfl.length; i++) {
            let Read_FontManager = JSON.parse(NekoGakuen.FontManager.cfl[i]);
            NekoGakuen.FontManager.fonts_file.push(Read_FontManager["Fonts File"]);
            NekoGakuen.FontManager.fonts_format.push(Read_FontManager["Fonts Format"]);
        }

        for (let i = 0; i < NekoGakuen.FontManager.cfl.length; ++i) {
            const filename = NekoGakuen.FontManager.fonts_file[i].trim();
            if (NekoGakuen.FontManager.fonts_format[i] != 'local') {
                const url = './fonts/' + filename + '.' + NekoGakuen.FontManager.fonts_format[i];
                if (checkFontFile(url)) {
                    Graphics.loadFontWs(filename, url, NekoGakuen.FontManager.fonts_weight);
                    NekoGakuen.FontManager.fonts_family = filename;
                    i = NekoGakuen.FontManager.cfl.length;
                }
            } else {
                Graphics.localFontWs(filename, NekoGakuen.FontManager.fonts_weight);
                NekoGakuen.FontManager.fonts_family = filename;
                i = NekoGakuen.FontManager.cfl.length;
            }
        }

        Scene_Boot.prototype.loadGameFonts = function () {
            const advanced = $dataSystem.advanced;
            FontManager.load("rmmz-mainfont", advanced.mainFontFilename);
            FontManager.load("rmmz-numberfont", advanced.numberFontFilename);
            for (var i = 0; i < NekoGakuen.FontManager.cfl.length; ++i) {
                var filename = NekoGakuen.FontManager.fonts_file[i].trim();
                if (NekoGakuen.FontManager.fonts_format[i] != 'local') {
                    const url = './fonts/' + filename + '.' + NekoGakuen.FontManager.fonts_format[i];
                    if (checkFontFile(url)) {
                        Graphics.loadFontWs(filename, url, NekoGakuen.FontManager.fonts_weight);
                        NekoGakuen.FontManager.fonts_family = filename;
                        FontManager.load(filename, filename + '.' + NekoGakuen.FontManager.fonts_format[i]);
                        i = NekoGakuen.FontManager.cfl.length;
                    }
                } else {
                    Graphics.localFontWs(filename, NekoGakuen.FontManager.fonts_weight);
                    NekoGakuen.FontManager.fonts_family = filename;
                    i = NekoGakuen.FontManager.cfl.length;
                }
            }
        };

        Bitmap.prototype._makeFontNameText = function () {
            const italic = this.fontItalic ? "Italic " : "";
            const bold = this.fontBold ? "Bold " : "";
            return NekoGakuen.FontManager.fonts_weight + ' ' + italic + bold + this.fontSize + "px " + this.fontFace;
        };

        NekoGakuen.FontManager._Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
        Scene_Title.prototype.drawGameTitle = function () {
            if (NekoGakuen.FontManager.cfl.length > 0) {
                this._gameTitleSprite.bitmap.fontFace = NekoGakuen.FontManager.fonts_family;
            } else {
                this._gameTitleSprite.bitmap.fontFace = 'GameFont';
            }
            NekoGakuen.FontManager._Scene_Title_drawGameTitle.call(this);
        };

        Game_System.prototype.mainFontFace = function () {
            if (NekoGakuen.FontManager.cfl.length > 0) {
                return NekoGakuen.FontManager.fonts_family;
            } else {
                return "rmmz-mainfont, " + $dataSystem.advanced.fallbackFonts;
            }
        };

        NekoGakuen.FontManager._Window_Base_standardFontSize = Window_Base.prototype.standardFontSize;
        Window_Base.prototype.standardFontSize = function () {
            NekoGakuen.FontManager._Window_Base_standardFontSize.call(this);
        };

        Game_System.prototype.mainFontSize = function () {
            return NekoGakuen.FontManager.font_size;
        };

    })();
}

if (Utils.RPGMAKER_NAME === "MV") {
    (function () {
        let NekoGakuen = {};
        var pluginName = "NekoGakuen_FontManager";
        NekoGakuen.FontManager = {};
        NekoGakuen.FontManager.Parameters = PluginManager.parameters(pluginName);
        NekoGakuen.FontManager.font_size = Number(NekoGakuen.FontManager.Parameters['Font Size'] || 28);
        NekoGakuen.FontManager.font_size = Number(NekoGakuen.FontManager.Parameters['Font Size'] || 28);
        NekoGakuen.FontManager.fonts_weight = (NekoGakuen.FontManager.Parameters['Fonts Weight'] || 'normal');
        NekoGakuen.FontManager.cfl = JSON.parse(NekoGakuen.FontManager.Parameters['Custom Fontlist']);
        NekoGakuen.FontManager.fonts_file = Array();
        NekoGakuen.FontManager.fonts_format = Array();
        NekoGakuen.FontManager.fonts_family = "GameFont";
        var checkFontFile = function (url) {
            if (Utils.isNwjs()) {
                var fs = require('fs');
                if (fs.existsSync(url)) {
                    return true;
                } else {
                    return false;

                }
            } else {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", url, false);
                xmlhttp.send(null);
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }

        Graphics.loadFontWs = function (name, url, weight) {
            var style = document.createElement('style');
            var head = document.getElementsByTagName('head');
            switch (weight) {
                case 'normal':
                    weight = 'normal';
                    break;
                case 'bold':
                    weight = 'bold';
                    break;
                case 'bolder':
                    weight = 'bolder';
                    break;
                case 'lighter':
                    weight = 'lighter';
                    break;
                default:
                    break;
            }
            var rule = '@font-face { font-family: "' + name + '"; src: url("' + url + '"); font-weight: ' + weight + '; }';
            style.type = 'text/css';
            head.item(0).appendChild(style);
            style.sheet.insertRule(rule, 0);
            this._createFontLoader(name);
        };

        Graphics.localFontWs = function (name, weight) {
            var style = document.createElement('style');
            var head = document.getElementsByTagName('head');
            switch (weight) {
                case 'normal':
                    weight = 'normal';
                    break;
                case 'bold':
                    weight = 'bold';
                    break;
                case 'bolder':
                    weight = 'bolder';
                    break;
                case 'lighter':
                    weight = 'lighter';
                    break;
                default:
                    break;
            }
            var rule = '@font-face { font-family: "' + name + '"; src: local("' + name + '"); font-weight: ' + weight + '; }';
            style.type = 'text/css';
            head.item(0).appendChild(style);
            style.sheet.insertRule(rule, 0);
            this._createFontLoader(name);
        };

        for (var i = 0; i < NekoGakuen.FontManager.cfl.length; i++) {
            var Read_FontManager = JSON.parse(NekoGakuen.FontManager.cfl[i]);
            NekoGakuen.FontManager.fonts_file.push(Read_FontManager["Fonts File"]);
            NekoGakuen.FontManager.fonts_format.push(Read_FontManager["Fonts Format"]);
        }

        for (var i = 0; i < NekoGakuen.FontManager.cfl.length; ++i) {
            var filename = NekoGakuen.FontManager.fonts_file[i].trim();
            if (NekoGakuen.FontManager.fonts_format[i] != 'local') {
                var url = './fonts/' + filename + '.' + NekoGakuen.FontManager.fonts_format[i];
                if (checkFontFile(url)) {
                    Graphics.loadFontWs(filename, url, NekoGakuen.FontManager.fonts_weight);
                    NekoGakuen.FontManager.fonts_family = filename;
                    i = NekoGakuen.FontManager.cfl.length;
                }
            } else {
                Graphics.localFontWs(filename, NekoGakuen.FontManager.fonts_weight);
                NekoGakuen.FontManager.fonts_family = filename;
                i = NekoGakuen.FontManager.cfl.length;
            }
        }

        Bitmap.prototype._makeFontNameText = function () {
            return NekoGakuen.FontManager.fonts_weight + ' ' + (this.fontItalic ? 'Italic ' : '') +
                this.fontSize + 'px ' + this.fontFace;
        };

        NekoGakuen.FontManager._Scene_Title_drawGameTitle = Scene_Title.prototype.drawGameTitle;
        Scene_Title.prototype.drawGameTitle = function () {
            if (NekoGakuen.FontManager.cfl.length > 0) {
                this._gameTitleSprite.bitmap.fontFace = NekoGakuen.FontManager.fonts_family;
            } else {
                this._gameTitleSprite.bitmap.fontFace = 'GameFont';
            }
            NekoGakuen.FontManager._Scene_Title_drawGameTitle.call(this);
        };

        NekoGakuen.FontManager._Window_Base_standardFontFace = Window_Base.prototype.standardFontFace;
        Window_Base.prototype.standardFontFace = function () {
            NekoGakuen.FontManager._Window_Base_standardFontFace.call(this);
            if (NekoGakuen.FontManager.cfl.length > 0) {
                return NekoGakuen.FontManager.fonts_family;
            } else {
                return 'GameFont'
            }
        };

        NekoGakuen.FontManager._Window_Base_standardFontSize = Window_Base.prototype.standardFontSize;
        Window_Base.prototype.standardFontSize = function () {
            NekoGakuen.FontManager._Window_Base_standardFontSize.call(this);
            return NekoGakuen.FontManager.font_size;
        };

        NekoGakuen.FontManager._Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
        Window_Base.prototype.resetFontSettings = function () {
            NekoGakuen.FontManager._Window_Base_resetFontSettings.call(this);
            this.contents.fontFace = this.standardFontFace();
            this.contents.fontSize = this.standardFontSize();
            this.resetTextColor();
        };
    })();
}