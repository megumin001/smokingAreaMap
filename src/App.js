import {React} from 'react';
import { useState } from 'react';
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup ,useMapEvents} from 'react-leaflet';
import { Rating } from '@mui/material';
import { Button,Box, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import heartIcon from './assets/heart.png';
import logo from './assets/logo.png'
import CuteCursor from './CuteCursor';
import NyanCat from './Nyancat';
import TalkingNyanCat from "./Nyantalk"






const customIcon = new L.Icon({
  iconUrl: heartIcon,      // 好きな画像のパス
  iconSize: [32, 32],                    // アイコンのサイズ（調整してね）
  iconAnchor: [16, 32],                  // アイコンの「ここ」を座標に合わせる（下の中心が多い）
  popupAnchor: [0, -32],                 // ポップアップの表示位置調整
  shadowUrl: null,                       // 影がいらなければnullでOK
});


function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
}




const positions = [
  { 
    id: 1, 
    name: '千代田富士見前',
    lat: 35.69901386766693,
    lng: 139.7456903831707,
    rating: 5,
    type: '屋内',  
    description: '冷房の効きが良い。死んだ顔のサラリーマンと痛い私大生が多い。10人くらい入れる。',
    hours: '平日20時まで、休日閉まってる。'
  },
  { 
    id: 2,
     name: 'GAT',
      lat: 35.70069321282535, 
      lng: 139.7505679543351,
      rating: 3,
      type: '屋根あり',  
      description: '屋外分煙。死んだ顔のサラリーマンが多い。広いので入れないことはない。',
      hours:''
    },
    { 
      id: 3,
       name: '靖国神社',
        lat: 35.694599796765225, 
        lng: 139.74563349856962,
        rating: 3,
        type: '屋外',  
        description: 'トイレも含めとても清掃されている。自販機も充実。謎の力でベンチがある。',
        hours:''
      },
];






export default function App() {
  //　詳細を下に表示する用
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  const [filter, setFilter] = useState('すべて');
  // フィルターに応じて表示する喫煙所
  const filteredPositions = filter === 'すべて' ? positions
  : positions.filter(pos => pos.type === filter);
  return (
    <>



<Box
  sx={{
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#FF4264',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    p: { xs: 2, sm: 4 },
  }}
>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: {
        xs: '95vw',
        sm: '90vw',
        md: '70vw',
        lg: '60vw',
      },
      maxWidth: 900,
      minHeight: '80vh',
      gap: 3,
      backgroundColor: '#fff',
      borderRadius: 2,
      boxShadow: 3,
      p: { xs: 2, sm: 3 },
    }}
  >
    {/* ロゴとニャンキャット横並び */}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <NyanCat />
      <img
        src={logo}
        alt="ロゴ"
        style={{ width: '300px', height: 'auto', objectFit: 'contain' }}
      />
      <NyanCat />
    </Box>

    {/* フィルターのボタン群 */}
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
      {['すべて', '屋外', '屋根あり', '屋内'].map(type => (
        <Button
          key={type}
          variant={filter === type ? 'contained' : 'outlined'}
          onClick={() => setFilter(type)}
        >
          {type}
        </Button>
      ))}
    </Box>

    {/* マップ */}
    <Box sx={{ width: '100%', height: 400, mb: 2 }}>
  <MapContainer
    center={[35.710063, 139.8107]}
    zoom={15}
    style={{ height: '100%', width: '100%' }}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {filteredPositions.map(({ id, name, lat, lng ,rating,description,hours }) => (
      <Marker
        key={id}
        position={[lat, lng]}
        icon={customIcon}
        eventHandlers={{
          click: () => setSelectedPlace({ name, rating, description, hours  }),
        }}
      >
        <Popup>
          <strong>{name}</strong><br />
          <Rating value={rating} readOnly precision={1} size="large" />
        </Popup>
      </Marker>
    ))}
    <LocationMarker />
  </MapContainer>
</Box>

    {/* 選択した場所の詳細 */}
    {selectedPlace && (
      <Box
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: 600,
        }}
      >
        <Typography variant="h6">{selectedPlace.name}</Typography>
        <Rating value={selectedPlace.rating} readOnly precision={1} size="small" />
        <Typography sx={{ mt: 1 }}>
          <strong>コメント:</strong> {selectedPlace.description}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <strong>営業時間:</strong> {selectedPlace.hours}
        </Typography>
      </Box>
    )}
  </Box>
</Box>

<CuteCursor /> 

<Box
  sx={{
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 9999,
  }}
>
<Box
  sx={{
    position: {
      xs: 'fixed', // スマホのときだけ固定
      md: 'static', // PCでは普通にレイアウト内
    },
    left: { xs: 10, md: 'auto' },
    bottom: { xs: 325, md: 'auto' },
    zIndex: 9999,
  }}
>
  <TalkingNyanCat/>
</Box>
</Box>
</>
  );
}
