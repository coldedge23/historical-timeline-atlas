import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ANCIENT_LOCATIONS } from '../data/threeKingdoms/index.js';
import { Swords, RotateCcw, Shield, Landmark, MapPin } from './Icons.js';

export const HistoryMap = ({
  territories,
  events,
  battles,
  selectedEvent,
  onSelectEvent,
  onSelectBattle,
  ancientNamesOnly,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersGroupRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [showTerritories, setShowTerritories] = useState(true);
  const [showLocations, setShowLocations] = useState(true);
  const [showBattles, setShowBattles] = useState(true);
  const [mapStyle, setMapStyle] = useState('shaded'); // 'shaded' | 'physical' | 'satellite'

  // Pure Natural Earth / Historical Basemaps (NO modern political borders, NO modern road labels)
  const TILE_PROVIDERS = {
    shaded: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
      options: {
        attribution: '&copy; Esri World Shaded Relief (自然山川地勢)',
        maxZoom: 13,
      },
    },
    physical: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
      options: {
        attribution: '&copy; Esri World Physical Map (地質地貌)',
        maxZoom: 10,
      },
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        attribution: '&copy; Esri World Imagery (衛星實景)',
        maxZoom: 17,
      },
    },
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on China & Taiwan (approx lat 30.0, lng 113.0, zoom 5)
    const map = L.map(mapContainerRef.current, {
      center: [30.5, 114.0],
      zoom: 5,
      minZoom: 4,
      maxZoom: 11,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Initial Tile Layer: Pure Mountain & River Shaded Relief
    const initialTiles = L.tileLayer(TILE_PROVIDERS.shaded.url, TILE_PROVIDERS.shaded.options).addTo(map);
    tileLayerRef.current = initialTiles;

    const territoryLayer = L.layerGroup().addTo(map);
    const locationLayer = L.layerGroup().addTo(map);
    const battleLayer = L.layerGroup().addTo(map);
    const eventLayer = L.layerGroup().addTo(map);

    layersGroupRef.current = {
      territories: territoryLayer,
      locations: locationLayer,
      battles: battleLayer,
      events: eventLayer,
    };

    mapInstanceRef.current = map;

    // Auto-fit to China & Taiwan
    const timer = setTimeout(() => {
      map.invalidateSize();
      map.setView([30.5, 114.0], 5);
    }, 200);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile Style Switch
  const handleChangeMapStyle = (newStyle) => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    setMapStyle(newStyle);

    mapInstanceRef.current.removeLayer(tileLayerRef.current);
    const provider = TILE_PROVIDERS[newStyle];
    const newTileLayer = L.tileLayer(provider.url, provider.options).addTo(mapInstanceRef.current);
    newTileLayer.bringToBack();
    tileLayerRef.current = newTileLayer;
  };

  // Render Territory Polygons (曹魏、蜀漢、東吳、夷洲)
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;
    const { territories: layer } = layersGroupRef.current;
    layer.clearLayers();

    if (!showTerritories || !territories?.factions) return;

    territories.factions.forEach((faction) => {
      const polygon = L.polygon(faction.polygon, {
        color: faction.borderColor,
        weight: 2.5,
        opacity: 0.9,
        fillColor: faction.borderColor,
        fillOpacity: 0.25,
        dashArray: faction.faction === 'taiwan' ? '5, 6' : undefined,
      });

      const popupContent = `
        <div style="font-family: inherit; padding: 4px; min-width: 200px;">
          <h4 style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: ${faction.borderColor}">
            ${faction.name}
          </h4>
          <p style="font-size: 12px; margin: 2px 0; color: #d4d4d8;">
            <b>治所：</b>${faction.capitalAncient} ${!ancientNamesOnly ? `(${faction.capitalModern})` : ''}
          </p>
          <p style="font-size: 12px; margin: 2px 0; color: #a1a1aa;">
            <b>戶籍：</b>${faction.registeredHouseholds || '無紀錄'}
          </p>
          <p style="font-size: 12px; margin: 2px 0; color: #a1a1aa;">
            <b>人口：</b>${faction.registeredPopulation || '無紀錄'}
          </p>
          <div style="margin-top: 6px; font-size: 11px; color: #f59e0b;">
            <b>主要民族/部族：</b>
            ${faction.ethnicities.map((e) => e.name).join('、')}
          </div>
        </div>
      `;

      polygon.bindPopup(popupContent);
      polygon.addTo(layer);

      // Capital Marker
      const capitalIcon = L.divIcon({
        className: 'custom-capital-marker',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); pointer-events: auto;">
            <div style="width: 14px; height: 14px; border-radius: 50%; background: ${faction.borderColor}; border: 2px solid white; box-shadow: 0 0 14px ${faction.borderColor};"></div>
            <span style="background: rgba(15,16,19,0.92); color: #fff; font-size: 11px; font-weight: bold; padding: 2px 6px; border-radius: 4px; border: 1px solid ${faction.borderColor}; white-space: nowrap; margin-top: 3px; box-shadow: 0 2px 6px rgba(0,0,0,0.8);">
              ${faction.capitalAncient.split('（')[0]}
            </span>
          </div>
        `,
        iconSize: [0, 0],
      });

      L.marker(faction.capitalCoords, { icon: capitalIcon })
        .bindPopup(popupContent)
        .addTo(layer);
    });
  }, [territories, showTerritories, ancientNamesOnly]);

  // Render Ancient Locations
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;
    const { locations: layer } = layersGroupRef.current;
    layer.clearLayers();

    if (!showLocations) return;

    ANCIENT_LOCATIONS.forEach((loc) => {
      const color =
        loc.faction === 'wei'
          ? '#60a5fa'
          : loc.faction === 'shu'
          ? '#f87171'
          : loc.faction === 'wu'
          ? '#34d399'
          : '#fbbf24';

      const icon = L.divIcon({
        className: 'custom-location-marker',
        html: `
          <div style="display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); opacity: 0.95;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${color}; border: 1.5px solid #ffffff; box-shadow: 0 0 5px rgba(0,0,0,0.9);"></div>
            <span style="font-size: 10px; font-weight: 500; color: #f4f4f5; text-shadow: 0 1px 4px rgba(0,0,0,1), 0 0 2px #000; white-space: nowrap; margin-top: 2px;">
              ${loc.nameAncient.split('（')[0]}
            </span>
          </div>
        `,
        iconSize: [0, 0],
      });

      const popupContent = `
        <div style="font-size: 12px; padding: 2px;">
          <b style="color: ${color}; font-size: 13px;">${loc.nameAncient}</b>
          ${!ancientNamesOnly ? `<p style="color: #a1a1aa; margin: 2px 0;">今：${loc.nameModern}</p>` : ''}
          <p style="color: #e4e4e7; margin: 2px 0; font-size: 11px;">${loc.role}</p>
        </div>
      `;

      L.marker(loc.coords, { icon })
        .bindPopup(popupContent)
        .addTo(layer);
    });
  }, [showLocations, ancientNamesOnly]);

  // Render Battles Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;
    const { battles: layer } = layersGroupRef.current;
    layer.clearLayers();

    if (!showBattles || !battles) return;

    battles.forEach((battle) => {
      const battleIcon = L.divIcon({
        className: 'custom-battle-marker',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transform: translate(-50%, -50%);">
            <div class="pulse-ring" style="border: 2px solid #ef4444; background: rgba(239, 68, 68, 0.25);"></div>
            <div style="width: 26px; height: 26px; border-radius: 50%; background: #991b1b; border: 2px solid #fecaca; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 14px rgba(239,68,68,0.9); z-index: 2;">
              <span style="color: #fff; font-size: 13px; font-weight: bold; line-height: 1;">⚔</span>
            </div>
            <div style="position: absolute; bottom: -16px; background: rgba(15,16,19,0.92); color: #fecaca; font-size: 10px; font-weight: bold; padding: 1px 5px; border-radius: 4px; border: 1px solid #7f1d1d; white-space: nowrap; box-shadow: 0 2px 6px rgba(0,0,0,0.8);">
              ${battle.name}
            </div>
          </div>
        `,
        iconSize: [0, 0],
      });

      const marker = L.marker(battle.coordinates, { icon: battleIcon });
      marker.on('click', () => {
        onSelectBattle(battle);
      });

      const tooltipContent = `
        <div style="font-size: 12px; padding: 2px;">
          <b style="color: #ef4444; font-size: 13px;">${battle.name} (${battle.year}年)</b>
          <p style="color: #d4d4d8; margin: 2px 0;">${battle.summary.slice(0, 45)}...</p>
          <span style="color: #f59e0b; font-size: 11px; font-weight: bold;">點擊查看雙方兵力、將領與死傷 &rarr;</span>
        </div>
      `;

      marker.bindTooltip(tooltipContent, { direction: 'top', offset: [0, -18] });
      marker.addTo(layer);
    });
  }, [battles, showBattles, onSelectBattle]);

  // Render Selected Event Marker & Auto FlyTo (對應時間軸點擊聯動)
  useEffect(() => {
    if (!mapInstanceRef.current || !layersGroupRef.current) return;
    const { events: layer } = layersGroupRef.current;
    layer.clearLayers();

    if (!selectedEvent || !selectedEvent.coordinates) return;

    // Glowing Animated Event Beacon
    const eventIcon = L.divIcon({
      className: 'custom-event-beacon',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; transform: translate(-50%, -50%); cursor: pointer;">
          <div class="pulse-ring" style="border: 3px solid #f59e0b; background: rgba(245, 158, 11, 0.4);"></div>
          <div style="width: 28px; height: 28px; border-radius: 50%; background: #d97706; border: 2px solid #fffbeb; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px #f59e0b; z-index: 10;">
            <span style="font-size: 14px; line-height: 1;">📍</span>
          </div>
        </div>
      `,
      iconSize: [0, 0],
    });

    const marker = L.marker(selectedEvent.coordinates, { icon: eventIcon, zIndexOffset: 2000 });

    const popupContent = `
      <div style="font-family: inherit; padding: 6px; min-width: 220px; max-width: 280px;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 4px;">
          <span style="font-size: 11px; font-weight: bold; background: #78350f; color: #fde68a; padding: 2px 6px; border-radius: 4px;">
            ${selectedEvent.yearDisplay}
          </span>
          <span style="font-size: 10px; color: #a1a1aa;">${selectedEvent.eraName}</span>
        </div>
        <h4 style="font-size: 14px; font-weight: bold; color: #fef3c7; margin: 4px 0;">
          ${selectedEvent.title}
        </h4>
        <p style="font-size: 11px; color: #fbbf24; margin: 2px 0;">
          <b>地點：</b>${selectedEvent.locationNameAncient} ${!ancientNamesOnly ? `(${selectedEvent.locationNameModern})` : ''}
        </p>
        <p style="font-size: 11px; color: #d4d4d8; line-height: 1.4; margin-top: 4px;">
          ${selectedEvent.summary}
        </p>
      </div>
    `;

    marker.bindPopup(popupContent, { autoClose: false, closeOnClick: false, offset: [0, -16] });
    marker.addTo(layer);

    // Smooth Fly To & Auto Open Popup
    mapInstanceRef.current.flyTo(selectedEvent.coordinates, 6.5, {
      duration: 1.0,
      easeLinearity: 0.25,
    });

    const popupTimer = setTimeout(() => {
      marker.openPopup();
    }, 500);

    return () => clearTimeout(popupTimer);
  }, [selectedEvent, ancientNamesOnly]);

  const handleResetView = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([30.5, 114.0], 5, { duration: 1 });
  };

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Leaflet Map Div */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Control Toolbar (Top Left) */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-2">
        <div className="glass-panel px-3 py-1.5 rounded-lg flex items-center gap-3 text-xs text-zinc-300">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showTerritories}
              onChange={(e) => setShowTerritories(e.target.checked)}
              className="accent-amber-500 rounded cursor-pointer"
            />
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>三國版圖</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showLocations}
              onChange={(e) => setShowLocations(e.target.checked)}
              className="accent-amber-500 rounded cursor-pointer"
            />
            <Landmark className="w-3.5 h-3.5 text-amber-400" />
            <span>古邑重鎮</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={showBattles}
              onChange={(e) => setShowBattles(e.target.checked)}
              className="accent-amber-500 rounded cursor-pointer"
            />
            <Swords className="w-3.5 h-3.5 text-rose-500" />
            <span>重大戰役</span>
          </label>
        </div>

        {/* Map Basemap Style Selector (Pure Historical Physical Terrain) */}
        <div className="glass-panel px-2 py-1 rounded-lg flex items-center gap-1 text-xs">
          <button
            onClick={() => handleChangeMapStyle('shaded')}
            title="純山川地貌陰影圖，無現代國界與干擾"
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              mapStyle === 'shaded' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            山川地勢
          </button>
          <button
            onClick={() => handleChangeMapStyle('physical')}
            title="自然海拔地形高程圖"
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              mapStyle === 'physical' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            自然高程
          </button>
          <button
            onClick={() => handleChangeMapStyle('satellite')}
            title="衛星地貌實景圖"
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              mapStyle === 'satellite' ? 'bg-amber-600 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            衛星地貌
          </button>
        </div>

        <button
          onClick={handleResetView}
          title="重設地圖視角至全境（華夏與臺灣）"
          className="glass-panel p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-[400] glass-panel px-3 py-2 rounded-lg text-xs space-y-1.5 pointer-events-auto max-w-[250px]">
        <div className="text-[11px] font-bold text-amber-400 flex items-center justify-between">
          <span>三國疆域圖例</span>
          <span className="text-[10px] text-zinc-500">西元229年</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <div className="flex items-center gap-1.5 text-blue-300">
            <span className="w-3 h-3 rounded bg-blue-500/40 border border-blue-400"></span>
            <span>曹魏 (中原/關中)</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-300">
            <span className="w-3 h-3 rounded bg-rose-500/40 border border-rose-400"></span>
            <span>蜀漢 (巴蜀/漢中)</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <span className="w-3 h-3 rounded bg-emerald-500/40 border border-emerald-400"></span>
            <span>東吳 (江東/嶺南)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="w-3 h-3 rounded bg-amber-500/40 border border-amber-400 border-dashed"></span>
            <span>夷洲 (今台灣)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
