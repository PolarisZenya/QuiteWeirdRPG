//=============================================================================
// RPG Maker MZ - Weather Expansion
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 擴充霧氣。
 * @author Zenya
 *
 * @help 本插件需要官方插件 EventCommandByCode.js
 * @help Sun_FogsExpansion.js [version 1.0]
 *
 * 擴充霧氣特效
 *
 * 參考插件
 *   - MV版本:BMSP_MapFog.js
 *     - 作者:gentlawk
 *=============================================================================
 * @command setFogCode
 * @text 開啟地圖霧特效
 * @desc 指定想要開啟的霧特效
 *
 * @arg fogCode
 * @text 特效類型
 * @desc
 * @default -1
 * @type select
 * @option 關閉特效
 * @value -1
 * @option 雲1
 * @value 0
 * @option 雲2
 * @value 1
 * @option 雲3
 * @value 2
 * @option 雲4
 * @value 3
 * @option 雲5
 * @value 4
 * @option 雲6
 * @value 5
 * @option 雲7
 * @value 6
 * @option 雲8
 * @value 7
 * @option 太陽高照
 * @value 8
 * @option 太陽光輝
 * @value 9
 * @option 黃昏室內光輝
 * @value 10
 * @option 極光1
 * @value 11
 * @option 極光2
 * @value 12
 * @option 極光3
 * @value 13
 * @option 極光4
 * @value 14
 * @option 極光5
 * @value 15
 * @option XP霧
 * @value 16
 * @option XP雲
 * @value 17
 * @option XP樹陰
 * @value 18
 * @option XP沙塵1
 * @value 19
 * @option XP沙塵2
 * @value 20
 * @option XP水紋1
 * @value 21
 * @option XP水紋2
 * @value 22
 * @option XP水紋3
 * @value 23
 * @option XP水紋4
 * @value 24
 */

	
var $fogsInfo = [
	{
		fogName: "pipo-fog012",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲1",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog013",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲2",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog014",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲3",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog015",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲4",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog016",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲5",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog017",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲6",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog018",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲7",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog019",     //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,                //霧 色相
		fogOpacity: 255,           //霧 不透明度
		fogBlendType: 3,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "雲8",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog020",  //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 3,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "太陽高照",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "pipo-fog021",  //霧 檔案名稱
		width: 900,
		height: 675,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 3,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "太陽光輝",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "sunlight",  //霧 檔案名稱
		width: 1000,
		height: 765,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 0,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "室內夕陽光輝",
		nextIncrease: 0,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "aurora1",     //霧 檔案名稱
		width: 830,
		height: 768,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 0,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "極光1",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "aurora2",     //霧 檔案名稱
		width: 900,
		height: 600,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 0,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "極光1",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "aurora3",     //霧 檔案名稱
		width: 1050,
		height: 700,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 0,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "極光1",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "aurora4",     //霧 檔案名稱
		width: 1050,
		height: 700,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 0,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "極光1",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "aurora5",     //霧 檔案名稱
		width: 1050,
		height: 700,
		fogHue: 0,              //霧 色相
		fogOpacity: 255,        //霧 不透明度
		fogBlendType: 0,        //霧 混合方式
		fogSportMode: 0,        //霧 運動模式
		fogDesc: "極光1",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "001-Fog01",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 50,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "XP霧",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "002-Clouds01",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 50,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "XP雲",
		nextIncrease: 1,
		maxIncrease: 255,
		minIncrease: 0
	},
	{
		fogName: "004-Shade02",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 50,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 0,          //霧 運動模式
		fogDesc: "XP樹陰",
		nextIncrease: 0.5,
		maxIncrease: 80,
		minIncrease: 30
	},
	{
		fogName: "005-Sandstorm01",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 80,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "XP沙塵1",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "006-Sandstorm02",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 80,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "XP沙塵2",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "007-Water01",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 80,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "水紋1",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "008-Water02",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 80,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "水紋2",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "009-Water03",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 80,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "水紋3",
		nextIncrease: 1,
		maxIncrease: 0,
		minIncrease: 0
	},
	{
		fogName: "010-Water04",     //霧 檔案名稱
		width: 256,
		height: 256,
		fogHue: 0,                //霧 色相
		fogOpacity: 80,           //霧 不透明度
		fogBlendType: 0,          //霧 混合方式
		fogSportMode: 1,          //霧 運動模式
		fogDesc: "水紋4",
		nextIncrease: 2,
		maxIncrease: 0,
		minIncrease: 0
	}
];

(() => {
	'use strict';
    const script = document.currentScript;

    PluginManagerEx.registerCommand(script, 'setFogCode', function(args) {
		$gameScreen.setFogCode(args.fogCode);
    });
	//------------------------------------------------------------------------------
	ImageManager.loadFog = function(filename) {
		return this.loadBitmap("img/fogs/", filename);
	};
	
	Game_Screen.prototype.clearFogs = function() {
		this._fogCode = -1;
	};
	
	var _Game_Screen_clear = Game_Screen.prototype.clear;
	Game_Screen.prototype.clear = function() {
		_Game_Screen_clear.call(this);
		this.clearFogs();
	};
	
	Game_Screen.prototype.setFogCode = function(fogCode) {
		this._fogCode = fogCode;
	};
	
	Game_Screen.prototype.fogCode = function() {
		return this._fogCode;
	};
	
	var _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
		this._posSwitch = false;
		this._fogContainer = [];
		this._fogData = [];
		this._fogCode = $gameScreen.fogCode();
        _Spriteset_Map_initialize.call(this);
    };
	
	Spriteset_Map.prototype.createFogs = function(fogCode) {
		switch ($fogsInfo[fogCode].fogSportMode) {
			case 0:
				let fogSprite0 = new TilingSprite();
				fogSprite0.move(0, 0, Graphics.width, Graphics.height);
				fogSprite0.bitmap = ImageManager.loadFog($fogsInfo[fogCode].fogName);
				fogSprite0.opacity = $fogsInfo[fogCode].fogOpacity;
				fogSprite0.blendMode = $fogsInfo[fogCode].fogBlendType;
			
				this._fogContainer.push(new Sprite());
				this._fogContainer[0].addChild(fogSprite0);
				this._fogData.push({
					index: 0,
					sprite: fogSprite0,
					opacity: $fogsInfo[fogCode].fogOpacity,
					nextIncrease: $fogsInfo[fogCode].nextIncrease,
					maxIncrease: $fogsInfo[fogCode].maxIncrease,
					minIncrease:$fogsInfo[fogCode].minIncrease
				});
				this.addChild(this._fogContainer[0]);
				break;
			case 1:
				let colCount = Math.ceil(Graphics.width / $fogsInfo[fogCode].width) + 2;
				let rowCount = Math.ceil(Graphics.height / $fogsInfo[fogCode].height);
				let idx = 0;
				for (let i = 0; i < colCount; i++) {
					for (let j = 0; j < rowCount; j++) {
						let fogSprite1 = new TilingSprite();
						fogSprite1.move(0, 0, $fogsInfo[fogCode].width, $fogsInfo[fogCode].height);
						fogSprite1.bitmap = ImageManager.loadFog($fogsInfo[fogCode].fogName);
						fogSprite1.opacity = $fogsInfo[fogCode].fogOpacity;
						fogSprite1.blendMode = $fogsInfo[fogCode].fogBlendType;
						let x = (i * $fogsInfo[fogCode].width) - $fogsInfo[fogCode].width;
						let y = (j * $fogsInfo[fogCode].height);
						this._fogContainer.push(new Sprite());
						this._fogContainer[idx].addChild(fogSprite1);
						this._fogData.push({
							index: idx,
							sprite: fogSprite1,
							nextIncrease: $fogsInfo[fogCode].nextIncrease,
							x: x,
							y: y
						});
						this.addChild(this._fogContainer[idx]);
						idx++;
					}
				}
				break;
		}
        
		
    };
	
	var _Spriteset_Map_createParallax = Spriteset_Map.prototype.createParallax;
    Spriteset_Map.prototype.createParallax = function() {
        _Spriteset_Map_createParallax.call(this);
    };
	
	var _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
		if (this._fogCode !== $gameScreen.fogCode()) {
			this.clearFogs();
			this._fogCode = $gameScreen.fogCode();
			if ($gameScreen.fogCode() !== -1) {
				this.createFogs($gameScreen.fogCode());
			}
		}
		if (this._fogCode != -1) {
			this.updateFogs(this._fogCode);
		}
    };
	
	Spriteset_Map.prototype.updateFogs = function(fogCode) {
		let fogContainerTemp = [];
		let posSwitch = this._posSwitch;
		if (fogCode > -1) {
			if (this._fogData.length == 0) {
				this._fogCode = -1;
			}
			switch ($fogsInfo[fogCode].fogSportMode) {
				case 0:
					this._fogData.forEach(function(data) {
						fogContainerTemp.push(new Sprite());
						if (!posSwitch) {
							data.sprite.opacity += (data.nextIncrease * -1);
						} else {
							data.sprite.opacity += data.nextIncrease;
						}
						
						if (parseInt(data.sprite.opacity) <= data.minIncrease) {
							posSwitch = true;
						} else if (parseInt(data.sprite.opacity) >= data.maxIncrease) {
							posSwitch = false;
						}
						fogContainerTemp[data.index].addChild(data.sprite);
						this._posSwitch = posSwitch;
						this.removeChild(this._fogContainer[data.index]);
						this._fogContainer = fogContainerTemp;
						this.addChild(this._fogContainer[data.index]);					
					}, this);
					break;
				case 1:
					this._fogData.forEach(function(data) {
						fogContainerTemp.push(new Sprite());
						data.sprite.x = data.x;
						data.sprite.y = data.y;
						let colCount = Math.ceil(Graphics.width / $fogsInfo[fogCode].width) + 1;
						if (data.sprite.x >= (colCount * $fogsInfo[fogCode].width)) {
							data.sprite.x = ($fogsInfo[fogCode].width * -1);
						}
						data.sprite.x += data.nextIncrease;
						data.x = data.sprite.x;
						data.y = data.sprite.y;
						fogContainerTemp[data.index].addChild(data.sprite);
						this.removeChild(this._fogContainer[data.index]);
						this._fogContainer = fogContainerTemp;
						this.addChild(this._fogContainer[data.index]);						
					}, this);
					break;
			}			
		}
    };
	
	Spriteset_Map.prototype.clearFogs = function() {
		this._fogData.forEach(function(data) {
			this.removeChild(this._fogContainer[data.index]);
		}, this);					
		this._fogContainer = [];
		this._fogData = [];
	}
	
})();