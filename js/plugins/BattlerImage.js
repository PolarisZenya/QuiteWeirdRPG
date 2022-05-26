//-----------------------------------------------------------------------------
//  BattlerImage
//-----------------------------------------------------------------------------
//  更新紀錄:
//  2021-03-10  1.0釋出
//-----------------------------------------------------------------------------
//  版權為Kan持有，請勿隨意盜用及修改
//-----------------------------------------------------------------------------

var BattlerImage = BattlerImage || {};        // 主要腳本

//-----------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc 修改戰鬥人物圖像顯示
 * @author Kan
 * 
 * @param timegauge
 * @text 戰鬥時間條
 * @type boolean
 * @default true
 * @desc 顯示戰鬥時間條，true為顯示
 * 
 * @param firstperson
 * @text 第一人稱視角
 * @type boolean
 * @default true
 * @desc 第一人稱視角，true為第一人稱視角，false為第三人稱視角
 * 
 * @param statevisible
 * @text 角色狀態欄透明
 * @type boolean
 * @default false
 * @desc 顯示角色狀態欄，true為不顯示
 * 
 * @param monstername
 * @text 怪物名稱
 * @type boolean
 * @default true
 * @desc 可以在戰鬥畫面顯示怪物名稱
 * 
 * @param monsterhp
 * @text 怪物血量
 * @type boolean
 * @default true
 * @desc 可以在戰鬥畫面顯示怪物血量
 * 
 * @param monsternamex
 * @text 怪物名稱X
 * @default 0
 * @desc 可以改變怪物名稱X
 * 
 * @param monsternamey
 * @text 怪物名稱Y
 * @default 0
 * @desc 可以改變怪物名稱Y
 * 
 * @param monsterhpx
 * @text 怪物血量X
 * @default 0
 * @desc 可以改變怪物血量X
 * 
 * @param monsterhpy
 * @text 怪物血量Y
 * @default 0
 * @desc 可以改變怪物血量Y
 * 
 * @param imagex
 * @text 人物圖像X
 * @default 0.5
 * @desc 可以改變人物圖像位置X
 * 
 * @param imagey
 * @text 人物圖像Y
 * @default 0.5
 * @desc 可以改變人物圖像位置Y
 * 
 * @param imagesize
 * @text 人物圖像大小
 * @default 0.7
 * @desc 可以改變人物圖像大小，數值越大圖像越大
 * 
 * @param imagewidth
 * @text 人物圖像間隔
 * @default 0
 * @desc 可以改變人物圖像間隔，數值越大間隔越大
 * 
 * @param charactorsize
 * @text 角色數量
 * @default 4
 * @desc 檢查角色數量
 * 
 * @param charactorpictures
 * @text 角色圖像
 * @type file[]
 * @dir img/pictures/
 * @desc 角色圖片，角色1設定為陣列1
 * @default []
 * 
 * @help BattlerImage.js
 *
 * 本腳本修改戰鬥人物圖像顯示，並不支援其他修改戰鬥圖像的腳本
 *
 * 使用方法如下:
 * 
 * 戰鬥畫面必須為側面視角
 */

//-----------------------------------------------------------------------------
//  以下腳本請勿更動
//-----------------------------------------------------------------------------

BattlerImage.timegauge = PluginManager.parameters("BattlerImage")["timegauge"];
BattlerImage.firstperson = PluginManager.parameters("BattlerImage")["firstperson"];
BattlerImage.statevisible = PluginManager.parameters("BattlerImage")["statevisible"];
BattlerImage.imagesize = PluginManager.parameters("BattlerImage")["imagesize"];
BattlerImage.imagex = PluginManager.parameters("BattlerImage")["imagex"];
BattlerImage.imagey = PluginManager.parameters("BattlerImage")["imagey"];
BattlerImage.imagewidth = PluginManager.parameters("BattlerImage")["imagewidth"];
BattlerImage.monstername = PluginManager.parameters("BattlerImage")["monstername"];
BattlerImage.monsterhp = PluginManager.parameters("BattlerImage")["monsterhp"];
BattlerImage.monsternamex = PluginManager.parameters("BattlerImage")["monsternamex"];
BattlerImage.monsternamey = PluginManager.parameters("BattlerImage")["monsternamey"];
BattlerImage.monsterhpx = PluginManager.parameters("BattlerImage")["monsterhpx"];
BattlerImage.monsterhpy = PluginManager.parameters("BattlerImage")["monsterhpy"];

BattlerImage.charactorsize = PluginManager.parameters("BattlerImage")["charactorsize"];
BattlerImage.charactorpictures = PluginManager.parameters("BattlerImage")["charactorpictures"];

(() => {
    
    Window_BattleStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.faceRect(index);
    };
    
    Window_BattleStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    const nameX = this.nameX(rect);
    const nameY = this.nameY(rect);
    const stateIconX = this.stateIconX(rect);
    const stateIconY = this.stateIconY(rect);
    const basicGaugesX = this.basicGaugesX(rect);
    const basicGaugesY = this.basicGaugesY(rect);
    if(BattlerImage.timegauge == "true"){
    this.placeTimeGauge(actor, nameX, nameY);
    }
    this.placeActorName(actor, nameX, nameY);
    this.placeStateIcon(actor, stateIconX, stateIconY);
    this.placeBasicGauges(actor, basicGaugesX, basicGaugesY);
    };

    Sprite_Actor.prototype.initMembers = function() {
    Sprite_Battler.prototype.initMembers.call(this);
    this._battlerName = "";
    this._motion = null;
    this._motionCount = 0;
    this._pattern = 0;
    this.createShadowSprite();
    this.createWeaponSprite();
    this.createMainSprite();
    this.createStateSprite();
    this.createActorSprite();

    this.createHpSprite();
    this.createMpSprite();
    this.createTpSprite();
    this.createTimeSprite();
    this.createNameSprite();
    this.createStateIconSprite();
 
    };

    Sprite_Actor.prototype.createStateIconSprite = function() {
    this._stateIconSprite = new Sprite_StateIcon();
    this.addChild(this._stateIconSprite);
    };

    Sprite_Actor.prototype.createTimeSprite = function(battler) {
    this.TimeSprite = new Sprite_Gauge();
    this.addChild(this.TimeSprite);
    };

    Sprite_Actor.prototype.createNameSprite = function() {
    this.NameSprite = new Sprite_Name();
    this.addChild(this.NameSprite);
    };

    Sprite_Actor.prototype.createHpSprite = function() {
    this.HpSprite = new Sprite_Gauge();
    this.addChild(this.HpSprite);
    };

    Sprite_Actor.prototype.createMpSprite = function() {
    this.MpSprite = new Sprite_Gauge();
    this.addChild(this.MpSprite);
    };
    
    Sprite_Actor.prototype.createTpSprite = function() {
    this.TpSprite = new Sprite_Gauge();
    this.addChild(this.TpSprite);
    };

    Sprite_Actor.prototype.SetStateIconSpritePosition = function(index) {
    if (BattlerImage.firstperson == "false"){
    this._stateIconSprite.y = -Math.round(this.height - 262) - index * 50;
    this._stateIconSprite.x = -432 + index * BattlerImage.imagewidth + index * 118;
    }else{
    this._stateIconSprite.y = -Math.round(this.height-28);
    this._stateIconSprite.x = 68;
    }
    };

    Sprite_Actor.prototype.SetTimeSpritePosition = function(index) {
    if (BattlerImage.firstperson == "false"){
    this.TimeSprite.y = -Math.round(this.height - 250) - index * 48;
    this.TimeSprite.x = -550 + index * BattlerImage.imagewidth + index * 118;
    }else{
    this.TimeSprite.y = -Math.round(this.height - 18);
    this.TimeSprite.x = -50;
    }
    };

    Sprite_Actor.prototype.SetNameSpritePosition = function(index) {
    if (BattlerImage.firstperson == "false"){
    this.NameSprite.y = -Math.round(this.height - 254) - index * 48;
    this.NameSprite.x = -550 + index * BattlerImage.imagewidth + index * 118;
    }else{
    this.NameSprite.y = -Math.round(this.height - 18);
    this.NameSprite.x = -50;
    }
    };

    Sprite_Actor.prototype.SetHpSpritePosition = function(index) {
    if (BattlerImage.firstperson == "false"){
    this.HpSprite.y = -Math.round(this.height - 278) - index * 48;
    this.HpSprite.x = -550 + index * BattlerImage.imagewidth + index * 118;
    }else{
    this.HpSprite.y = -Math.round(this.height - 42);
    this.HpSprite.x = -50;
    }
    };

    Sprite_Actor.prototype.SetMpSpritePosition = function(index) {
    if (BattlerImage.firstperson == "false"){
    this.MpSprite.y = -Math.round(this.height - 302) - index * 48;
    this.MpSprite.x = -550 + index * BattlerImage.imagewidth + index * 118;
    }else{
    this.MpSprite.y = -Math.round(this.height - 66);
    this.MpSprite.x = -50;
    }
    };
    
    Sprite_Actor.prototype.SetTpSpritePosition = function(index) {
    if (BattlerImage.firstperson == "false"){
    this.TpSprite.y = -Math.round(this.height - 326) - index * 48;
    this.TpSprite.x = -550 + index * BattlerImage.imagewidth + index * 118;
    }else{
    this.TpSprite.y = -Math.round(this.height - 90);
    this.TpSprite.x = -50;
    }
    };

    Sprite_Actor.prototype.createActorSprite = function() { 
    this._actorSprite = new Sprite();
    this.addChild(this._actorSprite);
    };
    
    Sprite_Actor.prototype.updateTargetPosition = function() {
    if (BattlerImage.firstperson === false){
    if (this._actor.canMove() && BattleManager.isEscaped()) {
        this.retreat();
    } else if (this.shouldStepForward()) {
        this.stepForward();
    } else if (!this.inHomePosition()) {
        this.stepBack();
    }
    }
    };

    Scene_Battle.prototype.statusWindowX = function() {
    if (this.isAnyInputWindowActive()) {
        return this.statusWindowRect().x;
    } else {
        return this.statusWindowRect().x;
    }
    };

    Scene_Battle.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    const statusWindow = new Window_BattleStatus(rect);
    if (BattlerImage.statevisible == "false"){
    this.addWindow(statusWindow);
    }
    
    this._statusWindow = statusWindow;
    };

    Scene_Battle.prototype.statusWindowRect = function() {
    const extra = 10;
    const ww = Graphics.boxWidth - 192;
    
    const wh = 125;
    const wx = 32;
    const wy = Graphics.boxHeight - wh + extra - 4;
    return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Battle.prototype.actorCommandWindowRect = function() {
    const ww = 164;
    const wh = this.windowAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Battle.prototype.partyCommandWindowRect = function() {
    const ww = 164;
    const wh = this.windowAreaHeight();
    const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
    };

    Sprite_Actor.prototype.SetActorPosition = function(index) { 
    this._actorSprite.anchor.x = BattlerImage.imagex;
    this._actorSprite.anchor.y = BattlerImage.imagey;
    this._actorSprite.scale.x = BattlerImage.imagesize;
    this._actorSprite.scale.y = BattlerImage.imagesize;
    if (BattlerImage.firstperson == "false"){
    this._actorSprite.x = -480 + index * BattlerImage.imagewidth + index * 118;
    this._actorSprite.y = 240 - index * 48;
    }else{
    this._actorSprite.x = 20;
    this._actorSprite.y = 0;
    }
    };

    Sprite_Actor.prototype.createShadowSprite = function() {
    this._shadowSprite = new Sprite();
    this._shadowSprite.bitmap = ImageManager.loadSystem("Shadow2");
    this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 0.5;
    this._shadowSprite.y = -2;
    if (BattlerImage.firstperson == "false"){
    this.addChild(this._shadowSprite);
    }
    };

    Sprite_Actor.prototype.createWeaponSprite = function() {
    this._weaponSprite = new Sprite_Weapon();
    if (BattlerImage.firstperson == "false"){
    this.addChild(this._weaponSprite);
    }
    };

    Sprite_Actor.prototype.createMainSprite = function() {
    this._mainSprite = new Sprite();
    this._mainSprite.anchor.x = 0.5;
    this._mainSprite.anchor.y = 1;
    if (BattlerImage.firstperson == "false"){
    this.addChild(this._mainSprite);
    }
    };

    Sprite_Actor.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    if (battler !== this._actor) {
        this._actor = battler;
        
        if (battler) {
            this.setActorHome(battler.index());
            this.SetActorPosition(battler.index());
            this.ActorSpriteUpdate(this._actor);

            if (BattlerImage.statevisible == "true"){
    	    this.NameSprite.setup(battler);
            this.MpSprite.setup(battler,"mp");
            this.TpSprite.setup(battler,"tp");
            if (BattlerImage.timegauge == "true"){
            this.TimeSprite.setup(battler,"time");
            }
            this.HpSprite.setup(battler,"hp");
            this._stateIconSprite.setup(battler);
            }

            this.SetHpSpritePosition(battler.index());
    	    this.SetMpSpritePosition(battler.index());
            this.SetTpSpritePosition(battler.index());
            this.SetTimeSpritePosition(battler.index());
            this.SetNameSpritePosition(battler.index());
            this.SetStateIconSpritePosition(battler.index());
            
        } else {
            this._mainSprite.bitmap = null;
        }
        this._stateSprite.setup(battler);
        this.startEntryMotion();
    }
    };

    Sprite_Actor.prototype.ActorSpriteUpdate = function(actor) {
    charactorname = JSON.parse(BattlerImage.charactorpictures);
    for (let i = 0; i < BattlerImage.charactorsize; i++) {
    	if ( actor == $gameActors.actor(i+1) ){
    	this._actorSprite.bitmap = ImageManager.loadPicture(charactorname[i]);
    	}
    }
    };
    
    Sprite_Actor.prototype.setActorHome = function(index) {
    if (BattlerImage.firstperson == "false"){
    this.setHome(600 + index * 32, 280 + index * 48);
    }else{
    this.setHome(100 + index * 150 + index * BattlerImage.imagewidth, 520);
    }
    };


    Sprite_Enemy.prototype.initMembers = function() {
    Sprite_Battler.prototype.initMembers.call(this);
    this._enemy = null;
    this._appeared = false;
    this._battlerName = "";
    this._battlerHue = 0;
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
    this.createStateIconSprite();
    
    this.createHpSprite();
    this.createNameSprite();
    };

    Sprite_Enemy.prototype.createNameSprite = function() {
    this.NameSprite = new Sprite_Name();
    this.NameSprite.y = -Math.round(this.height + 25) -BattlerImage.monsternamey;
    this.NameSprite.x = -75 -BattlerImage.monsternamex;
    this.addChild(this.NameSprite);
    };

    Sprite_Enemy.prototype.createHpSprite = function() {
    this.HpSprite = new Sprite_Gauge();
    this.HpSprite.y = 0 -BattlerImage.monsterhpy;
    this.HpSprite.x = -75 -BattlerImage.monsterhpx;
    this.addChild(this.HpSprite);
    };

    Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
    this.setHome(battler.screenX(), battler.screenY());
    this._stateIconSprite.setup(battler);
    if (BattlerImage.monstername == "true"){
    this.NameSprite.setup(battler);
    }
    if (BattlerImage.monsterhp == "true"){
    this.HpSprite.setup(battler,"hp");
    }
    };

})();
