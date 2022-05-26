//=============================================================================
// RPG Maker MZ - Weather Expansion
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 擴充內建的天氣。
 * @author Zenya
 * 
 * @help 次插件需要官方插件 EventCommandByCode.js
 * @help Sun_WeatherExpansion.js [version 1.1]
 *
 * 擴充原有天氣項目
 * 使用內建指令$gameScreen.changeWeather(type, power, duration)
 * type in ["none", "rain", "storm", "snow", "star", "mosquito", 
 *           "leaf01", "leaf02", "leaf03", "leaf04", "leaf05"]
 * power 強度 0~9
 * duration 轉換間隔(毫秒)
 *
 * 參考插件
 *   - MV版本:VPS - Dynamic Weather System.js
 *     - 作者:Soulpour777
 *   - VXA版本:落ち葉 
 *     - 作者:http://kaisou-ryouiki.sakura.ne.jp/ 
 *=============================================================================
 * @command changeWeatherEx
 * @text 改變天氣特效
 * @desc 可以指定擴充的天氣
 *
 * @arg type
 * @text 天氣類別
 * @desc 
 * @default none
 * @type select
 * @option 關閉天氣
 * @value none
 * @option 雨
 * @value rain
 * @option 風暴
 * @value storm
 * @option 雪
 * @value snow
 * @option 星空閃爍
 * @value star
 * @option 飛蚊
 * @value mosquito
 * @option 火星
 * @value spark
 * @option 落葉(紅楓葉)
 * @value leaf01
 * @option 落葉(黃楓葉)
 * @value leaf02
 * @option 落葉(綠葉)
 * @value leaf03
 * @option 落葉(紅葉)
 * @value leaf04
 * @option 落葉(黃葉)
 * @value leaf05
 * @arg power
 * @text 特效強度
 * @desc 0~9
 * @default 0
 * @type number
 * @min 0
 * @max 9
 * @arg duration
 * @text 轉換間隔(毫秒)
 * @desc 0~180
 * @default 0
 * @type number
 * @min 0
 * @max 180
 */

(() => {
	'use strict';
    const script = document.currentScript;

    PluginManagerEx.registerCommand(script, 'changeWeatherEx', function(args) {
		$gameScreen.changeWeather(args.type, args.power, args.duration);
    });
	//------------------------------------------------------------------------------
	Sprite.prototype.getFrame = function() {	
		return this._frame.clone();
	};
	
	Weather.prototype.initialize = function() {
		PIXI.Container.call(this);

		this._width = Graphics.width;
		this._height = Graphics.height;
		this._sprites = [];

		this._createBitmaps();
		this._createDimmer();

		/**
		 * The type of the weather in ["none", "rain", "storm", "snow", "star", "mosquito", "spark",
									   "leaf01", "leaf02", "leaf03", "leaf04", "leaf05"].
		 *
		 * @type string
		 */
		this.type = "none";

		/**
		 * The power of the weather in the range (0, 9).
		 *
		 * @type number
		 */
		this.power = 0;

		/**
		 * The origin point of the weather for scrolling.
		 *
		 * @type Point
		 */
		this.origin = new Point();
	};

	Weather.prototype._updateDimmer = function() {
		switch (this.type) {
			case "rain":
			case "storm":
			case "snow":
				this._dimmerSprite.setColor(80, 80, 80);
				this._dimmerSprite.opacity = Math.floor(this.power * 6);
				break;
			case "star":
				this._dimmerSprite.setColor(255, 255, 255);
				this._dimmerSprite.opacity = 50;
				break
			case "mosquito":
				this._dimmerSprite.setColor(0, 0, 0);
				this._dimmerSprite.opacity = 0;
				break;
			case "spark":
				this._dimmerSprite.setColor(255, 50, 0);
				this._dimmerSprite.opacity = Math.floor(this.power * 6);
				break;
			case "leaf01":
			case "leaf02":
			case "leaf03":
			case "leaf04":
			case "leaf05":
				this._dimmerSprite.setColor(0, 0, 0);
				this._dimmerSprite.opacity = 0;
				break;
		}
	};
	
	Weather.prototype._updateAllSprites = function() {
		let maxSprites = 0;
		switch (this.type) {
			case "rain":
			case "storm":
			case "snow":
			case "star":
			case "mosquito":
			case "spark":
				maxSprites = Math.floor(this.power * 10);
				break;
			case "leaf01":
			case "leaf02":
			case "leaf03":
			case "leaf04":
			case "leaf05":
				maxSprites = Math.floor(this.power * 3);
				break;
		}
		while (this._sprites.length < maxSprites) {
			this._addSprite();
		}
		while (this._sprites.length > maxSprites) {
			this._removeSprite();
		}
		for (const sprite of this._sprites) {
			this._updateSprite(sprite);
			sprite.x = sprite.ax - this.origin.x;
			sprite.y = sprite.ay - this.origin.y;
		}
	};
	
	/**
	 * Destroys the weather.
	 */
	Weather.prototype.destroy = function() {
		const options = { children: true, texture: true };
		PIXI.Container.prototype.destroy.call(this, options);
		this._rainBitmap.destroy();
		this._stormBitmap.destroy();
		this._snowBitmap.destroy();
		this._sparkBitmap.destroy();
		this._leaf01Bitmap.destroy();
		this._leaf02Bitmap.destroy();
		this._leaf03Bitmap.destroy();
		this._leaf04Bitmap.destroy();
		this._leaf05Bitmap.destroy();
	};

	Weather.prototype._createBitmaps = function() {
		this._rainBitmap = new Bitmap(1, 60);
		this._rainBitmap.fillAll("white");
		this._stormBitmap = new Bitmap(2, 100);
		this._stormBitmap.fillAll("white");
		this._snowBitmap = new Bitmap(9, 9);
		this._snowBitmap.drawCircle(4, 4, 4, "white");
		this._sparkBitmap = new Bitmap(5, 5);
		this._sparkBitmap.drawCircle(2, 2, 2, "#FFA500");

		this._leaf01Bitmap = ImageManager.loadSystem("weathers/fallen_leaves01");
		this._leaf02Bitmap = ImageManager.loadSystem("weathers/fallen_leaves02");
		this._leaf03Bitmap = ImageManager.loadSystem("weathers/fallen_leaves03");
		this._leaf04Bitmap = ImageManager.loadSystem("weathers/fallen_leaves04");
		this._leaf05Bitmap = ImageManager.loadSystem("weathers/fallen_leaves05");
	};

	Weather.prototype._updateSprite = function(sprite) {
		switch (this.type) {
			case "rain":
				this._updateRainSprite(sprite);
				break;
			case "storm":
				this._updateStormSprite(sprite);
				break;
			case "snow":
				this._updateSnowSprite(sprite);
				break;
			case "star":
				this._updateStarSprite(sprite);
				break
			case "mosquito":
				this._updateMosquitoSprite(sprite);
				break;
			case "spark":
				this._updateSparkSprite(sprite);
				break;
			case "leaf01":
				this._updateLeafSprite(sprite, this._leaf01Bitmap);
				break;
			case "leaf02":
				this._updateLeafSprite(sprite, this._leaf02Bitmap);
				break;
			case "leaf03":
				this._updateLeafSprite(sprite, this._leaf03Bitmap);
				break;
			case "leaf04":
				this._updateLeafSprite(sprite, this._leaf04Bitmap);
				break;
			case "leaf05":
				this._updateLeafSprite(sprite, this._leaf05Bitmap);
				break;
		}
		
		if (sprite.opacity < 40) {
			this._rebornSprite(sprite);
		} else {
			if (sprite.ay > (Graphics.height + this.origin.y)) {
				this._leafRebornSprite(sprite);
			}
		}

	};

	Weather.prototype._updateRainSprite = function(sprite) {
		sprite.bitmap = this._rainBitmap;
		sprite.rotation = Math.PI / 16;
		sprite.ax -= 6 * Math.sin(sprite.rotation);
		sprite.ay += 6 * Math.cos(sprite.rotation);
		sprite.opacity -= 6;
	};

	Weather.prototype._updateStormSprite = function(sprite) {
		sprite.bitmap = this._stormBitmap;
		sprite.rotation = Math.PI / 8;
		sprite.ax -= 8 * Math.sin(sprite.rotation);
		sprite.ay += 8 * Math.cos(sprite.rotation);
		sprite.opacity -= 8;
	};

	
	Weather.prototype._updateStarSprite = function(sprite) {
		sprite.bitmap = this._snowBitmap;
		sprite.rotation = Math.PI;
		sprite.opacity -= 3;
	};
	
	Weather.prototype._updateMosquitoSprite = function(sprite) {
		sprite.bitmap = this._snowBitmap;
		sprite.rotation = Math.floor(Math.random() * 360);
		sprite.opacity -= 3;
	};
	
	Weather.prototype._updateSparkSprite = function(sprite) {
		sprite.bitmap = this._sparkBitmap;
		sprite.rotation = Math.PI / 16;
		let isLeft = (Math.floor(Math.random() * 2) === 0);
		if (isLeft) {
			sprite.ax -= Math.floor(Math.random() * 20) * Math.sin(sprite.rotation);
		} else {
			sprite.ax += Math.floor(Math.random() * 20) * Math.sin(sprite.rotation);
		}
		sprite.ay -= 3 * Math.cos(sprite.rotation);
		sprite.opacity -= 3;
	};

	Weather.prototype._updateLeafSprite = function(sprite, leafBitmap) {
		let pw = Math.floor(leafBitmap.width) / 18;
		let ph = Math.floor(leafBitmap.height) / 18;
		let sx = sprite.getFrame().x;
		let sy = sprite.getFrame().y;
		
		let isLeft = (Math.floor(Math.random() * 2) === 0);
		if (isLeft) {
			sprite.ax -= Math.floor(Math.random() * 20) * Math.sin(sprite.rotation);
		} else {
			sprite.ax += Math.floor(Math.random() * 20) * Math.sin(sprite.rotation);
		}
		
		sx += pw;
		if (sx >= Math.floor(leafBitmap.width)) {
			sx -= Math.floor(leafBitmap.width);
		}
		sy += ph;
		if (sy >= Math.floor(leafBitmap.height)) {
			sy -= Math.floor(leafBitmap.height);
		}
		
		sprite.bitmap = leafBitmap;
		sprite.rotation = Math.PI / 16;
		sprite.ax -= 6 * Math.sin(sprite.rotation);
		sprite.ay += 6 * Math.cos(sprite.rotation);
		sprite.setFrame(sx, sy, pw, ph);
	};
	
	Weather.prototype._rebornSprite = function(sprite) {
		sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
		sprite.ay = Math.randomInt(Graphics.height + 200) - 200 + this.origin.y;
		sprite.opacity = 160 + Math.randomInt(60);
	};
	
	Weather.prototype._leafRebornSprite = function(sprite) {
		sprite.ax = Math.randomInt(Graphics.width + 100) - 100 + this.origin.x;
		sprite.ay = this.origin.y;
		sprite.opacity = 255;
	};

})();