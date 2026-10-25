// Geographic Boundaries and Territory Polygons for Song, Liao, Jin, and Western Xia (960 - 1279 CE)
export const SONG_LIAO_TERRITORIES = {
  northSongPeak: {
    year: '1111 CE (北宋政和年間極盛版圖)',
    name: '北宋與遼夏並峙疆域',
    description: '北宋領有中原、江淮、東南、巴蜀與嶺南，東瀕大海，北以白溝河與大遼燕雲十六州為界，西北以橫山、六盤山與西夏對峙，西南與大理國、吐蕃諸部接壤。',
    polygons: [
      {
        regime: 'song',
        name: '北宋王朝 (東京開封府)',
        color: '#dc2626',
        strokeColor: '#b91c1c',
        path: 'M 400,280 Q 430,270 480,265 Q 520,265 540,270 Q 550,290 560,320 Q 570,360 560,420 Q 530,470 490,490 Q 430,470 380,440 Q 360,390 370,340 Q 380,300 400,280 Z'
      },
      {
        regime: 'liao',
        name: '大遼國 (上京臨潢府與燕雲十六州)',
        color: '#0284c7',
        strokeColor: '#0369a1',
        path: 'M 430,160 Q 520,150 580,180 Q 610,210 590,250 Q 540,265 480,265 Q 430,250 420,210 Q 425,180 430,160 Z'
      },
      {
        regime: 'xia',
        name: '大夏國 (西夏·興慶府)',
        color: '#7c3aed',
        strokeColor: '#6d28d9',
        path: 'M 320,220 Q 380,210 410,240 Q 400,280 360,290 Q 330,270 320,220 Z'
      },
      {
        regime: 'dali',
        name: '大理國 (雲南羊苴咩城)',
        color: '#10b981',
        strokeColor: '#059669',
        path: 'M 330,440 Q 370,440 375,480 Q 350,510 320,490 Q 315,460 330,440 Z'
      },
      {
        regime: 'penghu',
        name: '澎湖與夷州（臺灣·東番）',
        color: '#f59e0b',
        strokeColor: '#d97706',
        path: 'M 596,462 Q 604,475 602,492 Q 595,495 591,480 Q 590,468 596,462 Z'
      }
    ]
  },
  southSongPeak: {
    year: '1142 CE (紹興和議劃淮為界)',
    name: '南宋與金朝對峙疆域',
    description: '紹興和議後，南宋與大金帝國劃淮水、大散關為界。金朝領有黃河流域中原大部、遼東與塞北，南宋保全秦嶺淮河以南之東南半壁、巴蜀江漢，西夏偏安西北，蒙古各部在漠北崛起。',
    polygons: [
      {
        regime: 'southSong',
        name: '南宋王朝 (行在臨安府)',
        color: '#b91c1c',
        strokeColor: '#991b1b',
        path: 'M 400,340 Q 460,335 520,340 Q 550,345 565,370 Q 570,420 560,450 Q 530,480 480,490 Q 420,470 380,430 Q 380,380 400,340 Z'
      },
      {
        regime: 'jin',
        name: '大金帝國 (中都大興府與開封)',
        color: '#ca8a04',
        strokeColor: '#a16207',
        path: 'M 410,160 Q 530,150 600,180 Q 620,230 570,300 Q 520,338 460,335 Q 410,330 400,280 Q 410,210 410,160 Z'
      },
      {
        regime: 'xia',
        name: '大夏國 (西夏·興慶府)',
        color: '#7c3aed',
        strokeColor: '#6d28d9',
        path: 'M 320,220 Q 380,210 410,240 Q 400,290 350,300 Q 320,270 320,220 Z'
      },
      {
        regime: 'mongol',
        name: '大蒙古國 (斡難河斡兒朵)',
        color: '#2563eb',
        strokeColor: '#1d4ed8',
        path: 'M 380,110 Q 480,100 550,120 Q 530,160 440,160 Q 370,150 380,110 Z'
      }
    ]
  }
};
