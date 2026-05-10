window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AttrMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "23d2bXnBw5Bub7+t6sSjrDl", "AttrMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AttrMgr = void 0;
    const eventTypes_1 = require("../event/eventTypes");
    const MapDrawCable_1 = require("../item/MapDrawCable");
    const MapDrawDoor_1 = require("../item/MapDrawDoor");
    const MapDrawEnemyRefresh_1 = require("../item/MapDrawEnemyRefresh");
    const MapDrawLadder_1 = require("../item/MapDrawLadder");
    const MapDrawP_1 = require("../item/MapDrawP");
    const MapDrawPortal_1 = require("../item/MapDrawPortal");
    const MapDrawRoom_1 = require("../item/MapDrawRoom");
    const MapDrawSurvive_1 = require("../item/MapDrawSurvive");
    const MapDrawUnitBase_1 = require("../item/MapDrawUnitBase");
    const MapTool_1 = require("../tool/MapTool");
    const mapTypes_1 = require("../type/mapTypes");
    const EventManager_1 = require("./EventManager");
    const Singleton_1 = require("./Singleton");
    class AttrMgr extends Singleton_1.Singleton {
      static get instance() {
        return super.instance;
      }
      onInit(params) {
        this._mapLoader = params[0];
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.UpdateFromAttrPanel, this.refreshNdAttr, this);
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.UpdateAreaInfoFormPanel, this.refreshAreaInfo, this);
      }
      onDestroy() {
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.UpdateFromAttrPanel, this.refreshNdAttr, this);
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.UpdateAreaInfoFormPanel, this.refreshAreaInfo, this);
      }
      setTrackNd(trackNd) {
        this._trackNd = trackNd;
      }
      getTrachNd() {
        return this._trackNd;
      }
      refreshAttrPanel() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
        if (!this._trackNd) return;
        const itemDat = this._trackNd;
        const controller = itemDat.getComponent(MapDrawUnitBase_1.default);
        const type = controller.getType();
        const worldPos = this._trackNd.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const pos = MapTool_1.default.converWorldPosToMapPos(worldPos);
        const baseDat = {
          name: this._trackNd.name,
          pos: pos
        };
        const basePanelDat = {
          type: mapTypes_1.UnitType.Default,
          dat: baseDat
        };
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.RefreshAttrPanel, basePanelDat);
        if (type == mapTypes_1.UnitType.Default) return;
        let dat = {};
        switch (type) {
         case mapTypes_1.UnitType.Room:
          dat.roomId = `${this._trackNd.getComponent(MapDrawRoom_1.default).getRoomId()}`;
          dat.size = this._trackNd.getContentSize();
          dat.unLockPoints = null === (_a = this._trackNd.getComponent(MapDrawRoom_1.default)) || void 0 === _a ? void 0 : _a.getUnLockPoints().filter(nd => nd && cc.isValid(nd));
          break;

         case mapTypes_1.UnitType.PathPoint:
          const pointCom = null === (_b = this._trackNd) || void 0 === _b ? void 0 : _b.getComponent(MapDrawP_1.default);
          const links = null !== (_c = null === pointCom || void 0 === pointCom ? void 0 : pointCom.links) && void 0 !== _c ? _c : [];
          dat.roomId = null !== (_e = null === (_d = null === pointCom || void 0 === pointCom ? void 0 : pointCom.getDat()) || void 0 === _d ? void 0 : _d.roomId.toString()) && void 0 !== _e ? _e : "";
          dat.links = links;
          break;

         case mapTypes_1.UnitType.Door:
          const doorCom = null === (_f = this._trackNd) || void 0 === _f ? void 0 : _f.getComponent(MapDrawDoor_1.default);
          dat.roomId = null !== (_h = null === (_g = null === doorCom || void 0 === doorCom ? void 0 : doorCom.getDat()) || void 0 === _g ? void 0 : _g.roomId.toString()) && void 0 !== _h ? _h : "";
          dat.hp = null !== (_j = null === doorCom || void 0 === doorCom ? void 0 : doorCom.getDat().hp) && void 0 !== _j ? _j : 0;
          break;

         case mapTypes_1.UnitType.Ladder:
          const ladderCom = null === (_k = this._trackNd) || void 0 === _k ? void 0 : _k.getComponent(MapDrawLadder_1.default);
          dat.roomId = null !== (_m = null === (_l = null === ladderCom || void 0 === ladderCom ? void 0 : ladderCom.getDat()) || void 0 === _l ? void 0 : _l.roomId.toString()) && void 0 !== _m ? _m : "";
          dat.bindPointIds = null !== (_o = null === ladderCom || void 0 === ladderCom ? void 0 : ladderCom.getDat().bindPointIds.map(id => this._mapLoader.resolvePathPointNodes(id)[0])) && void 0 !== _o ? _o : [];
          dat.isExitLadder = null !== (_p = null === ladderCom || void 0 === ladderCom ? void 0 : ladderCom.getDat().isExitLadder) && void 0 !== _p && _p;
          break;

         case mapTypes_1.UnitType.Portal:
          const portalCom = null === (_q = this._trackNd) || void 0 === _q ? void 0 : _q.getComponent(MapDrawPortal_1.default);
          dat.linkP = portalCom.getLinkP();
          dat.offsetX = null !== (_s = null === (_r = null === portalCom || void 0 === portalCom ? void 0 : portalCom.getDat()) || void 0 === _r ? void 0 : _r.offsetX) && void 0 !== _s ? _s : 0;
          dat.animPs = null !== (_t = null === portalCom || void 0 === portalCom ? void 0 : portalCom.getAnimP()) && void 0 !== _t ? _t : [];
          break;

         case mapTypes_1.UnitType.Cable:
          const controller = null === (_u = this._trackNd) || void 0 === _u ? void 0 : _u.getComponent(MapDrawCable_1.default);
          const cableDat = controller.getDat();
          const startP = this._mapLoader.resolvePathPointNodes(cableDat.point1);
          const endP = this._mapLoader.resolvePathPointNodes(cableDat.point2);
          const pointP = this._mapLoader.resolvePathPointNodes(cableDat.points);
          dat.startP = startP[0];
          dat.endP = endP[0];
          dat.points = pointP;
          dat.speed = cableDat.speed;
          break;

         case mapTypes_1.UnitType.EnemyRefresh:
          const enemyRefreshCom = null === (_v = this._trackNd) || void 0 === _v ? void 0 : _v.getComponent(MapDrawEnemyRefresh_1.default);
          dat.roomId = null !== (_x = null === (_w = null === enemyRefreshCom || void 0 === enemyRefreshCom ? void 0 : enemyRefreshCom.getDat()) || void 0 === _w ? void 0 : _w.roomId.toString()) && void 0 !== _x ? _x : "";
          dat.param = null !== (_z = null === (_y = null === enemyRefreshCom || void 0 === enemyRefreshCom ? void 0 : enemyRefreshCom.getDat()) || void 0 === _y ? void 0 : _y.param) && void 0 !== _z ? _z : "";
          dat.refreshId = null !== (_1 = null === (_0 = null === enemyRefreshCom || void 0 === enemyRefreshCom ? void 0 : enemyRefreshCom.getDat()) || void 0 === _0 ? void 0 : _0.refreshId) && void 0 !== _1 ? _1 : -1;
          break;

         case mapTypes_1.UnitType.SurviveDat:
          const surviveRefreshCom = null === (_2 = this._trackNd) || void 0 === _2 ? void 0 : _2.getComponent(MapDrawSurvive_1.default);
          dat.roomId = null !== (_4 = null === (_3 = null === surviveRefreshCom || void 0 === surviveRefreshCom ? void 0 : surviveRefreshCom.getDat()) || void 0 === _3 ? void 0 : _3.roomId.toString()) && void 0 !== _4 ? _4 : "";
          dat.weight = null !== (_6 = null === (_5 = null === surviveRefreshCom || void 0 === surviveRefreshCom ? void 0 : surviveRefreshCom.getDat()) || void 0 === _5 ? void 0 : _5.weight) && void 0 !== _6 ? _6 : 0;
        }
        const panelDat = {
          type: type,
          dat: dat
        };
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.RefreshAttrPanel, panelDat);
      }
      refreshNdAttr(attrDat) {
        var _a;
        if (!this._trackNd) return;
        if (!this._mapLoader) return;
        const type = attrDat.type;
        let dat;
        switch (type) {
         case mapTypes_1.UnitType.Default:
          dat = attrDat.dat;
          const worldPos = MapTool_1.default.converMapPosToWorldPos(dat.pos);
          const localPos = this._trackNd.parent.convertToNodeSpaceAR(worldPos);
          this._trackNd.setPosition(localPos);
          break;

         case mapTypes_1.UnitType.Room:
          dat = attrDat.dat;
          const size = dat.size;
          const hasNd = this._mapLoader.getRoomNode(Number(dat.roomId));
          if (hasNd) console.log("\u6709\u91cd\u540d\u7684\u623f\u95f4\uff01\uff01\uff01"); else {
            this._trackNd.getComponent(MapDrawRoom_1.default).updateRoomId(Number(dat.roomId));
            this._trackNd.getComponent(MapDrawRoom_1.default).setManulSet(true);
          }
          this._trackNd.getComponent(MapDrawRoom_1.default).setSize(size);
          this._trackNd.getComponent(MapDrawRoom_1.default).setUnLockPoints(dat.unLockPoints || []);
          this._mapLoader.refreshLayerBoundsByNode(this._trackNd.parent);
          break;

         case mapTypes_1.UnitType.PathPoint:
          dat = attrDat.dat;
          const links = dat.links;
          const controller = this._trackNd.getComponent(MapDrawP_1.default);
          if (controller) {
            controller.setId(dat.roomId);
            controller.setLinks(links);
          }
          break;

         case mapTypes_1.UnitType.Door:
          dat = attrDat.dat;
          const doorCom = this._trackNd.getComponent(MapDrawDoor_1.default);
          doorCom && doorCom.setHp(dat.hp);
          break;

         case mapTypes_1.UnitType.Ladder:
          dat = attrDat.dat;
          const ladderCom = this._trackNd.getComponent(MapDrawLadder_1.default);
          if (ladderCom) {
            ladderCom.setBinds(dat.bindPointIds);
            ladderCom.setIsExitLadder(dat.isExitLadder);
          }
          break;

         case mapTypes_1.UnitType.Portal:
          dat = attrDat.dat;
          const portalCom = this._trackNd.getComponent(MapDrawPortal_1.default);
          if (portalCom) {
            portalCom.setLinkP(dat.linkP);
            portalCom.setOffsetX(dat.offsetX);
            portalCom.setAnimPs(dat.animPs);
          }
          break;

         case mapTypes_1.UnitType.Cable:
          dat = attrDat.dat;
          const cableCom = this._trackNd.getComponent(MapDrawCable_1.default);
          const startP = dat.startP;
          const endP = dat.endP;
          const pointPs = dat.points;
          if (cableCom) {
            cableCom.setSpeed(dat.speed);
            cableCom.setStartP(startP);
            cableCom.setEndP(endP);
            cableCom.setPoints(pointPs);
          }
          break;

         case mapTypes_1.UnitType.EnemyRefresh:
          dat = attrDat.dat;
          const enemyRefreshCom = this._trackNd.getComponent(MapDrawEnemyRefresh_1.default);
          if (enemyRefreshCom) {
            enemyRefreshCom.setRoomId(Number(dat.roomId));
            enemyRefreshCom.setParam(dat.param);
            enemyRefreshCom.setRefresId(dat.refreshId);
          }
          break;

         case mapTypes_1.UnitType.SurviveDat:
          dat = attrDat.dat;
          const surviveRefreshCom = this._trackNd.getComponent(MapDrawSurvive_1.default);
          if (surviveRefreshCom) {
            surviveRefreshCom.setRoomId(Number(dat.roomId));
            surviveRefreshCom.setWeight(dat.weight);
          }
        }
        if (type != mapTypes_1.UnitType.Room && dat.roomId) {
          const nextRoomId = Number(dat.roomId);
          isFinite(nextRoomId) && this._mapLoader.moveUnitToRoom(this._trackNd, nextRoomId);
        }
        null === (_a = this.onAttrChanged) || void 0 === _a ? void 0 : _a.call(this);
      }
      refreshAreaInfo(areaInfo) {
        this._mapLoader.setAreaInfo(areaInfo);
      }
    }
    exports.AttrMgr = AttrMgr;
    cc._RF.pop();
  }, {
    "../event/eventTypes": "eventTypes",
    "../item/MapDrawCable": "MapDrawCable",
    "../item/MapDrawDoor": "MapDrawDoor",
    "../item/MapDrawEnemyRefresh": "MapDrawEnemyRefresh",
    "../item/MapDrawLadder": "MapDrawLadder",
    "../item/MapDrawP": "MapDrawP",
    "../item/MapDrawPortal": "MapDrawPortal",
    "../item/MapDrawRoom": "MapDrawRoom",
    "../item/MapDrawSurvive": "MapDrawSurvive",
    "../item/MapDrawUnitBase": "MapDrawUnitBase",
    "../tool/MapTool": "MapTool",
    "../type/mapTypes": "mapTypes",
    "./EventManager": "EventManager",
    "./Singleton": "Singleton"
  } ],
  AttrPanelBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fefecrl5bNFVLn7godW+kkO", "AttrPanelBase");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelBase = class AttrPanelBase extends AttrPanel_1.default {
      setAttr(dat) {
        this._dat = dat;
        this.ndName.string = dat.name;
        this.xPos.string = `${dat.pos.x}`;
        this.yPos.string = `${dat.pos.y}`;
      }
      getDat() {
        return {
          pos: cc.v2(Number(this.xPos.string), Number(this.yPos.string)),
          name: this._dat.name
        };
      }
    };
    __decorate([ property(cc.Label) ], AttrPanelBase.prototype, "ndName", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelBase.prototype, "xPos", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelBase.prototype, "yPos", void 0);
    AttrPanelBase = __decorate([ ccclass ], AttrPanelBase);
    exports.default = AttrPanelBase;
    cc._RF.pop();
  }, {
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelCable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd5c9oHsotLib11BzLt/UNO", "AttrPanelCable");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("../../item/MapDrawP");
    const NodeUtil_1 = require("../../tool/NodeUtil");
    const mapTypes_1 = require("../../type/mapTypes");
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelCable = class AttrPanelCable extends AttrPanel_1.default {
      constructor() {
        super(...arguments);
        this.type = mapTypes_1.UnitType.Default;
      }
      setAttr(dat) {
        var _a, _b, _c, _d;
        this._dat = dat;
        this.startP.string = null !== (_b = null === (_a = this._dat.startP) || void 0 === _a ? void 0 : _a.getComponent(MapDrawP_1.default).getId()) && void 0 !== _b ? _b : "";
        this.endP.string = null !== (_d = null === (_c = this._dat.endP) || void 0 === _c ? void 0 : _c.getComponent(MapDrawP_1.default).getId()) && void 0 !== _d ? _d : "";
        this.speed.string = this._dat.speed.toString();
        NodeUtil_1.NodeUtil.autoRefreshChildren(this.pointCont, this._dat.points, (nd, index, dat) => {
          var _a, _b;
          const nameLb = nd.children[0].children[0].getComponent(cc.Label);
          nameLb.string = null !== (_b = null === (_a = dat.getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.getId()) && void 0 !== _b ? _b : "";
        });
      }
      getDat() {
        return {
          startP: this._dat.startP,
          endP: this._dat.endP,
          points: this._dat.points,
          speed: Number(this.speed.string)
        };
      }
      onClickStart() {
        this.onClickP(false, this.startP.node, this._dat.startP, nodes => {
          this._dat.startP = nodes[0];
        });
      }
      onClickEnd() {
        this.onClickP(false, this.endP.node, this._dat.endP, nodes => {
          this._dat.endP = nodes[0];
        });
      }
      onClickPoints() {
        this.onClickP(true, this.pointCont, this._dat.points, nodes => {
          this._dat.points = nodes;
        });
      }
    };
    __decorate([ property({
      type: cc.Enum(mapTypes_1.UnitType)
    }) ], AttrPanelCable.prototype, "type", void 0);
    __decorate([ property(cc.Label) ], AttrPanelCable.prototype, "startP", void 0);
    __decorate([ property(cc.Label) ], AttrPanelCable.prototype, "endP", void 0);
    __decorate([ property(cc.Node) ], AttrPanelCable.prototype, "pointCont", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelCable.prototype, "speed", void 0);
    AttrPanelCable = __decorate([ ccclass ], AttrPanelCable);
    exports.default = AttrPanelCable;
    cc._RF.pop();
  }, {
    "../../item/MapDrawP": "MapDrawP",
    "../../tool/NodeUtil": "NodeUtil",
    "../../type/mapTypes": "mapTypes",
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelDoor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08cb3Ie4WVC7KQ76kiZphMz", "AttrPanelDoor");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelDoor = class AttrPanelDoor extends AttrPanel_1.default {
      setAttr(dat) {
        this._dat = dat;
        this.roomLb.string = this._dat.roomId;
        this.hpLb.string = `${this._dat.hp}`;
      }
      getDat() {
        return {
          roomId: this.roomLb.string,
          hp: Number(this.hpLb.string)
        };
      }
    };
    __decorate([ property(cc.EditBox) ], AttrPanelDoor.prototype, "roomLb", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelDoor.prototype, "hpLb", void 0);
    AttrPanelDoor = __decorate([ ccclass ], AttrPanelDoor);
    exports.default = AttrPanelDoor;
    cc._RF.pop();
  }, {
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelEnemyRefresh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "06a45Q3viFPr4VJAaywGZU/", "AttrPanelEnemyRefresh");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelEnemyRefresh = class AttrPanelEnemyRefresh extends AttrPanel_1.default {
      setAttr(dat) {
        this._dat = dat;
        this.roomLb.string = this._dat.roomId;
        this.paramLb.string = this._dat.param;
        this.refreshId.string = this._dat.refreshId.toString();
      }
      getDat() {
        return {
          roomId: this.roomLb.string,
          param: this.paramLb.string,
          refreshId: Number(this.refreshId.string)
        };
      }
    };
    __decorate([ property(cc.EditBox) ], AttrPanelEnemyRefresh.prototype, "roomLb", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelEnemyRefresh.prototype, "paramLb", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelEnemyRefresh.prototype, "refreshId", void 0);
    AttrPanelEnemyRefresh = __decorate([ ccclass ], AttrPanelEnemyRefresh);
    exports.default = AttrPanelEnemyRefresh;
    cc._RF.pop();
  }, {
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelLadder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b2ac4FH0iJAkrHaM40hJn3G", "AttrPanelLadder");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("../../item/MapDrawP");
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelLadder = class AttrPanelLadder extends AttrPanel_1.default {
      setAttr(dat) {
        var _a, _b, _c, _d;
        this._dat = dat;
        this.roomLb.string = this._dat.roomId;
        this.startP.string = null !== (_b = null === (_a = this._dat.bindPointIds[0]) || void 0 === _a ? void 0 : _a.getComponent(MapDrawP_1.default).getId()) && void 0 !== _b ? _b : "";
        this.endP.string = null !== (_d = null === (_c = this._dat.bindPointIds[1]) || void 0 === _c ? void 0 : _c.getComponent(MapDrawP_1.default).getId()) && void 0 !== _d ? _d : "";
        this.exitLadderToggle.isChecked = this._dat.isExitLadder;
      }
      onClickStart() {
        this.onClickP(false, this.startP.node, this._dat.bindPointIds[0], nodes => {
          this._dat.bindPointIds[0] = nodes[0];
        });
      }
      onClickEnd() {
        this.onClickP(false, this.endP.node, this._dat.bindPointIds[1], nodes => {
          this._dat.bindPointIds[1] = nodes[0];
        });
      }
      getDat() {
        return {
          roomId: this.roomLb.string,
          bindPointIds: this._dat.bindPointIds,
          isExitLadder: this.exitLadderToggle.isChecked
        };
      }
    };
    __decorate([ property(cc.EditBox) ], AttrPanelLadder.prototype, "roomLb", void 0);
    __decorate([ property(cc.Label) ], AttrPanelLadder.prototype, "startP", void 0);
    __decorate([ property(cc.Label) ], AttrPanelLadder.prototype, "endP", void 0);
    __decorate([ property(cc.Toggle) ], AttrPanelLadder.prototype, "exitLadderToggle", void 0);
    AttrPanelLadder = __decorate([ ccclass ], AttrPanelLadder);
    exports.default = AttrPanelLadder;
    cc._RF.pop();
  }, {
    "../../item/MapDrawP": "MapDrawP",
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelPoint: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7047bZP8GtGypmx7dtne2mz", "AttrPanelPoint");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("../../item/MapDrawP");
    const NodeUtil_1 = require("../../tool/NodeUtil");
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelPoint = class AttrPanelPoint extends AttrPanel_1.default {
      setAttr(dat) {
        this._dat = dat;
        this.roomLb.string = this._dat.roomId;
        NodeUtil_1.NodeUtil.autoRefreshChildren(this.pointCont, this._dat.links, (nd, index, dat) => {
          var _a;
          const nameLb = nd.children[0].children[0].getComponent(cc.Label);
          nameLb.string = null !== (_a = dat.getComponent(MapDrawP_1.default).getId()) && void 0 !== _a ? _a : "";
        });
      }
      getDat() {
        return {
          roomId: this.roomLb.string,
          links: this._dat.links
        };
      }
      onClickPoints() {
        this.onClickP(true, this.pointCont, this._dat.links, nodes => {
          this._dat.links = nodes;
        });
      }
    };
    __decorate([ property(cc.EditBox) ], AttrPanelPoint.prototype, "roomLb", void 0);
    __decorate([ property(cc.Node) ], AttrPanelPoint.prototype, "pointCont", void 0);
    AttrPanelPoint = __decorate([ ccclass ], AttrPanelPoint);
    exports.default = AttrPanelPoint;
    cc._RF.pop();
  }, {
    "../../item/MapDrawP": "MapDrawP",
    "../../tool/NodeUtil": "NodeUtil",
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelPortal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5aa73ElhQROzqg3jiM4PSTl", "AttrPanelPortal");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("../../item/MapDrawP");
    const NodeUtil_1 = require("../../tool/NodeUtil");
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelPortal = class AttrPanelPortal extends AttrPanel_1.default {
      setAttr(dat) {
        var _a, _b;
        this._dat = dat;
        this.bindP.string = null !== (_b = null === (_a = this._dat.linkP) || void 0 === _a ? void 0 : _a.getComponent(MapDrawP_1.default).getId()) && void 0 !== _b ? _b : "";
        this.offsetP.string = this._dat.offsetX.toString();
        this.refreshAnimPIds();
      }
      refreshAnimPIds() {
        NodeUtil_1.NodeUtil.autoRefreshChildren(this.pointCont, this._dat.animPs, (nd, index, dat) => {
          var _a;
          const nameLb = nd.children[0].children[0].getComponent(cc.Label);
          nameLb.string = null !== (_a = null === dat || void 0 === dat ? void 0 : dat.getComponent(MapDrawP_1.default).getId()) && void 0 !== _a ? _a : "";
        });
      }
      getDat() {
        return {
          linkP: this._dat.linkP,
          offsetX: Number(this.offsetP.string),
          animPs: this._dat.animPs
        };
      }
      onClickEnd() {
        this.onClickP(false, this.bindP.node, this._dat.linkP, nodes => {
          this._dat.linkP = nodes[0];
        });
      }
      onClickPoints() {
        this.onClickP(true, this.pointCont, this._dat.animPs, nodes => {
          this._dat.animPs = nodes;
        });
      }
    };
    __decorate([ property(cc.Label) ], AttrPanelPortal.prototype, "bindP", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelPortal.prototype, "offsetP", void 0);
    __decorate([ property(cc.Node) ], AttrPanelPortal.prototype, "pointCont", void 0);
    AttrPanelPortal = __decorate([ ccclass ], AttrPanelPortal);
    exports.default = AttrPanelPortal;
    cc._RF.pop();
  }, {
    "../../item/MapDrawP": "MapDrawP",
    "../../tool/NodeUtil": "NodeUtil",
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1006744Im5DprdndIMMgK+D", "AttrPanelRoom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("../../item/MapDrawP");
    const NodeUtil_1 = require("../../tool/NodeUtil");
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelRoom = class AttrPanelRoom extends AttrPanel_1.default {
      setAttr(dat) {
        this._dat = dat;
        this.nameLb.string = dat.roomId;
        this.width.string = `${dat.size.width}`;
        this.height.string = `${dat.size.height}`;
        NodeUtil_1.NodeUtil.autoRefreshChildren(this.pointCont, this._dat.unLockPoints, (nd, index, dat) => {
          var _a;
          const nameLb = nd.children[0].children[0].getComponent(cc.Label);
          nameLb.string = null !== (_a = null === dat || void 0 === dat ? void 0 : dat.getComponent(MapDrawP_1.default).getId()) && void 0 !== _a ? _a : "";
        });
      }
      getDat() {
        return {
          roomId: this.nameLb.string,
          size: {
            width: Number(this.width.string),
            height: Number(this.height.string)
          },
          unLockPoints: this._dat.unLockPoints
        };
      }
      onClickPoints() {
        this.onClickP(true, this.pointCont, this._dat.unLockPoints, nodes => {
          this._dat.unLockPoints = nodes;
        });
      }
    };
    __decorate([ property(cc.EditBox) ], AttrPanelRoom.prototype, "nameLb", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelRoom.prototype, "width", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelRoom.prototype, "height", void 0);
    __decorate([ property(cc.Node) ], AttrPanelRoom.prototype, "pointCont", void 0);
    AttrPanelRoom = __decorate([ ccclass ], AttrPanelRoom);
    exports.default = AttrPanelRoom;
    cc._RF.pop();
  }, {
    "../../item/MapDrawP": "MapDrawP",
    "../../tool/NodeUtil": "NodeUtil",
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanelSurviveRefresh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1d0aRy75tH67goDnBNRNjh", "AttrPanelSurviveRefresh");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const AttrPanel_1 = require("./AttrPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanelSurviveRefresh = class AttrPanelSurviveRefresh extends AttrPanel_1.default {
      setAttr(dat) {
        this._dat = dat;
        this.roomLb.string = this._dat.roomId;
        this.weightLb.string = this._dat.weight.toString();
      }
      getDat() {
        return {
          roomId: this.roomLb.string,
          weight: Number(this.weightLb.string)
        };
      }
    };
    __decorate([ property(cc.EditBox) ], AttrPanelSurviveRefresh.prototype, "roomLb", void 0);
    __decorate([ property(cc.EditBox) ], AttrPanelSurviveRefresh.prototype, "weightLb", void 0);
    AttrPanelSurviveRefresh = __decorate([ ccclass ], AttrPanelSurviveRefresh);
    exports.default = AttrPanelSurviveRefresh;
    cc._RF.pop();
  }, {
    "./AttrPanel": "AttrPanel"
  } ],
  AttrPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89419pUbelGz7hz0t3L3sZd", "AttrPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const eventTypes_1 = require("../../event/eventTypes");
    const EventManager_1 = require("../../frameWork/EventManager");
    const MapDrawP_1 = require("../../item/MapDrawP");
    const NodeUtil_1 = require("../../tool/NodeUtil");
    const mapTypes_1 = require("../../type/mapTypes");
    const EditPanel_1 = require("../EditPanel");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let AttrPanel = class AttrPanel extends cc.Component {
      constructor() {
        super(...arguments);
        this.type = mapTypes_1.UnitType.Default;
      }
      onAfterEdit() {
        EventManager_1.EventManager.instance.emit(EditPanel_1.AttrPanelEvent.afterEdit, this.type);
      }
      onClickP(isMulti, nd, dat, setter) {
        const cb = nodes => {
          var _a, _b;
          if (isMulti) {
            setter(nodes);
            NodeUtil_1.NodeUtil.autoRefreshChildren(nd, nodes, (nd, index, dat) => {
              var _a;
              const nameLb = nd.children[0].children[0].getComponent(cc.Label);
              nameLb.string = null !== (_a = null === dat || void 0 === dat ? void 0 : dat.getComponent(MapDrawP_1.default).getId()) && void 0 !== _a ? _a : "";
            });
          } else {
            setter(nodes);
            const singleLb = nd.getComponent(cc.Label) || nd.getComponent(cc.EditBox);
            singleLb.string = null !== (_b = null === (_a = nodes[0]) || void 0 === _a ? void 0 : _a.getComponent(MapDrawP_1.default).getId()) && void 0 !== _b ? _b : "";
          }
          EventManager_1.EventManager.instance.emit(EditPanel_1.AttrPanelEvent.afterEdit, this.type);
        };
        let arr = [];
        arr = isMulti ? dat : dat ? [ dat ] : [];
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.OpenSelectPointMode, isMulti, cb, arr);
      }
    };
    __decorate([ property({
      type: cc.Enum(mapTypes_1.UnitType)
    }) ], AttrPanel.prototype, "type", void 0);
    AttrPanel = __decorate([ ccclass ], AttrPanel);
    exports.default = AttrPanel;
    cc._RF.pop();
  }, {
    "../../event/eventTypes": "eventTypes",
    "../../frameWork/EventManager": "EventManager",
    "../../item/MapDrawP": "MapDrawP",
    "../../tool/NodeUtil": "NodeUtil",
    "../../type/mapTypes": "mapTypes",
    "../EditPanel": "EditPanel"
  } ],
  1: [ function(require, module, exports) {
    (function(process) {
      function normalizeArray(parts, allowAboveRoot) {
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if ("." === last) parts.splice(i, 1); else if (".." === last) {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        if (allowAboveRoot) for (;up--; up) parts.unshift("..");
        return parts;
      }
      exports.resolve = function() {
        var resolvedPath = "", resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = i >= 0 ? arguments[i] : process.cwd();
          if ("string" !== typeof path) throw new TypeError("Arguments to path.resolve must be strings");
          if (!path) continue;
          resolvedPath = path + "/" + resolvedPath;
          resolvedAbsolute = "/" === path.charAt(0);
        }
        resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
          return !!p;
        }), !resolvedAbsolute).join("/");
        return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
      };
      exports.normalize = function(path) {
        var isAbsolute = exports.isAbsolute(path), trailingSlash = "/" === substr(path, -1);
        path = normalizeArray(filter(path.split("/"), function(p) {
          return !!p;
        }), !isAbsolute).join("/");
        path || isAbsolute || (path = ".");
        path && trailingSlash && (path += "/");
        return (isAbsolute ? "/" : "") + path;
      };
      exports.isAbsolute = function(path) {
        return "/" === path.charAt(0);
      };
      exports.join = function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return exports.normalize(filter(paths, function(p, index) {
          if ("string" !== typeof p) throw new TypeError("Arguments to path.join must be strings");
          return p;
        }).join("/"));
      };
      exports.relative = function(from, to) {
        from = exports.resolve(from).substr(1);
        to = exports.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (;start < arr.length; start++) if ("" !== arr[start]) break;
          var end = arr.length - 1;
          for (;end >= 0; end--) if ("" !== arr[end]) break;
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split("/"));
        var toParts = trim(to.split("/"));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join("/");
      };
      exports.sep = "/";
      exports.delimiter = ":";
      exports.dirname = function(path) {
        "string" !== typeof path && (path += "");
        if (0 === path.length) return ".";
        var code = path.charCodeAt(0);
        var hasRoot = 47 === code;
        var end = -1;
        var matchedSlash = true;
        for (var i = path.length - 1; i >= 1; --i) {
          code = path.charCodeAt(i);
          if (47 === code) {
            if (!matchedSlash) {
              end = i;
              break;
            }
          } else matchedSlash = false;
        }
        if (-1 === end) return hasRoot ? "/" : ".";
        if (hasRoot && 1 === end) return "/";
        return path.slice(0, end);
      };
      function basename(path) {
        "string" !== typeof path && (path += "");
        var start = 0;
        var end = -1;
        var matchedSlash = true;
        var i;
        for (i = path.length - 1; i >= 0; --i) if (47 === path.charCodeAt(i)) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (-1 === end) {
          matchedSlash = false;
          end = i + 1;
        }
        if (-1 === end) return "";
        return path.slice(start, end);
      }
      exports.basename = function(path, ext) {
        var f = basename(path);
        ext && f.substr(-1 * ext.length) === ext && (f = f.substr(0, f.length - ext.length));
        return f;
      };
      exports.extname = function(path) {
        "string" !== typeof path && (path += "");
        var startDot = -1;
        var startPart = 0;
        var end = -1;
        var matchedSlash = true;
        var preDotState = 0;
        for (var i = path.length - 1; i >= 0; --i) {
          var code = path.charCodeAt(i);
          if (47 === code) {
            if (!matchedSlash) {
              startPart = i + 1;
              break;
            }
            continue;
          }
          if (-1 === end) {
            matchedSlash = false;
            end = i + 1;
          }
          46 === code ? -1 === startDot ? startDot = i : 1 !== preDotState && (preDotState = 1) : -1 !== startDot && (preDotState = -1);
        }
        if (-1 === startDot || -1 === end || 0 === preDotState || 1 === preDotState && startDot === end - 1 && startDot === startPart + 1) return "";
        return path.slice(startDot, end);
      };
      function filter(xs, f) {
        if (xs.filter) return xs.filter(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) f(xs[i], i, xs) && res.push(xs[i]);
        return res;
      }
      var substr = "b" === "ab".substr(-1) ? function(str, start, len) {
        return str.substr(start, len);
      } : function(str, start, len) {
        start < 0 && (start = str.length + start);
        return str.substr(start, len);
      };
    }).call(this, require("_process"));
  }, {
    _process: 2
  } ],
  2: [ function(require, module, exports) {
    var process = module.exports = {};
    var cachedSetTimeout;
    var cachedClearTimeout;
    function defaultSetTimout() {
      throw new Error("setTimeout has not been defined");
    }
    function defaultClearTimeout() {
      throw new Error("clearTimeout has not been defined");
    }
    (function() {
      try {
        cachedSetTimeout = "function" === typeof setTimeout ? setTimeout : defaultSetTimout;
      } catch (e) {
        cachedSetTimeout = defaultSetTimout;
      }
      try {
        cachedClearTimeout = "function" === typeof clearTimeout ? clearTimeout : defaultClearTimeout;
      } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
      }
    })();
    function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
      }
      try {
        return cachedSetTimeout(fun, 0);
      } catch (e) {
        try {
          return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
          return cachedSetTimeout.call(this, fun, 0);
        }
      }
    }
    function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
      }
      try {
        return cachedClearTimeout(marker);
      } catch (e) {
        try {
          return cachedClearTimeout.call(null, marker);
        } catch (e) {
          return cachedClearTimeout.call(this, marker);
        }
      }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    function cleanUpNextTick() {
      if (!draining || !currentQueue) return;
      draining = false;
      currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1;
      queue.length && drainQueue();
    }
    function drainQueue() {
      if (draining) return;
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;
      var len = queue.length;
      while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) currentQueue && currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
    }
    process.nextTick = function(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
      queue.push(new Item(fun, args));
      1 !== queue.length || draining || runTimeout(drainQueue);
    };
    function Item(fun, array) {
      this.fun = fun;
      this.array = array;
    }
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    process.title = "browser";
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = "";
    process.versions = {};
    function noop() {}
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    process.listeners = function(name) {
      return [];
    };
    process.binding = function(name) {
      throw new Error("process.binding is not supported");
    };
    process.cwd = function() {
      return "/";
    };
    process.chdir = function(dir) {
      throw new Error("process.chdir is not supported");
    };
    process.umask = function() {
      return 0;
    };
  }, {} ],
  EditPanel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "02b1ejPvg9JUbGz3ibRihtm", "EditPanel");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AttrPanelEvent = void 0;
    const eventTypes_1 = require("../event/eventTypes");
    const EventManager_1 = require("../frameWork/EventManager");
    const mapTypes_1 = require("../type/mapTypes");
    const AttrPanelBase_1 = require("./attrPanel/AttrPanelBase");
    const AttrPanelCable_1 = require("./attrPanel/AttrPanelCable");
    const AttrPanelDoor_1 = require("./attrPanel/AttrPanelDoor");
    const AttrPanelEnemyRefresh_1 = require("./attrPanel/AttrPanelEnemyRefresh");
    const AttrPanelLadder_1 = require("./attrPanel/AttrPanelLadder");
    const AttrPanelPoint_1 = require("./attrPanel/AttrPanelPoint");
    const AttrPanelPortal_1 = require("./attrPanel/AttrPanelPortal");
    const AttrPanelRoom_1 = require("./attrPanel/AttrPanelRoom");
    const AttrPanelSurviveRefresh_1 = require("./attrPanel/AttrPanelSurviveRefresh");
    const {ccclass: ccclass, property: property} = cc._decorator;
    var AttrPanelEvent;
    (function(AttrPanelEvent) {
      AttrPanelEvent["afterEdit"] = "afterEdit";
    })(AttrPanelEvent = exports.AttrPanelEvent || (exports.AttrPanelEvent = {}));
    let EditPanel = class EditPanel extends cc.Component {
      onLoad() {
        this.clear();
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.RefreshAttrPanel, this.refreshAttr, this);
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.RefreshAreaInfo, this.setAreaInfo, this);
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.ClearEditPanel, this.clear, this);
        EventManager_1.EventManager.instance.on(AttrPanelEvent.afterEdit, this.onChangeAttr, this);
      }
      onDestroy() {
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.RefreshAttrPanel, this.refreshAttr, this);
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.RefreshAreaInfo, this.setAreaInfo, this);
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.ClearEditPanel, this.clear, this);
        EventManager_1.EventManager.instance.off(AttrPanelEvent.afterEdit, this.onChangeAttr, this);
      }
      refreshAttr(attrDat) {
        this._dat = attrDat;
        this.actNd();
        switch (attrDat.type) {
         case mapTypes_1.UnitType.Default:
          this.showBaseAttrNd();
          break;

         case mapTypes_1.UnitType.Room:
          this.showRoomAttrNd();
          break;

         case mapTypes_1.UnitType.PathPoint:
          this.showPointAttrNd();
          break;

         case mapTypes_1.UnitType.Door:
          this.showDoorAttrNd();
          break;

         case mapTypes_1.UnitType.Ladder:
          this.showLadderAttrNd();
          break;

         case mapTypes_1.UnitType.Portal:
          this.showPortalAttrNd();
          break;

         case mapTypes_1.UnitType.Cable:
          this.showCableAttrNd();
          break;

         case mapTypes_1.UnitType.EnemyRefresh:
          this.showEnemyRefreshAttrNd();
          break;

         case mapTypes_1.UnitType.SurviveDat:
          this.showSurviveRefreshAttrNd();
        }
      }
      actNd() {
        this.baseAttr.active = true;
        const type = this._dat.type;
        this.roomAttr.active = type == mapTypes_1.UnitType.Room;
        this.pointAttr.active = type == mapTypes_1.UnitType.PathPoint;
        this.doorAttr.active = type == mapTypes_1.UnitType.Door;
        this.ladderAttr.active = type == mapTypes_1.UnitType.Ladder;
        this.portalAttr.active = type == mapTypes_1.UnitType.Portal;
        this.cableAttr.active = type == mapTypes_1.UnitType.Cable;
        this.enemyRefreshAttr.active = type == mapTypes_1.UnitType.EnemyRefresh;
        this.surviveRefreshAttr.active = type == mapTypes_1.UnitType.SurviveDat;
      }
      showBaseAttrNd() {
        const dat = this._dat.dat;
        this.baseAttr.getComponent(AttrPanelBase_1.default).setAttr(dat);
      }
      showRoomAttrNd() {
        const dat = this._dat.dat;
        this.roomAttr.getComponent(AttrPanelRoom_1.default).setAttr(dat);
      }
      showPointAttrNd() {
        const dat = this._dat.dat;
        this.pointAttr.getComponent(AttrPanelPoint_1.default).setAttr(dat);
      }
      showDoorAttrNd() {
        const dat = this._dat.dat;
        this.doorAttr.getComponent(AttrPanelDoor_1.default).setAttr(dat);
      }
      showLadderAttrNd() {
        const dat = this._dat.dat;
        this.ladderAttr.getComponent(AttrPanelLadder_1.default).setAttr(dat);
      }
      showPortalAttrNd() {
        const dat = this._dat.dat;
        this.portalAttr.getComponent(AttrPanelPortal_1.default).setAttr(dat);
      }
      showCableAttrNd() {
        const dat = this._dat.dat;
        this.cableAttr.getComponent(AttrPanelCable_1.default).setAttr(dat);
      }
      showEnemyRefreshAttrNd() {
        const dat = this._dat.dat;
        this.enemyRefreshAttr.getComponent(AttrPanelEnemyRefresh_1.default).setAttr(dat);
      }
      showSurviveRefreshAttrNd() {
        const dat = this._dat.dat;
        this.surviveRefreshAttr.getComponent(AttrPanelSurviveRefresh_1.default).setAttr(dat);
      }
      onChangeAttr(type) {
        const unitType = Number(type);
        let dat;
        switch (unitType) {
         case mapTypes_1.UnitType.Default:
          dat = this.baseAttr.getComponent(AttrPanelBase_1.default).getDat();
          break;

         case mapTypes_1.UnitType.Room:
          dat = this.roomAttr.getComponent(AttrPanelRoom_1.default).getDat();
          break;

         case mapTypes_1.UnitType.PathPoint:
          dat = this.pointAttr.getComponent(AttrPanelPoint_1.default).getDat();
          break;

         case mapTypes_1.UnitType.Door:
          dat = this.doorAttr.getComponent(AttrPanelDoor_1.default).getDat();
          break;

         case mapTypes_1.UnitType.Ladder:
          dat = this.ladderAttr.getComponent(AttrPanelLadder_1.default).getDat();
          break;

         case mapTypes_1.UnitType.Portal:
          dat = this.portalAttr.getComponent(AttrPanelPortal_1.default).getDat();
          break;

         case mapTypes_1.UnitType.Cable:
          dat = this.cableAttr.getComponent(AttrPanelCable_1.default).getDat();
          break;

         case mapTypes_1.UnitType.EnemyRefresh:
          dat = this.enemyRefreshAttr.getComponent(AttrPanelEnemyRefresh_1.default).getDat();
          break;

         case mapTypes_1.UnitType.SurviveDat:
          dat = this.surviveRefreshAttr.getComponent(AttrPanelSurviveRefresh_1.default).getDat();
        }
        const attrDat = {
          type: unitType,
          dat: dat
        };
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.UpdateFromAttrPanel, attrDat);
      }
      setAreaInfo(areaInfo) {
        let str = "";
        areaInfo.forEach((areaIndex, index) => {
          str += `${areaIndex}`;
          if (index >= areaInfo.length - 1) return;
          str += "_";
        });
        this.areaInfoLb.string = str;
      }
      areaInfoChange() {
        const areaInfo = this.areaInfoLb.string.split("_").map(a => Number(a));
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.UpdateAreaInfoFormPanel, areaInfo);
      }
      clear() {
        this.baseAttr.active = false;
        this.roomAttr.active = false;
        this.pointAttr.active = false;
        this.doorAttr.active = false;
        this.ladderAttr.active = false;
        this.portalAttr.active = false;
        this.cableAttr.active = false;
        this.enemyRefreshAttr.active = false;
        this.surviveRefreshAttr.active = false;
      }
    };
    __decorate([ property(cc.Node) ], EditPanel.prototype, "baseAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "roomAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "pointAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "doorAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "ladderAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "portalAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "cableAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "enemyRefreshAttr", void 0);
    __decorate([ property(cc.Node) ], EditPanel.prototype, "surviveRefreshAttr", void 0);
    __decorate([ property(cc.EditBox) ], EditPanel.prototype, "areaInfoLb", void 0);
    EditPanel = __decorate([ ccclass ], EditPanel);
    exports.default = EditPanel;
    cc._RF.pop();
  }, {
    "../event/eventTypes": "eventTypes",
    "../frameWork/EventManager": "EventManager",
    "../type/mapTypes": "mapTypes",
    "./attrPanel/AttrPanelBase": "AttrPanelBase",
    "./attrPanel/AttrPanelCable": "AttrPanelCable",
    "./attrPanel/AttrPanelDoor": "AttrPanelDoor",
    "./attrPanel/AttrPanelEnemyRefresh": "AttrPanelEnemyRefresh",
    "./attrPanel/AttrPanelLadder": "AttrPanelLadder",
    "./attrPanel/AttrPanelPoint": "AttrPanelPoint",
    "./attrPanel/AttrPanelPortal": "AttrPanelPortal",
    "./attrPanel/AttrPanelRoom": "AttrPanelRoom",
    "./attrPanel/AttrPanelSurviveRefresh": "AttrPanelSurviveRefresh"
  } ],
  EditorSetting: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "57a29KRQxRHnIh/QfYl5fEz", "EditorSetting");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class EditorSetting {
      constructor() {
        this._scale = 1;
        this._maxScale = 1.5;
        this._minScale = 0;
        this._autoRename = false;
      }
      static get Instance() {
        EditorSetting._ins || (EditorSetting._ins = new EditorSetting());
        return EditorSetting._ins;
      }
      setMinScale(minScale) {
        this._minScale = minScale;
      }
      getMapScale() {
        return this._scale;
      }
      setMapScale(scale) {
        this._scale = Math.max(this._minScale, Math.min(this._maxScale, scale));
      }
      setAutoRename(auto) {
        this._autoRename = auto;
      }
      getAutoRename() {
        return this._autoRename;
      }
    }
    exports.default = EditorSetting;
    cc._RF.pop();
  }, {} ],
  EventManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6540fHti9tIAZapmknW+9Z7", "EventManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EventManager = void 0;
    class EventManager {
      static get instance() {
        this._instance || (this._instance = new cc.EventTarget());
        return this._instance;
      }
      static clear() {
        const target = this.instance;
        target.removeAllListeners ? target.removeAllListeners() : target.removeAll ? target.removeAll() : target._callbacks && (target._callbacks = {});
      }
    }
    exports.EventManager = EventManager;
    EventManager._instance = null;
    cc._RF.pop();
  }, {} ],
  HoverDrawer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a35e3nR6spDIoPPPv2A43UB", "HoverDrawer");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var HoverDrawer_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const {ccclass: ccclass, property: property} = cc._decorator;
    let HoverDrawer = HoverDrawer_1 = class HoverDrawer extends cc.Component {
      draw(hoverDat) {
        if (!hoverDat) {
          this.clear();
          return;
        }
        this.drawMulti(hoverDat.name, [ hoverDat ]);
      }
      drawMulti(title, boxes, linkWorldSegments) {
        if (!boxes || 0 === boxes.length) {
          this.clear();
          return;
        }
        this.node.active = true;
        this.itemName.string = boxes.length > 1 ? `${title} (${boxes.length})` : title || boxes[0].name;
        this.drawer.clear();
        const parentNd = this.drawer.node.parent;
        const lineWidthBefore = this.drawer.lineWidth;
        for (const h of boxes) {
          if (!h) continue;
          const localPos = parentNd.convertToNodeSpaceAR(h.worldPos);
          this.drawer.rect(localPos.x, localPos.y, h.width, h.height);
        }
        this.drawer.stroke();
        if (linkWorldSegments && linkWorldSegments.length > 0) {
          this.drawer.lineWidth = HoverDrawer_1.LINK_LINE_WIDTH;
          for (let i = 0; i < linkWorldSegments.length; i++) {
            const seg = linkWorldSegments[i];
            if (!seg) continue;
            const a = parentNd.convertToNodeSpaceAR(seg.p0);
            const b = parentNd.convertToNodeSpaceAR(seg.p1);
            this.drawer.moveTo(a.x, a.y);
            this.drawer.lineTo(b.x, b.y);
          }
          this.drawer.stroke();
        }
        this.drawer.lineWidth = lineWidthBefore;
      }
      clear() {
        this.node.active = false;
      }
    };
    HoverDrawer.LINK_LINE_WIDTH = 5;
    __decorate([ property(cc.Label) ], HoverDrawer.prototype, "itemName", void 0);
    __decorate([ property(cc.Graphics) ], HoverDrawer.prototype, "drawer", void 0);
    HoverDrawer = HoverDrawer_1 = __decorate([ ccclass ], HoverDrawer);
    exports.default = HoverDrawer;
    cc._RF.pop();
  }, {} ],
  KeyInputHandler: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c3d4eX2p7iQEs3vNFZ4kBI0", "KeyInputHandler");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const ModeMgr_1 = require("../frameWork/ModeMgr");
    class KeyInputHandler {
      constructor() {
        this._isShiftDown = false;
        this._isCtrlDown = false;
      }
      startListen() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      }
      stopListen() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      }
      onKeyDown(event) {
        var _a, _b, _c, _d, _e;
        const keyCode = event.keyCode;
        if (this.isShiftKey(keyCode)) {
          this._isShiftDown = true;
          null === (_a = this.onShiftDown) || void 0 === _a ? void 0 : _a.call(this);
          return;
        }
        this.isCtrlKey(keyCode) && (this._isCtrlDown = true);
        if (this._isCtrlDown && keyCode === cc.macro.KEY.s) {
          null === (_b = this.onCtrlS) || void 0 === _b ? void 0 : _b.call(this);
          return;
        }
        if (this._isCtrlDown && keyCode === cc.macro.KEY.z) {
          null === (_c = this.onCtrlZ) || void 0 === _c ? void 0 : _c.call(this);
          return;
        }
        if (this._isCtrlDown && keyCode === cc.macro.KEY.y) {
          null === (_d = this.onCtrlY) || void 0 === _d ? void 0 : _d.call(this);
          return;
        }
        if (keyCode === cc.macro.KEY.escape) {
          ModeMgr_1.ModeMgr.instance.clear();
          null === (_e = this.onEscape) || void 0 === _e ? void 0 : _e.call(this);
          return;
        }
      }
      onKeyUp(event) {
        var _a;
        const keyCode = event.keyCode;
        if (this.isShiftKey(keyCode)) {
          this._isShiftDown = false;
          null === (_a = this.onShiftUp) || void 0 === _a ? void 0 : _a.call(this);
        }
        this.isCtrlKey(keyCode) && (this._isCtrlDown = false);
      }
      get isShiftDown() {
        return this._isShiftDown;
      }
      get isCtrlDown() {
        return this._isCtrlDown;
      }
      isShiftKey(keyCode) {
        return keyCode === cc.macro.KEY.shift || keyCode === cc.macro.KEY.left_shift || keyCode === cc.macro.KEY.right_shift || 16 === keyCode;
      }
      isCtrlKey(keyCode) {
        return keyCode === cc.macro.KEY.ctrl || keyCode === cc.macro.KEY.left_ctrl || keyCode === cc.macro.KEY.right_ctrl || 17 === keyCode;
      }
      isKey(keyCode, ...compareCodes) {
        return compareCodes.includes(keyCode);
      }
      isCtrlOrCmd(keyCode) {
        return keyCode === cc.macro.KEY.ctrl || 17 === keyCode || 91 === keyCode || 93 === keyCode;
      }
    }
    exports.default = KeyInputHandler;
    cc._RF.pop();
  }, {
    "../frameWork/ModeMgr": "ModeMgr"
  } ],
  LadderBindMode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5cf19RDm8RI06LcdBHWC7UA", "LadderBindMode");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawLadder_1 = require("../../item/MapDrawLadder");
    const MapDrawP_1 = require("../../item/MapDrawP");
    const eventTypes_1 = require("../../event/eventTypes");
    const EventManager_1 = require("../../frameWork/EventManager");
    const ModeBase_1 = require("./ModeBase");
    const types_1 = require("../../type/types");
    class LadderBindMode extends ModeBase_1.default {
      constructor(deactivateOthers, deps) {
        super(deactivateOthers);
        this.deps = deps;
        this._start = null;
        this._modeType = types_1.ModeType.LadderBind;
      }
      onDisabled() {
        this.cancelPick();
      }
      mount() {
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.LadderBindPointClick, this.onPointClick, this);
      }
      unmount() {
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.LadderBindPointClick, this.onPointClick, this);
      }
      cancelPick() {
        var _a;
        this._start && cc.isValid(this._start) && (null === (_a = this._start.getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.setLinkHighlight(false));
        this._start = null;
      }
      setLadder(ladderNd) {
        this._laddderNd = ladderNd;
      }
      onPointClick(node) {
        var _a;
        if (!this.isEnabled()) return;
        if (!node || !cc.isValid(node)) return;
        const targetPoint = node.getComponent(MapDrawP_1.default);
        if (!targetPoint) return;
        const ladderCom = null === (_a = this._laddderNd) || void 0 === _a ? void 0 : _a.getComponent(MapDrawLadder_1.default);
        if (!ladderCom) return;
        if (!this._start || !cc.isValid(this._start)) {
          this._start = node;
          targetPoint.setLinkHighlight(true);
          return;
        }
        const startPoint = this._start.getComponent(MapDrawP_1.default);
        if (!startPoint) {
          this._start = null;
          return;
        }
        if (this._start === node) {
          startPoint.setLinkHighlight(false);
          this._start = null;
          return;
        }
        const startWorld = this._start.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const endWorld = node.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const bindStart = startWorld.y <= endWorld.y ? this._start : node;
        const bindEnd = bindStart === this._start ? node : this._start;
        ladderCom.setBinds([ bindStart, bindEnd ]);
        startPoint.setLinkHighlight(false);
        this._start = null;
        this.deps.onChanged();
      }
    }
    exports.default = LadderBindMode;
    cc._RF.pop();
  }, {
    "../../event/eventTypes": "eventTypes",
    "../../frameWork/EventManager": "EventManager",
    "../../item/MapDrawLadder": "MapDrawLadder",
    "../../item/MapDrawP": "MapDrawP",
    "../../type/types": "types",
    "./ModeBase": "ModeBase"
  } ],
  LevelScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "364fdherv5JGLd0eEX1Q89+", "LevelScene");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const eventTypes_1 = require("../event/eventTypes");
    const EventManager_1 = require("../frameWork/EventManager");
    const UndoManager_1 = require("../frameWork/UndoManager");
    const MapDrawP_1 = require("../item/MapDrawP");
    const MapDrawRoom_1 = require("../item/MapDrawRoom");
    const MapDrawUnitBase_1 = require("../item/MapDrawUnitBase");
    const MapTool_1 = require("../tool/MapTool");
    const mapTypes_1 = require("../type/mapTypes");
    const types_1 = require("../type/types");
    const EditorSetting_1 = require("./EditorSetting");
    const HoverDrawer_1 = require("./HoverDrawer");
    const MapLoader_1 = require("../item/MapLoader");
    const MapDrawLadder_1 = require("../item/MapDrawLadder");
    const AttrMgr_1 = require("../frameWork/AttrMgr");
    const ModeMgr_1 = require("../frameWork/ModeMgr");
    const MapInteraction_1 = require("../item/MapInteraction");
    const MapExporter_1 = require("../item/MapExporter");
    const KeyInputHandler_1 = require("./KeyInputHandler");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let LevelScene = class LevelScene extends cc.Component {
      constructor() {
        super(...arguments);
        this.editorRoot = null;
        this.camera = null;
        this.levelJson = null;
        this.mapGraph = null;
        this.dragLayer = null;
        this.mapSize = new cc.Vec2(0, 0);
        this.itemPanelNd = null;
        this._isRightDown = false;
        this._isLeftDown = false;
        this._isShiftDown = false;
        this._isDrag = false;
        this._dragDat = null;
        this._hoverDat = {
          name: "",
          worldPos: cc.Vec2.ZERO,
          width: 0,
          height: 0
        };
        this._mapInteraction = null;
        this._mapExporter = null;
        this._keyInputHandler = null;
        this._undoManager = null;
      }
      onLoad() {
        this._mapInteraction = new MapInteraction_1.default();
        this._mapInteraction.init(this.mapLoader);
        this._mapExporter = new MapExporter_1.default();
        this._mapExporter.init(this.mapLoader, this.levelJson);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this, true);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.DragItem, this.startDrag, this);
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.UpdateCurModeDisplay, this.updateCurModeDisplay, this);
        this._keyInputHandler = new KeyInputHandler_1.default();
        this._keyInputHandler.onShiftDown = () => this._isShiftDown = true;
        this._keyInputHandler.onShiftUp = () => this._isShiftDown = false;
        this._keyInputHandler.onCtrlS = () => this.onClickSave();
        this._keyInputHandler.onCtrlZ = () => this.onUndo();
        this._keyInputHandler.onCtrlY = () => this.onRedo();
        this._keyInputHandler.startListen();
        this._undoManager = new UndoManager_1.UndoManager();
        ModeMgr_1.ModeMgr.instance.init();
        AttrMgr_1.AttrMgr.instance.init(this.mapLoader.getComponent(MapLoader_1.default));
        AttrMgr_1.AttrMgr.instance.onAttrChanged = () => this.saveUndoSnapshot();
        MapTool_1.default.init(this.mapLoader, this.mapSize);
        this.createLevel();
        this.adapterMap();
      }
      start() {
        this.mapLoader.getComponent(MapLoader_1.default).build(this.levelJson, this.mapSize);
        this.saveUndoSnapshot();
        this.autoRenameTog.isChecked = true;
        EditorSetting_1.default.Instance.setAutoRename(true);
      }
      onDestroy() {
        var _a;
        this.node.off(cc.Node.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this, true);
        this.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.DragItem, this.startDrag, this);
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.UpdateCurModeDisplay, this.updateCurModeDisplay, this);
        null === (_a = this._keyInputHandler) || void 0 === _a ? void 0 : _a.stopListen();
        ModeMgr_1.ModeMgr.instance.destroy();
        AttrMgr_1.AttrMgr.instance.destroy();
      }
      createLevel() {
        const graphSize = this.mapGraph.getContentSize();
        const scaleX = graphSize.width / this.mapSize.x;
        const scaleY = graphSize.height / this.mapSize.y;
        EditorSetting_1.default.Instance.setMinScale(Math.max(scaleX, scaleY));
      }
      adapterMap() {
        const canvasNd = cc.Canvas.instance.node;
        const worldPos = canvasNd.convertToWorldSpaceAR(MapTool_1.default.getLeftBottom(canvasNd));
        const localPos = this.mapCanvasNd.parent.convertToNodeSpaceAR(worldPos);
        this.mapCanvasNd.setPosition(localPos);
        this.mapLoader.setPosition(localPos);
      }
      updateCurModeDisplay(modeType) {
        if (!modeType) {
          this.curModeLb.string = "\u65e0\u6a21\u5f0f";
          return;
        }
        this.curModeLb.string = modeType;
      }
      isWorldPosInEditorArea(worldPos) {
        const validNodes = [ this.mapGraph, this.itemPanelNd ];
        for (const node of validNodes) if (MapTool_1.default.isWorldPosInNodeRect(worldPos, node)) return true;
        return false;
      }
      startDrag(dragDat) {
        if (!dragDat) {
          console.log("not has dargDat");
          return;
        }
        this._dragDat = dragDat;
        this.dragLayer.removeAllChildren();
        const itemDat = this._dragDat.itemNode;
        itemDat.parent = this.dragLayer;
        const localPos = this.dragLayer.convertToNodeSpaceAR(this._dragDat.mousePos);
        const dragOffset = this._dragDat.dragOffset;
        itemDat.setPosition(localPos.add(cc.v2(dragOffset)));
        this._mapInteraction.updateDragRoomHover(this._dragDat, this._hoverDat, this.hoverDrawer);
        AttrMgr_1.AttrMgr.instance.setTrackNd(itemDat);
        AttrMgr_1.AttrMgr.instance.refreshAttrPanel();
      }
      onMouseWheel(event) {
        this.clearHoverDat();
        this.hoverDrawer.clear();
        const delta = event.getScrollY();
        const prescale = EditorSetting_1.default.Instance.getMapScale();
        const scale = prescale + .001 * delta;
        this.setMapScale(scale);
      }
      onMouseDown(event) {
        var _a, _b;
        this._isDrag = false;
        const worldPos = event.getLocation();
        if (!this.isWorldPosInEditorArea(worldPos)) return;
        if (event.getButton() === cc.Event.EventMouse.BUTTON_LEFT) {
          this._isLeftDown = true;
          this.clearHoverDat();
          null === (_a = this.hoverDrawer) || void 0 === _a ? void 0 : _a.clear();
          this._mapInteraction.updateDragRoomHover(this._dragDat, this._hoverDat, this.hoverDrawer);
        } else if (event.getButton() === cc.Event.EventMouse.BUTTON_RIGHT) {
          this._isRightDown = true;
          this.clearHoverDat();
          null === (_b = this.hoverDrawer) || void 0 === _b ? void 0 : _b.clear();
        }
      }
      onMouseMove(event) {
        this._isDrag = true;
        if (this._isLeftDown) {
          if (this._dragDat) {
            const itemDat = this._dragDat.itemNode;
            const dragOffset = this._dragDat.dragOffset;
            if (itemDat && cc.isValid(itemDat)) {
              const localPos = this.dragLayer.convertToNodeSpaceAR(event.getLocation());
              itemDat.setPosition(localPos.add(cc.v2(dragOffset)));
              this._isShiftDown && this._mapInteraction.trySnapDraggedPointY(itemDat);
              this._mapInteraction.syncLadderWithDraggedNode(itemDat, this._isShiftDown);
              this._mapInteraction.updateDragRoomHover(this._dragDat, this._hoverDat, this.hoverDrawer);
              AttrMgr_1.AttrMgr.instance.refreshAttrPanel();
            }
          }
        } else if (this._isRightDown) {
          let delta = event.getDelta();
          this.editorRoot.x += delta.x;
          this.editorRoot.y += delta.y;
        } else this.handleHover(event.target);
      }
      handleHover(target) {
        var _a, _b;
        if (!(target instanceof cc.Node)) return;
        const hoverNd = target;
        if (hoverNd.name === (null === (_a = this._hoverDat) || void 0 === _a ? void 0 : _a.name)) return;
        const room = hoverNd.getComponent(MapDrawRoom_1.default);
        let boxes;
        if (room) {
          const main = this._mapInteraction.buildHoverBoxForNode(hoverNd);
          if (!main) {
            this.clearHoverDat();
            this.hoverDrawer.clear();
            return;
          }
          boxes = [ main ];
          const units = room.node.getComponentsInChildren(MapDrawUnitBase_1.default);
          for (let i = 0; i < units.length; i++) {
            const u = units[i];
            if (!u || !u.node || u.node === room.node) continue;
            const h = this._mapInteraction.buildHoverBoxForNode(u.node);
            h && boxes.push(h);
          }
        } else {
          const h = this._mapInteraction.buildHoverBoxForNode(hoverNd);
          if (!h) {
            this.clearHoverDat();
            this.hoverDrawer.clear();
            return;
          }
          boxes = [ h ];
        }
        this._hoverDat.name = hoverNd.name;
        this._hoverDat.worldPos = boxes[0].worldPos;
        this._hoverDat.width = boxes[0].width;
        this._hoverDat.height = boxes[0].height;
        let linkSegs;
        room ? linkSegs = this._mapInteraction.getPathLinkWorldSegmentsForRoom(room.getRoomCfgId()) : hoverNd.getComponent(MapDrawP_1.default) && (linkSegs = this._mapInteraction.getPathLinkWorldSegmentsFromPoint(hoverNd));
        null === (_b = this.hoverDrawer) || void 0 === _b ? void 0 : _b.drawMulti(hoverNd.name, boxes, linkSegs);
      }
      onMouseUp(event) {
        if (event.getButton() === cc.Event.EventMouse.BUTTON_RIGHT) {
          const wasRightDown = this._isRightDown;
          this._isRightDown = false;
          if (!wasRightDown) return;
        } else if (event.getButton() === cc.Event.EventMouse.BUTTON_LEFT) {
          const wasLeftDown = this._isLeftDown;
          this._isLeftDown = false;
          if (!wasLeftDown) return;
          this.handleDragEnd(event);
        }
        this.clearDragRoomHover();
      }
      handleDragEnd(event) {
        var _a, _b, _c;
        if (!this._dragDat) return;
        const itemDat = this._dragDat.itemNode;
        const itemParent = this._dragDat.parent;
        if (!itemDat || !cc.isValid(itemDat) || !itemParent || !cc.isValid(itemParent)) {
          this._dragDat = null;
          return;
        }
        const type = itemDat.getComponent(MapDrawUnitBase_1.default).getType();
        let targetParent = null;
        if (type === mapTypes_1.UnitType.Room) if (this._dragDat.hoverLayerNode && cc.isValid(this._dragDat.hoverLayerNode)) targetParent = this._dragDat.hoverLayerNode; else {
          const roomWorldPos = itemDat.convertToWorldSpaceAR(cc.Vec2.ZERO);
          const newLayer = null === (_a = this._mapInteraction.getMapLoaderComp()) || void 0 === _a ? void 0 : _a.createLayerForRoomDrop(roomWorldPos.y);
          newLayer && (targetParent = newLayer);
        } else if (this._mapInteraction.isOutRoomUnitType(type)) targetParent = null !== (_c = null === (_b = this._mapInteraction.getMapLoaderComp()) || void 0 === _b ? void 0 : _b.getOutRoomUnitParent()) && void 0 !== _c ? _c : null; else if ("playerExit" === itemDat.name || "playerCreate" === itemDat.name) targetParent = itemParent; else {
          const hoverRoom = MapTool_1.default.findHoverRoomForDrag(this._dragDat.hoverRoomId, this._dragDat.hoverRoomName);
          if (hoverRoom && cc.isValid(hoverRoom.node)) {
            const nonRoomParent = MapTool_1.default.getNonRoomDropParent(itemDat, hoverRoom);
            nonRoomParent && cc.isValid(nonRoomParent) && (targetParent = nonRoomParent);
          }
        }
        if (!targetParent) {
          this._dragDat.itemNode.destroy();
          this._dragDat = null;
          this.clearDragRoomHover();
          return;
        }
        if (targetParent !== itemParent) {
          const worldPos = itemDat.convertToWorldSpaceAR(cc.Vec2.ZERO);
          itemDat.parent = targetParent;
          const localPos = targetParent.convertToNodeSpaceAR(worldPos);
          itemDat.setPosition(localPos);
        } else {
          const dragOffset = this._dragDat.dragOffset;
          itemDat.parent = itemParent;
          const localPos = itemParent.convertToNodeSpaceAR(event.getLocation());
          itemDat.setPosition(localPos.add(cc.v2(dragOffset)));
        }
        this._isShiftDown && this._mapInteraction.trySnapDraggedPointY(itemDat);
        type === mapTypes_1.UnitType.Ladder && this._mapInteraction.syncLadderToBindPoints(itemDat.getComponent(MapDrawLadder_1.default));
        if (!this._isDrag) {
          this._dragDat = null;
          return;
        }
        const draggedRoom = itemDat.getComponent(MapDrawRoom_1.default);
        draggedRoom && /^Layer\d+$/.test(targetParent.name) ? this.handleRoomDragEnd(draggedRoom, targetParent, itemParent) : "playerExit" == itemDat.name || "playerCreate" == itemDat.name ? itemDat.parent = targetParent : this._mapInteraction.isOutRoomUnitType(type) || this.refreshRoomDataOnMove(itemDat.parent, itemParent, targetParent);
        AttrMgr_1.AttrMgr.instance.refreshAttrPanel();
        this.saveUndoSnapshot();
        this._dragDat = null;
      }
      handleRoomDragEnd(roomCom, targetParent, oldParent) {
        var _a, _b;
        const mapLoaderComp = this._mapInteraction.getMapLoaderComp();
        if (!mapLoaderComp) return;
        mapLoaderComp.syncRoomNameAndIdForLayer(roomCom, targetParent, oldParent, null !== (_b = null === (_a = this.levelJson) || void 0 === _a ? void 0 : _a.name) && void 0 !== _b ? _b : "");
        oldParent && /^Layer\d+$/.test(oldParent.name) && mapLoaderComp.refreshLayerBoundsByNode(oldParent);
        targetParent && /^Layer\d+$/.test(targetParent.name) && (null === oldParent || void 0 === oldParent ? void 0 : oldParent.name) !== targetParent.name && mapLoaderComp.refreshLayerBoundsByNode(targetParent);
        mapLoaderComp.cleanupEmptyLayersAfterMove();
        mapLoaderComp.rebuildPointIdsByLayer();
      }
      refreshRoomDataOnMove(newParent, oldParent, targetParent) {
        const mapLoaderComp = this._mapInteraction.getMapLoaderComp();
        const oldOwnerRoom = MapTool_1.default.findOwnerRoomByNode(oldParent);
        const newOwnerRoom = MapTool_1.default.findOwnerRoomByNode(targetParent);
        oldOwnerRoom && cc.isValid(oldOwnerRoom.node) && oldOwnerRoom.refreshDat();
        newOwnerRoom && cc.isValid(newOwnerRoom.node) && newOwnerRoom !== oldOwnerRoom && newOwnerRoom.refreshDat();
        null === mapLoaderComp || void 0 === mapLoaderComp ? void 0 : mapLoaderComp.rebuildPointIdsByLayer();
      }
      clearDragRoomHover() {
        this._mapInteraction.clearDragHover(this._dragDat, this._hoverDat, this.hoverDrawer);
      }
      deleteNd() {
        var _a, _b;
        const trackNd = AttrMgr_1.AttrMgr.instance.getTrachNd();
        if (!trackNd || !cc.isValid(trackNd)) return;
        this.saveUndoSnapshot();
        const type = trackNd.getComponent(MapDrawUnitBase_1.default).getType();
        const mapLoaderComp = this._mapInteraction.getMapLoaderComp();
        if (type === mapTypes_1.UnitType.Room) null === mapLoaderComp || void 0 === mapLoaderComp ? void 0 : mapLoaderComp.deleteRoom(trackNd); else if (type === mapTypes_1.UnitType.PathPoint) null === mapLoaderComp || void 0 === mapLoaderComp ? void 0 : mapLoaderComp.deletePathPoint(trackNd); else if (this._mapInteraction.isOutRoomUnitType(type)) null === mapLoaderComp || void 0 === mapLoaderComp ? void 0 : mapLoaderComp.deletePortal(trackNd); else {
          const ownerRoom = MapTool_1.default.findOwnerRoomByNode(trackNd.parent);
          const ownerLayer = null !== (_b = null === (_a = null === ownerRoom || void 0 === ownerRoom ? void 0 : ownerRoom.node) || void 0 === _a ? void 0 : _a.parent) && void 0 !== _b ? _b : null;
          trackNd.removeFromParent();
          trackNd.destroy();
          this.scheduleOnce(() => {
            null === ownerRoom || void 0 === ownerRoom ? void 0 : ownerRoom.refreshDat();
            ownerLayer && mapLoaderComp && mapLoaderComp.refreshLayerBoundsByNode(ownerLayer);
          });
        }
        AttrMgr_1.AttrMgr.instance.setTrackNd(null);
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.ClearEditPanel);
      }
      onClickSave() {
        var _a;
        null === (_a = this._mapExporter) || void 0 === _a ? void 0 : _a.save();
      }
      onCLickExport() {
        var _a;
        null === (_a = this._mapExporter) || void 0 === _a ? void 0 : _a.export();
      }
      onClickClear() {
        var _a;
        null === (_a = this._mapInteraction.getMapLoaderComp()) || void 0 === _a ? void 0 : _a.clear();
      }
      saveUndoSnapshot() {
        var _a;
        const mapLoaderComp = this._mapInteraction.getMapLoaderComp();
        if (!mapLoaderComp) return;
        const snapshot = mapLoaderComp.saveDat();
        null === (_a = this._undoManager) || void 0 === _a ? void 0 : _a.saveSnapshot(snapshot);
      }
      onUndo() {
        var _a;
        const snapshot = null === (_a = this._undoManager) || void 0 === _a ? void 0 : _a.undo();
        if (!snapshot) {
          console.log("[Undo] No snapshot to undo");
          return;
        }
        const mapLoaderComp = this._mapInteraction.getMapLoaderComp();
        if (mapLoaderComp) {
          AttrMgr_1.AttrMgr.instance.setTrackNd(null);
          EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.ClearEditPanel);
          mapLoaderComp.restoreFromJson(snapshot);
          console.log("[Undo] Undo success");
        }
      }
      onRedo() {
        var _a;
        const snapshot = null === (_a = this._undoManager) || void 0 === _a ? void 0 : _a.redo();
        if (!snapshot) {
          console.log("[Undo] No snapshot to redo");
          return;
        }
        const mapLoaderComp = this._mapInteraction.getMapLoaderComp();
        if (mapLoaderComp) {
          AttrMgr_1.AttrMgr.instance.setTrackNd(null);
          EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.ClearEditPanel);
          mapLoaderComp.restoreFromJson(snapshot);
          console.log("[Undo] Redo success");
        }
      }
      setMapScale(scale) {
        EditorSetting_1.default.Instance.setMapScale(scale);
        const realScale = EditorSetting_1.default.Instance.getMapScale();
        this.editorRoot.scale = realScale;
      }
      clearHoverDat() {
        this._hoverDat.name = "";
      }
      onClickPathLineMode() {
        this.lineHightCamera.cullingMask = -4;
        ModeMgr_1.ModeMgr.instance.enterMode(types_1.ModeType.PathPointLink, () => {
          this.lineHightCamera.cullingMask = -3;
        });
      }
      onTogAutoReanme(event) {
        EditorSetting_1.default.Instance.setAutoRename(event.isChecked);
      }
    };
    __decorate([ property(cc.Camera) ], LevelScene.prototype, "lineHightCamera", void 0);
    __decorate([ property(cc.Node) ], LevelScene.prototype, "editorRoot", void 0);
    __decorate([ property(cc.Camera) ], LevelScene.prototype, "camera", void 0);
    __decorate([ property(cc.JsonAsset) ], LevelScene.prototype, "levelJson", void 0);
    __decorate([ property(cc.Node) ], LevelScene.prototype, "mapCanvasNd", void 0);
    __decorate([ property(cc.Node) ], LevelScene.prototype, "mapGraph", void 0);
    __decorate([ property(cc.Node) ], LevelScene.prototype, "mapLoader", void 0);
    __decorate([ property(cc.Node) ], LevelScene.prototype, "dragLayer", void 0);
    __decorate([ property(cc.Vec2) ], LevelScene.prototype, "mapSize", void 0);
    __decorate([ property(cc.Node) ], LevelScene.prototype, "itemPanelNd", void 0);
    __decorate([ property(HoverDrawer_1.default) ], LevelScene.prototype, "hoverDrawer", void 0);
    __decorate([ property(cc.Label) ], LevelScene.prototype, "curModeLb", void 0);
    __decorate([ property(cc.Toggle) ], LevelScene.prototype, "autoRenameTog", void 0);
    LevelScene = __decorate([ ccclass ], LevelScene);
    exports.default = LevelScene;
    cc._RF.pop();
  }, {
    "../event/eventTypes": "eventTypes",
    "../frameWork/AttrMgr": "AttrMgr",
    "../frameWork/EventManager": "EventManager",
    "../frameWork/ModeMgr": "ModeMgr",
    "../frameWork/UndoManager": "UndoManager",
    "../item/MapDrawLadder": "MapDrawLadder",
    "../item/MapDrawP": "MapDrawP",
    "../item/MapDrawRoom": "MapDrawRoom",
    "../item/MapDrawUnitBase": "MapDrawUnitBase",
    "../item/MapExporter": "MapExporter",
    "../item/MapInteraction": "MapInteraction",
    "../item/MapLoader": "MapLoader",
    "../tool/MapTool": "MapTool",
    "../type/mapTypes": "mapTypes",
    "../type/types": "types",
    "./EditorSetting": "EditorSetting",
    "./HoverDrawer": "HoverDrawer",
    "./KeyInputHandler": "KeyInputHandler"
  } ],
  Logger: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f8dd5oNwmdPWrvyGCx42nM2", "Logger");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Logger = exports.LOG_PREFIX = exports.LoggerLevel = void 0;
    var LoggerLevel;
    (function(LoggerLevel) {
      LoggerLevel[LoggerLevel["OFF"] = 0] = "OFF";
      LoggerLevel[LoggerLevel["ERROR"] = 1] = "ERROR";
      LoggerLevel[LoggerLevel["WARN"] = 2] = "WARN";
      LoggerLevel[LoggerLevel["INFO"] = 3] = "INFO";
      LoggerLevel[LoggerLevel["DEBUG"] = 4] = "DEBUG";
      LoggerLevel[LoggerLevel["ALL"] = 5] = "ALL";
    })(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
    exports.LOG_PREFIX = "[ZS]";
    let _level = LoggerLevel.OFF;
    class Logger {
      static setLoggerLevel(level) {
        _level = level;
      }
      static baseLog(method, minLevel, args) {
        (_level >= minLevel || "log" === method && _level === LoggerLevel.ALL) && console[method].apply(console, [ exports.LOG_PREFIX ].concat(args));
      }
      static log(...args) {
        _level === LoggerLevel.ALL && Logger.baseLog("log", LoggerLevel.ALL, args);
      }
      static debug(...args) {
        Logger.baseLog("debug", LoggerLevel.DEBUG, args);
      }
      static info(...args) {
        Logger.baseLog("info", LoggerLevel.INFO, args);
      }
      static warn(...args) {
        Logger.baseLog("warn", LoggerLevel.WARN, args);
      }
      static error(...args) {
        Logger.baseLog("error", LoggerLevel.ERROR, args);
      }
      static realtimeDebug() {}
      static realtimeInfo() {}
      static realtimeWarn() {}
      static realtimeError() {}
      static setRealtimeFilterMsg() {}
      static addRealtimeFilterMsg() {}
    }
    exports.Logger = Logger;
    Logger.v = (...args) => {
      Logger.log.apply(void 0, args);
    };
    Logger.d = (...args) => {
      Logger.debug.apply(void 0, args);
    };
    Logger.i = (...args) => {
      Logger.info.apply(void 0, args);
    };
    Logger.w = (...args) => {
      Logger.warn.apply(void 0, args);
    };
    Logger.e = (...args) => {
      Logger.error.apply(void 0, args);
    };
    cc._RF.pop();
  }, {} ],
  MapBuilder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f6a7bjJ0OEjRfq8Z4kBI0Vn", "MapBuilder");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawCable_1 = require("./MapDrawCable");
    const MapDrawDoor_1 = require("./MapDrawDoor");
    const MapDrawEnemyRefresh_1 = require("./MapDrawEnemyRefresh");
    const MapDrawFightSoul_1 = require("./MapDrawFightSoul");
    const MapDrawLadder_1 = require("./MapDrawLadder");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawPortal_1 = require("./MapDrawPortal");
    const MapDrawRoom_1 = require("./MapDrawRoom");
    const MapDrawSearchItem_1 = require("./MapDrawSearchItem");
    const MapDrawStone_1 = require("./MapDrawStone");
    const MapDrawSurvive_1 = require("./MapDrawSurvive");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const MapDrawDat_1 = require("./MapDrawDat");
    const MapTool_1 = require("../tool/MapTool");
    const {ccclass: ccclass, property: property} = cc._decorator;
    class MapBuilder {
      constructor() {
        this.defaultSp = null;
        this.roomPrefab = null;
        this.pathPointPrefab = null;
        this.ladderPrefab = null;
        this.doorPrefab = null;
        this.searchItemPrefab = null;
        this.enemyRefreshPrefab = null;
        this.survivePrefab = null;
        this.fightSoulPrefab = null;
        this.defaultPortalPrefab = null;
        this.portalPrefab = null;
        this.shipPrefab = null;
        this.cablePrefab = null;
        this.stonePrefab = null;
        this._mapLoader = null;
        this._roomColors = [ new cc.Color(255, 80, 80), new cc.Color(80, 255, 80), new cc.Color(80, 160, 255), new cc.Color(255, 200, 80), new cc.Color(200, 80, 255), new cc.Color(80, 255, 220) ];
      }
      init(mapLoader, prefabs) {
        this._mapLoader = mapLoader;
        this.defaultSp = prefabs.defaultSp;
        this.roomPrefab = prefabs.roomPrefab;
        this.pathPointPrefab = prefabs.pathPointPrefab;
        this.ladderPrefab = prefabs.ladderPrefab;
        this.doorPrefab = prefabs.doorPrefab;
        this.searchItemPrefab = prefabs.searchItemPrefab;
        this.enemyRefreshPrefab = prefabs.enemyRefreshPrefab;
        this.survivePrefab = prefabs.survivePrefab;
        this.fightSoulPrefab = prefabs.fightSoulPrefab;
        this.defaultPortalPrefab = prefabs.defaultPortalPrefab;
        this.portalPrefab = prefabs.portalPrefab;
        this.shipPrefab = prefabs.shipPrefab;
        this.cablePrefab = prefabs.cablePrefab;
        this.stonePrefab = prefabs.stonePrefab;
      }
      getPointById(id) {
        return this._mapLoader.getPathPointById(id);
      }
      getRoomByCfgId(cfgId) {
        return this._mapLoader.getRoomNode(cfgId);
      }
      applyOffset(pos, parentNd) {
        return null === parentNd || void 0 === parentNd ? void 0 : parentNd.convertToNodeSpaceAR(cc.v2(MapTool_1.default.converMapPosToWorldPos(cc.v2(pos.x, pos.y))));
      }
      build(json, containers) {
        var _a;
        if (!json) return;
        const mapData = json.json;
        this._mapLoader.setAreaInfo(mapData.areaInfo || []);
        this.buildPlayerNodes(mapData, containers.playerCreate, containers.playerExit);
        this.buildRooms(mapData, containers.layerCont);
        this.buildPathPoints(mapData);
        this.buildLadders(mapData);
        this.buildDoors(mapData);
        this.buildSearchItems(mapData);
        this.buildEnemyRefresh(mapData);
        this.buildSurvives(mapData);
        this.buildFightSoul(mapData);
        this.initRooms(mapData);
        this._mapLoader.updateAllLayerBounds();
        this.buildPortalUnits(mapData, containers.outRoomUnitCont);
        this.buildStoneUnits(mapData, containers.outRoomUnitCont);
        this.buildCableUnits(mapData, containers.outRoomUnitCont);
        null === (_a = this.onBuildComplete) || void 0 === _a ? void 0 : _a.call(this);
      }
      buildPlayerNodes(mapData, playerCreate, playerExit) {
        [ playerCreate, playerExit ].forEach((nd, index) => {
          const isCreate = 0 === index;
          nd.name = isCreate ? "playerCreate" : "playerExit";
          const sp = nd.addComponentSafe(cc.Sprite);
          sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          sp.spriteFrame = this.defaultSp;
          nd.setContentSize(50, 50);
          nd.color = isCreate ? cc.Color.ORANGE : cc.Color.CYAN;
          const dat = isCreate ? mapData.playerCreatePos : mapData.playerExitPos;
          const localPos = this.applyOffset(dat, nd.parent);
          nd.setPosition(localPos);
          nd.addComponentSafe(MapDrawUnitBase_1.default);
        });
      }
      buildRooms(mapData, layerCont) {
        const rooms = mapData.rooms || [];
        rooms.forEach(room => {
          const roomNd = cc.instantiate(this.roomPrefab);
          roomNd.parent = layerCont;
          roomNd.setAnchorPoint(0, 0);
          const localPos = this.applyOffset(room.pos, roomNd.parent);
          roomNd.setPosition(localPos);
          this._mapLoader.addRoomToLayer(roomNd, room.layer);
          this._mapLoader.registerRoomNode(room.cfgId, roomNd);
          const roomCom = roomNd.getComponent(MapDrawRoom_1.default);
          roomCom && roomCom.getUid() && this._mapLoader.registerRoomUid(roomCom.getUid(), roomNd);
        });
      }
      initRooms(mapData) {
        const rooms = mapData.rooms || [];
        rooms.forEach((room, index) => {
          const color = this._roomColors[index % this._roomColors.length];
          this._mapLoader.initRoom(room.cfgId, room, color, room.uid, room.unlockPointIds || []);
        });
      }
      buildPathPoints(mapData) {
        const pathPoints = mapData.pathPoints || [];
        const rooms = mapData.rooms || [];
        const roomPointsMap = new Map();
        pathPoints.forEach(p => {
          const list = roomPointsMap.get(p.roomId) || [];
          list.push(p);
          roomPointsMap.set(p.roomId, list);
        });
        rooms.forEach(room => {
          const roomNd = this.getRoomByCfgId(room.cfgId);
          if (!roomNd) return;
          const pointCont = roomNd.getChildByName("pointCont");
          if (!pointCont) return;
          const points = roomPointsMap.get(room.cfgId) || [];
          points.forEach(p => {
            const pointNd = cc.instantiate(this.pathPointPrefab);
            pointNd.name = p.id;
            pointNd.parent = pointCont;
            const localPos = this.applyOffset(p.pos, pointCont);
            pointNd.setPosition(localPos);
            const pointCom = pointNd.addComponentSafe(MapDrawP_1.default);
            pointCom.init(p);
            this._mapLoader.registerPoint(p.id, pointNd);
          });
        });
        pathPoints.forEach(p => {
          if (!p.links || 0 === p.links.length) return;
          const pointNd = this.getPointById(p.id);
          if (!pointNd) return;
          const pointCom = pointNd.getComponent(MapDrawP_1.default);
          if (!pointCom) return;
          const linkedNodes = p.links.map(id => this.getPointById(id)).filter(nd => !!nd && cc.isValid(nd));
          pointCom.setLinks(linkedNodes);
        });
      }
      buildLadders(mapData) {
        let ladderId = 0;
        const rooms = mapData.rooms || [];
        rooms.forEach(room => {
          const ladders = room.ladders || [];
          ladders.forEach(ladder => {
            var _a, _b;
            const roomNd = this.getRoomByCfgId(room.cfgId);
            if (!roomNd) return;
            const ladderNd = cc.instantiate(this.ladderPrefab);
            ladderNd.name = `Ladder${ladderId++}`;
            ladderNd.parent = roomNd.getChildByName("unitCont");
            ladderNd.setAnchorPoint(.5, 0);
            const adjustedPos = this.applyOffset(ladder.pos, ladderNd.parent);
            ladderNd.setPosition(adjustedPos.x, adjustedPos.y);
            const startNd = this.getPointById(null === (_a = ladder.bindPointIds) || void 0 === _a ? void 0 : _a[0]);
            const endNd = this.getPointById(null === (_b = ladder.bindPointIds) || void 0 === _b ? void 0 : _b[1]);
            if (endNd && startNd) {
              const startCom = null === startNd || void 0 === startNd ? void 0 : startNd.getComponent(MapDrawP_1.default);
              const endCom = null === endNd || void 0 === endNd ? void 0 : endNd.getComponent(MapDrawP_1.default);
              if (startCom && endCom) {
                const height = endCom.getPos().y - startCom.getPos().y;
                ladderNd.setContentSize(ladderNd.width, height);
              }
            }
            const bindPoint = (ladder.bindPointIds || []).map(id => this.getPointById(id)).filter(Boolean);
            const control = ladderNd.addComponentSafe(MapDrawLadder_1.default);
            control.init(ladder.roomId, bindPoint, ladder.isExitLadder);
          });
        });
      }
      buildDoors(mapData) {
        let doorId = 0;
        const rooms = mapData.rooms || [];
        rooms.forEach(room => {
          const doors = room.doors || [];
          doors.forEach(door => {
            const roomNd = this.getRoomByCfgId(room.cfgId);
            if (!roomNd) return;
            const doorNd = cc.instantiate(this.doorPrefab);
            doorNd.name = `Door${doorId++}`;
            doorNd.parent = roomNd.getChildByName("unitCont");
            const adjustedPos = this.applyOffset(door.pos, doorNd.parent);
            doorNd.setPosition(adjustedPos.x, adjustedPos.y);
            const control = doorNd.addComponentSafe(MapDrawDoor_1.default);
            control.init(door.roomId, door.hp);
          });
        });
      }
      buildSearchItems(mapData) {
        let nameId = 0;
        const rooms = mapData.rooms || [];
        rooms.forEach(room => {
          const searchItems = room.searchItemDatas || [];
          searchItems.forEach(item => {
            const roomNd = this.getRoomByCfgId(room.cfgId);
            if (!roomNd) return;
            const itemNd = cc.instantiate(this.searchItemPrefab);
            itemNd.name = `SearchItem${nameId++}`;
            itemNd.parent = roomNd.getChildByName("unitCont");
            const adjustedPos = this.applyOffset(item.pos, itemNd.parent);
            itemNd.setPosition(adjustedPos.x, adjustedPos.y);
            const control = itemNd.addComponentSafe(MapDrawSearchItem_1.default);
            control.init(item.roomId);
          });
        });
      }
      buildEnemyRefresh(mapData) {
        let nameId = 0;
        const rooms = mapData.rooms || [];
        const enemyRefreshDatas = rooms.flatMap(room => room.enemyRefreshDatas || []);
        enemyRefreshDatas.forEach(refreshDat => {
          const roomNd = this.getRoomByCfgId(refreshDat.roomId);
          if (!roomNd) return;
          const itemNd = cc.instantiate(this.enemyRefreshPrefab);
          itemNd.name = `EnemyRefresh${nameId++}`;
          itemNd.parent = roomNd.getChildByName("unitCont");
          const adjustedPos = this.applyOffset(refreshDat.pos, itemNd.parent);
          itemNd.setPosition(adjustedPos.x, adjustedPos.y);
          const control = itemNd.addComponentSafe(MapDrawEnemyRefresh_1.default);
          control.init(refreshDat.roomId, refreshDat.refreshId, refreshDat.param);
        });
      }
      buildSurvives(mapData) {
        let nameId = 0;
        const rooms = mapData.rooms || [];
        rooms.forEach(room => {
          const surviveDatas = room.survivorDatas || [];
          surviveDatas.forEach(survive => {
            const roomNd = this.getRoomByCfgId(room.cfgId);
            if (!roomNd) return;
            const itemNd = cc.instantiate(this.survivePrefab);
            itemNd.name = `Survive${nameId++}`;
            itemNd.parent = roomNd.getChildByName("unitCont");
            const adjustedPos = this.applyOffset(survive.pos, itemNd.parent);
            itemNd.setPosition(adjustedPos.x, adjustedPos.y);
            const control = itemNd.addComponentSafe(MapDrawSurvive_1.default);
            control.init(survive);
          });
        });
      }
      buildFightSoul(mapData) {
        let nameId = 0;
        const rooms = mapData.rooms || [];
        rooms.forEach(room => {
          const fightSoulDatas = room.fightSoulDatas || [];
          fightSoulDatas.forEach(fightSoul => {
            const roomNd = this.getRoomByCfgId(room.cfgId);
            if (!roomNd) return;
            const itemNd = cc.instantiate(this.fightSoulPrefab);
            itemNd.name = `FightSoul${nameId++}`;
            itemNd.parent = roomNd.getChildByName("unitCont");
            const adjustedPos = this.applyOffset(fightSoul.pos, itemNd.parent);
            itemNd.setPosition(adjustedPos.x, adjustedPos.y);
            const control = itemNd.addComponentSafe(MapDrawFightSoul_1.default);
            control.init(fightSoul);
          });
        });
      }
      buildPortalUnits(mapData, outRoomUnitCont) {
        let nameId = 0;
        const portals = mapData.portalDatas || [];
        portals.forEach(portal => {
          var _a;
          const type = null !== (_a = portal.portalType) && void 0 !== _a ? _a : MapDrawDat_1.PortalType.Default;
          const prefab = this.getPortalPrefab(type);
          const itemNd = cc.instantiate(prefab);
          itemNd.name = `Portal${nameId++}`;
          itemNd.parent = outRoomUnitCont;
          const adjustedPos = this.applyOffset(portal.pos, itemNd.parent);
          itemNd.setPosition(adjustedPos.x, adjustedPos.y);
          const control = itemNd.addComponentSafe(MapDrawPortal_1.default);
          const linkP = this.getPointById(portal.linkId);
          const animPs = (portal.animPIds || []).map(id => this.getPointById(id)).filter(Boolean);
          control.init(portal, linkP, animPs);
        });
      }
      getPortalPrefab(type) {
        switch (type) {
         case MapDrawDat_1.PortalType.Default:
          return this.defaultPortalPrefab;

         case MapDrawDat_1.PortalType.Drop:
          return this.portalPrefab;

         case MapDrawDat_1.PortalType.Ship:
          return this.shipPrefab;

         default:
          return this.defaultPortalPrefab;
        }
      }
      buildStoneUnits(mapData, outRoomUnitCont) {
        let nameId = 0;
        const datArr = mapData.rockDatas || [];
        datArr.forEach(dat => {
          const itemNd = cc.instantiate(this.stonePrefab);
          itemNd.name = `Stone${nameId++}`;
          itemNd.parent = outRoomUnitCont;
          const adjustedPos = this.applyOffset(dat.pos, itemNd.parent);
          itemNd.setPosition(adjustedPos.x, adjustedPos.y);
          const control = itemNd.addComponentSafe(MapDrawStone_1.default);
          control.init(dat);
        });
      }
      buildCableUnits(mapData, outRoomUnitCont) {
        let nameId = 0;
        const datArr = mapData.scooterDatas || [];
        datArr.forEach(dat => {
          const startP = this.getPointById(dat.point1);
          const endP = this.getPointById(dat.point2);
          if (!startP) return;
          const startCom = startP.getComponent(MapDrawP_1.default);
          if (!startCom) return;
          const itemNd = cc.instantiate(this.cablePrefab);
          itemNd.name = `Cable${nameId++}`;
          itemNd.parent = outRoomUnitCont;
          const adjustedPos = this.applyOffset(startCom.getPos(), itemNd.parent);
          itemNd.setPosition(adjustedPos.x, adjustedPos.y);
          const points = (dat.points || []).map(id => this.getPointById(id)).filter(Boolean);
          const control = itemNd.addComponentSafe(MapDrawCable_1.default);
          control.init(startP, endP, points, dat);
        });
      }
    }
    __decorate([ property(cc.SpriteFrame) ], MapBuilder.prototype, "defaultSp", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "roomPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "pathPointPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "ladderPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "doorPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "searchItemPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "enemyRefreshPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "survivePrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "fightSoulPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "defaultPortalPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "portalPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "shipPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "cablePrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapBuilder.prototype, "stonePrefab", void 0);
    exports.default = MapBuilder;
    cc._RF.pop();
  }, {
    "../tool/MapTool": "MapTool",
    "./MapDrawCable": "MapDrawCable",
    "./MapDrawDat": "MapDrawDat",
    "./MapDrawDoor": "MapDrawDoor",
    "./MapDrawEnemyRefresh": "MapDrawEnemyRefresh",
    "./MapDrawFightSoul": "MapDrawFightSoul",
    "./MapDrawLadder": "MapDrawLadder",
    "./MapDrawP": "MapDrawP",
    "./MapDrawPortal": "MapDrawPortal",
    "./MapDrawRoom": "MapDrawRoom",
    "./MapDrawSearchItem": "MapDrawSearchItem",
    "./MapDrawStone": "MapDrawStone",
    "./MapDrawSurvive": "MapDrawSurvive",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawCable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ae2edYAmYpIJIeD4l/cOrIV", "MapDrawCable");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawCable = class MapDrawCable extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this._speed = 0;
        this._points = [];
      }
      getType() {
        return mapTypes_1.UnitType.Cable;
      }
      init(startPoint, endPoint, points, dat) {
        this._startP = startPoint;
        this._endP = endPoint;
        this._speed = dat.speed;
        this._points = points;
      }
      setStartP(startP) {
        this._startP = startP;
      }
      setEndP(endP) {
        this._endP = endP;
      }
      setSpeed(speed) {
        this._speed = speed;
      }
      setPoints(points) {
        this._points = points;
      }
      getDat() {
        const pointIds = this._points.filter(p => p && cc.isValid(p) && p.getComponent(MapDrawP_1.default)).map(p => p.getComponent(MapDrawP_1.default).getId());
        const startId = this._startP && cc.isValid(this._startP) ? this._startP.getComponent(MapDrawP_1.default).getId() : "";
        const endId = this._endP && cc.isValid(this._endP) ? this._endP.getComponent(MapDrawP_1.default).getId() : "";
        const dat = {
          point1: startId,
          point2: endId,
          points: pointIds,
          speed: this._speed
        };
        return dat;
      }
    };
    MapDrawCable = __decorate([ ccclass ], MapDrawCable);
    exports.default = MapDrawCable;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawP": "MapDrawP",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawDat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "43b18y442tKf5CfB9w/oIu8", "MapDrawDat");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PortalType = exports.MapDrawDat = void 0;
    class MapDrawDat {
      setDat(dat) {
        this._jsonDat = dat;
      }
      createJson() {
        return JSON.stringify(this._jsonDat);
      }
      getSize() {
        return this._jsonDat.size;
      }
      getPathPoints() {
        return this._jsonDat.pathPoints;
      }
    }
    exports.MapDrawDat = MapDrawDat;
    var PortalType;
    (function(PortalType) {
      PortalType[PortalType["Default"] = 0] = "Default";
      PortalType[PortalType["Drop"] = 1] = "Drop";
      PortalType[PortalType["Ship"] = 2] = "Ship";
    })(PortalType = exports.PortalType || (exports.PortalType = {}));
    cc._RF.pop();
  }, {} ],
  MapDrawDefaultPortal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f5366MjHQRKRo2xqsEVgNvh", "MapDrawDefaultPortal");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawDat_1 = require("./MapDrawDat");
    const MapDrawPortal_1 = require("./MapDrawPortal");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawDefaultPortal = class MapDrawDefaultPortal extends MapDrawPortal_1.default {
      start() {
        this._portalType = MapDrawDat_1.PortalType.Default;
      }
    };
    MapDrawDefaultPortal = __decorate([ ccclass ], MapDrawDefaultPortal);
    exports.default = MapDrawDefaultPortal;
    cc._RF.pop();
  }, {
    "./MapDrawDat": "MapDrawDat",
    "./MapDrawPortal": "MapDrawPortal"
  } ],
  MapDrawDoor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1cb99CMm2lAsp6+O/pnmT49", "MapDrawDoor");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawDoor = class MapDrawDoor extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.hp = 0;
      }
      getType() {
        return mapTypes_1.UnitType.Door;
      }
      init(roomId, hp) {
        this.hp = hp;
        this._roomCfgId = roomId;
      }
      setHp(hp) {
        this.hp = hp;
      }
      getDat() {
        const dat = {
          hp: this.hp,
          roomId: this._roomCfgId,
          pos: this.getPos()
        };
        return dat;
      }
    };
    __decorate([ property ], MapDrawDoor.prototype, "hp", void 0);
    MapDrawDoor = __decorate([ ccclass ], MapDrawDoor);
    exports.default = MapDrawDoor;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawEnemyRefresh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8c0fPBdTlDupY4vc31r4M8", "MapDrawEnemyRefresh");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawEnemyRefresh = class MapDrawEnemyRefresh extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.refreshId = 0;
        this.param = "";
      }
      getType() {
        return mapTypes_1.UnitType.EnemyRefresh;
      }
      init(roomId, refreshId, param) {
        this.refreshId = refreshId;
        this.param = param;
        this._roomCfgId = roomId;
      }
      setRoomId(roomId) {
        this._roomCfgId = roomId;
      }
      setParam(param) {
        this.param = param;
      }
      setRefresId(refreshId) {
        this.refreshId = refreshId;
      }
      getDat() {
        const dat = {
          refreshId: this.refreshId,
          param: this.param,
          roomId: this._roomCfgId,
          pos: this.getPos()
        };
        return dat;
      }
    };
    MapDrawEnemyRefresh = __decorate([ ccclass ], MapDrawEnemyRefresh);
    exports.default = MapDrawEnemyRefresh;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawFightSoul: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "35968/dnEBGaLe8GFkOUOIX", "MapDrawFightSoul");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawFightSoul = class MapDrawFightSoul extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.weight = 0;
      }
      getType() {
        return mapTypes_1.UnitType.FightSoul;
      }
      init(dat) {
        this._roomCfgId = dat.roomId;
        this.weight = dat.weight;
      }
      getDat() {
        const dat = {
          roomId: this._roomCfgId,
          weight: this.weight,
          pos: this.getPos(),
          isGuide: false
        };
        return dat;
      }
      setRoomId(roomId) {
        this._roomCfgId = roomId;
      }
      setWeight(weight) {
        this.weight = weight;
      }
    };
    MapDrawFightSoul = __decorate([ ccclass ], MapDrawFightSoul);
    exports.default = MapDrawFightSoul;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawLadder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a80f5voQVZD9Yke0TEiJvIQ", "MapDrawLadder");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawLadder = class MapDrawLadder extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.bindPoints = [];
        this._isExitLadder = false;
      }
      getType() {
        return mapTypes_1.UnitType.Ladder;
      }
      init(roomId, bindPoints, isExit) {
        this._roomCfgId = roomId;
        this.bindPoints = bindPoints;
        this._isExitLadder = isExit;
      }
      setBinds(nodeArr) {
        this.bindPoints = nodeArr;
      }
      setIsExitLadder(isExitLadder) {
        this._isExitLadder = isExitLadder;
      }
      getDat() {
        const bindPointIds = (this.bindPoints || []).filter(bindPoint => bindPoint && cc.isValid(bindPoint)).map(bindPoint => bindPoint.getComponent(MapDrawP_1.default)).filter(pointCom => pointCom && pointCom.getId()).map(pointCom => pointCom.getId());
        const dat = {
          roomId: this._roomCfgId,
          pos: this.getPos(),
          bindPointIds: bindPointIds,
          unlockMethod: 0,
          unlockCost: 0,
          showType: 0,
          isExitLadder: this._isExitLadder
        };
        return dat;
      }
    };
    __decorate([ property([ cc.Node ]) ], MapDrawLadder.prototype, "bindPoints", void 0);
    MapDrawLadder = __decorate([ ccclass ], MapDrawLadder);
    exports.default = MapDrawLadder;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawP": "MapDrawP",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawPortal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a3c1qhOuFJEbMtgJGBTL17", "MapDrawPortal");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawDat_1 = require("./MapDrawDat");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawPortal = class MapDrawPortal extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.heighLight = null;
        this.offsetX = 0;
        this.animPs = [];
      }
      onLoad() {
        super.onLoad();
        this.heighLight && cc.isValid(this.heighLight) && (this.heighLight.active = false);
      }
      start() {
        this._portalType = MapDrawDat_1.PortalType.Drop;
      }
      getType() {
        return mapTypes_1.UnitType.Portal;
      }
      init(dat, linkP, animPs) {
        this._dat = dat;
        this.linkP = linkP;
        this.animPs = animPs;
        this.offsetX = dat.offsetX;
      }
      setOffsetX(offset) {
        this.offsetX = offset;
      }
      getOffsetX() {
        return this.offsetX;
      }
      setLinkP(linkP) {
        this.linkP = linkP;
      }
      getLinkP() {
        return this.linkP;
      }
      setAnimPs(animPs) {
        this.animPs = animPs;
      }
      getAnimP() {
        return this.animPs;
      }
      getDat() {
        var _a, _b, _c, _d;
        const animPIds = null !== (_a = (this.animPs || []).filter(bindPoint => bindPoint && cc.isValid(bindPoint)).map(bindPoint => bindPoint.getComponent(MapDrawP_1.default)).filter(pointCom => pointCom && pointCom.getId()).map(pointCom => pointCom.getId())) && void 0 !== _a ? _a : [];
        const linkId = this.linkP && cc.isValid(this.linkP) && null !== (_d = null === (_c = null === (_b = this.linkP) || void 0 === _b ? void 0 : _b.getComponent(MapDrawP_1.default)) || void 0 === _c ? void 0 : _c.getId()) && void 0 !== _d ? _d : "";
        const dat = {
          linkId: linkId,
          pos: this.getPos(),
          offsetX: this.offsetX,
          portalType: this._portalType,
          animPIds: animPIds
        };
        return dat;
      }
    };
    __decorate([ property(cc.Node) ], MapDrawPortal.prototype, "heighLight", void 0);
    MapDrawPortal = __decorate([ ccclass ], MapDrawPortal);
    exports.default = MapDrawPortal;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawDat": "MapDrawDat",
    "./MapDrawP": "MapDrawP",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawP: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b29f3ul38JFy5ms38j6OylS", "MapDrawP");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MapDrawP_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const eventTypes_1 = require("../event/eventTypes");
    const EventManager_1 = require("../frameWork/EventManager");
    const ModeMgr_1 = require("../frameWork/ModeMgr");
    const mapTypes_1 = require("../type/mapTypes");
    const types_1 = require("../type/types");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawP = MapDrawP_1 = class MapDrawP extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.links = [];
        this._pid = null;
        this._pDat = null;
        this._linkHighlight = false;
        this._savedTint = null;
      }
      getType() {
        return mapTypes_1.UnitType.PathPoint;
      }
      onUnitLeftMouseDownForLink(_event) {
        if (ModeMgr_1.ModeMgr.instance.curModeType == types_1.ModeType.PathPointLink) {
          EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.PathPointLinkClick, this.node);
          return true;
        }
        if (ModeMgr_1.ModeMgr.instance.curModeType == types_1.ModeType.LadderBind) {
          EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.LadderBindPointClick, this.node);
          return true;
        }
        if (ModeMgr_1.ModeMgr.instance.curModeType == types_1.ModeType.SelectPoint) {
          EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.SelectPointClick, this.node);
          return true;
        }
        return false;
      }
      setLinkHighlight(on) {
        if (on === this._linkHighlight) return;
        if (on) {
          const tintNd = this.node.getComponent(cc.Sprite) ? this.node : this.node.getChildByName("bg");
          if (!tintNd) return;
          const sp = tintNd.getComponent(cc.Sprite);
          if (sp) {
            null == this._savedTint && (this._savedTint = sp.node.color.clone());
            sp.node.color = new cc.Color(80, 255, 160, 255);
          } else {
            null == this._savedTint && (this._savedTint = tintNd.color.clone());
            tintNd.color = new cc.Color(80, 255, 160, 255);
          }
        } else {
          const tintNd = this.node.getComponent(cc.Sprite) ? this.node : this.node.getChildByName("bg");
          if (tintNd && this._savedTint) {
            const sp = tintNd.getComponent(cc.Sprite);
            sp ? sp.node.color = this._savedTint : tintNd.color = this._savedTint;
          }
          this._savedTint = null;
        }
        this._linkHighlight = on;
      }
      addLink(other) {
        if (!other || other === this.node || !cc.isValid(other)) return;
        const next = this.links.slice();
        if (next.indexOf(other) >= 0) return;
        next.push(other);
        this.setLinks(next);
      }
      removeLink(other) {
        if (!other) return;
        const next = this.links.filter(n => n !== other);
        this.setLinks(next);
      }
      hasLinkTo(other) {
        return this.links.indexOf(other) >= 0;
      }
      init(pData) {
        this._pDat = pData;
        this._pid = pData.id;
        this._roomCfgId = pData.roomId;
        this.initUI();
      }
      initUI() {
        const nameNd = this.node.getChildByName("name");
        const label = nameNd.getComponent(cc.Label);
        label.string = `${this._pid}`;
      }
      setLinks(pointNds) {
        const seen = new Set();
        this.links = (pointNds || []).filter(nd => {
          if (!nd || !cc.isValid(nd)) return false;
          if (nd === this.node) return false;
          if (seen.has(nd)) return false;
          seen.add(nd);
          return true;
        });
      }
      getDat() {
        var _a;
        const dat = {
          id: this._pid,
          roomId: this._roomCfgId,
          pos: this.getPos(),
          links: (null === (_a = this.links) || void 0 === _a ? void 0 : _a.filter(link => link && cc.isValid(link)).map(link => link.getComponent(MapDrawP_1).getId())) || []
        };
        return dat;
      }
      getId() {
        return this._pid;
      }
      setId(newId) {
        this._pid = newId;
        this.node.name = `${newId}`;
        this.initUI();
      }
    };
    MapDrawP = MapDrawP_1 = __decorate([ ccclass ], MapDrawP);
    exports.default = MapDrawP;
    cc._RF.pop();
  }, {
    "../event/eventTypes": "eventTypes",
    "../frameWork/EventManager": "EventManager",
    "../frameWork/ModeMgr": "ModeMgr",
    "../type/mapTypes": "mapTypes",
    "../type/types": "types",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawRoom: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9561eH/A1KfYEzOAAbD4hR", "MapDrawRoom");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawDoor_1 = require("./MapDrawDoor");
    const MapDrawEnemyRefresh_1 = require("./MapDrawEnemyRefresh");
    const MapDrawLadder_1 = require("./MapDrawLadder");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawSearchItem_1 = require("./MapDrawSearchItem");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const MapLoader_1 = require("./MapLoader");
    const MapDrawSurvive_1 = require("./MapDrawSurvive");
    const MapDrawFightSoul_1 = require("./MapDrawFightSoul");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawRoom = class MapDrawRoom extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.unLockPoints = [];
        this._pointCont = null;
        this._unitCont = null;
        this._roomDat = null;
        this._color = null;
        this._layer = 0;
        this._uid = null;
        this._points = [];
        this._pointIds = [];
        this._unLockPointIds = [];
        this._roomItemDat = {
          ladderDat: [],
          doorDat: [],
          enemyRefreshDat: [],
          searchItemDat: [],
          surviveDat: [],
          fightSoulDat: []
        };
        this._searchItemDat = [];
        this._enemyRefreshDat = [];
        this._ladderDat = [];
        this._doorDat = [];
        this._surviveDat = [];
        this._fightSoulDat = [];
        this._unlockBindHighlight = false;
        this._savedBgColor = null;
        this._cfgIdManuallySet = false;
      }
      getType() {
        return mapTypes_1.UnitType.Room;
      }
      setUnlockBindHighlight(on) {
        if (on === this._unlockBindHighlight) return;
        const bg = this.node.getChildByName("bg");
        if (!bg) {
          this._unlockBindHighlight = on;
          return;
        }
        if (on) {
          null == this._savedBgColor && (this._savedBgColor = bg.color.clone());
          bg.color = new cc.Color(80, 255, 160, 255);
        } else {
          this._savedBgColor && (bg.color = this._savedBgColor);
          this._savedBgColor = null;
        }
        this._unlockBindHighlight = on;
      }
      init(roomDat, color) {
        this._roomDat = roomDat;
        this._roomCfgId = roomDat.cfgId;
        this._layer = roomDat.layer;
        this._color = color;
        this._pointCont = this.node.getChildByName("pointCont");
        this._unitCont = this.node.getChildByName("unitCont");
        !this._uid && roomDat.cfgId > 0 && (this._uid = `room_${roomDat.cfgId}`);
        this._cfgIdManuallySet = roomDat.isManualSet;
        this.initUI();
        this.setDat();
      }
      changeLayer(newLayer) {
        this._layer = newLayer;
      }
      setManulSet(isManual) {
        if (this._cfgIdManuallySet) return;
        this._cfgIdManuallySet = isManual;
      }
      getManulSet() {
        return this._cfgIdManuallySet;
      }
      updateRoomId(roomId) {
        this._roomCfgId = roomId;
        this.refreshDat();
        this.setRoomNameLb();
      }
      setUnLockPoints(points) {
        this.unLockPoints = points;
      }
      getUnLockPoints() {
        return this.unLockPoints;
      }
      getPoints() {
        return this._points;
      }
      getRoomCfgId() {
        return this._roomCfgId;
      }
      getUid() {
        this._uid || this.generateUid();
        return this._uid;
      }
      generateUid() {
        if (this._uid) return this._uid;
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substring(2, 6);
        this._uid = `${Date.now()}_${timestamp}_${random}`;
      }
      extractUidNumber() {
        if (!this._uid) return -1;
        const num = parseInt(this._uid, 10);
        if (!isNaN(num)) return num;
        const match = /room_(\d+)/.exec(this._uid);
        return match ? parseInt(match[1], 10) : -1;
      }
      setSize(size) {
        this._roomDat.size = size;
        this.node.setContentSize(size.width, size.height);
        const bg = this.node.getChildByName("bg");
        bg.setContentSize(size.width, size.height);
        const roomName = this.node.getChildByName("name");
        roomName.setPosition(cc.v2(0, this.node.getContentSize().height - 20));
      }
      initUI() {
        this.node.name = `room_${this._roomCfgId}`;
        this.node.setContentSize(this._roomDat.size.width, this._roomDat.size.height);
        const bg = this.node.getChildByName("bg");
        bg.setContentSize(this._roomDat.size.width, this._roomDat.size.height);
        bg.color = this._color;
        this.setRoomNameLb();
      }
      setRoomNameLb() {
        this.node.name = `room_${this._roomCfgId}`;
        const roomName = this.node.getChildByName("name");
        roomName.setPosition(cc.v2(0, this.node.getContentSize().height - 20));
        const label = roomName.getComponent(cc.Label);
        const nameStr = `${this._roomCfgId}`;
        label.string = nameStr;
      }
      setDat() {
        this._points = this._pointCont.children.filter(child => child && cc.isValid(child)).map(child => child.getComponent(MapDrawP_1.default)) || [];
        this._pointIds = this._points.map(point => point.getId()) || [];
        this._unLockPointIds = this.unLockPoints.filter(point => point && cc.isValid(point)).map(point => point.getComponent(MapDrawP_1.default).getId());
        this.setDoorDat();
        this.setLadderDat();
        this.setEnemyDat();
        this.setSearchItemDatas();
        this.setSurviveDatas();
        this.setFightSoulDatas();
      }
      setDoorDat() {
        const allDoors = this._unitCont.getComponentsInChildren(MapDrawDoor_1.default);
        this._roomItemDat.doorDat = allDoors;
        if (0 == allDoors.length) {
          this._doorDat = [];
          return;
        }
        this._doorDat = allDoors.map(door => door.getDat());
      }
      setLadderDat() {
        const allLadders = this._unitCont.getComponentsInChildren(MapDrawLadder_1.default);
        this._roomItemDat.ladderDat = allLadders;
        if (0 == allLadders.length) {
          this._ladderDat = [];
          return;
        }
        this._ladderDat = null === allLadders || void 0 === allLadders ? void 0 : allLadders.map(ladder => ladder.getDat());
      }
      setEnemyDat() {
        const allEnemies = this._unitCont.getComponentsInChildren(MapDrawEnemyRefresh_1.default);
        this._roomItemDat.enemyRefreshDat = allEnemies;
        if (0 == allEnemies.length) {
          this._enemyRefreshDat = [];
          return;
        }
        this._enemyRefreshDat = allEnemies.map(enemy => enemy.getDat());
      }
      setSearchItemDatas() {
        const allSearchItems = this._unitCont.getComponentsInChildren(MapDrawSearchItem_1.default);
        this._roomItemDat.searchItemDat = allSearchItems;
        if (0 == allSearchItems.length) {
          this._searchItemDat = [];
          return;
        }
        this._searchItemDat = allSearchItems.map(searchItem => searchItem.getDat());
      }
      setSurviveDatas() {
        const allSurviveItems = this._unitCont.getComponentsInChildren(MapDrawSurvive_1.default);
        this._roomItemDat.surviveDat = allSurviveItems;
        if (0 == allSurviveItems.length) {
          this._surviveDat = [];
          return;
        }
        this._surviveDat = allSurviveItems.map(item => item.getDat());
      }
      setFightSoulDatas() {
        const allNums = this._unitCont.getComponentsInChildren(MapDrawFightSoul_1.default);
        this._roomItemDat.fightSoulDat = allNums;
        if (0 == allNums.length) {
          this._fightSoulDat = [];
          return;
        }
        this._fightSoulDat = allNums.map(item => item.getDat());
      }
      refreshDat() {
        const roomId = this._roomCfgId;
        this.node.getComponentsInChildren(MapDrawUnitBase_1.default).forEach(unit => {
          if (unit.node == this.node) return;
          unit.updateRoomId(roomId);
        });
        if (!this._pointCont) return;
        this._points = this._pointCont.children.map(child => child.getComponent(MapDrawP_1.default));
        this._points.forEach(point => {
          MapLoader_1.default.ins.updatePointMap(point.getId(), point.node);
        });
        this.setDat();
      }
      getDat() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const dat = {
          uid: this._uid,
          isManualSet: null !== (_a = this._cfgIdManuallySet) && void 0 !== _a && _a,
          cfgId: this._roomCfgId,
          layer: this._layer,
          pos: this.getPos(),
          size: this.node.getContentSize(),
          pathPointIds: null !== (_b = this._pointIds) && void 0 !== _b ? _b : [],
          unlockPointIds: null !== (_c = this._unLockPointIds) && void 0 !== _c ? _c : [],
          doors: null !== (_d = this._doorDat) && void 0 !== _d ? _d : [],
          ladders: null !== (_e = this._ladderDat) && void 0 !== _e ? _e : [],
          enemyRefreshDatas: null !== (_f = this._enemyRefreshDat) && void 0 !== _f ? _f : [],
          enemyCreateDatas: [],
          baseItemDatas: [],
          searchItemDatas: null !== (_g = this._searchItemDat) && void 0 !== _g ? _g : [],
          survivorDatas: null !== (_h = this._surviveDat) && void 0 !== _h ? _h : [],
          fightSoulDatas: null !== (_j = this._fightSoulDat) && void 0 !== _j ? _j : []
        };
        return dat;
      }
    };
    MapDrawRoom = __decorate([ ccclass ], MapDrawRoom);
    exports.default = MapDrawRoom;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawDoor": "MapDrawDoor",
    "./MapDrawEnemyRefresh": "MapDrawEnemyRefresh",
    "./MapDrawFightSoul": "MapDrawFightSoul",
    "./MapDrawLadder": "MapDrawLadder",
    "./MapDrawP": "MapDrawP",
    "./MapDrawSearchItem": "MapDrawSearchItem",
    "./MapDrawSurvive": "MapDrawSurvive",
    "./MapDrawUnitBase": "MapDrawUnitBase",
    "./MapLoader": "MapLoader"
  } ],
  MapDrawSearchItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a6dafr25TtHXak/2e8bSPf7", "MapDrawSearchItem");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawSearchItem = class MapDrawSearchItem extends MapDrawUnitBase_1.default {
      getType() {
        return mapTypes_1.UnitType.SearchPoint;
      }
      init(roomId) {
        this._roomCfgId = roomId;
      }
      getDat() {
        const dat = {
          roomId: this._roomCfgId,
          param: "",
          pos: this.getPos()
        };
        return dat;
      }
    };
    MapDrawSearchItem = __decorate([ ccclass ], MapDrawSearchItem);
    exports.default = MapDrawSearchItem;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawShip: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2b140pi+lxDQZv5BkFi3CRd", "MapDrawShip");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawDat_1 = require("./MapDrawDat");
    const MapDrawPortal_1 = require("./MapDrawPortal");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawShip = class MapDrawShip extends MapDrawPortal_1.default {
      start() {
        this._portalType = MapDrawDat_1.PortalType.Ship;
      }
    };
    MapDrawShip = __decorate([ ccclass ], MapDrawShip);
    exports.default = MapDrawShip;
    cc._RF.pop();
  }, {
    "./MapDrawDat": "MapDrawDat",
    "./MapDrawPortal": "MapDrawPortal"
  } ],
  MapDrawStone: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bac2b8FSHJPbIWIDdhwiruu", "MapDrawStone");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawStone = class MapDrawStone extends MapDrawUnitBase_1.default {
      getType() {
        return mapTypes_1.UnitType.Stone;
      }
      getDat() {
        const dat = {
          pos: this.getPos()
        };
        return dat;
      }
    };
    MapDrawStone = __decorate([ ccclass ], MapDrawStone);
    exports.default = MapDrawStone;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawSurvive: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f0ad5vL9LxAKo9DAYsvfVSg", "MapDrawSurvive");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawSurvive = class MapDrawSurvive extends MapDrawUnitBase_1.default {
      constructor() {
        super(...arguments);
        this.weight = 0;
      }
      getType() {
        return mapTypes_1.UnitType.SurviveDat;
      }
      init(dat) {
        this._roomCfgId = dat.roomId;
        this.weight = dat.weight;
      }
      getDat() {
        const dat = {
          roomId: this._roomCfgId,
          weight: this.weight,
          pos: this.getPos()
        };
        return dat;
      }
      setRoomId(roomId) {
        this._roomCfgId = roomId;
      }
      setWeight(weight) {
        this.weight = weight;
      }
    };
    MapDrawSurvive = __decorate([ ccclass ], MapDrawSurvive);
    exports.default = MapDrawSurvive;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapDrawUnitBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3fdcdS202NEg5h9XbqhuB1m", "MapDrawUnitBase");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const EditorSetting_1 = require("../editor/EditorSetting");
    const eventTypes_1 = require("../event/eventTypes");
    const EventManager_1 = require("../frameWork/EventManager");
    const ModeMgr_1 = require("../frameWork/ModeMgr");
    const MapTool_1 = require("../tool/MapTool");
    const mapTypes_1 = require("../type/mapTypes");
    const types_1 = require("../type/types");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapDrawUnitBase = class MapDrawUnitBase extends cc.Component {
      constructor() {
        super(...arguments);
        this._roomCfgId = 0;
      }
      onLoad() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
      }
      init(...params) {}
      getType() {
        return mapTypes_1.UnitType.Default;
      }
      getPos() {
        const worldPos = this.node.convertToWorldSpaceAR(cc.Vec2.ZERO).subtract(cc.Vec2.ZERO);
        const pos = MapTool_1.default.converWorldPosToMapPos(worldPos);
        const norm = v => Math.round(100 * v) / 100;
        return {
          x: norm(pos.x),
          y: norm(pos.y)
        };
      }
      updateRoomId(roomId) {
        this._roomCfgId = roomId;
      }
      getRoomId() {
        return this._roomCfgId;
      }
      onUnitLeftMouseDownForLink(_event) {
        return false;
      }
      onMouseDown(event) {
        if (event.target !== this.node) return;
        event.stopPropagation();
        if (event.getButton() === cc.Event.EventMouse.BUTTON_LEFT) {
          if (this.onUnitLeftMouseDownForLink(event)) return;
          if (ModeMgr_1.ModeMgr.instance.curModeType == types_1.ModeType.PathPointLink) return;
          const mousePos = cc.v3(event.getLocation());
          const dragOffset = this.node.position.sub(this.node.parent.convertToNodeSpaceAR(mousePos));
          const dragDat = {
            parent: this.node.parent,
            dragOffset: dragOffset,
            itemNode: this.node,
            mousePos: event.getLocation()
          };
          EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.DragItem, dragDat);
        }
      }
      getHoverBoxSize() {
        const size = this.node.getContentSize();
        const mapScale = EditorSetting_1.default.Instance.getMapScale();
        return {
          width: size.width * mapScale,
          height: size.height * mapScale
        };
      }
      getDat() {}
    };
    MapDrawUnitBase = __decorate([ ccclass ], MapDrawUnitBase);
    exports.default = MapDrawUnitBase;
    cc._RF.pop();
  }, {
    "../editor/EditorSetting": "EditorSetting",
    "../event/eventTypes": "eventTypes",
    "../frameWork/EventManager": "EventManager",
    "../frameWork/ModeMgr": "ModeMgr",
    "../tool/MapTool": "MapTool",
    "../type/mapTypes": "mapTypes",
    "../type/types": "types"
  } ],
  MapExporter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b2c3dTl9qeJAbze8jRWeJAS", "MapExporter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapLoader_1 = require("./MapLoader");
    class MapExporter {
      constructor() {
        this._mapLoaderComp = null;
        this._levelJson = null;
      }
      init(mapLoader, levelJson) {
        this._mapLoaderComp = mapLoader.getComponent(MapLoader_1.default);
        this._levelJson = levelJson;
      }
      save() {
        var _a;
        const json = null === (_a = this._mapLoaderComp) || void 0 === _a ? void 0 : _a.saveDat();
        if (!json) return;
        this.updateLevelJson(json);
        this.persistToDisk(json);
      }
      export() {
        var _a;
        const json = null === (_a = this._mapLoaderComp) || void 0 === _a ? void 0 : _a.saveDat();
        if (!json) return;
        this.updateLevelJson(json);
        this.persistToDisk(json);
        this.downloadJson();
      }
      updateLevelJson(json) {
        if (!this._levelJson) return;
        this._levelJson.json = JSON.parse(json);
      }
      persistToDisk(json) {
        var _a, _b, _c, _d;
        if (!this._levelJson) return;
        true, false;
        if ("undefined" !== typeof window.electronAPI) {
          console.log("\u5f00\u59cb\u4fdd\u5b58");
          const filePath = "D:/fork/myEditor/mapDat/mapDatTest.json";
          console.log("\u51c6\u5907\u5199\u5165\u6587\u4ef6:", filePath);
          console.log("window.electronAPI:", window.electronAPI);
          filePath && window.electronAPI.writeFile(filePath, json).then(() => console.log("Level JSON \u5df2\u4fdd\u5b58\uff1a", filePath)).catch(err => console.error("\u4fdd\u5b58\u5931\u8d25:", err));
        }
      }
      downloadJson(filename = "mapData.json") {
        var _a, _b;
        const json = JSON.stringify(null !== (_b = null === (_a = this._levelJson) || void 0 === _a ? void 0 : _a.json) && void 0 !== _b ? _b : {});
        const blob = new Blob([ json ], {
          type: "application/json"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
    exports.default = MapExporter;
    window.electronAPI = {
      writeFile: (filePath, content) => window.require("electron").ipcRenderer.invoke("write-file", filePath, content)
    };
    cc._RF.pop();
  }, {
    "./MapLoader": "MapLoader",
    fs: void 0,
    path: 1
  } ],
  MapInteraction: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1b2cPU5fZ4kKvN7xI0VniQ", "MapInteraction");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawRoom_1 = require("./MapDrawRoom");
    const MapDrawLadder_1 = require("./MapDrawLadder");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const EditorSetting_1 = require("../editor/EditorSetting");
    const MapLoader_1 = require("./MapLoader");
    const mapTypes_1 = require("../type/mapTypes");
    class MapInteraction {
      constructor() {
        this._mapLoader = null;
        this._mapLoaderComp = null;
      }
      init(mapLoader) {
        this._mapLoader = mapLoader;
        this._mapLoaderComp = mapLoader.getComponent(MapLoader_1.default);
      }
      getMapLoaderComp() {
        return this._mapLoaderComp;
      }
      getNodeLeftBottomWorld(node) {
        const size = node.getContentSize();
        const offset = cc.v2(-node.anchorX * size.width, -node.anchorY * size.height);
        return node.convertToWorldSpaceAR(offset);
      }
      buildHoverBoxForNode(hoverNd) {
        const controller = hoverNd.getComponent(MapDrawUnitBase_1.default);
        if (!controller) return null;
        const mapScale = EditorSetting_1.default.Instance.getMapScale();
        const offset = cc.v2(hoverNd.anchorX * hoverNd.getContentSize().width * mapScale, hoverNd.anchorY * hoverNd.getContentSize().height * mapScale);
        return {
          name: hoverNd.name,
          worldPos: hoverNd.convertToWorldSpaceAR(cc.Vec2.ZERO).clone().subtract(offset),
          width: controller.getHoverBoxSize().width,
          height: controller.getHoverBoxSize().height
        };
      }
      findLayerAtWorldPos(rect) {
        const layerCont = this._mapLoader.getChildByName("LayerCont");
        if (!layerCont) return null;
        let bestLayer = null;
        let maxArea = 0;
        for (const layerNd of layerCont.children) {
          if (!layerNd || !/^Layer\d+$/.test(layerNd.name)) continue;
          const mapScale = EditorSetting_1.default.Instance.getMapScale();
          const size = layerNd.getContentSize();
          const offset = cc.v2(layerNd.anchorX * size.width * mapScale, layerNd.anchorY * size.height * mapScale);
          const worldPos = layerNd.convertToWorldSpaceAR(cc.Vec2.ZERO).clone().subtract(offset);
          const width = size.width * mapScale;
          const height = size.height * mapScale;
          const boxRect = new cc.Rect(worldPos.x, worldPos.y, width, height);
          const interRect = this.getIntersection(rect, boxRect);
          if (!interRect) continue;
          const area = interRect.width * interRect.height;
          if (area > maxArea) {
            maxArea = area;
            bestLayer = layerNd;
          }
        }
        return bestLayer;
      }
      findRoomAtWorldPos(rect) {
        const roomList = this._mapLoader.getComponentsInChildren(MapDrawRoom_1.default);
        let bestRoom;
        let maxArea = 0;
        for (const room of roomList) {
          const box = room.getHoverBoxSize();
          const worldPos = room.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          const boxRect = new cc.Rect(worldPos.x, worldPos.y, box.width, box.height);
          const interRect = this.getIntersection(rect, boxRect);
          if (!interRect) continue;
          const area = interRect.width * interRect.height;
          if (area > maxArea) {
            maxArea = area;
            bestRoom = room;
          }
        }
        return bestRoom;
      }
      getIntersection(a, b) {
        const xMin = Math.max(a.xMin, b.xMin);
        const yMin = Math.max(a.yMin, b.yMin);
        const xMax = Math.min(a.xMax, b.xMax);
        const yMax = Math.min(a.yMax, b.yMax);
        if (xMax >= xMin && yMax >= yMin) return new cc.Rect(xMin, yMin, xMax - xMin, yMax - yMin);
        return null;
      }
      updateDragRoomHover(dragDat, hoverDat, hoverDrawer) {
        if (!dragDat) return {
          hoverRoomName: "",
          hoverLayerName: ""
        };
        const result = {
          hoverRoomName: "",
          hoverLayerName: ""
        };
        const draggedRoom = dragDat.itemNode.getComponent(MapDrawRoom_1.default);
        if (draggedRoom) {
          dragDat.hoverRoomId = draggedRoom.getRoomCfgId();
          dragDat.hoverRoomName = draggedRoom.node.name;
          const box = draggedRoom.getHoverBoxSize();
          const worldPos = this.getNodeLeftBottomWorld(draggedRoom.node);
          const rect = new cc.Rect(worldPos.x, worldPos.y, box.width, box.height);
          const layerNd = this.findLayerAtWorldPos(rect);
          if (!layerNd) {
            dragDat.hoverLayerNode = void 0;
            dragDat.hoverLayerName = void 0;
            return result;
          }
          dragDat.hoverLayerNode = layerNd;
          dragDat.hoverLayerName = layerNd.name;
          result.hoverRoomName = layerNd.name;
          const mapScale = EditorSetting_1.default.Instance.getMapScale();
          const size = layerNd.getContentSize();
          const offset = cc.v2(layerNd.anchorX * size.width * mapScale, layerNd.anchorY * size.height * mapScale);
          hoverDat.name = layerNd.name;
          hoverDat.worldPos = layerNd.convertToWorldSpaceAR(cc.Vec2.ZERO).clone().subtract(offset);
          hoverDat.width = size.width * mapScale;
          hoverDat.height = size.height * mapScale;
          null === hoverDrawer || void 0 === hoverDrawer ? void 0 : hoverDrawer.draw(hoverDat);
          return result;
        }
        dragDat.hoverLayerNode = void 0;
        dragDat.hoverLayerName = void 0;
        const base = dragDat.itemNode.getComponent(MapDrawUnitBase_1.default);
        if (!base) return result;
        const box = base.getHoverBoxSize();
        const worldPos = this.getNodeLeftBottomWorld(base.node);
        const rect = new cc.Rect(worldPos.x, worldPos.y, box.width, box.height);
        const room = this.findRoomAtWorldPos(rect);
        if (!room) return result;
        const roomNd = room.node;
        result.hoverRoomName = roomNd.name;
        dragDat.hoverRoomId = room.getRoomCfgId();
        dragDat.hoverRoomName = roomNd.name;
        const mapScale = EditorSetting_1.default.Instance.getMapScale();
        const size = roomNd.getContentSize();
        const offset = cc.v2(roomNd.anchorX * size.width * mapScale, roomNd.anchorY * size.height * mapScale);
        hoverDat.name = roomNd.name;
        hoverDat.worldPos = roomNd.convertToWorldSpaceAR(cc.Vec2.ZERO).clone().subtract(offset);
        hoverDat.width = size.width * mapScale;
        hoverDat.height = size.height * mapScale;
        null === hoverDrawer || void 0 === hoverDrawer ? void 0 : hoverDrawer.draw(hoverDat);
        return result;
      }
      clearDragHover(dragDat, hoverDat, hoverDrawer) {
        if (dragDat) {
          dragDat.hoverRoomId = void 0;
          dragDat.hoverRoomName = void 0;
          dragDat.hoverLayerNode = void 0;
          dragDat.hoverLayerName = void 0;
        }
        hoverDat.name = "";
        null === hoverDrawer || void 0 === hoverDrawer ? void 0 : hoverDrawer.clear();
        return "";
      }
      setNodeWorldPos(node, worldPos) {
        if (!node || !node.parent) return;
        node.setPosition(node.parent.convertToNodeSpaceAR(worldPos));
      }
      syncBindPointsByLadder(ladderCom) {
        var _a, _b, _c, _d;
        if (!ladderCom || !cc.isValid(ladderCom.node)) return;
        const binds = ladderCom.bindPoints || [];
        if (binds.length < 2) return;
        const p0 = binds[0];
        const p1 = binds[1];
        if (!p0 || !p1 || !cc.isValid(p0) || !cc.isValid(p1)) return;
        const h = ladderCom.node.getContentSize().height;
        const anchorY = null !== (_a = ladderCom.node.anchorY) && void 0 !== _a ? _a : 0;
        const bottomLocalY = -anchorY * h;
        const topLocalY = (1 - anchorY) * h;
        const w0 = ladderCom.node.convertToWorldSpaceAR(cc.v2(0, bottomLocalY));
        const w1 = ladderCom.node.convertToWorldSpaceAR(cc.v2(0, topLocalY));
        this.setNodeWorldPos(p0, w0);
        this.setNodeWorldPos(p1, w1);
        null === (_b = this._mapLoaderComp) || void 0 === _b ? void 0 : _b.movePathPointToRoomByWorldPos(p0, w0, false);
        null === (_c = this._mapLoaderComp) || void 0 === _c ? void 0 : _c.movePathPointToRoomByWorldPos(p1, w1, false);
        null === (_d = this._mapLoaderComp) || void 0 === _d ? void 0 : _d.rebuildPointIdsByLayer();
      }
      syncLadderToBindPoints(ladderCom) {
        var _a;
        if (!ladderCom || !cc.isValid(ladderCom.node)) return;
        const binds = ladderCom.bindPoints || [];
        if (binds.length < 2) return;
        const p0 = binds[0];
        const p1 = binds[1];
        if (!p0 || !p1 || !cc.isValid(p0) || !cc.isValid(p1)) return;
        const w0 = p0.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const w1 = p1.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const mapScale = EditorSetting_1.default.Instance.getMapScale();
        const heightWorld = Math.max(1, w1.y - w0.y);
        const heightLocal = Math.max(1, heightWorld / Math.max(1e-4, mapScale));
        const anchorY = null !== (_a = ladderCom.node.anchorY) && void 0 !== _a ? _a : 0;
        const anchorWorld = cc.v2(w0.x, w0.y + anchorY * heightWorld);
        this.setNodeWorldPos(ladderCom.node, anchorWorld);
        const curSize = ladderCom.node.getContentSize();
        ladderCom.node.setContentSize(curSize.width, heightLocal);
      }
      syncLadderWithDraggedNode(draggedNode, isShiftDown) {
        if (!draggedNode || !cc.isValid(draggedNode)) return;
        const draggedLadder = draggedNode.getComponent(MapDrawLadder_1.default);
        if (draggedLadder) {
          this.syncBindPointsByLadder(draggedLadder);
          if (isShiftDown) {
            const binds = draggedLadder.bindPoints || [];
            binds[0] && this.trySnapDraggedPointY(binds[0]);
            binds[1] && this.trySnapDraggedPointY(binds[1]);
            this.syncLadderToBindPoints(draggedLadder);
          }
          return;
        }
        const draggedPoint = draggedNode.getComponent(MapDrawP_1.default);
        if (!draggedPoint || !this._mapLoader) return;
        const ladders = this._mapLoader.getComponentsInChildren(MapDrawLadder_1.default);
        ladders.forEach(ladderCom => {
          const binds = ladderCom.bindPoints || [];
          binds.indexOf(draggedNode) >= 0 && this.syncLadderToBindPoints(ladderCom);
        });
      }
      trySnapDraggedPointY(draggedNode) {
        if (!draggedNode || !cc.isValid(draggedNode)) return;
        const draggedPointCom = draggedNode.getComponent(MapDrawP_1.default);
        if (!draggedPointCom) return;
        const layerNd = this.findLayerByRoomCfgId(draggedPointCom.getRoomId());
        if (!layerNd) return;
        const pointNodes = layerNd.getComponentsInChildren(MapDrawP_1.default).map(p => p.node).filter(nd => !!nd && cc.isValid(nd)).sort((a, b) => a.convertToWorldSpaceAR(cc.Vec2.ZERO).x - b.convertToWorldSpaceAR(cc.Vec2.ZERO).x);
        const draggedName = draggedNode.name || "";
        const m = /^P(\d+)_(\d+)$/.exec(draggedName);
        if (!m) return;
        const draggedNo = Number(m[2]);
        if (!isFinite(draggedNo)) return;
        let leftNd = null;
        let rightNd = null;
        let leftNo = Number.NEGATIVE_INFINITY;
        let rightNo = Number.POSITIVE_INFINITY;
        pointNodes.forEach(nd => {
          const name = (null === nd || void 0 === nd ? void 0 : nd.name) || "";
          const mm = /^P(\d+)_(\d+)$/.exec(name);
          if (!mm) return;
          const no = Number(mm[2]);
          if (!isFinite(no)) return;
          if (no < draggedNo && no > leftNo) {
            leftNo = no;
            leftNd = nd;
          }
          if (no > draggedNo && no < rightNo) {
            rightNo = no;
            rightNd = nd;
          }
        });
        const refNd = leftNd || rightNd;
        if (!refNd) return;
        const curWorld = draggedNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const refWorld = refNd.convertToWorldSpaceAR(cc.Vec2.ZERO);
        this.setNodeWorldPos(draggedNode, cc.v2(curWorld.x, refWorld.y));
      }
      findLayerByNode(node) {
        let cur = node;
        while (cur) {
          if (/^Layer\d+$/.test(cur.name || "")) return cur;
          cur = cur.parent;
        }
        return null;
      }
      findLayerByRoomCfgId(roomId) {
        if (!isFinite(roomId) || !this._mapLoader) return null;
        const rooms = this._mapLoader.getComponentsInChildren(MapDrawRoom_1.default);
        const room = rooms.find(r => r && r.getRoomId() === roomId);
        if (!room || !room.node) return null;
        return this.findLayerByNode(room.node);
      }
      getPathLinkWorldSegmentsForRoom(roomCfgId) {
        var _a, _b;
        return null !== (_b = null === (_a = this._mapLoaderComp) || void 0 === _a ? void 0 : _a.getPathLinkWorldSegmentsForRoom(roomCfgId)) && void 0 !== _b ? _b : [];
      }
      getPathLinkWorldSegmentsFromPoint(pointNode) {
        var _a, _b;
        return null !== (_b = null === (_a = this._mapLoaderComp) || void 0 === _a ? void 0 : _a.getPathLinkWorldSegmentsFromPoint(pointNode)) && void 0 !== _b ? _b : [];
      }
      isOutRoomUnitType(type) {
        return [ mapTypes_1.UnitType.Portal, mapTypes_1.UnitType.Cable, mapTypes_1.UnitType.Stone ].includes(type);
      }
    }
    exports.default = MapInteraction;
    cc._RF.pop();
  }, {
    "../editor/EditorSetting": "EditorSetting",
    "../type/mapTypes": "mapTypes",
    "./MapDrawLadder": "MapDrawLadder",
    "./MapDrawP": "MapDrawP",
    "./MapDrawRoom": "MapDrawRoom",
    "./MapDrawUnitBase": "MapDrawUnitBase",
    "./MapLoader": "MapLoader"
  } ],
  MapLineDrawer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e5f6ae4ydASNO+rVniQEjRW", "MapLineDrawer");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("./MapDrawP");
    class MapLineDrawer {
      constructor() {
        this._drawer = null;
        this._lineColor = new cc.Color(255, 220, 60, 220);
        this._lineWidth = 5;
      }
      init(getPointMap, getLineContainer) {
        this._getPointMap = getPointMap;
        this._getLineContainer = getLineContainer;
      }
      setLineStyle(color, width) {
        this._lineColor = color;
        this._lineWidth = width;
      }
      refresh() {
        const lineCont = this._getLineContainer();
        if (!lineCont || !cc.isValid(lineCont)) return;
        if (!this._drawer) {
          this._drawer = lineCont.getComponent(cc.Graphics);
          this._drawer || (this._drawer = lineCont.addComponent(cc.Graphics));
          this._drawer.lineWidth = this._lineWidth;
          this._drawer.strokeColor = this._lineColor;
        }
        this._drawer.clear();
        const pointMap = this._getPointMap();
        if (0 === pointMap.size) return;
        const drawn = new Set();
        pointMap.forEach(pointNd => {
          if (!pointNd || !cc.isValid(pointNd)) return;
          const pointCom = pointNd.getComponent(MapDrawP_1.default);
          if (!pointCom) return;
          const fromId = pointCom.getId();
          const fromWorld = pointNd.convertToWorldSpaceAR(cc.Vec2.ZERO);
          const fromLocal = lineCont.convertToNodeSpaceAR(fromWorld);
          const links = pointCom.links || [];
          links.forEach(toNd => {
            if (!toNd || !cc.isValid(toNd)) return;
            const toCom = toNd.getComponent(MapDrawP_1.default);
            if (!toCom) return;
            const toId = toCom.getId();
            if (!fromId || !toId || fromId === toId) return;
            const edgeKey = fromId < toId ? `${fromId}->${toId}` : `${toId}->${fromId}`;
            if (drawn.has(edgeKey)) return;
            drawn.add(edgeKey);
            const toWorld = toNd.convertToWorldSpaceAR(cc.Vec2.ZERO);
            const toLocal = lineCont.convertToNodeSpaceAR(toWorld);
            this._drawer.moveTo(fromLocal.x, fromLocal.y);
            this._drawer.lineTo(toLocal.x, toLocal.y);
          });
        });
        this._drawer.stroke();
      }
      clear() {
        this._drawer && this._drawer.clear();
      }
      getPathLinkWorldSegmentsForRoom(ownerCfgId) {
        const out = [];
        const seen = new Set();
        const pointMap = this._getPointMap();
        pointMap.forEach(nodeA => {
          if (!nodeA || !cc.isValid(nodeA)) return;
          const compA = nodeA.getComponent(MapDrawP_1.default);
          if (!compA) return;
          const ra = compA.getRoomId();
          const links = compA.links || [];
          for (let i = 0; i < links.length; i++) {
            const nodeB = links[i];
            if (!nodeB || !cc.isValid(nodeB)) continue;
            const compB = nodeB.getComponent(MapDrawP_1.default);
            if (!compB) continue;
            const rb = compB.getRoomId();
            const owner = Math.min(ra, rb);
            if (owner !== ownerCfgId) continue;
            const ida = compA.getId();
            const idb = compB.getId();
            const key = ida < idb ? `${ida}_${idb}` : `${idb}_${ida}`;
            if (seen.has(key)) continue;
            seen.add(key);
            out.push({
              p0: nodeA.convertToWorldSpaceAR(cc.Vec2.ZERO),
              p1: nodeB.convertToWorldSpaceAR(cc.Vec2.ZERO)
            });
          }
        });
        return out;
      }
      getPathLinkWorldSegmentsFromPoint(pointNode) {
        if (!pointNode || !cc.isValid(pointNode)) return [];
        const comp = pointNode.getComponent(MapDrawP_1.default);
        if (!comp) return [];
        const w0 = pointNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const out = [];
        const links = comp.links || [];
        for (let i = 0; i < links.length; i++) {
          const nodeB = links[i];
          if (!nodeB || !cc.isValid(nodeB)) continue;
          out.push({
            p0: w0.clone(),
            p1: nodeB.convertToWorldSpaceAR(cc.Vec2.ZERO)
          });
        }
        return out;
      }
    }
    exports.default = MapLineDrawer;
    cc._RF.pop();
  }, {
    "./MapDrawP": "MapDrawP"
  } ],
  MapLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d9303X/othP+ZzAfNkEQool", "MapLoader");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var MapLoader_1;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const EditorSetting_1 = require("../editor/EditorSetting");
    const eventTypes_1 = require("../event/eventTypes");
    const EventManager_1 = require("../frameWork/EventManager");
    const MapDrawLadder_1 = require("./MapDrawLadder");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawRoom_1 = require("./MapDrawRoom");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    const MapTool_1 = require("../tool/MapTool");
    const mapTypes_1 = require("../type/mapTypes");
    const MapSerializer_1 = require("./MapSerializer");
    const MapLineDrawer_1 = require("./MapLineDrawer");
    const MapBuilder_1 = require("./MapBuilder");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let MapLoader = MapLoader_1 = class MapLoader extends cc.Component {
      constructor() {
        super(...arguments);
        this.defaultSp = null;
        this.roomPrefab = null;
        this.pathPointPrefab = null;
        this.ladderPrefab = null;
        this.doorPrefab = null;
        this.searchItemPrefab = null;
        this.enemyRefreshPrefab = null;
        this.survivePrefab = null;
        this.fightSoulPrefab = null;
        this.defaultPortalPrefab = null;
        this.portalPrefab = null;
        this.shipPrefab = null;
        this.cablePrefab = null;
        this.stonePrefab = null;
        this._layerCont = null;
        this._outRoomUnitCont = null;
        this._playerCreateNd = null;
        this._playerExitNd = null;
        this._pointLineCont = null;
        this._layerNodeMap = new Map();
        this._roomNodeMap = new Map();
        this._roomUidMap = new Map();
        this._pointMap = new Map();
        this._size = null;
        this._areaInfo = [];
        this._fileName = "";
        this._mapSerializer = null;
        this._mapLineDrawer = null;
        this._mapBuilder = null;
      }
      onLoad() {
        MapLoader_1.ins = this;
        this._mapSerializer = new MapSerializer_1.default();
        this._mapSerializer.init({
          getPathPoints: () => this._pointMap,
          getRoomNodes: () => this._roomNodeMap,
          getOutRoomUnits: () => this._outRoomUnitCont,
          getPlayerCreate: () => this._playerCreateNd,
          getPlayerExit: () => this._playerExitNd,
          getAreaInfo: () => this._areaInfo,
          getSize: () => this._size
        });
        this._mapLineDrawer = new MapLineDrawer_1.default();
        this._mapLineDrawer.init(() => this._pointMap, () => this._pointLineCont);
        this._mapBuilder = new MapBuilder_1.default();
        this._mapBuilder.init(this, {
          defaultSp: this.defaultSp,
          roomPrefab: this.roomPrefab,
          pathPointPrefab: this.pathPointPrefab,
          ladderPrefab: this.ladderPrefab,
          doorPrefab: this.doorPrefab,
          searchItemPrefab: this.searchItemPrefab,
          enemyRefreshPrefab: this.enemyRefreshPrefab,
          survivePrefab: this.survivePrefab,
          fightSoulPrefab: this.fightSoulPrefab,
          defaultPortalPrefab: this.defaultPortalPrefab,
          portalPrefab: this.portalPrefab,
          shipPrefab: this.shipPrefab,
          cablePrefab: this.cablePrefab,
          stonePrefab: this.stonePrefab
        });
      }
      build(json, size) {
        if (!json) return;
        this._size = size;
        this._fileName = json.name;
        this.node.removeAllChildren();
        this.clearMaps();
        this.createContainers();
        this._mapBuilder.build(json, {
          layerCont: this._layerCont,
          outRoomUnitCont: this._outRoomUnitCont,
          playerCreate: this._playerCreateNd,
          playerExit: this._playerExitNd
        });
      }
      createContainers() {
        this._layerCont = new cc.Node("LayerCont");
        this._layerCont.parent = this.node;
        this._outRoomUnitCont = new cc.Node("outRoomUnitCont");
        this._outRoomUnitCont.parent = this.node;
        this._playerCreateNd = new cc.Node("playerCreate");
        this._playerCreateNd.parent = this.node;
        this._playerExitNd = new cc.Node("playerExit");
        this._playerExitNd.parent = this.node;
        this._pointLineCont = new cc.Node("pointLineCont");
        this._pointLineCont.group = "pathPoint";
        this._pointLineCont.parent = this.node;
      }
      clearMaps() {
        this._roomNodeMap.clear();
        this._roomUidMap.clear();
        this._pointMap.clear();
        this._layerNodeMap.clear();
        this._areaInfo = [];
      }
      initRoom(cfgId, roomDat, color, uid, unlockPointIds) {
        const roomNd = this._roomNodeMap.get(cfgId);
        if (!roomNd) return;
        const mapDrawRoom = roomNd.addComponentSafe(MapDrawRoom_1.default);
        mapDrawRoom.init(roomDat, color);
        uid && this._roomUidMap.set(uid, roomNd);
        mapDrawRoom.unLockPoints = unlockPointIds.map(id => this._pointMap.get(id)).filter(Boolean);
      }
      update() {
        var _a;
        null === (_a = this._mapLineDrawer) || void 0 === _a ? void 0 : _a.refresh();
      }
      registerRoomNode(cfgId, roomNd) {
        if (!roomNd) return;
        this._roomNodeMap.set(cfgId, roomNd);
        const roomCom = roomNd.getComponent(MapDrawRoom_1.default);
        if (roomCom) {
          const uid = roomCom.getUid();
          uid && this._roomUidMap.set(uid, roomNd);
        }
      }
      registerRoomUid(uid, roomNd) {
        this._roomUidMap.set(uid, roomNd);
      }
      registerPoint(id, pointNd) {
        this._pointMap.set(id, pointNd);
      }
      getRoomNodeByUid(uid) {
        return this._roomUidMap.get(uid);
      }
      renameRoomNode(oldCfgId, newCfgId, roomNd) {
        if (!roomNd) return;
        oldCfgId !== newCfgId && this._roomNodeMap.delete(oldCfgId);
        this._roomNodeMap.set(newCfgId, roomNd);
      }
      updatePointMap(pointId, pointNd) {
        if (this._pointMap.has(pointId)) return;
        this._pointMap.set(pointId, pointNd);
      }
      addRoomToLayer(roomNd, layer) {
        let layerNd = this._layerNodeMap.get(layer);
        if (!layerNd) {
          layerNd = new cc.Node(`Layer${layer}`);
          layerNd.parent = this._layerCont;
          this._layerNodeMap.set(layer, layerNd);
        }
        const worldAnchor = roomNd.convertToWorldSpaceAR(cc.Vec2.ZERO);
        roomNd.parent = layerNd;
        roomNd.setPosition(layerNd.convertToNodeSpaceAR(worldAnchor));
      }
      reorderLayerNames(mapNo, layerNd) {
        if (!layerNd || !cc.isValid(layerNd)) return [];
        const m = /^Layer(\d+)$/.exec(layerNd.name);
        if (!m) return [];
        const layerNo = Number(m[1]);
        if (!isFinite(layerNo)) return [];
        const rooms = layerNd.children.map(nd => null === nd || void 0 === nd ? void 0 : nd.getComponent(MapDrawRoom_1.default)).filter(r => !!r && cc.isValid(r.node)).sort((a, b) => {
          const ax = a.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
          const bx = b.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
          return ax - bx;
        });
        rooms.forEach((r, index) => {
          const roomNo = index + 1;
          const renamedId = 100 * mapNo + 10 * (layerNo - 1) + roomNo;
          const controller = r.node.getComponent(MapDrawRoom_1.default);
          if (EditorSetting_1.default.Instance.getAutoRename()) {
            this.renameRoomNode(controller.getRoomId(), renamedId, r.node);
            controller.updateRoomId(renamedId);
          }
        });
        return rooms;
      }
      createLayerForRoomDrop(worldY, defaultHeight = 320) {
        if (!this._layerCont) return null;
        const existing = Array.from(this._layerNodeMap.entries()).map(([no, node]) => ({
          no: no,
          node: node
        })).filter(it => it.node && cc.isValid(it.node));
        let insertNo = 1;
        if (existing.length > 0) {
          const byBottom = existing.map(it => Object.assign(Object.assign({}, it), {
            bottomY: it.node.convertToWorldSpaceAR(cc.Vec2.ZERO).y
          })).sort((a, b) => a.bottomY - b.bottomY);
          insertNo = byBottom.length + 1;
          for (let i = 0; i < byBottom.length; i++) if (worldY < byBottom[i].bottomY) {
            insertNo = i + 1;
            break;
          }
        }
        existing.sort((a, b) => b.no - a.no).forEach(({no: no, node: node}) => {
          if (no < insertNo) return;
          const newNo = no + 1;
          node.name = `Layer${newNo}`;
          this._layerNodeMap.delete(no);
          this._layerNodeMap.set(newNo, node);
          this.syncLayerRoomIds(node, newNo);
        });
        const layerNd = new cc.Node(`Layer${insertNo}`);
        layerNd.parent = this._layerCont;
        layerNd.setAnchorPoint(0, 0);
        this._layerNodeMap.set(insertNo, layerNd);
        const mapWidth = MapTool_1.default.getSize().x;
        layerNd.setContentSize(Math.max(1, mapWidth), Math.max(1, defaultHeight));
        const mapLeftWorld = mapWidth > 0 ? this.node.convertToWorldSpaceAR(cc.v2(-mapWidth / 2, 0)).x : layerNd.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
        const targetBottomY = worldY - .5 * defaultHeight;
        const worldAnchor = cc.v2(mapLeftWorld, targetBottomY);
        const localPos = this._layerCont.convertToNodeSpaceAR(worldAnchor);
        layerNd.setPosition(localPos);
        this.rebuildPointIdsByLayer();
        return layerNd;
      }
      syncLayerRoomIds(layerNd, newLayerNo) {
        layerNd.children.forEach(roomNd => {
          if (!roomNd) return;
          const roomCom = roomNd.getComponent(MapDrawRoom_1.default);
          if (!roomCom) return;
          roomCom.changeLayer(newLayerNo);
          if (EditorSetting_1.default.Instance.getAutoRename()) {
            const oldId = roomCom.getRoomCfgId();
            const oldMapNo = Math.floor(oldId / 100);
            const roomNo = oldId - 100 * oldMapNo - 10 * (newLayerNo - 1);
            const newCfgId = 100 * oldMapNo + 10 * (newLayerNo - 1) + roomNo;
            roomCom.updateRoomId(newCfgId);
            this.renameRoomNode(oldId, newCfgId, roomNd);
          }
        });
      }
      refreshLayerBoundsByNode(layerNd) {
        this.updateLayerBounds(layerNd);
      }
      updateAllLayerBounds() {
        if (!this._layerCont) return;
        this._layerCont.children.forEach(layerNd => {
          this.updateLayerBounds(layerNd);
        });
      }
      updateLayerBounds(layerNd) {
        if (!layerNd || !/^Layer\d+$/.test(layerNd.name)) return;
        const roomNds = layerNd.children;
        if (!roomNds || 0 === roomNds.length) return;
        let yMin = Number.POSITIVE_INFINITY;
        let yMax = Number.NEGATIVE_INFINITY;
        const childWorldPosMap = new Map();
        const mapScale = EditorSetting_1.default.Instance.getMapScale();
        roomNds.forEach(roomNd => {
          if (!roomNd) return;
          const worldAnchor = roomNd.convertToWorldSpaceAR(cc.Vec2.ZERO);
          const size = roomNd.getContentSize();
          yMin = Math.min(yMin, worldAnchor.y);
          yMax = Math.max(yMax, worldAnchor.y + size.height * mapScale);
          childWorldPosMap.set(roomNd, worldAnchor);
        });
        const mapWidth = MapTool_1.default.getSize().x;
        const width = Math.max(1, mapWidth);
        const height = Math.max(1, (yMax - yMin) / mapScale);
        layerNd.setAnchorPoint(0, 0);
        layerNd.setContentSize(width, height);
        const prevWorldAnchor = layerNd.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const mapLeftWorld = mapWidth > 0 ? this.node.convertToWorldSpaceAR(cc.v2(-mapWidth / 2, 0)).x : prevWorldAnchor.x;
        const newLayerWorldAnchor = cc.v2(mapLeftWorld, yMin);
        const newLayerLocalPos = this._layerCont.convertToNodeSpaceAR(newLayerWorldAnchor);
        layerNd.setPosition(newLayerLocalPos);
        childWorldPosMap.forEach((worldAnchorPos, childNd) => {
          const newLocal = layerNd.convertToNodeSpaceAR(worldAnchorPos);
          childNd.setPosition(newLocal);
        });
      }
      cleanupEmptyLayersAfterMove() {
        if (!this._layerCont) return;
        let hasDelete = false;
        this._layerCont.children.forEach(layerNd => {
          if (!layerNd || !cc.isValid(layerNd)) return;
          if (!/^Layer\d+$/.test(layerNd.name || "")) return;
          if (layerNd.childrenCount > 0) return;
          const m = /^Layer(\d+)$/.exec(layerNd.name || "");
          m && this._layerNodeMap.delete(Number(m[1]));
          layerNd.removeFromParent();
          layerNd.destroy();
          hasDelete = true;
        });
        hasDelete && this.scheduleOnce(() => this.compactLayersAfterDelete(), 0);
      }
      compactLayersAfterDelete() {
        if (!this._layerCont) return;
        const layerList = [];
        this._layerCont.children.forEach(nd => {
          if (!nd || !cc.isValid(nd)) return;
          const m = /^Layer(\d+)$/.exec(nd.name || "");
          if (!m) return;
          const no = Number(m[1]);
          if (isNaN(no)) return;
          layerList.push({
            no: no,
            node: nd
          });
        });
        if (0 === layerList.length) {
          this._layerNodeMap.clear();
          return;
        }
        layerList.sort((a, b) => a.no - b.no);
        this._layerNodeMap.clear();
        layerList.forEach((item, idx) => {
          const newNo = idx + 1;
          item.node.name = `Layer${newNo}`;
          this._layerNodeMap.set(newNo, item.node);
          this.syncLayerRoomIds(item.node, newNo);
        });
        this._layerNodeMap.forEach(layerNd => this.updateLayerBounds(layerNd));
        this.rebuildPointIdsByLayer();
      }
      syncRoomNameAndIdForLayer(roomCom, newLayerNd, oldLayerNd, mapName) {
        if (!roomCom || !newLayerNd) return;
        const mapNoMatch = /(\d+)$/.exec(mapName);
        const mapNo = mapNoMatch ? Number(mapNoMatch[1]) : 0;
        const layerMatch = /^Layer(\d+)$/.exec(newLayerNd.name);
        if (!layerMatch) return;
        const layer = Number(layerMatch[1]);
        if (!isFinite(layer)) return;
        const oldCfgId = roomCom.getRoomCfgId();
        const isNewRoom = 0 == oldCfgId;
        const uid = roomCom.getUid();
        let newCfgId = Number(uid.split("_")[0]);
        if (EditorSetting_1.default.Instance.getAutoRename()) {
          const newLayerRooms = this.reorderLayerNames(mapNo, newLayerNd);
          oldLayerNd && oldLayerNd !== newLayerNd && this.reorderLayerNames(mapNo, oldLayerNd);
          const idx = newLayerRooms.findIndex(r => r === roomCom);
          if (idx < 0) return;
          const newRoomNo = idx + 1;
          newCfgId = 100 * mapNo + 10 * (layer - 1) + newRoomNo;
        }
        if (isNewRoom) {
          const worldPos = roomCom.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
          const size = roomCom.node.getContentSize();
          const roomDat = {
            uid: uid,
            isManualSet: false,
            cfgId: newCfgId,
            layer: layer,
            pos: {
              x: worldPos.x,
              y: worldPos.y
            },
            size: {
              width: size.width,
              height: size.height
            },
            pathPointIds: [],
            unlockPointIds: [],
            doors: [],
            ladders: [],
            enemyRefreshDatas: [],
            enemyCreateDatas: [],
            baseItemDatas: [],
            searchItemDatas: [],
            survivorDatas: [],
            fightSoulDatas: []
          };
          let color = cc.Color.WHITE;
          const bgNd = roomCom.node.getChildByName("bg");
          bgNd && (color = bgNd.color);
          roomCom.init(roomDat, color);
        } else {
          const isManuallySet = roomCom.getManulSet();
          isManuallySet || roomCom.updateRoomId(newCfgId);
        }
        this.renameRoomNode(oldCfgId, newCfgId, roomCom.node);
      }
      addPathPointToRoom(pData, pointNd) {
        this._pointMap.set(pData.id, pointNd);
        const roomNd = this._roomNodeMap.get(pData.roomId);
        if (!roomNd) {
          console.log(`roomId ${pData.roomId} not found`);
          return;
        }
        pointNd.parent = roomNd.getChildByName("pointCont");
        const worldPos = cc.v2(pData.pos.x, pData.pos.y);
        const localPos = pointNd.parent.convertToNodeSpaceAR(worldPos);
        pointNd.setPosition(localPos);
      }
      rebuildPointIdsByLayer() {
        if (!this._layerCont) return;
        const layerItems = [];
        this._layerCont.children.forEach(layerNd => {
          if (!layerNd || !cc.isValid(layerNd)) return;
          const m = /^Layer(\d+)$/.exec(layerNd.name || "");
          if (!m) return;
          const no = Number(m[1]);
          if (!isFinite(no)) return;
          layerItems.push({
            no: no,
            node: layerNd
          });
        });
        layerItems.sort((a, b) => a.no - b.no);
        const nextPointMap = new Map();
        layerItems.forEach(({no: no, node: layerNd}) => {
          const layerIndex = Math.max(0, no - 1);
          let localId = 0;
          const sortedRooms = layerNd.children.filter(roomNd => !!roomNd && cc.isValid(roomNd)).sort((a, b) => {
            const ax = a.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
            const bx = b.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
            return ax - bx;
          });
          sortedRooms.forEach(roomNd => {
            if (!roomNd || !cc.isValid(roomNd)) return;
            const roomCom = roomNd.getComponent(MapDrawRoom_1.default);
            if (!roomCom) return;
            const points = (roomCom.getPoints() || []).filter(pointCom => !!pointCom && cc.isValid(pointCom.node)).sort((a, b) => {
              const ax = a.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
              const bx = b.node.convertToWorldSpaceAR(cc.Vec2.ZERO).x;
              return ax - bx;
            });
            points.forEach(pointCom => {
              if (!pointCom || !cc.isValid(pointCom.node)) return;
              const newPid = `P${layerIndex}_${localId++}`;
              pointCom.setId(newPid);
              nextPointMap.set(newPid, pointCom.node);
            });
            roomCom.refreshDat();
          });
        });
        this._pointMap = nextPointMap;
      }
      resolvePathPointNodes(ids) {
        if (Array.isArray(ids)) return (ids || []).map(id => this._pointMap.get(id)).filter(nd => !!nd && cc.isValid(nd));
        {
          const point = this._pointMap.get(ids);
          return point ? [ point ] : [];
        }
      }
      moveUnitToRoom(unitNode, targetRoomId, rebuildIds = true) {
        var _a;
        if (!unitNode || !cc.isValid(unitNode)) return false;
        if (!isFinite(targetRoomId)) return false;
        const unitCom = unitNode.getComponent(MapDrawUnitBase_1.default);
        if (!unitCom) return false;
        const targetRoomNd = this._roomNodeMap.get(targetRoomId);
        if (!targetRoomNd || !cc.isValid(targetRoomNd)) return false;
        const isPoint = unitCom.getType() == mapTypes_1.UnitType.PathPoint;
        const parentName = isPoint ? "pointCont" : "unitCont";
        const targetPointCont = targetRoomNd.getChildByName(parentName);
        if (!targetPointCont || !cc.isValid(targetPointCont)) return false;
        const prevParent = unitNode.parent;
        unitCom.updateRoomId(targetRoomId);
        if (prevParent === targetPointCont) {
          const targetRoomCom = targetRoomNd.getComponent(MapDrawRoom_1.default);
          null === targetRoomCom || void 0 === targetRoomCom ? void 0 : targetRoomCom.refreshDat();
          return true;
        }
        const prevWorldPos = unitNode.convertToWorldSpaceAR(cc.Vec2.ZERO);
        const oldOwnerRoom = this.findOwnerRoomByNode(prevParent);
        unitNode.parent = targetPointCont;
        unitNode.setPosition(targetPointCont.convertToNodeSpaceAR(prevWorldPos));
        null === oldOwnerRoom || void 0 === oldOwnerRoom ? void 0 : oldOwnerRoom.refreshDat();
        null === (_a = targetRoomNd.getComponent(MapDrawRoom_1.default)) || void 0 === _a ? void 0 : _a.refreshDat();
        rebuildIds && this.rebuildPointIdsByLayer();
        return true;
      }
      movePathPointToRoomByWorldPos(pointNode, worldPos, rebuildIds = true) {
        if (!pointNode || !cc.isValid(pointNode) || !worldPos) return false;
        let hitRoomId = null;
        this._roomNodeMap.forEach((roomNd, cfgId) => {
          if (null !== hitRoomId) return;
          if (!roomNd || !cc.isValid(roomNd)) return;
          const local = roomNd.convertToNodeSpaceAR(worldPos);
          const size = roomNd.getContentSize();
          const left = -roomNd.anchorX * size.width;
          const right = left + size.width;
          const bottom = -roomNd.anchorY * size.height;
          const top = bottom + size.height;
          local.x >= left && local.x <= right && local.y >= bottom && local.y <= top && (hitRoomId = cfgId);
        });
        if (null === hitRoomId) return false;
        return this.moveUnitToRoom(pointNode, hitRoomId, rebuildIds);
      }
      findOwnerRoomByNode(nd) {
        let cur = nd;
        while (cur) {
          const room = cur.getComponent(MapDrawRoom_1.default);
          if (room) return room;
          cur = cur.parent;
        }
        return null;
      }
      deleteRoom(roomNode) {
        if (!roomNode) return;
        const roomComp = roomNode.getComponent(MapDrawRoom_1.default);
        if (!roomComp) return;
        const cfgId = roomComp.getRoomCfgId();
        const uid = roomComp.getUid();
        this._roomNodeMap.delete(cfgId);
        uid && this._roomUidMap.delete(uid);
        const pointCont = roomNode.getChildByName("pointCont");
        pointCont && pointCont.children.slice().forEach(pNd => {
          this.deletePathPoint(pNd, false);
        });
        const parentLayer = roomNode.parent;
        roomNode.removeFromParent();
        roomNode.destroy();
        if (parentLayer && cc.isValid(parentLayer)) if (0 === parentLayer.childrenCount) {
          const m = /^Layer(\d+)$/.exec(parentLayer.name || "");
          m && this._layerNodeMap.delete(Number(m[1]));
          parentLayer.removeFromParent();
          parentLayer.destroy();
          this.scheduleOnce(() => this.compactLayersAfterDelete(), 0);
        } else this.updateLayerBounds(parentLayer);
        this.scheduleOnce(() => this.rebuildPointIdsByLayer(), 0);
      }
      deletePathPoint(pointNd, rebuildIds = true) {
        if (!pointNd || !cc.isValid(pointNd)) return;
        const pointCom = pointNd.getComponent(MapDrawP_1.default);
        if (!pointCom) return;
        const oldId = pointCom.getId();
        const linked = (pointCom.links || []).slice();
        linked.forEach(toNd => {
          var _a;
          if (!toNd || !cc.isValid(toNd)) return;
          null === (_a = toNd.getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.removeLink(pointNd);
        });
        this._pointMap.forEach(otherNd => {
          var _a;
          if (!otherNd || !cc.isValid(otherNd)) return;
          if (otherNd === pointNd) return;
          null === (_a = otherNd.getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.removeLink(pointNd);
        });
        this._roomNodeMap.forEach(roomNd => {
          if (!roomNd || !cc.isValid(roomNd)) return;
          const unitCont = roomNd.getChildByName("unitCont");
          if (!unitCont) return;
          const ladders = unitCont.getComponentsInChildren(MapDrawLadder_1.default);
          ladders.forEach(ladder => {
            const binds = (ladder.bindPoints || []).filter(n => n && cc.isValid(n) && n !== pointNd);
            binds.length !== (ladder.bindPoints || []).length && ladder.setBinds(binds);
          });
        });
        this._roomNodeMap.forEach(roomNd => {
          if (!roomNd || !cc.isValid(roomNd)) return;
          const roomCom = roomNd.getComponent(MapDrawRoom_1.default);
          if (!roomCom) return;
          const prev = roomCom.unLockPoints || [];
          const next = prev.filter(p => p && cc.isValid(p) && p !== pointNd);
          if (next.length !== prev.length) {
            roomCom.unLockPoints = next;
            roomCom.refreshDat();
          }
        });
        oldId && this._pointMap.delete(oldId);
        pointNd.removeFromParent();
        pointNd.destroy();
        rebuildIds && this.scheduleOnce(() => this.rebuildPointIdsByLayer(), 0);
      }
      deletePortal(portalNd) {
        if (!portalNd || !cc.isValid(portalNd)) return;
        portalNd.removeFromParent();
        portalNd.destroy();
      }
      clear() {
        var _a, _b, _c, _d;
        null === (_a = this._pointLineCont) || void 0 === _a ? void 0 : _a.destroyAllChildren();
        null === (_b = this._layerCont) || void 0 === _b ? void 0 : _b.destroyAllChildren();
        null === (_c = this._outRoomUnitCont) || void 0 === _c ? void 0 : _c.destroyAllChildren();
        null === (_d = this._mapLineDrawer) || void 0 === _d ? void 0 : _d.clear();
        this.clearMaps();
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.ClearEditPanel);
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.RefreshAreaInfo, this._areaInfo);
      }
      saveDat() {
        this.refreshDat();
        return this._mapSerializer.export();
      }
      restoreFromJson(jsonStr) {
        if (!jsonStr) return;
        try {
          const json = JSON.parse(jsonStr);
          if (!json) return;
          this.clear();
          this._mapBuilder.build({
            json: json
          }, {
            layerCont: this._layerCont,
            outRoomUnitCont: this._outRoomUnitCont,
            playerCreate: this._playerCreateNd,
            playerExit: this._playerExitNd
          });
        } catch (e) {
          console.error("[MapLoader] restoreFromJson failed:", e);
        }
      }
      refreshDat() {
        var _a;
        null === (_a = this._layerCont) || void 0 === _a ? void 0 : _a.children.forEach(layer => {
          layer.children.forEach(roomNd => {
            const mapDrawRoom = roomNd.addComponentSafe(MapDrawRoom_1.default);
            mapDrawRoom.refreshDat();
          });
        });
      }
      getRoomNode(cfgId) {
        return this._roomNodeMap.get(cfgId);
      }
      getPathPointById(id) {
        return this._pointMap.get(id);
      }
      getOutRoomUnitParent() {
        return this._outRoomUnitCont;
      }
      setAreaInfo(areaInfo) {
        this._areaInfo = areaInfo;
      }
      getPathLinkWorldSegmentsForRoom(ownerCfgId) {
        var _a, _b;
        return null !== (_b = null === (_a = this._mapLineDrawer) || void 0 === _a ? void 0 : _a.getPathLinkWorldSegmentsForRoom(ownerCfgId)) && void 0 !== _b ? _b : [];
      }
      getPathLinkWorldSegmentsFromPoint(pointNode) {
        var _a, _b;
        return null !== (_b = null === (_a = this._mapLineDrawer) || void 0 === _a ? void 0 : _a.getPathLinkWorldSegmentsFromPoint(pointNode)) && void 0 !== _b ? _b : [];
      }
    };
    MapLoader.ins = null;
    __decorate([ property(cc.SpriteFrame) ], MapLoader.prototype, "defaultSp", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "roomPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "pathPointPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "ladderPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "doorPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "searchItemPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "enemyRefreshPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "survivePrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "fightSoulPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "defaultPortalPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "portalPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "shipPrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "cablePrefab", void 0);
    __decorate([ property(cc.Prefab) ], MapLoader.prototype, "stonePrefab", void 0);
    MapLoader = MapLoader_1 = __decorate([ ccclass ], MapLoader);
    exports.default = MapLoader;
    cc._RF.pop();
  }, {
    "../editor/EditorSetting": "EditorSetting",
    "../event/eventTypes": "eventTypes",
    "../frameWork/EventManager": "EventManager",
    "../tool/MapTool": "MapTool",
    "../type/mapTypes": "mapTypes",
    "./MapBuilder": "MapBuilder",
    "./MapDrawLadder": "MapDrawLadder",
    "./MapDrawP": "MapDrawP",
    "./MapDrawRoom": "MapDrawRoom",
    "./MapDrawUnitBase": "MapDrawUnitBase",
    "./MapLineDrawer": "MapLineDrawer",
    "./MapSerializer": "MapSerializer"
  } ],
  MapSerializer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4e5fanuMkBI976RWeJASNF", "MapSerializer");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const mapTypes_1 = require("../type/mapTypes");
    const MapDrawDat_1 = require("./MapDrawDat");
    const MapDrawP_1 = require("./MapDrawP");
    const MapDrawRoom_1 = require("./MapDrawRoom");
    const MapDrawUnitBase_1 = require("./MapDrawUnitBase");
    class MapSerializer {
      init(config) {
        this._getPathPoints = config.getPathPoints;
        this._getRoomNodes = config.getRoomNodes;
        this._getOutRoomUnits = config.getOutRoomUnits;
        this._getPlayerCreate = config.getPlayerCreate;
        this._getPlayerExit = config.getPlayerExit;
        this._getAreaInfo = config.getAreaInfo;
        this._getSize = config.getSize;
      }
      export() {
        const mapDat = new MapDrawDat_1.MapDrawDat();
        const size = this.collectSize();
        const pathPoints = this.collectPathPoints();
        const rooms = this.collectRooms();
        const {portalDatas: portalDatas, cableDatas: cableDatas, stoneDatas: stoneDatas} = this.collectOutRoomUnits();
        const playerCreatePos = this.collectPlayerPos(this._getPlayerCreate());
        const playerExitPos = this.collectPlayerPos(this._getPlayerExit());
        const areaInfo = this.collectAreaInfo();
        const outDat = {
          size: size,
          pathPoints: pathPoints,
          rooms: rooms,
          playerCreatePos: playerCreatePos,
          playerExitPos: playerExitPos,
          portalDatas: portalDatas,
          scooterDatas: cableDatas,
          rockDatas: stoneDatas,
          areaInfo: areaInfo
        };
        mapDat.setDat(outDat);
        return mapDat.createJson();
      }
      collectSize() {
        const size = this._getSize();
        return {
          width: size.x,
          height: size.y
        };
      }
      collectPathPoints() {
        const pathPoints = [];
        const pointMap = this._getPathPoints();
        pointMap.forEach(point => {
          if (!point || !cc.isValid(point)) return;
          pathPoints.push(point.addComponentSafe(MapDrawP_1.default).getDat());
        });
        pathPoints.sort((a, b) => {
          const ma = /^P(\d+)_(\d+)$/.exec(a.id || "");
          const mb = /^P(\d+)_(\d+)$/.exec(b.id || "");
          if (ma && mb) {
            const la = Number(ma[1]);
            const lb = Number(mb[1]);
            if (la !== lb) return la - lb;
            const na = Number(ma[2]);
            const nb = Number(mb[2]);
            return na - nb;
          }
          return String(a.id || "").localeCompare(String(b.id || ""));
        });
        return pathPoints;
      }
      collectRooms() {
        const rooms = [];
        const roomNodeMap = this._getRoomNodes();
        roomNodeMap.forEach(room => {
          rooms.push(room.addComponentSafe(MapDrawRoom_1.default).getDat());
        });
        rooms.sort((a, b) => (a.cfgId || 0) - (b.cfgId || 0));
        return rooms;
      }
      collectOutRoomUnits() {
        const portalDatas = [];
        const cableDatas = [];
        const stoneDatas = [];
        const outRoomUnits = this._getOutRoomUnits();
        outRoomUnits.children.forEach(unit => {
          const controller = unit.getComponent(MapDrawUnitBase_1.default);
          if (!controller) return;
          switch (controller.getType()) {
           case mapTypes_1.UnitType.Portal:
            portalDatas.push(controller.getDat());
            break;

           case mapTypes_1.UnitType.Cable:
            cableDatas.push(controller.getDat());
            break;

           case mapTypes_1.UnitType.Stone:
            stoneDatas.push(controller.getDat());
          }
        });
        return {
          portalDatas: portalDatas,
          cableDatas: cableDatas,
          stoneDatas: stoneDatas
        };
      }
      collectPlayerPos(playerNd) {
        if (!playerNd) return {
          x: 0,
          y: 0
        };
        return playerNd.addComponentSafe(MapDrawUnitBase_1.default).getPos();
      }
      collectAreaInfo() {
        return this._getAreaInfo().map(info => Number(info));
      }
    }
    exports.default = MapSerializer;
    cc._RF.pop();
  }, {
    "../type/mapTypes": "mapTypes",
    "./MapDrawDat": "MapDrawDat",
    "./MapDrawP": "MapDrawP",
    "./MapDrawRoom": "MapDrawRoom",
    "./MapDrawUnitBase": "MapDrawUnitBase"
  } ],
  MapTool: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "de3079HmU1MBLo1wMTtw1Od", "MapTool");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class MapTool {
      static init(mapLaoder, size) {
        this._mapLoader = mapLaoder;
        this._size = size;
      }
      static getSize() {
        return this._size;
      }
      static converWorldPosToMapPos(worldPos) {
        return this._mapLoader.convertToNodeSpaceAR(worldPos);
      }
      static converMapPosToWorldPos(mapPos) {
        return this._mapLoader.convertToWorldSpaceAR(mapPos);
      }
      static isWorldPosInNodeRect(worldPos, node) {
        if (!node || !cc.isValid(node)) return false;
        const box = node.getBoundingBoxToWorld();
        return box.contains(worldPos);
      }
      static getLeftBottom(node) {
        const s = node.getContentSize();
        const leftBottom = cc.v2(-s.width * node.anchorX, -s.height * node.anchorY);
        return leftBottom;
      }
      static _getIntersection(a, b) {
        const xMin = Math.max(a.xMin, b.xMin);
        const yMin = Math.max(a.yMin, b.yMin);
        const xMax = Math.min(a.xMax, b.xMax);
        const yMax = Math.min(a.yMax, b.yMax);
        if (xMax >= xMin && yMax >= yMin) return new cc.Rect(xMin, yMin, xMax - xMin, yMax - yMin);
        return null;
      }
      static findHoverRoomForDrag(hoverRoomId, hoverRoomName) {
        if (!this._mapLoader) return null;
        const rooms = this._mapLoader.getComponentsInChildren("MapDrawRoom");
        for (let i = rooms.length - 1; i >= 0; i--) {
          const room = rooms[i];
          if (void 0 !== hoverRoomId && room.getRoomCfgId() === hoverRoomId) return room;
          if (hoverRoomName && room.node.name === hoverRoomName) return room;
        }
        return null;
      }
      static getNonRoomDropParent(itemNd, hoverRoom) {
        if (!itemNd || !hoverRoom) return null;
        if (itemNd.getComponent("MapDrawP")) return hoverRoom.node.getChildByName("pointCont") || hoverRoom.node;
        return hoverRoom.node.getChildByName("unitCont") || hoverRoom.node;
      }
      static findOwnerRoomByNode(nd) {
        var _a;
        let cur = nd;
        while (cur && cur instanceof cc.Node) {
          const room = null === (_a = cur.getComponent) || void 0 === _a ? void 0 : _a.call(cur, "MapDrawRoom");
          if (room) return room;
          cur = cur.parent;
        }
        return null;
      }
    }
    exports.default = MapTool;
    cc._RF.pop();
  }, {} ],
  ModeBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0917122CyxJ3qahQ+zLpdJF", "ModeBase");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    class ModeBase {
      constructor(deactivateOthers) {
        this.deactivateOthers = deactivateOthers;
        this._enabled = false;
      }
      isEnabled() {
        return this._enabled;
      }
      getType() {
        return this._modeType;
      }
      setEnabled(enabled) {
        if (this._enabled === enabled) return;
        if (enabled) {
          this.deactivateOthers();
          this._enabled = true;
          this.onEnabled();
          return;
        }
        this._enabled = false;
        this.onDisabled();
      }
      toggle() {
        this.setEnabled(!this._enabled);
      }
      mount() {}
      unmount() {}
      onEnabled() {}
      onDisabled() {}
    }
    exports.default = ModeBase;
    cc._RF.pop();
  }, {} ],
  ModeMgr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "186527EDUVCzYgGugR+2Tgi", "ModeMgr");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ModeMgr = void 0;
    const LadderBindMode_1 = require("../editor/modes/LadderBindMode");
    const PathPointLinkMode_1 = require("../editor/modes/PathPointLinkMode");
    const SelectPointMode_1 = require("../editor/modes/SelectPointMode");
    const eventTypes_1 = require("../event/eventTypes");
    const types_1 = require("../type/types");
    const EventManager_1 = require("./EventManager");
    const Singleton_1 = require("./Singleton");
    class ModeMgr extends Singleton_1.Singleton {
      constructor() {
        super(...arguments);
        this._allMode = [];
      }
      static get instance() {
        return super.instance;
      }
      onInit() {
        const deactivateOthers = () => {
          this.clear();
        };
        this._pathPointMode = new PathPointLinkMode_1.default(deactivateOthers, {
          onChanged: () => {}
        });
        this._ladderMode = new LadderBindMode_1.default(deactivateOthers, {
          onChanged: () => {}
        });
        this._selectPointMode = new SelectPointMode_1.default(deactivateOthers);
        this._allMode = [ this._pathPointMode, this._ladderMode, this._selectPointMode ];
        this._allMode.forEach(mode => {
          mode.mount();
        });
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.OpenSelectPointMode, this.onOpenSelectPointMode, this);
      }
      onDestroy() {
        this._allMode.forEach(mode => {
          mode.unmount();
        });
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.OpenSelectPointMode, this.onOpenSelectPointMode, this);
      }
      onOpenSelectPointMode(ismulti, cb, selections) {
        this.enterMode(types_1.ModeType.SelectPoint, ismulti, cb, selections);
      }
      enterMode(modeType, ...param) {
        this._allMode.forEach(mode => {
          mode.setEnabled(false);
        });
        switch (modeType) {
         case types_1.ModeType.PathPointLink:
          this._pathPointMode.setEnabled(true);
          this._pathPointMode.setCancelCb(param[0]);
          break;

         case types_1.ModeType.LadderBind:
          this._ladderMode.setEnabled(true);
          const ladderNd = param[0];
          this._ladderMode.setLadder(ladderNd);
          break;

         case types_1.ModeType.SelectPoint:
          const isMulti = param[0];
          this._selectPointMode.setEnabled(true);
          this._selectPointMode.setIsMulti(isMulti);
          this._selectPointMode.setChangeCb(param[1]);
          this._selectPointMode.setSelections(param[2]);
        }
        this._curMode = this._allMode.find(mode => mode.getType() == modeType);
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.UpdateCurModeDisplay, modeType);
      }
      get curMode() {
        return this._curMode;
      }
      get curModeType() {
        var _a;
        return null === (_a = this._curMode) || void 0 === _a ? void 0 : _a.getType();
      }
      clear() {
        this._allMode.forEach(mode => {
          mode.setEnabled(false);
        });
        this._curMode = null;
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.UpdateCurModeDisplay);
      }
    }
    exports.ModeMgr = ModeMgr;
    cc._RF.pop();
  }, {
    "../editor/modes/LadderBindMode": "LadderBindMode",
    "../editor/modes/PathPointLinkMode": "PathPointLinkMode",
    "../editor/modes/SelectPointMode": "SelectPointMode",
    "../event/eventTypes": "eventTypes",
    "../type/types": "types",
    "./EventManager": "EventManager",
    "./Singleton": "Singleton"
  } ],
  NodeUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c945zEySdK3aR1sATvhlFQ", "NodeUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NodeUtil = void 0;
    class NodeUtil {
      static autoRefreshChildrenNum(parentNd, num, cb) {
        const dat = new Array(num).fill(0);
        NodeUtil.autoRefreshChildren(parentNd, dat, cb);
      }
      static autoRefreshChildren(parentNd, data, cb) {
        const children = parentNd.children;
        if (0 === children.length) return;
        children.forEach(child => {
          child.active = false;
        });
        const template = children[0];
        data.forEach((item, index) => {
          const child = children[index];
          if (child) return;
          const nd = cc.instantiate(template);
          nd.parent = parentNd;
        });
        data.forEach((dat, index) => {
          const nd = children[index];
          nd.active = true;
          null === cb || void 0 === cb ? void 0 : cb(nd, index, dat);
        });
      }
    }
    exports.NodeUtil = NodeUtil;
    cc._RF.pop();
  }, {} ],
  PathPointLinkMode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d3789p6hZlHG5y6QBXT95lF", "PathPointLinkMode");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("../../item/MapDrawP");
    const eventTypes_1 = require("../../event/eventTypes");
    const EventManager_1 = require("../../frameWork/EventManager");
    const ModeBase_1 = require("./ModeBase");
    const types_1 = require("../../type/types");
    class PathPointLinkMode extends ModeBase_1.default {
      constructor(deactivateOthers, deps) {
        super(deactivateOthers);
        this.deps = deps;
        this._start = null;
        this._modeType = types_1.ModeType.PathPointLink;
      }
      mount() {
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.PathPointLinkClick, this.onPointClick, this);
      }
      unmount() {
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.PathPointLinkClick, this.onPointClick, this);
      }
      onDisabled() {
        var _a;
        this.clearStart();
        null === (_a = this._cancelCb) || void 0 === _a ? void 0 : _a.call(this);
      }
      clearStart() {
        var _a;
        this._start && cc.isValid(this._start) && (null === (_a = this._start.getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.setLinkHighlight(false));
        this._start = null;
      }
      onPointClick(node, onChanged) {
        if (!this.isEnabled()) return;
        if (!node || !cc.isValid(node)) return;
        const target = node.getComponent(MapDrawP_1.default);
        if (!target) return;
        if (!this._start || !cc.isValid(this._start)) {
          this._start = node;
          target.setLinkHighlight(true);
          return;
        }
        const startCom = this._start.getComponent(MapDrawP_1.default);
        if (!startCom) {
          this._start = null;
          return;
        }
        if (this._start === node) {
          startCom.setLinkHighlight(false);
          this._start = null;
          return;
        }
        if (startCom.hasLinkTo(node)) {
          startCom.removeLink(node);
          target.removeLink(this._start);
        } else {
          startCom.addLink(node);
          target.addLink(this._start);
        }
        startCom.setLinkHighlight(false);
        this._start = null;
        null === onChanged || void 0 === onChanged ? void 0 : onChanged();
        this.deps.onChanged();
      }
      setCancelCb(cb) {
        this._cancelCb = cb;
      }
    }
    exports.default = PathPointLinkMode;
    cc._RF.pop();
  }, {
    "../../event/eventTypes": "eventTypes",
    "../../frameWork/EventManager": "EventManager",
    "../../item/MapDrawP": "MapDrawP",
    "../../type/types": "types",
    "./ModeBase": "ModeBase"
  } ],
  ResLoader: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "97f7fuJB2RB6Ik4avl7DxrV", "ResLoader");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ResLoader = void 0;
    const Logger_1 = require("./Logger");
    const StringUtil_1 = require("./StringUtil");
    class ResLoader {
      static loadRemote(option) {
        const opt = option.option || {};
        const {url: url, success: success, fail: fail, complete: complete} = option;
        if (!success) return new Promise((resolve, reject) => {
          this._loadRemote(url, opt, resolve, reject);
        });
        this._loadRemote(url, opt, success, fail, complete);
      }
      static _loadRemote(url, option, success, fail, complete) {
        cc.assetManager.loadRemote(url, option, (err, asset) => {
          err ? fail && fail({
            errCode: -1,
            errMsg: err.message
          }) : success && success(asset);
          complete && complete();
        });
      }
      static loadAssetAny(params) {
        const tasks = [];
        for (let i = 0; i < params.requests.length; i++) tasks.push(this.loadAsset(params.requests[i]));
        return Promise.all(tasks);
      }
      static preload(option) {
        this.loadBundle({
          bundle: option.bundle,
          bundleName: option.bundleName
        }).then(bundle => {
          bundle.preload(option.paths, option.type);
        }).catch(() => {});
      }
      static loadAssetSync(path, type, bundleName) {
        const bundle = StringUtil_1.StringUtil.isEmpty(bundleName) ? cc.resources : cc.assetManager.getBundle(bundleName);
        return bundle ? bundle.get(path, type) : null;
      }
      static loadAsset(option) {
        if (!option.success) return new Promise((resolve, reject) => {
          this._loadAsset(option.path, option.type, option.bundle, option.bundleName, resolve, reject);
        });
        this._loadAsset(option.path, option.type, option.bundle, option.bundleName, option.success, option.fail, option.complete);
      }
      static _loadAsset(path, type, bundle, bundleName, success, fail, complete) {
        this.loadBundle({
          bundle: bundle,
          bundleName: bundleName,
          success: b => {
            const cached = b.get(path, type);
            if (null != cached) {
              success && success(cached);
              complete && complete();
              return;
            }
            b.load(path, type, (err, asset) => {
              if (err) {
                Logger_1.Logger.error(err);
                fail && fail({
                  errCode: -1,
                  errMsg: err.message
                });
                complete && complete();
                return;
              }
              success && success(asset);
              complete && complete();
            });
          },
          fail: err => {
            fail && fail(err);
            complete && complete();
          }
        });
      }
      static loadBundle(option) {
        if (!option.success) return new Promise((resolve, reject) => {
          this._loadBundle(option.bundle, option.bundleName, resolve, reject);
        });
        this._loadBundle(option.bundle, option.bundleName, option.success, option.fail, option.complete);
      }
      static _loadBundle(bundle, bundleName, success, fail, complete) {
        let realBundle = bundle || (StringUtil_1.StringUtil.isEmpty(bundleName) ? cc.resources : cc.assetManager.getBundle(bundleName));
        if (realBundle) {
          success && success(realBundle);
          complete && complete();
          return;
        }
        cc.assetManager.loadBundle(bundleName, (err, b) => {
          if (err) {
            fail && fail({
              errCode: -1,
              errMsg: err.message
            });
            complete && complete();
            return;
          }
          success && success(b);
          complete && complete();
        });
      }
      static preloadDir(option) {
        this.loadBundle({
          bundle: option.bundle,
          bundleName: option.bundleName
        }).then(bundle => {
          bundle.preloadDir(option.dir);
        });
      }
      static loadDir(option) {
        if (!option.success) return new Promise((resolve, reject) => {
          this._loadDir(option.dir, option.bundle, option.bundleName, resolve, reject);
        });
        this._loadDir(option.dir, option.bundle, option.bundleName, option.success, option.fail, option.complete);
      }
      static _loadDir(dir, bundle, bundleName, success, fail, complete) {
        this.loadBundle({
          bundle: bundle,
          bundleName: bundleName,
          success: b => {
            b.loadDir(dir, (err, assets) => {
              if (err) {
                fail && fail({
                  errCode: -1,
                  errMsg: err.message
                });
                complete && complete();
                return;
              }
              success && success(assets);
              complete && complete();
            });
          },
          fail: err => {
            fail && fail(err);
            complete && complete();
          }
        });
      }
      static loadAssetAnySequence(option) {
        const tasks = [];
        for (let i = 0; i < option.requests.length; i++) tasks.push(this.loadAsset(option.requests[i]));
        const results = [];
        let index = 0;
        return new Promise(resolve => {
          if (option.requests.length <= 0) {
            resolve({
              assetResults: results,
              err: null
            });
            return;
          }
          const next = () => {
            tasks[index].then(asset => {
              results.push({
                asset: asset,
                option: option.requests[index]
              });
              index++;
              if (index === tasks.length) {
                resolve({
                  assetResults: results,
                  err: null
                });
                return;
              }
              next();
            }).catch(err => {
              index++;
              if (index === tasks.length) {
                resolve({
                  assetResults: results,
                  err: err
                });
                return;
              }
            });
          };
          next();
        });
      }
      static setSpritFrame(sprite, bundleName, path, complete) {
        var _a;
        null === (_a = this.loadAsset({
          bundleName: bundleName,
          path: path,
          type: cc.SpriteFrame
        })) || void 0 === _a ? void 0 : _a.then(asset => {
          sprite.spriteFrame = asset;
          complete && complete();
        }).catch(err => {
          console.error(err);
        });
      }
      static releaseDir(path, bundleName) {
        const bundle = cc.assetManager.getBundle(bundleName);
        if (bundle) {
          var infos = bundle.getDirWithPath(path);
          infos && infos.map(info => {
            this.releasePrefabtDepsRecursively(bundleName, info.uuid);
          });
          "" == path && "resources" != bundleName && cc.assetManager.removeBundle(bundle);
        }
      }
      static releasePrefabtDepsRecursively(bundleName, uuid) {
        if (uuid instanceof cc.Asset) uuid.decRef(); else {
          const asset = cc.assetManager.assets.get(uuid);
          asset && asset.decRef();
        }
      }
    }
    exports.ResLoader = ResLoader;
    cc._RF.pop();
  }, {
    "./Logger": "Logger",
    "./StringUtil": "StringUtil"
  } ],
  SelectPointMode: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e88eKUucVC87/tEvK95ZCg", "SelectPointMode");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const MapDrawP_1 = require("../../item/MapDrawP");
    const eventTypes_1 = require("../../event/eventTypes");
    const EventManager_1 = require("../../frameWork/EventManager");
    const ModeBase_1 = require("./ModeBase");
    const types_1 = require("../../type/types");
    class SelectPointMode extends ModeBase_1.default {
      constructor(deactivateOthers) {
        super(deactivateOthers);
        this._selections = [];
        this._modeType = types_1.ModeType.SelectPoint;
      }
      mount() {
        EventManager_1.EventManager.instance.on(eventTypes_1.MapEditorEvent.SelectPointClick, this.onPointClick, this);
      }
      unmount() {
        EventManager_1.EventManager.instance.off(eventTypes_1.MapEditorEvent.SelectPointClick, this.onPointClick, this);
      }
      onDisabled() {
        this.clearAll();
      }
      cancelPick() {
        this.clearAll();
      }
      setIsMulti(isMulti) {
        this._multiSelect = isMulti;
      }
      setChangeCb(cb) {
        this._cb = cb;
      }
      setSelections(selections) {
        this._selections = selections;
        this._selections.forEach(n => {
          var _a;
          cc.isValid(n) && (null === (_a = n.getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.setLinkHighlight(true));
        });
      }
      getSelections() {
        return this._selections.filter(n => cc.isValid(n));
      }
      clearAll() {
        this._selections.forEach(n => {
          var _a;
          cc.isValid(n) && (null === (_a = n.getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.setLinkHighlight(false));
        });
        this._selections = [];
      }
      onPointClick(node) {
        var _a, _b, _c, _d;
        if (!this.isEnabled()) return;
        if (!node || !cc.isValid(node)) return;
        const target = node.getComponent(MapDrawP_1.default);
        if (!target) return;
        if (!this._multiSelect) {
          const select = this._selections[0];
          this._selections.length > 0 && select !== node && (null === (_a = this._selections[0].getComponent(MapDrawP_1.default)) || void 0 === _a ? void 0 : _a.setLinkHighlight(false));
          if (this._selections.length > 0 && select === node) {
            this._selections = [];
            null === (_b = this._cb) || void 0 === _b ? void 0 : _b.call(this, []);
            target.setLinkHighlight(false);
            return;
          }
          this._selections = [ node ];
          target.setLinkHighlight(true);
          null === (_c = this._cb) || void 0 === _c ? void 0 : _c.call(this, this._selections);
          return;
        }
        const idx = this._selections.indexOf(node);
        if (idx >= 0) {
          this._selections.splice(idx, 1);
          target.setLinkHighlight(false);
        } else {
          this._selections.push(node);
          target.setLinkHighlight(true);
        }
        null === (_d = this._cb) || void 0 === _d ? void 0 : _d.call(this, this._selections);
      }
    }
    exports.default = SelectPointMode;
    cc._RF.pop();
  }, {
    "../../event/eventTypes": "eventTypes",
    "../../frameWork/EventManager": "EventManager",
    "../../item/MapDrawP": "MapDrawP",
    "../../type/types": "types",
    "./ModeBase": "ModeBase"
  } ],
  Singleton: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7829cHXm+hHua3SxvmaN6KQ", "Singleton");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Singleton = void 0;
    class Singleton {
      constructor() {
        this._inited = false;
      }
      static get instance() {
        const self = this;
        Singleton._instanceMap.has(self) || Singleton._instanceMap.set(self, new self());
        return Singleton._instanceMap.get(self);
      }
      init(...params) {
        if (this._inited) return;
        this._inited = true;
        this.onInit(params);
      }
      destroy() {
        if (!this._inited) return;
        this._inited = false;
        this.onDestroy();
        const cls = this.constructor;
        Singleton._instanceMap.delete(cls);
      }
      onInit(...params) {}
      onDestroy() {}
    }
    exports.Singleton = Singleton;
    Singleton._instanceMap = new Map();
    cc._RF.pop();
  }, {} ],
  StringUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "583e8fO7RZCJKg3d6WMW3vQ", "StringUtil");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.StringUtil = void 0;
    class StringUtil {
      static _isEmpty(val) {
        return null == val || "" === val;
      }
      static _isAnyEmptyInternal(...vals) {
        if (!vals || 0 === vals.length) return true;
        for (const v of vals) if (this._isEmpty(v)) return true;
        return false;
      }
      static formatDescStr(str, map, index, reg = /\[(.*?)\]/g) {
        return str.replace(reg, (match, key) => {
          let isPercent = false;
          let realKey = key;
          if (realKey.includes("%")) {
            isPercent = true;
            realKey = realKey.slice(0, realKey.length - 1);
          }
          if (Object.prototype.hasOwnProperty.call(map, realKey)) {
            let val = map[realKey];
            if (isPercent) {
              "string" === typeof val && (val = val.split("|").map(Number)[index - 1]);
              val *= 100;
              val = Math.round(100 * val) / 100;
              return val % 1 === 0 ? Math.floor(val) + "%" : val + "%";
            }
            "string" === typeof val && (val = val.split("|").map(Number)[index - 1]);
            return val;
          }
          return match;
        });
      }
      static transRichText(str, color = "#69FF3A") {
        return "<outline color=black width=1>" + str.replace(/(\d+%)|(\d+\u79d2)|(\d+)/g, m => `<color=${color}>${m}</color>`) + "</color>";
      }
      static isEmpty(val) {
        return this._isEmpty(val);
      }
      static isNotEmpty(val) {
        return !this._isEmpty(val);
      }
      static isAnyEmpty(...vals) {
        return this._isAnyEmptyInternal(...vals);
      }
      static isNoneEmpty(...vals) {
        return !this._isAnyEmptyInternal(...vals);
      }
      static versionCompare(a, b) {
        const as = a.split(".");
        const bs = b.split(".");
        for (let i = 0; i < as.length; i++) {
          if (null == bs[i]) return 1;
          if (as[i] !== bs[i]) return Number(as[i]) - Number(bs[i]);
        }
        return 0;
      }
      static copyObj(obj) {
        const result = "[object Array]" === Object.prototype.toString.call(obj) ? [] : {};
        for (const k in obj) {
          const v = obj[k];
          result[k] = null == v ? v : "object" === typeof v ? this.copyObj(v) : v;
        }
        return result;
      }
      static strLenLimit(str, len = 8, suffix = "...") {
        let res = str;
        str.length > len && (res = str.substring(0, len) + suffix);
        return res;
      }
    }
    exports.StringUtil = StringUtil;
    class StringBuffer {
      constructor() {
        this._strings = [];
      }
      append(str) {
        this._strings.push(str);
      }
      toString() {
        return this._strings.join("");
      }
    }
    cc._RF.pop();
  }, {} ],
  UndoManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b9bceaIkBBB4tihBIA4SvA", "UndoManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UndoManager = void 0;
    class UndoManager {
      constructor() {
        this._snapshots = [];
        this._position = -1;
        this._maxSize = 30;
      }
      saveSnapshot(snapshot) {
        if (!snapshot) return;
        this._snapshots = this._snapshots.slice(0, this._position + 1);
        this._snapshots.push(snapshot);
        this._position++;
        while (this._snapshots.length > this._maxSize) {
          this._snapshots.shift();
          this._position--;
        }
      }
      undo() {
        if (!this.canUndo()) return null;
        return this._snapshots[--this._position];
      }
      redo() {
        if (!this.canRedo()) return null;
        this._position++;
        return this._snapshots[this._position];
      }
      getCurrentSnapshot() {
        if (this._position < 0 || this._position >= this._snapshots.length) return null;
        return this._snapshots[this._position];
      }
      canUndo() {
        return this._position > 0;
      }
      canRedo() {
        return this._position < this._snapshots.length - 1;
      }
      clear() {
        this._snapshots.length = 0;
        this._position = -1;
      }
      getHistoryCount() {
        return this._snapshots.length;
      }
      getPosition() {
        return this._position;
      }
    }
    exports.UndoManager = UndoManager;
    cc._RF.pop();
  }, {} ],
  eventTypes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "99170rTDyxAkIAfLsx11X5j", "eventTypes");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MapEditorEvent = void 0;
    var MapEditorEvent;
    (function(MapEditorEvent) {
      MapEditorEvent["DragItem"] = "DragItem";
      MapEditorEvent["PathPointLinkClick"] = "PathPointLinkClick";
      MapEditorEvent["LadderBindPointClick"] = "LadderBindPointClick";
      MapEditorEvent["OpenSelectPointMode"] = "OpenSelectPointMode";
      MapEditorEvent["SelectPointClick"] = "SelectPointClick";
      MapEditorEvent["RefreshAttrPanel"] = "RefreshAttrPanel";
      MapEditorEvent["UpdateFromAttrPanel"] = "UpdateFromAttrPanel";
      MapEditorEvent["ClearEditPanel"] = "ClearEditPanel";
      MapEditorEvent["RefreshAreaInfo"] = "RefreshAreaInfo";
      MapEditorEvent["UpdateAreaInfoFormPanel"] = "UpdateAreaInfoFormPanel";
      MapEditorEvent["UpdateCurModeDisplay"] = "UpdateCurModeDisplay";
    })(MapEditorEvent = exports.MapEditorEvent || (exports.MapEditorEvent = {}));
    cc._RF.pop();
  }, {} ],
  extension: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "112feQHHG1Bu4lLmOP6lqQF", "extension");
    cc.Node.prototype.addComponentSafe = function(ctor) {
      let comp = this.getComponent(ctor);
      comp || (comp = this.addComponent(ctor));
      return comp;
    };
    cc._RF.pop();
  }, {} ],
  mapTypes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "14bd7/KgU5K1rTIoIvaexze", "mapTypes");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.UnitType = void 0;
    var UnitType;
    (function(UnitType) {
      UnitType[UnitType["Default"] = 0] = "Default";
      UnitType[UnitType["Room"] = 1] = "Room";
      UnitType[UnitType["PathPoint"] = 2] = "PathPoint";
      UnitType[UnitType["Door"] = 3] = "Door";
      UnitType[UnitType["Ladder"] = 4] = "Ladder";
      UnitType[UnitType["EnemyRefresh"] = 5] = "EnemyRefresh";
      UnitType[UnitType["SearchPoint"] = 6] = "SearchPoint";
      UnitType[UnitType["Portal"] = 7] = "Portal";
      UnitType[UnitType["SurviveDat"] = 8] = "SurviveDat";
      UnitType[UnitType["Stone"] = 9] = "Stone";
      UnitType[UnitType["Cable"] = 10] = "Cable";
      UnitType[UnitType["FightSoul"] = 11] = "FightSoul";
    })(UnitType = exports.UnitType || (exports.UnitType = {}));
    cc._RF.pop();
  }, {} ],
  prefabPanelBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fff98ydClxMeo7KDWRdovjC", "prefabPanelBase");
    "use strict";
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    const eventTypes_1 = require("../../event/eventTypes");
    const EventManager_1 = require("../../frameWork/EventManager");
    const mapTypes_1 = require("../../type/mapTypes");
    const {ccclass: ccclass, property: property} = cc._decorator;
    let prefabPanelBase = class prefabPanelBase extends cc.Component {
      constructor() {
        super(...arguments);
        this.type = mapTypes_1.UnitType.Default;
        this.prefab = null;
      }
      onLoad() {
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
      }
      getType() {
        return mapTypes_1.UnitType.Default;
      }
      onMouseDown(event) {
        if (event.target !== this.node) return;
        event.stopPropagation();
        if (event.getButton() !== cc.Event.EventMouse.BUTTON_LEFT) return;
        if (!this.prefab) {
          cc.warn(`PrefabPanelBase: prefab \u672a\u7ed1\u5b9a\uff0cnode=${this.node.name}`);
          return;
        }
        if (!this.node.parent) {
          cc.warn(`PrefabPanelBase: parent \u4e3a null\uff0cnode=${this.node.name}`);
          return;
        }
        const itemNd = cc.instantiate(this.prefab);
        itemNd.parent = this.node.parent;
        itemNd.setPosition(this.node.getPosition());
        const mousePos = cc.v3(event.getLocation());
        const dragOffset = itemNd.position.sub(itemNd.parent.convertToNodeSpaceAR(mousePos));
        const dragDat = {
          parent: itemNd.parent,
          dragOffset: dragOffset,
          itemNode: itemNd,
          mousePos: event.getLocation()
        };
        EventManager_1.EventManager.instance.emit(eventTypes_1.MapEditorEvent.DragItem, dragDat);
      }
    };
    __decorate([ property({
      type: cc.Enum(mapTypes_1.UnitType)
    }) ], prefabPanelBase.prototype, "type", void 0);
    __decorate([ property(cc.Prefab) ], prefabPanelBase.prototype, "prefab", void 0);
    prefabPanelBase = __decorate([ ccclass ], prefabPanelBase);
    exports.default = prefabPanelBase;
    cc._RF.pop();
  }, {
    "../../event/eventTypes": "eventTypes",
    "../../frameWork/EventManager": "EventManager",
    "../../type/mapTypes": "mapTypes"
  } ],
  types: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a92c8cI13FOe61M2OqI92GA", "types");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ModeType = void 0;
    var ModeType;
    (function(ModeType) {
      ModeType["PathPointLink"] = "PathPointLink";
      ModeType["LadderBind"] = "LadderBind";
      ModeType["SelectPoint"] = "SelectPoint";
    })(ModeType = exports.ModeType || (exports.ModeType = {}));
    cc._RF.pop();
  }, {} ]
}, {}, [ "EditPanel", "EditorSetting", "HoverDrawer", "KeyInputHandler", "LevelScene", "AttrPanel", "AttrPanelBase", "AttrPanelCable", "AttrPanelDoor", "AttrPanelEnemyRefresh", "AttrPanelLadder", "AttrPanelPoint", "AttrPanelPortal", "AttrPanelRoom", "AttrPanelSurviveRefresh", "LadderBindMode", "ModeBase", "PathPointLinkMode", "SelectPointMode", "prefabPanelBase", "eventTypes", "AttrMgr", "EventManager", "Logger", "ModeMgr", "ResLoader", "Singleton", "StringUtil", "UndoManager", "MapBuilder", "MapDrawCable", "MapDrawDat", "MapDrawDefaultPortal", "MapDrawDoor", "MapDrawEnemyRefresh", "MapDrawFightSoul", "MapDrawLadder", "MapDrawP", "MapDrawPortal", "MapDrawRoom", "MapDrawSearchItem", "MapDrawShip", "MapDrawStone", "MapDrawSurvive", "MapDrawUnitBase", "MapExporter", "MapInteraction", "MapLineDrawer", "MapLoader", "MapSerializer", "MapTool", "NodeUtil", "extension", "mapTypes", "types" ]);
//# sourceMappingURL=index.js.map
