// 二戰歐洲戰場人物（規劃 v6 第 9.4 節，批次 1）。生卒日期來自 Encyclopaedia Britannica 傳記條目的開頭（輔助來源，
// 第 9.5 節），每筆以 claims 標出 birthDeathDisplay。本模組人物的 abilities 明設為 null，不計算娛樂性評分，人物彈窗不顯示雷達圖。
// 查不到生卒日期的人物（例如雷茲-希米格維）暫不建立，戰役中以純文字列名。帕克、利斯特當時因 Britannica 只有短條目暫緩，
// 2026-11-28 改用維基百科建立（指揮官人物卡第 2 批）。
const britannica = (name, slug, birthDeath) => ({
  title: `Encyclopaedia Britannica: ${name}`,
  url: `https://www.britannica.com/biography/${slug}`,
  externalReviewed: true, reviewedAt: '2026-11-07', auxiliary: true, accessedAt: '2026-11-07',
  claimScope: `條目開頭的生卒：${birthDeath}`,
  claims: ['birthDeathDisplay'],
});

// Britannica 沒有完整條目時改用英文維基百科資訊框的 Born／Died 欄（輔助來源，擴充第 1 批，2026-11-21）。
const wikipediaFigure = (article, name, birthDeath) => ({
  title: `Wikipedia (English): ${name}`,
  url: `https://en.wikipedia.org/wiki/${article}`,
  externalReviewed: true, reviewedAt: '2026-11-21', auxiliary: true, accessedAt: '2026-11-21',
  claimScope: `資訊框的生卒：${birthDeath}`,
  claims: ['birthDeathDisplay'],
});

// 指揮官人物卡第 1 批（規劃 v15 第二十節，2026-11-27 Ivan 核准）：英文維基百科資訊框，網址固定到查閱時的版本（oldid）。
// 中文名稱沿用戰役指揮官欄已用的譯名（本專案慣用譯名，未對照官方譯名表）。
// 第 2 批（2026-11-28 查閱）傳入查閱日；第 1 批沿用預設的 2026-11-27。
const wikipediaFigureRev = (article, revid, name, birthDeath, accessedAt = '2026-11-27') => ({
  ...wikipediaFigure(article, name, birthDeath),
  url: `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(article)}&oldid=${revid}`,
  reviewedAt: accessedAt, accessedAt,
});

// birthplace 取自同一條目開頭的出生地，避免人物彈窗套用通用的籍貫預設值。
const figure = ({ id, name, faction, role, birth, death, birthDeathDisplay, birthplace, shortBio, participatedEventIds = [], source }) => ({
  id, name, faction, role, roles: [role], nativePlaceAncient: birthplace, abilities: null,
  birthYear: Number(birth.slice(0, 4)), deathYear: Number(death.slice(0, 4)), birthDeathDisplay,
  shortBio, bio: shortBio, avatar: null, participatedEventIds, relations: [], sources: [source],
});

export const EUROPEWAR_FIGURE_RECORDS = [
  figure({
    id: 'fig_ew_hitler', name: '希特勒', faction: 'axis', role: '德國元首',
    birth: '1889', death: '1945', birthDeathDisplay: '1889 年 4 月 20 日 – 1945 年 4 月 30 日', birthplace: '奧地利布勞瑙',
    shortBio: '生於奧地利布勞瑙，1945 年 4 月 30 日死於柏林。',
    source: britannica('Adolf Hitler', 'Adolf-Hitler', 'born April 20, 1889, Braunau am Inn — died April 30, 1945, Berlin'),
  }),
  figure({
    id: 'fig_ew_goering', name: '戈林', faction: 'axis', role: '德國空軍司令',
    birth: '1893', death: '1946', birthDeathDisplay: '1893 年 1 月 12 日 – 1946 年 10 月 15 日', birthplace: '德國羅森海姆',
    shortBio: '德國空軍司令，不列顛空戰中指揮德國空軍。生於羅森海姆，1946 年死於紐倫堡。',
    source: britannica('Hermann Göring', 'Hermann-Goring', 'born January 12, 1893, Rosenheim — died October 15, 1946, Nuremberg'),
  }),
  figure({
    id: 'fig_ew_doenitz', name: '鄧尼茲', faction: 'axis', role: '德國海軍將領',
    birth: '1891', death: '1980', birthDeathDisplay: '1891 年 9 月 16 日 – 1980 年 12 月 24 日', birthplace: '德國柏林近郊格呂瑙',
    shortBio: '德國海軍將領。生於柏林近郊的格呂瑙，1980 年死於奧米勒。',
    source: britannica('Karl Dönitz', 'Karl-Donitz', 'born September 16, 1891, Grünau-bei-Berlin — died December 24, 1980, Aumühle'),
  }),
  figure({
    id: 'fig_ew_guderian', name: '古德里安', faction: 'axis', role: '德國陸軍將領',
    birth: '1888', death: '1954', birthDeathDisplay: '1888 年 6 月 17 日 – 1954 年 5 月 14 日', birthplace: '庫爾姆',
    shortBio: '德國陸軍將領。生於庫爾姆，1954 年死於福森附近的施萬高。',
    source: britannica('Heinz Guderian', 'Heinz-Guderian', 'born June 17, 1888, Kulm — died May 14, 1954, Schwangau bei Füssen'),
  }),
  figure({
    id: 'fig_ew_rundstedt', name: '倫德施泰特', faction: 'axis', role: '德國陸軍將領',
    birth: '1875', death: '1953', birthDeathDisplay: '1875 年 12 月 12 日 – 1953 年 2 月 24 日', birthplace: '德國阿舍斯萊本',
    shortBio: '德國陸軍將領。生於阿舍斯萊本，1953 年死於漢諾威。',
    source: britannica('Gerd von Rundstedt', 'Gerd-von-Rundstedt', 'born Dec. 12, 1875, Aschersleben — died Feb. 24, 1953, Hannover'),
  }),
  figure({
    id: 'fig_ew_manstein', name: '曼斯坦', faction: 'axis', role: '德國陸軍將領',
    birth: '1887', death: '1973', birthDeathDisplay: '1887 年 11 月 24 日 – 1973 年 6 月 11 日', birthplace: '德國柏林',
    shortBio: '德國陸軍將領。生於柏林，1973 年死於伊爾申豪森。',
    source: britannica('Erich von Manstein', 'Erich-von-Manstein', 'born Nov. 24, 1887, Berlin — died June 11, 1973, Irschenhausen'),
  }),
  figure({
    id: 'fig_ew_mussolini', name: '墨索里尼', faction: 'axis', role: '義大利總理',
    birth: '1883', death: '1945', birthDeathDisplay: '1883 年 7 月 29 日 – 1945 年 4 月 28 日', birthplace: '義大利普雷達皮奧',
    shortBio: '義大利總理（1922–1943），20 世紀歐洲第一位法西斯獨裁者。生於普雷達皮奧，1945 年死於東戈附近。',
    source: britannica('Benito Mussolini', 'Benito-Mussolini', 'born July 29, 1883, Predappio, Italy — died April 28, 1945, near Dongo'),
  }),
  figure({
    id: 'fig_ew_stalin', name: '史達林', faction: 'other', role: '蘇聯領導人',
    birth: '1878', death: '1953', birthDeathDisplay: '1878 年 12 月 18 日（舊曆 12 月 6 日） – 1953 年 3 月 5 日', birthplace: '喬治亞哥里',
    shortBio: '蘇聯領導人。生於喬治亞哥里，1953 年死於莫斯科。',
    source: britannica('Joseph Stalin', 'Joseph-Stalin', 'born December 18 [December 6, Old Style], 1878, Gori — died March 5, 1953, Moscow'),
  }),
  figure({
    id: 'fig_ew_churchill', name: '邱吉爾', faction: 'allies', role: '英國首相',
    birth: '1874', death: '1965', birthDeathDisplay: '1874 年 11 月 30 日 – 1965 年 1 月 24 日', birthplace: '英格蘭牛津郡布倫海姆宮',
    shortBio: '英國政治家，1940–1945 年與 1951–1955 年任首相，二戰期間領導英國。生於牛津郡布倫海姆宮，1965 年死於倫敦。',
    participatedEventIds: ['evt_ew_churchill_prime_minister_1940'],
    source: britannica('Winston Churchill', 'Winston-Churchill', 'born November 30, 1874, Blenheim Palace, Oxfordshire, England — died January 24, 1965, London'),
  }),
  figure({
    id: 'fig_ew_dowding', name: '道丁', faction: 'allies', role: '英國空軍戰鬥機司令部司令',
    birth: '1882', death: '1970', birthDeathDisplay: '1882 年 4 月 24 日 – 1970 年 2 月 15 日', birthplace: '蘇格蘭莫法特',
    shortBio: '英國空軍上將，不列顛空戰期間任戰鬥機司令部司令。生於蘇格蘭莫法特，1970 年死於肯特郡坦布里奇韋爾斯。',
    source: britannica('Hugh Dowding', 'Hugh-Caswall-Tremenheere-Dowding-1st-Baron-Dowding', 'born April 24, 1882, Moffat, Dumfriesshire, Scot. — died Feb. 15, 1970, Tunbridge Wells, Kent, Eng.'),
  }),
  figure({
    id: 'fig_ew_gamelin', name: '甘末林', faction: 'allies', role: '法軍總司令',
    birth: '1872', death: '1958', birthDeathDisplay: '1872 年 9 月 20 日 – 1958 年 4 月 18 日', birthplace: '法國巴黎',
    shortBio: '二戰開始時的法軍總司令，未能阻止 1940 年 5 月德軍對法國的攻擊。生於巴黎，1958 年死於巴黎。',
    source: britannica('Maurice Gamelin', 'Maurice-Gustave-Gamelin', 'born Sept. 20, 1872, Paris, Fr. — died April 18, 1958, Paris'),
  }),
  figure({
    id: 'fig_ew_weygand', name: '魏剛', faction: 'allies', role: '在法國的盟軍總司令',
    birth: '1867', death: '1965', birthDeathDisplay: '1867 年 1 月 21 日 – 1965 年 1 月 28 日', birthplace: '布魯塞爾',
    shortBio: '法國陸軍軍官，二戰中任在法國的盟軍總司令，1940 年 6 月 12 日建議法國政府投降。生於布魯塞爾，1965 年死於巴黎。',
    source: britannica('Maxime Weygand', 'Maxime-Weygand', 'born Jan. 21, 1867, Brussels — died Jan. 28, 1965, Paris'),
  }),
  figure({
    id: 'fig_ew_mannerheim', name: '曼納海姆', faction: 'other', role: '芬蘭軍事領袖',
    birth: '1867', death: '1951', birthDeathDisplay: '1867 年 6 月 4 日 – 1951 年 1 月 27 日', birthplace: '芬蘭阿斯凱寧',
    shortBio: '芬蘭軍事領袖與政治家，二戰期間領導芬蘭抵禦蘇聯，1944–1946 年任總統。生於芬蘭阿斯凱寧，1951 年死於瑞士洛桑。',
    source: britannica('Carl Gustaf Mannerheim', 'Carl-Gustaf-Emil-Mannerheim', 'born June 4, 1867, Askainen, Finland — died January 27, 1951, Lausanne, Switzerland'),
  }),
  figure({
    id: 'fig_ew_zhukov', name: '朱可夫', faction: 'allies', role: '蘇聯元帥',
    birth: '1896', death: '1974', birthDeathDisplay: '1896 年 12 月 1 日（舊曆 11 月 19 日） – 1974 年 6 月 18 日', birthplace: '俄國卡盧加省',
    shortBio: '蘇聯元帥，二戰期間最重要的蘇聯軍事指揮官。1941 年 1 月任紅軍總參謀長；德國入侵後組織列寧格勒防禦，指揮莫斯科防禦與 1941 年 12 月的反攻。1974 年死於莫斯科。',
    source: britannica('Georgy Zhukov', 'Georgy-Zhukov', 'born December 1 [November 19, Old Style], 1896, Kaluga province, Russia — died June 18, 1974, Moscow'),
  }),
  figure({
    id: 'fig_ew_roosevelt', name: '羅斯福', faction: 'allies', role: '美國總統',
    birth: '1882', death: '1945', birthDeathDisplay: '1882 年 1 月 30 日 – 1945 年 4 月 12 日', birthplace: '美國紐約州海德公園',
    shortBio: '美國第 32 任總統（1933–1945），唯一四度當選的美國總統。1945 年死於喬治亞州溫泉鎮。',
    source: britannica('Franklin D. Roosevelt', 'Franklin-D-Roosevelt', 'born January 30, 1882, Hyde Park, New York, U.S. — died April 12, 1945, Warm Springs, Georgia'),
  }),
  figure({
    id: 'fig_ew_rommel', name: '隆美爾', faction: 'axis', role: '德國陸軍元帥',
    birth: '1891', death: '1944', birthDeathDisplay: '1891 年 11 月 15 日 – 1944 年 10 月 14 日', birthplace: '德國海登海姆',
    shortBio: '德國陸軍元帥，以指揮非洲軍團的勝利聞名，在國內最受歡迎，也受到敵方尊敬。1944 年死於烏爾姆附近的黑爾林根。',
    source: britannica('Erwin Rommel', 'Erwin-Rommel', 'born November 15, 1891, Heidenheim, Germany — died October 14, 1944, Herrlingen, near Ulm'),
  }),
  figure({
    id: 'fig_ew_paulus', name: '保盧斯', faction: 'axis', role: '德國陸軍元帥',
    birth: '1890', death: '1957', birthDeathDisplay: '1890 年 9 月 23 日 – 1957 年 2 月 1 日', birthplace: '布賴特瑙（今屬奧地利）',
    shortBio: '德國陸軍元帥，1942 年夏秋向史達林格勒推進，是納粹軍事擴張的最高點。1957 年死於東德德勒斯登。',
    source: britannica('Friedrich Paulus', 'Friedrich-Paulus', 'born September 23, 1890, Breitenau, Germany [now in Austria] — died February 1, 1957, Dresden, East Germany'),
  }),
  figure({
    id: 'fig_ew_montgomery', name: '蒙哥馬利', faction: 'allies', role: '英國陸軍元帥',
    birth: '1887', death: '1976', birthDeathDisplay: '1887 年 11 月 17 日 – 1976 年 3 月 24 日', birthplace: '英格蘭倫敦',
    shortBio: '英國陸軍元帥，二戰中傑出的盟軍指揮官之一。1976 年死於漢普郡奧爾頓附近。',
    source: britannica('Bernard Law Montgomery', 'Bernard-Law-Montgomery-1st-Viscount-Montgomery', 'born November 17, 1887, London, England — died March 24, 1976, near Alton, Hampshire'),
  }),
  figure({
    id: 'fig_ew_eisenhower', name: '艾森豪', faction: 'allies', role: '盟軍最高指揮官',
    birth: '1890', death: '1969', birthDeathDisplay: '1890 年 10 月 14 日 – 1969 年 3 月 28 日', birthplace: '美國德州丹尼森',
    shortBio: '二戰期間任西歐盟軍最高指揮官，後任美國第 34 任總統（1953–1961）。1969 年死於華盛頓特區。',
    participatedEventIds: ['evt_ew_italian_armistice_1943'],
    source: britannica('Dwight D. Eisenhower', 'Dwight-D-Eisenhower', 'born October 14, 1890, Denison, Texas, U.S. — died March 28, 1969, Washington, D.C.'),
  }),
  figure({
    id: 'fig_ew_patton', name: '巴頓', faction: 'allies', role: '美國陸軍將領',
    birth: '1885', death: '1945', birthDeathDisplay: '1885 年 11 月 11 日 – 1945 年 12 月 21 日', birthplace: '美國加州聖蓋博',
    shortBio: '美國陸軍軍官，二戰期間在歐洲與地中海戰場擅長機動戰車作戰。1945 年死於德國海德堡。',
    source: britannica('George Patton', 'George-Smith-Patton', 'born November 11, 1885, San Gabriel, California, U.S. — died December 21, 1945, Heidelberg, Germany'),
  }),
  figure({
    id: 'fig_ew_alexander', name: '亞歷山大', faction: 'allies', role: '英國陸軍元帥',
    birth: '1891', death: '1969', birthDeathDisplay: '1891 年 12 月 10 日 – 1969 年 6 月 16 日', birthplace: '英格蘭倫敦',
    shortBio: '英國陸軍元帥，以在北非對抗隆美爾的戰役及之後在義大利、西歐的指揮聞名。1969 年死於白金漢郡斯勞。',
    source: britannica('Harold Alexander', 'Harold-Rupert-Leofric-George-Alexander-1st-Earl-Alexander-of-Tunis', 'born Dec. 10, 1891, London — died June 16, 1969, Slough, Buckinghamshire, Eng.'),
  }),
  figure({
    id: 'fig_ew_konev', name: '科涅夫', faction: 'allies', role: '蘇聯元帥',
    birth: '1897', death: '1973', birthDeathDisplay: '1897 年 12 月 28 日 – 1973 年 5 月 21 日', birthplace: '俄羅斯大烏斯秋格附近的洛傑伊諾',
    shortBio: '二戰中傑出的蘇聯將領之一，領導對德攻勢；1945 年與朱可夫競相攻取柏林。1973 年死於莫斯科。',
    source: britannica('Ivan Stepanovich Konev', 'Ivan-Stepanovich-Konev', 'born Dec. 28 [Dec. 16, Old Style], 1897, Lodeino, near Veliky Ustyug, Russia — died May 21, 1973, Moscow'),
  }),
  figure({
    id: 'fig_ew_model', name: '莫德爾', faction: 'axis', role: '德國陸軍元帥',
    birth: '1891', death: '1945', birthDeathDisplay: '1891 年 1 月 24 日 – 1945 年 4 月 21 日', birthplace: '德國馬格德堡附近的根廷',
    shortBio: '二戰德國陸軍元帥，市場花園行動時任 B 集團軍群司令。1945 年 4 月死於林托夫附近。',
    source: britannica('Walther Model', 'Walther-Model', 'born Jan. 24, 1891, Genthin, near Magdeburg, Ger. — died April 21, 1945, near Lintorf'),
  }),
  figure({
    id: 'fig_ew_degaulle', name: '戴高樂', faction: 'allies', role: '自由法國領袖',
    birth: '1890', death: '1970', birthDeathDisplay: '1890 年 11 月 22 日 – 1970 年 11 月 9 日', birthplace: '法國里爾',
    shortBio: '法國軍人、作家與政治家，法蘭西第五共和的締造者。1944 年 8 月巴黎解放後才獲盟國完全承認其領導地位。1970 年死於科隆貝雙教堂村。',
    participatedEventIds: ['evt_ew_liberation_of_paris_1944'],
    source: britannica('Charles de Gaulle', 'Charles-de-Gaulle-president-of-France', 'born November 22, 1890, Lille, France — died November 9, 1970, Colombey-les-deux-Églises'),
  }),
  // ── 擴充第 1 批（規劃 v9 第十四節，2026-11-21）──
  // 華西列夫斯基、瓦圖京、托爾布欣：Britannica 沒有完整條目（只有索引頁），生卒日期改用英文維基百科資訊框（同為輔助來源）。
  figure({
    id: 'fig_ew_kesselring', name: '凱塞林', faction: 'axis', role: '德國陸軍元帥（南線總司令）',
    birth: '1885', death: '1960', birthDeathDisplay: '1885 年 11 月 20 日 – 1960 年 7 月 16 日', birthplace: '德國巴伐利亞馬克特施泰特',
    shortBio: '德國元帥，以南線總司令身分成為希特勒最倚重的防禦戰略家之一。盟軍 1943 年登陸西西里與義大利後，他在義大利打出頑強的防禦戰。1945 年 3 月改任西線總司令。1960 年死於西德巴特瑙海姆。',
    source: britannica('Albert Kesselring', 'Albert-Kesselring', 'born November 20, 1885, Marktstedt, Bavaria, Germany — died July 16, 1960, Bad Nauheim, West Germany'),
  }),
  figure({
    id: 'fig_ew_clark', name: '克拉克', faction: 'allies', role: '美國陸軍將領（第 5 軍團司令）',
    birth: '1896', death: '1984', birthDeathDisplay: '1896 年 5 月 1 日 – 1984 年 4 月 17 日', birthplace: '美國紐約州麥迪遜兵營',
    shortBio: '美國陸軍軍官，1943–44 年在義大利戰役指揮盟軍。以美國第 5 軍團司令身分在薩萊諾登陸，1944 年 6 月 4 日進入羅馬；同年 12 月升任第 15 集團軍群司令。1984 年死於南卡羅來納州查爾斯頓。',
    source: britannica('Mark Clark', 'Mark-Clark', 'born May 1, 1896, Madison Barracks, N.Y., U.S. — died April 17, 1984, Charleston, S.C.'),
  }),
  figure({
    id: 'fig_ew_rokossovsky', name: '羅科索夫斯基', faction: 'allies', role: '蘇聯元帥',
    birth: '1896', death: '1968', birthDeathDisplay: '1896 年 12 月 21 日 – 1968 年 8 月 3 日', birthplace: '俄羅斯大盧基',
    shortBio: '蘇聯將領，1938 年大清洗中入獄，1941 年德國入侵後獲釋。在莫斯科、史達林格勒、庫斯克等戰役擔任要角，並參與 1944 年白俄羅斯、1945 年東普魯士與波美拉尼亞的攻勢。在史達林格勒指揮頓河方面軍，與其他蘇軍包圍並殲滅德軍第 6 集團軍。1968 年死於莫斯科。',
    source: britannica('Konstantin Konstantinovich Rokossovsky', 'Konstantin-Konstantinovich-Rokossovsky', 'born December 21 [December 9, Old Style], 1896, Velikiye Luki, Russia — died August 3, 1968, Moscow'),
  }),
  figure({
    id: 'fig_ew_chuikov', name: '崔可夫', faction: 'allies', role: '蘇聯將領',
    birth: '1900', death: '1982', birthDeathDisplay: '1900 年 2 月 12 日 – 1982 年 3 月 18 日', birthplace: '俄羅斯莫斯科附近的謝列布良內普魯德',
    shortBio: '蘇聯將領（後升元帥），奉召指揮史達林格勒的城市防禦，之後率部轉戰頓內次盆地、克里米亞與白俄羅斯，並擔任攻向柏林的先鋒，親自接受柏林德軍投降。1982 年死於莫斯科。',
    source: britannica('Vasily Chuikov', 'Vasily-Chuikov', 'born February 12 [January 31, Old Style], 1900, Serebryannye Prudy, near Moscow — died March 18, 1982, Moscow'),
  }),
  figure({
    id: 'fig_ew_vasilevsky', name: '華西列夫斯基', faction: 'allies', role: '蘇聯元帥（總參謀長）',
    birth: '1895', death: '1977', birthDeathDisplay: '1895 年 9 月 30 日 – 1977 年 12 月 5 日', birthplace: '俄羅斯新戈利奇哈',
    shortBio: '蘇聯將領，二戰期間任總參謀長與國防部副部長，官至蘇聯元帥；1949–53 年任國防部長。1977 年死於莫斯科。',
    source: wikipediaFigure('Aleksandr_Vasilevsky', 'Aleksandr Vasilevsky', 'Born 30 September 1895, Novaya Golchikha — Died 5 December 1977, Moscow'),
  }),
  figure({
    id: 'fig_ew_vatutin', name: '瓦圖京', faction: 'allies', role: '蘇聯將領',
    birth: '1901', death: '1944', birthDeathDisplay: '1901 年 12 月 16 日 – 1944 年 4 月 15 日', birthplace: '俄羅斯沃羅涅日省切普希諾',
    shortBio: '蘇聯將領，先後任西南方面軍、沃羅涅日方面軍司令，之後率烏克蘭第 1 方面軍收復基輔。1944 年 2 月遭烏克蘭反抗軍伏擊，4 月傷重死於基輔。',
    source: wikipediaFigure('Nikolai_Vatutin', 'Nikolai Vatutin', 'Born 16 December 1901, Chepukhino — Died 15 April 1944, Kiev'),
  }),
  figure({
    id: 'fig_ew_malinovsky', name: '馬利諾夫斯基', faction: 'allies', role: '蘇聯元帥',
    birth: '1898', death: '1967', birthDeathDisplay: '1898 年 11 月 23 日 – 1967 年 3 月 31 日', birthplace: '烏克蘭敖德薩',
    shortBio: '蘇聯元帥。1942 年 12 月以近衛第 2 集團軍司令身分在史達林格勒戰役擔任要角，1944 年底指揮攻入羅馬尼亞，1945 年春攻入奧地利；1957–67 年任蘇聯國防部長。1967 年死於莫斯科。',
    source: britannica('Rodion Yakovlevich Malinovsky', 'Rodion-Yakovlevich-Malinovsky', 'born Nov. 23 [Nov. 11, old style], 1898, Odessa, Ukraine, Russian Empire — died March 31, 1967, Moscow'),
  }),
  figure({
    id: 'fig_ew_tolbukhin', name: '托爾布欣', faction: 'allies', role: '蘇聯元帥',
    birth: '1894', death: '1949', birthDeathDisplay: '1894 年 6 月 16 日 – 1949 年 10 月 17 日', birthplace: '俄羅斯雅羅斯拉夫爾省安德羅尼基',
    shortBio: '蘇聯元帥，參與史達林格勒戰役；以烏克蘭第 4 方面軍司令身分協助馬利諾夫斯基進行聶伯河下游的攻勢。1949 年死於莫斯科。',
    source: wikipediaFigure('Fyodor_Tolbukhin', 'Fyodor Tolbukhin', 'Born 16 June 1894, Androniki, Yaroslavl Governorate — Died 17 October 1949, Moscow'),
  }),
  // ── 擴充第 2 批（規劃 v10 第十五節，2026-11-21）──
  // 阿尼姆、帕奇、呂特晏斯、博爾-科莫羅夫斯基：Britannica 沒有完整條目或查不到，生卒日期改用英文維基百科資訊框。
  figure({
    id: 'fig_ew_bradley', name: '布萊德雷', faction: 'allies', role: '美國陸軍將領（第 12 集團軍群司令）',
    birth: '1893', death: '1981', birthDeathDisplay: '1893 年 2 月 12 日 – 1981 年 4 月 8 日', birthplace: '美國密蘇里州克拉克',
    shortBio: '美國陸軍軍官，二戰時指揮第 12 集團軍群；戰後任美國首任參謀長聯席會議主席（1949–53）。北非戰役任第 2 軍軍長，1943 年 5 月攻占比塞大；1944 年任美國第 1 軍團司令，參加諾曼第登陸。1981 年死於紐約。',
    source: britannica('Omar Bradley', 'Omar-Nelson-Bradley', 'born February 12, 1893, Clark, Missouri, U.S. — died April 8, 1981, New York, New York'),
  }),
  figure({
    id: 'fig_ew_cunningham', name: '坎寧安', faction: 'allies', role: '英國海軍將領（地中海艦隊總司令）',
    birth: '1883', death: '1963', birthDeathDisplay: '1883 年 1 月 7 日 – 1963 年 6 月 12 日', birthplace: '愛爾蘭都柏林',
    shortBio: '英國海軍軍官，二戰爆發時任地中海艦隊總司令，1943–46 年任第一海務大臣。1940 年 11 月空襲塔蘭托，使 3 艘義大利戰艦失去戰力；1941 年 3 月在馬塔潘角海戰擊沉 3 艘義大利巡洋艦。1963 年死於倫敦。',
    source: britannica('Andrew Browne Cunningham', 'Andrew-Browne-Cunningham', 'born January 7, 1883, Dublin, Ireland — died June 12, 1963, London, England'),
  }),
  figure({
    id: 'fig_ew_freyberg', name: '弗賴伯格', faction: 'allies', role: '紐西蘭遠征軍司令',
    birth: '1889', death: '1963', birthDeathDisplay: '1889 年 3 月 21 日 – 1963 年 7 月 4 日', birthplace: '英格蘭薩里郡里奇蒙',
    shortBio: '二戰時任紐西蘭遠征軍司令（1939–45），1941 年在克里特島戰役指揮盟軍；之後在第二次阿拉曼戰役率部突破，並轉戰北非與義大利。1946–52 年任紐西蘭總督。1963 年死於伯克郡溫莎。',
    source: britannica('Bernard Cyril Freyberg, 1st Baron Freyberg', 'Bernard-Cyril-Freyberg-1st-Baron-Freyberg-of-Wellington-and-of-Munstead', 'born March 21, 1889, Richmond, Surrey, Eng. — died July 4, 1963, Windsor, Berkshire'),
  }),
  figure({
    id: 'fig_ew_harris', name: '哈里斯', faction: 'allies', role: '英國皇家空軍轟炸機司令部總司令',
    birth: '1892', death: '1984', birthDeathDisplay: '1892 年 4 月 13 日 – 1984 年 4 月 5 日', birthplace: '英格蘭格洛斯特郡切爾滕納姆',
    shortBio: '英國空軍軍官，1942 年 2 月起任皇家空軍轟炸機司令部總司令，主導對德國的飽和轟炸，最著名的是對漢堡與德勒斯登的燃燒彈轟炸。1984 年死於牛津郡泰晤士河畔戈林。',
    participatedEventIds: ['evt_ew_bombing_of_dresden_1945'],
    source: britannica('Sir Arthur Travers Harris, 1st Baronet', 'Sir-Arthur-Travers-Harris-1st-Baronet', 'born April 13, 1892, Cheltenham, Gloucestershire, England — died April 5, 1984, Goring-on-Thames, Oxfordshire'),
  }),
  figure({
    id: 'fig_ew_arnim', name: '阿尼姆', faction: 'axis', role: '德國陸軍將領',
    birth: '1889', death: '1962', birthDeathDisplay: '1889 年 4 月 4 日 – 1962 年 9 月 1 日', birthplace: '德國恩斯多夫',
    shortBio: '德國國防軍將領，二戰期間指揮多個軍團，是北非軸心軍的最後一任指揮官。1962 年死於西德巴特維爾東根。',
    source: wikipediaFigure('Hans-Jürgen_von_Arnim', 'Hans-Jürgen von Arnim', 'Born 4 April 1889, Ernsdorf — Died 1 September 1962, Bad Wildungen'),
  }),
  figure({
    id: 'fig_ew_patch', name: '帕奇', faction: 'allies', role: '美國陸軍將領（第 7 軍團司令）',
    birth: '1889', death: '1945', birthDeathDisplay: '1889 年 11 月 23 日 – 1945 年 11 月 21 日', birthplace: '美國亞利桑那領地華丘卡堡',
    shortBio: '美國陸軍將領，二戰時先在太平洋指揮瓜達康納爾島戰役的美國陸軍與陸戰隊，之後在歐洲西線指揮第 7 軍團。1945 年 11 月死於德州山姆休士頓堡。',
    source: wikipediaFigure('Alexander_Patch', 'Alexander Patch', 'Born 23 November 1889, Fort Huachuca, Arizona Territory — Died 21 November 1945, Fort Sam Houston, Texas'),
  }),
  figure({
    id: 'fig_ew_luetjens', name: '呂特晏斯', faction: 'axis', role: '德國海軍將領',
    birth: '1889', death: '1941', birthDeathDisplay: '1889 年 5 月 25 日 – 1941 年 5 月 27 日', birthplace: '德國威斯巴登',
    shortBio: '德國海軍將領，1941 年指揮戰艦俾斯麥號出擊大西洋，在俾斯麥號的最後一戰中陣亡。',
    source: wikipediaFigure('Günther_Lütjens', 'Günther Lütjens', 'Born 25 May 1889, Wiesbaden — Died 27 May 1941, North Atlantic'),
  }),
  figure({
    id: 'fig_ew_bor_komorowski', name: '博爾-科莫羅夫斯基', faction: 'allies', role: '波蘭救國軍將領',
    birth: '1895', death: '1966', birthDeathDisplay: '1895 年 6 月 1 日 – 1966 年 8 月 24 日', birthplace: '加利西亞霍羅布里夫',
    shortBio: '波蘭軍事領袖，本名塔德烏什・科莫羅夫斯基，「博爾」（森林）是戰時代號。華沙起義投降前一天被任命為總司令；戰後任倫敦流亡政府總理。1966 年死於倫敦。',
    source: wikipediaFigure('Tadeusz_Bór-Komorowski', 'Tadeusz Bór-Komorowski', 'Born 1 June 1895, Khorobriv, Galicia — Died 24 August 1966, London'),
  }),
  // 擴充第 3 批（規劃 v11 第十六節，2026-11-21）：生卒與出生地同樣取英文維基百科資訊框。
  figure({
    id: 'fig_ew_timoshenko', name: '鐵木辛哥', faction: 'allies', role: '蘇聯元帥',
    birth: '1895', death: '1970', birthDeathDisplay: '1895 年 2 月 18 日 – 1970 年 3 月 31 日', birthplace: '俄羅斯帝國比薩拉比亞奧爾曼',
    shortBio: '蘇聯元帥，生於比薩拉比亞的烏克蘭家庭。1939 年率烏克蘭方面軍入侵波蘭；二戰期間先後指揮西方面軍、西南方面軍、西北方面軍。1970 年死於莫斯科。',
    source: wikipediaFigure('Semyon_Timoshenko', 'Semyon Timoshenko', 'Born 18 February 1895, Orman, Russian Empire — Died 31 March 1970, Moscow'),
  }),
  figure({
    id: 'fig_ew_budyonny', name: '布瓊尼', faction: 'allies', role: '蘇聯元帥（騎兵將領）',
    birth: '1883', death: '1973', birthDeathDisplay: '1883 年 4 月 25 日 – 1973 年 10 月 26 日', birthplace: '俄羅斯頓河軍區普拉托夫斯卡亞',
    shortBio: '蘇聯騎兵將領，內戰時創建紅軍第 1 騎兵軍團，是史達林的政治盟友。二戰期間指揮西南方向、南方面軍、預備方面軍、北高加索方面軍。1973 年死於莫斯科。',
    source: wikipediaFigure('Semyon_Budyonny', 'Semyon Budyonny', 'Born 25 April 1883, Platovskaya, Don Host Oblast — Died 26 October 1973, Moscow'),
  }),
  figure({
    id: 'fig_ew_bock', name: '博克', faction: 'axis', role: '德國陸軍元帥',
    birth: '1880', death: '1945', birthDeathDisplay: '1880 年 12 月 3 日 – 1945 年 5 月 4 日', birthplace: '普魯士屈斯特林',
    shortBio: '德國陸軍元帥。1939 年入侵波蘭時任北方集團軍群司令，1940 年法國戰役任 B 集團軍群司令，1941 年巴巴羅薩行動任中央集團軍群司令並指揮颱風行動，1942 年任東線南方集團軍群司令。1945 年 5 月死於霍爾斯坦的奧爾登堡。',
    source: wikipediaFigure('Fedor_von_Bock', 'Fedor von Bock', 'Born 3 December 1880, Cüstrin, Kingdom of Prussia — Died 4 May 1945, Oldenburg in Holstein'),
  }),
  figure({
    id: 'fig_ew_kleist', name: '克萊斯特', faction: 'axis', role: '德國陸軍元帥',
    birth: '1881', death: '1954', birthDeathDisplay: '1881 年 8 月 8 日 – 1954 年 11 月 13 日', birthplace: '德國布勞恩費爾斯',
    shortBio: '德國陸軍元帥，指揮克萊斯特裝甲集群（後改為第 1 裝甲軍團），參加法國戰役、南斯拉夫入侵與巴巴羅薩行動，後任 A 集團軍群司令。1954 年死於蘇聯弗拉基米爾監獄。',
    source: wikipediaFigure('Paul_Ludwig_Ewald_von_Kleist', 'Paul Ludwig Ewald von Kleist', 'Born 8 August 1881, Braunfels — Died 13 November 1954, Vladimir Prison, Soviet Union'),
  }),
  figure({
    id: 'fig_ew_hoth', name: '霍特', faction: 'axis', role: '德國裝甲兵將領',
    birth: '1885', death: '1971', birthDeathDisplay: '1885 年 4 月 12 日 – 1971 年 1 月 25 日', birthplace: '普魯士布蘭登堡省新魯平',
    shortBio: '德國裝甲兵將領，在法國戰役與東線擔任要角，先後指揮第 3 裝甲集群、第 17 軍團、第 4 裝甲軍團；所屬部隊犯下殺害戰俘與平民等戰爭罪行。1971 年死於西德戈斯拉爾。',
    source: wikipediaFigure('Hermann_Hoth', 'Hermann Hoth', 'Born 12 April 1885, Neuruppin, Province of Brandenburg — Died 25 January 1971, Goslar, West Germany'),
  }),
  figure({
    id: 'fig_ew_petrov', name: '彼得羅夫', faction: 'allies', role: '蘇聯陸軍大將',
    birth: '1896', death: '1958', birthDeathDisplay: '1896 年 9 月 30 日 – 1958 年 4 月 7 日', birthplace: '俄羅斯帝國奧廖爾省特魯布切夫斯克',
    shortBio: '蘇聯陸軍大將，二戰期間先後指揮獨立濱海集團軍、北高加索方面軍、白俄羅斯第 2 方面軍、烏克蘭第 4 方面軍等。1958 年死於莫斯科。',
    source: wikipediaFigure('Ivan_Yefimovich_Petrov', 'Ivan Petrov (army general)', 'Born 30 September 1896, Trubchevsk, Oryol Governorate — Died 7 April 1958, Moscow'),
  }),
  figure({
    id: 'fig_ew_simonds', name: '西蒙茲', faction: 'allies', role: '加拿大陸軍將領',
    birth: '1903', death: '1974', birthDeathDisplay: '1903 年 4 月 23 日 – 1974 年 5 月 15 日', birthplace: '英格蘭薩福克郡伊克斯沃斯',
    shortBio: '加拿大陸軍將領，1943 年在西西里與義大利指揮加拿大第 1 步兵師，1944 年在諾曼第及之後的西歐戰役指揮加拿大第 2 軍，斯海爾德河口戰役期間代理指揮加拿大第 1 軍團。1974 年死於多倫多。',
    source: wikipediaFigure('Guy_Simonds', 'Guy Simonds', 'Born April 23, 1903, Ixworth, Suffolk, England — Died May 15, 1974, Toronto'),
  }),
  figure({
    id: 'fig_ew_friessner', name: '弗里斯納', faction: 'axis', role: '德國陸軍將領',
    birth: '1892', death: '1971', birthDeathDisplay: '1892 年 3 月 22 日 – 1971 年 6 月 26 日', birthplace: '德國開姆尼茨',
    shortBio: '德國陸軍將領，曾任第 23 軍軍長，獲頒附橡葉騎士鐵十字勳章；1944 年雅西－基希訥烏攻勢時列名德方指揮官。1971 年死於西德巴特賴興哈爾。',
    source: wikipediaFigure('Johannes_Frie%C3%9Fner', 'Johannes Frießner', 'Born 22 March 1892, Chemnitz — Died 26 June 1971, Bad Reichenhall, West Germany'),
  }),
  // 擴充第 4 批（規劃 v12 第十七節，2026-11-21）：生卒與出生地取英文維基百科資訊框。
  figure({
    id: 'fig_ew_tito', name: '狄托', faction: 'allies', role: '南斯拉夫游擊隊最高指揮官',
    birth: '1892', death: '1980', birthDeathDisplay: '1892 年 5 月 7 日 – 1980 年 5 月 4 日', birthplace: '奧匈帝國克羅埃西亞－斯拉沃尼亞庫姆羅韋茨',
    shortBio: '本名約瑟普・布羅茲，南斯拉夫共產黨領袖，二戰期間任南斯拉夫游擊隊最高指揮官；1943 至 1963 年任總理，1953 年起任總統直到去世，也是不結盟運動的創始人之一。1980 年死於盧比安納。',
    source: wikipediaFigure('Josip_Broz_Tito', 'Josip Broz Tito', 'Born 7 May 1892, Kumrovec, Croatia-Slavonia, Austria-Hungary — Died 4 May 1980, Ljubljana'),
  }),
  figure({
    id: 'fig_ew_papagos', name: '帕帕戈斯', faction: 'allies', role: '希臘陸軍將領',
    birth: '1883', death: '1955', birthDeathDisplay: '1883 年 12 月 9 日 – 1955 年 10 月 4 日', birthplace: '希臘雅典',
    shortBio: '希臘軍官，二戰期間率領希臘陸軍，後來在希臘內戰後期再度領軍；希臘唯一升任陸軍元帥的職業軍官，1952 至 1955 年任總理。1955 年死於雅典。',
    source: wikipediaFigure('Alexandros_Papagos', 'Alexandros Papagos', 'Born 9 December 1883, Athens — Died 4 October 1955, Athens'),
  }),
  figure({
    id: 'fig_ew_hodges', name: '霍奇斯', faction: 'allies', role: '美國陸軍將領（第 1 軍團司令）',
    birth: '1887', death: '1966', birthDeathDisplay: '1887 年 1 月 5 日 – 1966 年 1 月 16 日', birthplace: '美國喬治亞州佩里',
    shortBio: '美國陸軍將領，從二等兵一路升任將軍；二戰西歐戰役期間指揮美國第 1 軍團。1966 年死於德州聖安東尼奧。',
    source: wikipediaFigure('Courtney_Hodges', 'Courtney Hodges', 'Born 5 January 1887, Perry, Georgia — Died 16 January 1966, San Antonio, Texas'),
  }),
  figure({
    id: 'fig_ew_kluge', name: '克魯格', faction: 'axis', role: '德國陸軍元帥',
    birth: '1882', death: '1944', birthDeathDisplay: '1882 年 10 月 30 日 – 1944 年 8 月 19 日', birthplace: '普魯士波森',
    shortBio: '德國陸軍元帥。1939 年入侵波蘭、1940 年法國戰役、1941 年巴巴羅薩行動與莫斯科戰役指揮第 4 軍團，1941 年 12 月接替博克任中央集團軍群司令，後任西線總司令。因牽涉 7 月 20 日密謀案，1944 年 8 月自殺。',
    source: wikipediaFigure('Günther_von_Kluge', 'Günther von Kluge', 'Born 30 October 1882, Posen, Prussia — Died 19 August 1944, Metz'),
  }),
  figure({
    id: 'fig_ew_yeryomenko', name: '葉廖緬科', faction: 'allies', role: '蘇聯元帥',
    birth: '1892', death: '1970', birthDeathDisplay: '1892 年 10 月 14 日 – 1970 年 11 月 19 日', birthplace: '俄羅斯帝國哈爾科夫省馬爾基夫卡',
    shortBio: '蘇聯元帥。1942 年夏史達林格勒戰役期間指揮東南方面軍（後改名史達林格勒方面軍），規劃城市防禦；1945 年指揮解放匈牙利西部與捷克斯洛伐克東部的部隊。1970 年死於莫斯科。',
    source: wikipediaFigure('Andrey_Yeryomenko', 'Andrey Yeryomenko', 'Born 14 October 1892, Markivka, Kharkov Governorate — Died 19 November 1970, Moscow'),
  }),
  figure({
    id: 'fig_ew_bagramyan', name: '巴格拉米揚', faction: 'allies', role: '蘇聯元帥',
    birth: '1897', death: '1982', birthDeathDisplay: '1897 年 12 月 2 日 – 1982 年 9 月 21 日', birthplace: '俄羅斯帝國伊麗莎白波爾',
    shortBio: '亞美尼亞裔蘇聯元帥，任波羅的海第 1 方面軍司令時主導把德軍逐出波羅的海國家的攻勢。1982 年死於莫斯科。',
    source: wikipediaFigure('Ivan_Bagramyan', 'Ivan Bagramyan', 'Born 2 December 1897, Yelizavetpol, Russian Empire — Died 21 September 1982, Moscow'),
  }),
  figure({
    id: 'fig_ew_crerar', name: '克里勒', faction: 'allies', role: '加拿大陸軍將領（加拿大第 1 軍團司令）',
    birth: '1888', death: '1965', birthDeathDisplay: '1888 年 4 月 28 日 – 1965 年 4 月 1 日', birthplace: '加拿大安大略省漢密爾頓',
    shortBio: '加拿大陸軍將領，二戰時成為加拿大最高階的野戰指揮官，1944 至 1945 年西北歐戰役期間指揮加拿大第 1 軍團。1965 年死於渥太華。',
    source: wikipediaFigure('Harry_Crerar', 'Harry Crerar', 'Born 28 April 1888, Hamilton, Ontario — Died 1 April 1965, Ottawa'),
  }),
  figure({
    id: 'fig_ew_dempsey', name: '鄧普西', faction: 'allies', role: '英國陸軍將領（英國第 2 軍團司令）',
    birth: '1896', death: '1969', birthDeathDisplay: '1896 年 12 月 15 日 – 1969 年 6 月 5 日', birthplace: '英格蘭柴郡沃勒西新布萊頓',
    shortBio: '英國陸軍將領，參加過兩次世界大戰；二戰期間在西北歐指揮英國第 2 軍團。1969 年死於英格蘭伯克郡亞特登。',
    source: wikipediaFigure('Miles_Dempsey', 'Miles Dempsey', 'Born 15 December 1896, New Brighton, Wallasey, Cheshire — Died 5 June 1969, Yattendon, Berkshire'),
  }),
  figure({
    id: 'fig_ew_weichs', name: '魏克斯', faction: 'axis', role: '德國陸軍元帥',
    birth: '1881', death: '1954', birthDeathDisplay: '1881 年 11 月 12 日 – 1954 年 9 月 27 日', birthplace: '德國德紹',
    shortBio: '德國陸軍元帥，出身貴族。1939 年入侵波蘭時指揮第 13 軍，之後以第 2 軍團司令參與入侵法國、南斯拉夫與蘇聯；1942 年 8 月藍色行動期間出任 B 集團軍群司令，1944 年指揮巴爾幹的 F 集團軍群，主持德軍從希臘與南斯拉夫撤退。紐倫堡審判時被指涉入巴爾幹的戰爭罪行。1954 年死於波昂。',
    source: wikipediaFigureRev('Maximilian_von_Weichs', 1385763405, 'Maximilian von Weichs', 'Born 12 November 1881, Dessau — Died 27 September 1954, Bonn'),
  }),
  figure({
    id: 'fig_ew_lohr', name: '勒爾', faction: 'axis', role: '德國空軍將領',
    birth: '1885', death: '1947', birthDeathDisplay: '1885 年 5 月 20 日 – 1947 年 2 月 26 日', birthplace: '羅馬尼亞王國塞維林堡',
    shortBio: '奧地利空軍司令，德奧合併後成為德國空軍將領，二戰期間升任 E 集團軍群司令及東南歐總司令。戰爭結束時被南斯拉夫游擊隊俘虜，因指揮下的反游擊報復行動與 1941 年轟炸貝爾格勒被南斯拉夫判處戰爭罪，1947 年在貝爾格勒槍決。',
    source: wikipediaFigureRev('Alexander_Löhr', 1385268091, 'Alexander Löhr', 'Born 20 May 1885, Turnu-Severin, Kingdom of Romania — Died 26 February 1947, Belgrade'),
  }),
  figure({
    id: 'fig_ew_leeb', name: '勒布', faction: 'axis', role: '德國陸軍元帥',
    birth: '1876', death: '1956', birthDeathDisplay: '1876 年 9 月 5 日 – 1956 年 4 月 29 日', birthplace: '德國巴伐利亞蘭茨貝格',
    shortBio: '德國陸軍元帥。法國戰役時指揮 C 集團軍群突破馬其諾防線；巴巴羅薩行動中指揮北方集團軍群經波羅的海三國進逼列寧格勒，最後圍困該城。戰後被判戰爭罪。1956 年死於巴伐利亞菲森。',
    source: wikipediaFigureRev('Wilhelm_Ritter_von_Leeb', 1379817249, 'Wilhelm Ritter von Leeb', 'Born 5 September 1876, Landsberg am Lech, Bavaria — Died 29 April 1956, Füssen, Bavaria'),
  }),
  figure({
    id: 'fig_ew_ramsay', name: '拉姆齊', faction: 'allies', role: '英國海軍上將',
    birth: '1883', death: '1945', birthDeathDisplay: '1883 年 1 月 20 日 – 1945 年 1 月 2 日', birthplace: '英格蘭倫敦',
    shortBio: '英國皇家海軍上將。二戰時負責 1940 年敦克爾克撤退，並規劃、指揮 1944 年進攻法國的海軍部隊。1945 年 1 月死於法國圖蘇勒諾布勒。',
    source: wikipediaFigureRev('Bertram_Ramsay', 1385819261, 'Bertram Ramsay', 'Born 20 January 1883, London — Died 2 January 1945, Toussus-le-Noble, France'),
  }),
  figure({
    id: 'fig_ew_hausser', name: '豪塞爾', faction: 'axis', role: '武裝親衛隊將領',
    birth: '1880', death: '1972', birthDeathDisplay: '1880 年 10 月 7 日 – 1972 年 12 月 21 日', birthplace: '德意志帝國布蘭登堡',
    shortBio: '德國將領，武裝親衛隊兩位最高階指揮官之一，協助組建武裝親衛隊。二戰期間升至集團軍群司令，率武裝親衛隊部隊參與第三次哈爾科夫戰役、庫斯克會戰與諾曼第戰役。戰後是武裝親衛隊老兵遊說團體 HIAG 的創始成員，推動為武裝親衛隊翻案。1972 年死於路德維希堡。',
    source: wikipediaFigureRev('Paul_Hausser', 1383253528, 'Paul Hausser', 'Born 7 October 1880, Brandenburg an der Havel — Died 21 December 1972, Ludwigsburg'),
  }),
  figure({
    id: 'fig_ew_blaskowitz', name: '布拉斯科維茨', faction: 'axis', role: '德國陸軍大將',
    birth: '1883', death: '1948', birthDeathDisplay: '1883 年 7 月 10 日 – 1948 年 2 月 5 日', birthplace: '德意志帝國東普魯士帕特斯瓦爾德',
    shortBio: '德國陸軍大將。入侵波蘭時指揮第 8 軍團，1939 至 1940 年任占領波蘭總司令；盟軍登陸南法與北風行動期間指揮 G 集團軍群，最後率 H 集團軍群殘部撤到荷蘭北部後投降。曾多次上書德軍高層反對親衛隊的罪行。1948 年死於紐倫堡。',
    source: wikipediaFigureRev('Johannes_Blaskowitz', 1382834465, 'Johannes Blaskowitz', 'Born 10 July 1883, Paterswalde, East Prussia — Died 5 February 1948, Nuremberg'),
  }),
  figure({
    id: 'fig_ew_golikov', name: '戈利科夫', faction: 'allies', role: '蘇聯軍事指揮官',
    birth: '1900', death: '1980', birthDeathDisplay: '1900 年 7 月 2 日 – 1980 年 7 月 29 日', birthplace: '俄羅斯帝國彼爾姆省鮑里索娃',
    shortBio: '蘇聯軍事指揮官。任軍事情報總局局長時，未正視德國將於 1941 年 6 月入侵蘇聯的大量情報。1944 年起主管蘇聯公民的遣返工作，1961 年晉升蘇聯元帥。1980 年死於莫斯科。',
    source: wikipediaFigureRev('Filipp_Golikov', 1379842705, 'Filipp Golikov', 'Born 2 July 1900 [O.S. 19 June], Borisova, Perm Governorate — Died 29 July 1980, Moscow'),
  }),
  figure({
    id: 'fig_ew_oktyabrsky', name: '奧克佳布里斯基', faction: 'allies', role: '蘇聯海軍將領（黑海艦隊司令）',
    birth: '1899', death: '1969', birthDeathDisplay: '1899 年 10 月 23 日 – 1969 年 7 月 8 日', birthplace: '俄羅斯帝國特維爾省盧克申諾',
    shortBio: '蘇聯海軍將領，本名伊萬諾夫。1939 年 3 月起任黑海艦隊司令，指揮艦隊參與塞瓦斯托波爾圍城（1941–1942）與敖德薩圍城（1941）。戰後任海軍副總司令。1969 年死於塞瓦斯托波爾。',
    source: wikipediaFigureRev('Filipp_Oktyabrsky', 1381045119, 'Filipp Oktyabrsky', 'Born 23 October 1899 [O.S. 11 October], Lukshino, Tver Governorate — Died 8 July 1969, Sevastopol'),
  }),
  // 指揮官人物卡第 2 批（規劃 v16 第二十一節，2026-11-28 Ivan 核准）。帕克、利斯特在第一批因 Britannica 只有短條目暫緩，本批改用維基百科。
  figure({
    id: 'fig_ew_campioni', name: '坎皮奧尼', faction: 'axis', role: '義大利海軍上將',
    birth: '1878', death: '1944', birthDeathDisplay: '1878 年 11 月 14 日 – 1944 年 5 月 24 日', birthplace: '義大利王國托斯卡尼維亞雷焦',
    shortBio: '義大利海軍軍官，一生參與四場戰爭，以二戰期間擔任義大利皇家海軍上將最為人知。後因拒絕與義大利社會共和國合作而遭其處決，1944 年死於帕爾馬。',
    source: wikipediaFigureRev('Inigo_Campioni', 1377757961, 'Inigo Campioni', 'Born 14 November 1878, Viareggio, Tuscany — Died 24 May 1944, Parma', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_luters', name: '呂特斯', faction: 'axis', role: '德國陸軍將領',
    birth: '1883', death: '1945', birthDeathDisplay: '1883 年 5 月 10 日 – 1945 年 12 月 24 日', birthplace: '德意志帝國達姆施塔特',
    shortBio: '二戰期間在德國國防軍服役的德國將領。1945 年 12 月死於蘇聯克拉斯諾戈爾斯克。',
    source: wikipediaFigureRev('Rudolf_Lüters', 1380335162, 'Rudolf Lüters', 'Born 10 May 1883, Darmstadt — Died 24 December 1945, Krasnogorsk, Soviet Union', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_harpe', name: '哈爾佩', faction: 'axis', role: '德國陸軍大將',
    birth: '1887', death: '1968', birthDeathDisplay: '1887 年 9 月 21 日 – 1968 年 3 月 14 日', birthplace: '德意志帝國布爾',
    shortBio: '德國將領，在東線指揮第 41 裝甲軍與第 9 軍團。1944 年 9 月至 1945 年 1 月任 A 集團軍群司令，因德軍擋不住蘇軍維斯瓦河－奧得河攻勢被解職，戰爭結束時指揮西線第 5 裝甲軍團。設立奧扎里奇死亡營，史家認為是德國國防軍最嚴重的暴行之一。1968 年死於紐倫堡。',
    source: wikipediaFigureRev('Josef_Harpe', 1380319254, 'Josef Harpe', 'Born 21 September 1887, Buer — Died 14 March 1968, Nuremberg', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_zangen', name: '贊根', faction: 'axis', role: '德國陸軍將領（第 15 軍團司令）',
    birth: '1892', death: '1964', birthDeathDisplay: '1892 年 11 月 7 日 – 1964 年 5 月 1 日', birthplace: '德意志帝國黑森大公國達姆施塔特',
    shortBio: '二戰期間的德國國防軍將領，1944 年在荷蘭指揮第 15 軍團。1964 年死於西德哈瑙。',
    source: wikipediaFigureRev('Gustav-Adolf_von_Zangen', 1384548108, 'Gustav-Adolf von Zangen', 'Born 7 November 1892, Darmstadt, Grand Duchy of Hesse — Died 1 May 1964, Hanau', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_auchinleck', name: '奧欽萊克', faction: 'allies', role: '英國陸軍元帥（中東戰區總司令）',
    birth: '1884', death: '1981', birthDeathDisplay: '1884 年 6 月 21 日 – 1981 年 3 月 23 日', birthplace: '英格蘭漢普郡奧爾德肖特',
    shortBio: '英屬印度陸軍將領，參加過兩次世界大戰。1941 年初任印度陸軍總司令，同年 7 月改任中東戰區總司令；初期取得戰果後北非戰局逆轉，1942 年 8 月被解除職務。1943 年 6 月再任印度總司令，以補給、維修與訓練支援斯利姆的第 14 軍團。1981 年死於摩洛哥馬拉喀什。',
    source: wikipediaFigureRev('Claude_Auchinleck', 1383230716, 'Claude Auchinleck', 'Born 21 June 1884, Aldershot, Hampshire — Died 23 March 1981, Marrakesh, Morocco', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_park', name: '帕克', faction: 'allies', role: '英國皇家空軍將領（第 11 大隊指揮官）',
    birth: '1892', death: '1975', birthDeathDisplay: '1892 年 6 月 15 日 – 1975 年 2 月 6 日', birthplace: '紐西蘭泰晤士',
    shortBio: '紐西蘭出生的英國皇家空軍軍官。一戰時參加加里波利戰役與索姆河戰役，後轉入皇家飛行隊成為王牌飛行員。二戰期間指揮皇家空軍第 11 大隊，對不列顛空戰擊敗德國空軍有關鍵作用。1975 年死於紐西蘭奧克蘭。',
    source: wikipediaFigureRev('Keith_Park', 1379812496, 'Keith Park', 'Born 15 June 1892, Thames, New Zealand — Died 6 February 1975, Auckland', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_list', name: '利斯特', faction: 'axis', role: '德國陸軍元帥',
    birth: '1880', death: '1971', birthDeathDisplay: '1880 年 5 月 14 日 – 1971 年 8 月 17 日', birthplace: '德意志帝國符騰堡王國上基希貝格',
    shortBio: '德國陸軍元帥。1939 年入侵波蘭時指揮第 14 軍團，1940 年入侵法國時指揮第 12 軍團並因此晉升元帥；1941 年 4 月率第 12 軍團入侵南斯拉夫與希臘，主持反游擊作戰至同年 10 月辭職。1942 年 7 月任東線 A 集團軍群司令，負責藍色行動中攻向高加索的主攻。1971 年死於加爾米施－帕滕基興。',
    source: wikipediaFigureRev('Wilhelm_List', 1382949227, 'Wilhelm List', 'Born 14 May 1880, Oberkirchberg, Württemberg — Died 17 August 1971, Garmisch-Partenkirchen', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_weidling', name: '魏德林', faction: 'axis', role: '德國陸軍將領（柏林防區司令）',
    birth: '1891', death: '1955', birthDeathDisplay: '1891 年 11 月 2 日 – 1955 年 11 月 17 日', birthplace: '德意志帝國普魯士薩克森省哈爾伯施塔特',
    shortBio: '德國將領，柏林戰役期間任柏林防區最後一任司令，率部抵抗蘇軍，於歐戰結束前投降。被蘇聯俘虜後以戰爭罪判刑 25 年，1955 年死於弗拉基米爾中央監獄。',
    source: wikipediaFigureRev('Helmuth_Weidling', 1375231429, 'Helmuth Weidling', 'Born 2 November 1891, Halberstadt, Province of Saxony — Died 17 November 1955, Vladimir Central Prison', '2026-11-28'),
  }),
  // 指揮官人物卡第 3 批（規劃 v17 第二十二節，2026-11-28 Ivan 核准）。剩下的指揮官都只出場 1 次，依職級與用途挑選；備選 4 位都沒用到。
  figure({
    id: 'fig_ew_student', name: '斯圖登特', faction: 'axis', role: '德國空軍將領（傘兵部隊指揮官）',
    birth: '1890', death: '1978', birthDeathDisplay: '1890 年 5 月 12 日 – 1978 年 7 月 1 日', birthplace: '德意志帝國比爾克霍爾茨（今波蘭博魯夫）',
    shortBio: '二戰期間的德國空軍將領，早期發展空降部隊的人物，主持德國傘兵部隊的建立並在整場戰爭中指揮。1940 年 5 月指揮史上第一次大規模空降作戰（海牙戰役），1941 年 5 月指揮入侵克里特島，作戰成功但德軍損失慘重。1947 年因部下在克里特島虐殺戰俘被判戰爭罪。1978 年死於西德萊姆戈。',
    source: wikipediaFigureRev('Kurt_Student', 1379822654, 'Kurt Student', 'Born 12 May 1890, Birkholz, German Empire (now Borów, Poland) — Died 1 July 1978, Lemgo, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_manteuffel', name: '曼陀菲爾', faction: 'axis', role: '德國陸軍將領（第 5 裝甲軍團司令）',
    birth: '1897', death: '1978', birthDeathDisplay: '1897 年 1 月 14 日 – 1978 年 9 月 24 日', birthplace: '德意志帝國普魯士王國波茨坦',
    shortBio: '出身普魯士貴族的德國將領，突出部之役中指揮第 5 裝甲軍團。戰後當選西德聯邦議院議員，任自由民主黨國防政策發言人，主張西德重新武裝，並為西德新軍定名「聯邦國防軍」。1978 年死於奧地利賴特。',
    source: wikipediaFigureRev('Hasso_von_Manteuffel', 1379820669, 'Hasso von Manteuffel', 'Born 14 January 1897, Potsdam, Kingdom of Prussia — Died 24 September 1978, Reith, Austria', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_schoerner', name: '舍爾納', faction: 'axis', role: '德國陸軍元帥',
    birth: '1892', death: '1973', birthDeathDisplay: '1892 年 6 月 12 日 – 1973 年 7 月 2 日', birthplace: '德意志帝國巴伐利亞王國慕尼黑',
    shortBio: '德國國防軍元帥，指揮過數個集團軍群，是德國陸軍最後一任總司令，也是國防軍最後一位晉升元帥的人。忠誠的納粹黨人，以手段嚴酷、嚴懲「逃兵」著稱，戰爭末期是希特勒最信任的指揮官。戰後在蘇聯與西德均被判戰爭罪。1973 年死於慕尼黑。',
    source: wikipediaFigureRev('Ferdinand_Schörner', 1386063079, 'Ferdinand Schörner', 'Born 12 June 1892, Munich, Kingdom of Bavaria — Died 2 July 1973, Munich, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_sokolovsky', name: '索科洛夫斯基', faction: 'allies', role: '蘇聯將領（西方面軍司令）',
    birth: '1897', death: '1968', birthDeathDisplay: '1897 年 7 月 21 日 – 1968 年 5 月 10 日', birthplace: '俄羅斯帝國格羅德諾省科茲利基（今屬波蘭）',
    shortBio: '蘇聯軍事指揮官與理論家，1946 年晉升蘇聯元帥。二戰期間先後任西方面軍參謀長與司令、烏克蘭第 1 方面軍參謀長，柏林戰役時任白俄羅斯第 1 方面軍副司令。戰後指揮駐德蘇軍並主持蘇聯駐德軍事管理局（柏林封鎖期間），1952 至 1960 年任蘇軍總參謀長。1968 年死於莫斯科。',
    source: wikipediaFigureRev('Vasily_Sokolovsky', 1385611876, 'Vasily Sokolovsky', 'Born July 21, 1897, Kozliki, Russian Empire — Died May 10, 1968, Moscow', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_falkenhorst', name: '法爾肯霍斯特', faction: 'axis', role: '德國陸軍將領（挪威駐軍司令）',
    birth: '1885', death: '1968', birthDeathDisplay: '1885 年 1 月 17 日 – 1968 年 6 月 18 日', birthplace: '德意志帝國普魯士西里西亞布雷斯勞（今波蘭弗羅茨瓦夫）',
    shortBio: '德國將領，策劃並指揮 1940 年入侵丹麥與挪威，1940 至 1944 年任佔領挪威的德軍司令。戰後經英國與挪威聯合軍事法庭以戰爭罪判處死刑，後減為 20 年徒刑，1953 年獲釋。1968 年死於西德霍爾茨明登。',
    source: wikipediaFigureRev('Nikolaus_von_Falkenhorst', 1379833762, 'Nikolaus von Falkenhorst', 'Born 17 January 1885, Breslau, Silesia — Died 18 June 1968, Holzminden, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_dietrich', name: '迪特里希', faction: 'axis', role: '武裝親衛隊將領（第 6 裝甲軍團司令）',
    birth: '1892', death: '1966', birthDeathDisplay: '1892 年 5 月 28 日 – 1966 年 4 月 21 日', birthplace: '德意志帝國巴伐利亞王國哈旺根',
    shortBio: '納粹時期的親衛隊將領與政治人物，早年曾任希特勒的司機與保鑣。未受過正規參謀訓練，升到武裝親衛隊最高軍階，二戰中指揮到軍團級部隊。突出部之役任第 6 裝甲軍團司令，須為部下殺害美軍戰俘的馬爾梅迪屠殺負責。1966 年死於西德路德維希堡。',
    source: wikipediaFigureRev('Sepp_Dietrich', 1381892371, 'Sepp Dietrich', 'Born 28 May 1892, Hawangen, Kingdom of Bavaria — Died 21 April 1966, Ludwigsburg, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_de_lattre', name: '德拉特爾', faction: 'allies', role: '法國陸軍將領（法國第 1 軍團司令）',
    birth: '1889', death: '1952', birthDeathDisplay: '1889 年 2 月 2 日 – 1952 年 1 月 11 日', birthplace: '法國穆耶隆－昂帕雷德',
    shortBio: '法國將領。1940 年法國戰役時是法軍最年輕的將領；1942 年德軍進佔法國南部時抗命出兵抵抗而被捕，脫逃後於 1943 年底投奔自由法國。指揮 1944 年 8 月 15 日登陸法國南部的部隊，一路打到萊茵河與多瑙河，並代表法國出席 1945 年 5 月 8 日在柏林的德國投降簽字。1952 年死於巴黎，同年追晉法國元帥。',
    source: wikipediaFigureRev('Jean_de_Lattre_de_Tassigny', 1378212999, 'Jean de Lattre de Tassigny', 'Born 2 February 1889, Mouilleron-en-Pareds, France — Died 11 January 1952, Paris', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_tovey', name: '托維', faction: 'allies', role: '英國海軍將領（本土艦隊總司令）',
    birth: '1885', death: '1971', birthDeathDisplay: '1885 年 3 月 7 日 – 1971 年 1 月 12 日', birthplace: '英格蘭肯特郡羅徹斯特',
    shortBio: '英國皇家海軍軍官。二戰初期任地中海艦隊副司令，之後任本土艦隊總司令，主持追擊並擊沉俾斯麥號；後任諾爾司令部總司令，負責東岸船團與掃雷作業。1971 年死於馬德拉群島豐沙爾。',
    source: wikipediaFigureRev('John_Tovey,_1st_Baron_Tovey', 1379839246, 'John Tovey, 1st Baron Tovey', 'Born 7 March 1885, Rochester, Kent — Died 12 January 1971, Funchal, Madeira', '2026-11-28'),
  }),
  // 指揮官人物卡第 4 批（規劃 v18 第二十三節，2026-11-28 Ivan 核准）。米哈伊洛維奇的切特尼克部隊在內雷特瓦河與軸心國同一方，
  // 但他原屬南斯拉夫流亡政府、前期受同盟國支持，陣營比照史達林、曼納海姆標 other（K5）。備選 4 位都沒用到。
  figure({
    id: 'fig_ew_reichenau', name: '賴歇瑙', faction: 'axis', role: '德國陸軍元帥（第 6 軍團司令）',
    birth: '1884', death: '1942', birthDeathDisplay: '1884 年 10 月 8 日 – 1942 年 1 月 17 日', birthplace: '德意志帝國巴登大公國卡爾斯魯厄',
    shortBio: '德國陸軍元帥，綽號「公牛」。入侵比利時與法國時指揮第 6 軍團，巴巴羅薩行動中續率第 6 軍團隸屬南方集團軍群，攻占烏克蘭並深入蘇聯。任內發布惡名昭彰的「嚴厲命令」，鼓動德軍在東線殺害猶太平民，所部協助親衛隊特別行動隊在娘子谷屠殺逾 3.3 萬名猶太人。1942 年死於蘇聯波爾塔瓦。',
    source: wikipediaFigureRev('Walter_von_Reichenau', 1383434792, 'Walter von Reichenau', 'Born 8 October 1884, Karlsruhe, Grand Duchy of Baden — Died 17 January 1942, Poltava, Soviet Union', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_mihailovic', name: '米哈伊洛維奇', faction: 'other', role: '南斯拉夫將領（切特尼克領袖）',
    birth: '1893', death: '1946', birthDeathDisplay: '1893 年 4 月 27 日 – 1946 年 7 月 17 日', birthplace: '塞爾維亞王國伊萬尼察',
    shortBio: '南斯拉夫塞爾維亞族將領，1941 年德國入侵南斯拉夫後成立的保皇派、民族主義游擊武力切特尼克的領袖。起初與狄托的游擊隊一同對抗德國佔領軍，1941 年底雙方已公開衝突。許多切特尼克部隊與軸心國合作或妥協，加上英國不滿他按兵不動，同盟國在 1944 年改為支持狄托；戰爭末期他與合作政權的內迪奇等人合作。1946 年死於貝爾格勒。',
    source: wikipediaFigureRev('Draža_Mihailović', 1386619984, 'Draža Mihailović', 'Born 27 April 1893, Ivanjica, Kingdom of Serbia — Died 17 July 1946, Belgrade, FPR Yugoslavia', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_lemay', name: '李梅', faction: 'allies', role: '美國陸軍航空軍將領（第 3 航空師師長）',
    birth: '1906', death: '1990', birthDeathDisplay: '1906 年 11 月 15 日 – 1990 年 10 月 1 日', birthplace: '美國俄亥俄州哥倫布',
    shortBio: '美國空軍將領，二戰與冷戰時期的重要指揮官，1961 至 1965 年任美國空軍參謀長。1942 年 10 月至 1943 年 9 月指揮第 305 轟炸大隊，之後在歐洲戰區指揮第 3 航空師至 1944 年 8 月，再調往中緬印戰區，主持對日本的戰略轟炸。1990 年死於美國加州馬奇空軍基地。',
    source: wikipediaFigureRev('Curtis_LeMay', 1381760009, 'Curtis LeMay', 'Born November 15, 1906, Columbus, Ohio — Died October 1, 1990, March Air Force Base, California', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_devers', name: '德弗斯', faction: 'allies', role: '美國陸軍將領（第 6 集團軍群司令）',
    birth: '1887', death: '1979', birthDeathDisplay: '1887 年 9 月 8 日 – 1979 年 10 月 15 日', birthplace: '美國賓夕法尼亞州約克',
    shortBio: '美國陸軍將領，二戰時在歐洲戰區指揮第 6 集團軍群。參與 M4 雪曼、M26 潘興戰車、DUKW 兩棲卡車等多種武器的開發與採用。兩次大戰之間力主陸軍機械化。1979 年死於華盛頓。',
    source: wikipediaFigureRev('Jacob_L._Devers', 1385905642, 'Jacob L. Devers', 'Born 8 September 1887, York, Pennsylvania — Died 15 October 1979, Washington, D.C.', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_simpson', name: '辛普森', faction: 'allies', role: '美國陸軍將領（第 9 軍團司令）',
    birth: '1888', death: '1980', birthDeathDisplay: '1888 年 5 月 18 日 – 1980 年 8 月 15 日', birthplace: '美國德克薩斯州韋瑟福德',
    shortBio: '美國陸軍將領，參加過兩次世界大戰，以二戰時在西北歐指揮美國第 9 軍團最為人知。西點軍校畢業，一戰時在默茲－阿貢攻勢中任第 33 師參謀。1980 年死於德克薩斯州聖安東尼奧。',
    source: wikipediaFigureRev('William_Hood_Simpson', 1379846970, 'William Hood Simpson', 'Born 18 May 1888, Weatherford, Texas — Died 15 August 1980, San Antonio, Texas', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_vietinghoff', name: '菲廷霍夫', faction: 'axis', role: '德國陸軍大將',
    birth: '1887', death: '1952', birthDeathDisplay: '1887 年 12 月 6 日 – 1952 年 2 月 23 日', birthplace: '德意志帝國黑森大公國美因茲',
    shortBio: '二戰期間的德國國防軍大將，出身西發利亞的菲廷霍夫貴族家族。1945 年指揮德國佔領下義大利的德軍。1952 年死於西德巴伐利亞普夫龍滕。',
    source: wikipediaFigureRev('Heinrich_von_Vietinghoff', 1387801318, 'Heinrich von Vietinghoff', 'Born 6 December 1887, Mainz, Grand Duchy of Hesse — Died 23 February 1952, Pfronten, Bavaria', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_richthofen', name: '里希特霍芬', faction: 'axis', role: '德國空軍元帥',
    birth: '1895', death: '1945', birthDeathDisplay: '1895 年 10 月 10 日 – 1945 年 7 月 12 日', birthplace: '德意志帝國普魯士西里西亞巴爾茨多夫',
    shortBio: '一戰時的德國王牌飛行員（「紅男爵」曼弗雷德是他的堂兄），二戰時升到德國空軍元帥。西班牙內戰中隨禿鷹軍團支援國民軍，期間體認近接空中支援的重要，力推俯衝轟炸機，並改進地空通訊。1945 年 7 月死於盟軍佔領下的奧地利巴德伊舍。',
    source: wikipediaFigureRev('Wolfram_von_Richthofen', 1379817320, 'Wolfram von Richthofen', 'Born 10 October 1895, Barzdorf, Silesia — Died 12 July 1945, Bad Ischl, Allied-occupied Austria', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_galland', name: '加蘭德', faction: 'axis', role: '德國空軍將領（王牌飛行員）',
    birth: '1912', death: '1996', birthDeathDisplay: '1912 年 3 月 19 日 – 1996 年 2 月 9 日', birthplace: '德意志帝國普魯士西發利亞省韋斯特霍爾特',
    shortBio: '德國空軍將領與王牌飛行員，整場二戰都在歐洲作戰，出擊 705 次，轉戰西線與本土防空，四度被擊落生還，擊落 104 架，全部是西方盟軍飛機。西班牙內戰時加入禿鷹軍團。1996 年死於德國奧伯溫特。',
    source: wikipediaFigureRev('Adolf_Galland', 1385970567, 'Adolf Galland', 'Born 19 March 1912, Westerholt, Province of Westphalia — Died 9 February 1996, Oberwinter, Germany', '2026-11-28'),
  }),
  // 指揮官人物卡第 5 批（規劃 v19 第二十四節，2026-11-28 Ivan 核准）。萊因哈特的條目資訊框卒日（1963-11-22）與導言（11-23）不一致，
  // 暫不建立，依 L1 以第一位備選雷巴爾科補上。
  figure({
    id: 'fig_ew_rendulic', name: '倫杜利克', faction: 'axis', role: '德國陸軍大將（集團軍群司令）',
    birth: '1887', death: '1971', birthDeathDisplay: '1887 年 10 月 23 日 – 1971 年 1 月 17 日', birthplace: '奧匈帝國維也納新城',
    shortBio: '奧地利籍的德國國防軍集團軍群司令。1948 年在紐倫堡後續審判受審，拉普蘭戰爭中在芬蘭的焦土作為獲判無罪，但在人質案審判中因在南斯拉夫殺害人質被定罪入獄；1951 年獲釋後從事寫作。1971 年死於奧地利埃費丁的弗拉哈姆。',
    source: wikipediaFigureRev('Lothar_Rendulic', 1384546312, 'Lothar Rendulic', 'Born 23 October 1887, Wiener Neustadt, Austria-Hungary — Died 17 January 1971, Fraham, Eferding, Austria', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_gambara', name: '甘巴拉', faction: 'axis', role: '義大利陸軍將領',
    birth: '1890', death: '1962', birthDeathDisplay: '1890 年 11 月 10 日 – 1962 年 2 月 27 日', birthplace: '義大利王國伊莫拉',
    shortBio: '義大利將領，參加過兩次世界大戰。西班牙內戰中義大利介入支援國民軍時表現突出；二戰期間在北非戰役與鎮壓南斯拉夫游擊隊中扮演重要角色。1962 年死於羅馬。',
    source: wikipediaFigureRev('Gastone_Gambara', 1380053194, 'Gastone Gambara', 'Born 10 November 1890, Imola, Kingdom of Italy — Died 27 February 1962, Rome', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_morshead', name: '莫斯黑德', faction: 'allies', role: '澳洲陸軍將領（托布魯克守軍指揮官）',
    birth: '1889', death: '1959', birthDeathDisplay: '1889 年 9 月 18 日 – 1959 年 9 月 26 日', birthplace: '維多利亞殖民地巴拉瑞特',
    shortBio: '澳洲軍人、教師、商人與農場主，軍旅生涯橫跨兩次世界大戰。二戰時率澳洲與英國部隊守住托布魯克圍城（1941），並參與第二次阿拉曼戰役，擊敗隆美爾的非洲軍團。部下以漫畫反派之名稱他「無情的明」。一戰時曾登陸加里波利。1959 年死於雪梨。',
    source: wikipediaFigureRev('Leslie_Morshead', 1379811167, 'Leslie Morshead', 'Born 18 September 1889, Ballarat, Colony of Victoria — Died 26 September 1959, Sydney', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_kirponos', name: '基爾波諾斯', faction: 'allies', role: '蘇聯將領（西南方面軍司令）',
    birth: '1892', death: '1941', birthDeathDisplay: '1892 年 1 月 12 日 – 1941 年 9 月 20 日', birthplace: '俄羅斯帝國切爾尼戈夫省韋爾季伊夫卡（今烏克蘭）',
    shortBio: '蘇聯紅軍將領，1939–1940 年蘇芬戰爭中指揮一個師，獲蘇聯英雄稱號。1941 年德國入侵蘇聯時主持烏克蘭的防禦，歷經布羅迪、烏曼與基輔等戰役均告失利。1941 年 9 月 20 日在突圍基輔包圍圈時死於迫擊砲轟擊。',
    source: wikipediaFigureRev('Mikhail_Kirponos', 1379835111, 'Mikhail Kirponos', 'Born 12 January 1892, Vertiyivka, Chernigov Governorate, Russian Empire — Died 20 September 1941, Dryukivshchyna, Ukrainian SSR', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_bach_zelewski', name: '巴赫-澤萊夫斯基', faction: 'axis', role: '親衛隊將領',
    birth: '1899', death: '1972', birthDeathDisplay: '1899 年 3 月 1 日 – 1972 年 3 月 8 日', birthplace: '德意志帝國波美拉尼亞省倫堡',
    shortBio: '德國政治人物、軍官與親衛隊高級指揮官。二戰期間在東歐佔領區主持對納粹政權所謂「意識形態敵人」的安全作戰，多屬對平民的暴行；1944 年率部殘酷鎮壓華沙起義。未在紐倫堡受審，反以控方證人身分出庭；後因戰前在德國的政治謀殺被定罪，1972 年服刑期間死於慕尼黑。',
    source: wikipediaFigureRev('Erich_von_dem_Bach-Zelewski', 1381867382, 'Erich von dem Bach-Zelewski', 'Born 1 March 1899, Lębork, Province of Pomerania — Died 8 March 1972, Harlaching Hospital, Munich', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_cavallero', name: '卡瓦萊羅', faction: 'axis', role: '義大利軍事將領（最高統帥部總長）',
    birth: '1880', death: '1943', birthDeathDisplay: '1880 年 9 月 20 日 – 1943 年 9 月 13 日', birthplace: '義大利皮埃蒙特卡薩萊蒙費拉托',
    shortBio: '義大利軍事指揮官，1941 年 6 月成為義大利最高統帥部首任總長，因表現不佳被解職，墨索里尼政權垮台後遭逮捕。後被德軍釋放，但拒絕合作，次日被發現身亡。1943 年 9 月死於弗拉斯卡蒂。',
    source: wikipediaFigureRev('Ugo_Cavallero', 1377757191, 'Ugo Cavallero', 'Born 20 September 1880, Casale Monferrato, Piedmont — Died 13 September 1943, Frascati, Lazio', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_katukov', name: '卡圖科夫', faction: 'allies', role: '蘇聯裝甲兵將領（近衛坦克第 1 集團軍司令）',
    birth: '1900', death: '1976', birthDeathDisplay: '1900 年 9 月 17 日 – 1976 年 6 月 8 日', birthplace: '俄羅斯帝國莫斯科省大烏瓦羅沃',
    shortBio: '蘇聯裝甲兵元帥，被視為最有才幹的蘇聯裝甲部隊指揮官之一。1941 年 10 月在莫斯科戰役的姆琴斯克擊退古德里安第 2 裝甲兵團所屬的兩個裝甲師，是蘇聯裝甲部隊第一次重大勝利。之後指揮近衛坦克第 1 集團軍，參與庫斯克、利沃夫－桑多梅日、維斯瓦河－奧得河與柏林等戰役。1976 年死於莫斯科。',
    source: wikipediaFigureRev('Mikhail_Katukov', 1379848804, 'Mikhail Katukov', 'Born 17 September [O.S. 4 September] 1900, Bolshoe Uvarovo, Moscow Governorate — Died 8 June 1976, Moscow', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_rybalko', name: '雷巴爾科', faction: 'allies', role: '蘇聯裝甲兵將領',
    birth: '1894', death: '1948', birthDeathDisplay: '1894 年 11 月 4 日 – 1948 年 8 月 28 日', birthplace: '俄羅斯帝國哈爾科夫省（今烏克蘭）',
    shortBio: '二戰期間及戰後的蘇聯紅軍裝甲部隊指揮官，工人家庭出身。1914 年加入俄羅斯帝國陸軍，一戰時以列兵身分作戰；十月革命後參加赤衛隊，1919 年正式加入紅軍，內戰時任團、旅政委，1920 年蘇波戰爭中任騎兵指揮官。1948 年死於莫斯科。',
    source: wikipediaFigureRev('Pavel_Rybalko', 1384635830, 'Pavel Rybalko', 'Born 4 November [O.S. 23 October] 1894, Kharkov Governorate, Russian Empire — Died 28 August 1948, Moscow', '2026-11-28'),
  }),
  // 指揮官人物卡第 6 批（規劃 v20 第二十五節，2026-11-28 Ivan 核准）。條目一律由該戰役英文維基百科資訊框的指揮官連結確認；備選 4 位都沒用到。
  figure({
    id: 'fig_ew_roatta', name: '羅阿塔', faction: 'axis', role: '義大利陸軍將領（第 2 軍團司令）',
    birth: '1887', death: '1968', birthDeathDisplay: '1887 年 2 月 2 日 – 1968 年 1 月 7 日', birthplace: '義大利王國摩德納',
    shortBio: '義大利將領。西班牙內戰時指揮支援佛朗哥國民軍的義大利志願軍團；1939 年 10 月至 1941 年 3 月任陸軍副參謀長，1941 年 3 月至 1942 年 1 月任參謀長，參與籌備入侵南斯拉夫。以指揮第 2 軍團在義大利佔領及併吞的南斯拉夫地區鎮壓平民最為人知，因手段殘酷被稱為「南斯拉夫的黑獸」。1968 年死於羅馬。',
    source: wikipediaFigureRev('Mario_Roatta', 1372635883, 'Mario Roatta', 'Born 2 February 1887, Modena, Kingdom of Italy — Died 7 January 1968, Rome', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_nehring', name: '內林', faction: 'axis', role: '德國裝甲兵將領',
    birth: '1892', death: '1983', birthDeathDisplay: '1892 年 8 月 15 日 – 1983 年 4 月 20 日', birthplace: '德意志帝國西普魯士施特雷欽（今波蘭斯特熱喬納）',
    shortBio: '二戰期間的德國國防軍將領，曾指揮非洲軍。1983 年死於西德杜塞道夫。',
    source: wikipediaFigureRev('Walther_Nehring', 1380344911, 'Walther Nehring', 'Born 15 August 1892, Stretzin, West Prussia (now Strzeczona, Poland) — Died 20 April 1983, Düsseldorf', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_raus', name: '勞斯', faction: 'axis', role: '德國裝甲兵將領',
    birth: '1889', death: '1956', birthDeathDisplay: '1889 年 1 月 8 日 – 1956 年 4 月 3 日', birthplace: '奧匈帝國沃爾夫拉米茨（今捷克奧爾布拉莫維采）',
    shortBio: '奧地利籍的德國國防軍將領。戰爭初期在東線指揮第 6 裝甲師，之後升任軍團與集團軍群司令。1956 年死於維也納。',
    source: wikipediaFigureRev('Erhard_Raus', 1379857623, 'Erhard Raus', 'Born 8 January 1889, Wolframitz, Austria-Hungary (now Olbramovice, Czech Republic) — Died 3 April 1956, Vienna', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_pfeffer_wildenbruch', name: '普費弗－維爾登布魯赫', faction: 'axis', role: '親衛隊將領（第 9 親衛隊山地軍軍長）',
    birth: '1888', death: '1971', birthDeathDisplay: '1888 年 6 月 12 日 – 1971 年 1 月 29 日', birthplace: '德意志帝國卡爾克貝格',
    shortBio: '納粹時期的親衛隊與秩序警察官員，曾任希姆萊的個人參謀。二戰期間先後指揮親衛隊警察師、第 6 親衛隊軍（拉脫維亞）與武裝親衛隊第 9 山地軍。1971 年死於西德比勒費爾德。',
    source: wikipediaFigureRev('Karl_Pfeffer-Wildenbruch', 1380320642, 'Karl Pfeffer-Wildenbruch', 'Born 12 June 1888, Kalkberge, German Empire — Died 29 January 1971, Bielefeld, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_jaenecke', name: '耶內克', faction: 'axis', role: '德國陸軍將領（第 17 軍團司令）',
    birth: '1890', death: '1960', birthDeathDisplay: '1890 年 4 月 22 日 – 1960 年 7 月 3 日', birthplace: '德意志帝國弗雷倫',
    shortBio: '二戰期間的德國國防軍將領，指揮第 17 軍團。西班牙內戰時隨禿鷹軍團參戰，1937 年 4 月 26 日參與格爾尼卡轟炸，事後回報作戰成功。1960 年死於西德科隆。',
    source: wikipediaFigureRev('Erwin_Jaenecke', 1380304384, 'Erwin Jaenecke', 'Born 22 April 1890, Freren, German Empire — Died 3 July 1960, Cologne, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_bastico', name: '巴斯蒂科', faction: 'axis', role: '義大利元帥（北非軸心軍總司令）',
    birth: '1876', death: '1972', birthDeathDisplay: '1876 年 4 月 9 日 – 1972 年 12 月 2 日', birthplace: '義大利王國波隆那',
    shortBio: '義大利元帥，1941 至 1943 年任北非軸心軍總司令，也曾任義屬愛琴海群島總督與利比亞總督。退役後成為軍事史家，出版多部著作。1972 年死於羅馬。',
    source: wikipediaFigureRev('Ettore_Bastico', 1347294289, 'Ettore Bastico', 'Born 9 April 1876, Bologna, Kingdom of Italy — Died 2 December 1972, Rome', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_lindemann', name: '林德曼', faction: 'axis', role: '德國海軍上校（俾斯麥號艦長）',
    birth: '1894', death: '1941', birthDeathDisplay: '1894 年 3 月 28 日 – 1941 年 5 月 27 日', birthplace: '德意志帝國阿爾滕基興',
    shortBio: '德國海軍上校，戰艦俾斯麥號服役八個月期間唯一的艦長。1913 年加入德意志帝國海軍，一戰時任無線電報官，參與 1917 年的阿爾比恩行動。1941 年 5 月 27 日隨俾斯麥號在北大西洋沉沒陣亡。',
    source: wikipediaFigureRev('Ernst_Lindemann', 1379816146, 'Ernst Lindemann', 'Born 28 March 1894, Altenkirchen, German Empire — Died 27 May 1941, North Atlantic', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_scobie', name: '斯科比', faction: 'allies', role: '英國陸軍將領（第 70 步兵師師長）',
    birth: '1893', death: '1969', birthDeathDisplay: '1893 年 6 月 8 日 – 1969 年 2 月 23 日', birthplace: '英屬緬甸曼德勒',
    shortBio: '英國陸軍高級軍官，參加過兩次世界大戰，指揮第 70 步兵師，後任第 3 軍軍長。也曾是蘇格蘭國家橄欖球隊選手。1969 年死於英格蘭漢普郡奧爾德肖特。',
    source: wikipediaFigureRev('Ronald_Scobie', 1385415160, 'Ronald Scobie', 'Born 8 June 1893, Mandalay, British Burma — Died 23 February 1969, Aldershot, Hampshire', '2026-11-28'),
  }),
  // 指揮官人物卡第 7 批（規劃 v21 第二十六節，2026-11-28 Ivan 核准）。條目由戰役資訊框的指揮官連結確認；備選 4 位都沒用到。
  // 韋克-沃克的資訊框沒有出生地，籍貫標「待考」；布里爾頓的資訊框沒有死亡地點，簡介不寫。
  figure({
    id: 'fig_ew_laycock', name: '萊科克', faction: 'allies', role: '英國陸軍將領（突擊隊指揮官）',
    birth: '1907', death: '1968', birthDeathDisplay: '1907 年 4 月 18 日 – 1968 年 3 月 10 日', birthplace: '英格蘭倫敦西敏',
    shortBio: '英國陸軍高級軍官，以在二戰期間建立並指揮英國突擊隊的關鍵角色最為人知。1968 年死於英格蘭諾丁漢郡懷斯頓。',
    source: wikipediaFigureRev('Robert_Laycock', 1380477533, 'Robert Laycock', 'Born 18 April 1907, Westminster, London — Died 10 March 1968, Wiseton, Nottinghamshire', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_brereton', name: '布里爾頓', faction: 'allies', role: '美國陸軍航空軍將領',
    birth: '1890', death: '1967', birthDeathDisplay: '1890 年 6 月 21 日 – 1967 年 7 月 20 日', birthplace: '美國賓夕法尼亞州匹茲堡',
    shortBio: '美國軍事航空先驅，官至美國空軍中將。1911 年畢業於美國海軍學院，一戰前先在陸軍海岸砲兵服役，之後轉為職業飛行員。從珍珠港事變到德國投降一直在作戰戰區任職，經歷的戰區比其他任何高級將領都多：開戰時任菲律賓遠東航空軍司令，戰爭結束時任德國境內盟軍第 1 空降集團軍司令。',
    source: wikipediaFigureRev('Lewis_H._Brereton', 1380454059, 'Lewis H. Brereton', 'Born June 21, 1890, Pittsburgh, Pennsylvania — Died July 20, 1967 (place not given)', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_wiese', name: '維瑟', faction: 'axis', role: '德國陸軍將領（第 19 軍團司令）',
    birth: '1892', death: '1975', birthDeathDisplay: '1892 年 12 月 5 日 – 1975 年 2 月 13 日', birthplace: '德意志帝國普魯士王國什列斯威－霍爾斯坦省諾德哈斯泰特',
    shortBio: '德國國防軍將領，指揮第 19 軍團。1975 年死於西德黑森邦吉森。',
    source: wikipediaFigureRev('Friedrich_Wiese', 1380306388, 'Friedrich Wiese', 'Born 5 December 1892, Nordhastedt, Province of Schleswig-Holstein — Died 13 February 1975, Giessen, Hessen', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_stahel', name: '施塔赫爾', faction: 'axis', role: '德國軍官（華沙衛戍司令）',
    birth: '1892', death: '1955', birthDeathDisplay: '1892 年 1 月 15 日 – 1955 年 11 月 30 日', birthplace: '德意志帝國比勒費爾德',
    shortBio: '德國軍官與戰犯，以自維爾紐斯撤退及 1944 年華沙起義期間指揮華沙衛戍部隊最為人知。在羅馬尼亞被蘇聯內務人民委員部逮捕，此後終生被蘇聯關押，1955 年死於蘇聯伊萬諾沃。',
    source: wikipediaFigureRev('Reiner_Stahel', 1379864778, 'Rainer Stahel', 'Born 15 January 1892, Bielefeld — Died 30 November 1955, Ivanovo, Soviet Union', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_wake_walker', name: '韋克-沃克', faction: 'allies', role: '英國海軍將領',
    birth: '1888', death: '1945', birthDeathDisplay: '1888 年 3 月 24 日 – 1945 年 9 月 24 日', birthplace: '待考',
    shortBio: '英國皇家海軍高級軍官，參加過兩次世界大戰。在發電機行動（敦克爾克撤退）與擊沉俾斯麥號中扮演重要角色。1945 年死於倫敦。',
    source: wikipediaFigureRev('Frederic_Wake-Walker', 1386044222, 'Frederic Wake-Walker', 'Born 24 March 1888 (place not given) — Died 24 September 1945, London', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_fretter_pico', name: '弗雷特-皮科', faction: 'axis', role: '德國陸軍將領（第 6 軍團司令）',
    birth: '1892', death: '1984', birthDeathDisplay: '1892 年 2 月 6 日 – 1984 年 4 月 4 日', birthplace: '德意志帝國卡爾斯魯厄',
    shortBio: '二戰期間的德國將領，參加過一戰，二戰中轉戰法國戰役、東線與匈牙利。1984 年死於西德克羅伊特。',
    source: wikipediaFigureRev('Maximilian_Fretter-Pico', 1381775587, 'Maximilian Fretter-Pico', 'Born 6 February 1892, Karlsruhe — Died 4 April 1984, Kreuth, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_roberts', name: '羅伯茨', faction: 'allies', role: '加拿大陸軍將領（加拿大第 2 步兵師師長）',
    birth: '1891', death: '1962', birthDeathDisplay: '1891 年 12 月 21 日 – 1962 年 12 月 17 日', birthplace: '加拿大曼尼托巴省派普斯通',
    shortBio: '加拿大陸軍軍官，參加過兩次世界大戰。1914 年畢業於金斯頓的加拿大皇家軍事學院。1962 年死於英國海峽群島澤西島。',
    source: wikipediaFigureRev('John_Hamilton_Roberts', 1378258601, 'John Hamilton Roberts', 'Born December 21, 1891, Pipestone, Manitoba — Died December 17, 1962, Jersey, Channel Islands', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_schlemm', name: '施萊姆', faction: 'axis', role: '德國空軍傘兵將領（第 1 傘兵軍團司令）',
    birth: '1894', death: '1986', birthDeathDisplay: '1894 年 12 月 18 日 – 1986 年 1 月 24 日', birthplace: '德意志帝國魯道爾施塔特',
    shortBio: '德國空軍傘兵上將。二戰最後的指揮任務是在 1945 年 2 月於帝國森林阻擋加拿大第 1 軍團推進。1938 年由陸軍轉入空軍參謀本部。1986 年死於西德阿爾滕。',
    source: wikipediaFigureRev('Alfred_Schlemm', 1379853241, 'Alfred Schlemm', 'Born 18 December 1894, Rudolstadt — Died 24 January 1986, Ahlten, West Germany', '2026-11-28'),
  }),
  // 指揮官人物卡第 8 批（規劃 v22 第二十七節，2026-11-28 Ivan 核准）。條目由戰役資訊框的指揮官連結確認；備選 4 位都沒用到。
  // 費爾伯的資訊框沒有出生地與死亡地點，籍貫標「待考」。南斯拉夫游擊隊將領比照狄托標 allies。
  figure({
    id: 'fig_ew_felber', name: '費爾伯', faction: 'axis', role: '德國陸軍將領',
    birth: '1889', death: '1962', birthDeathDisplay: '1889 年 7 月 8 日 – 1962 年 3 月 8 日', birthplace: '待考',
    shortBio: '二戰期間的德國國防軍將領。1939 年 10 月起任第 2 軍團參謀長，1940 年 2 月任中央集團軍群參謀長；1940 年 10 月起指揮第 13 軍在蘇聯作戰，1942 年 4 月調往法國，指揮後來的第 83 軍與「費爾伯集團軍級支隊」。',
    source: wikipediaFigureRev('Hans_Felber', 1380310151, 'Hans Felber', 'Born 8 July 1889 (place not given) — Died 8 March 1962 (place not given)', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_brandenberger', name: '布蘭登貝格', faction: 'axis', role: '德國陸軍將領（第 7 軍團司令）',
    birth: '1892', death: '1955', birthDeathDisplay: '1892 年 7 月 15 日 – 1955 年 6 月 21 日', birthplace: '德意志帝國奧格斯堡',
    shortBio: '二戰期間的德國國防軍將領。一戰時任巴伐利亞第 6 野戰砲兵團軍官；二戰初期任西牆的第 23 軍參謀長，之後在東線先後指揮第 8 裝甲師、第 59 軍與第 29 軍。1955 年死於西德波昂。',
    source: wikipediaFigureRev('Erich_Brandenberger', 1379830976, 'Erich Brandenberger', 'Born 15 July 1892, Augsburg — Died 21 June 1955, Bonn, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_gerstenberg', name: '格斯滕貝格', faction: 'axis', role: '德國空軍將領（駐羅馬尼亞空軍代表團司令）',
    birth: '1893', death: '1959', birthDeathDisplay: '1893 年 4 月 6 日 – 1959 年 1 月 1 日', birthplace: '德意志帝國格賴瑙',
    shortBio: '二戰期間的德國空軍將領，任駐羅馬尼亞空軍代表團司令，在普洛耶什蒂油田周圍布置了非常有效的防禦圈。一戰時先在騎兵團服役，後轉入航空部隊任偵察機飛行員。1959 年死於西德巴特特爾茨。',
    source: wikipediaFigureRev('Alfred_Gerstenberg', 1379866413, 'Alfred Gerstenberg', 'Born 6 April 1893, Grainau — Died 1 January 1959, Bad Tölz, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_messe', name: '梅塞', faction: 'axis', role: '義大利元帥',
    birth: '1883', death: '1968', birthDeathDisplay: '1883 年 12 月 10 日 – 1968 年 12 月 18 日', birthplace: '義大利王國梅薩涅',
    shortBio: '義大利元帥與政治人物。二戰時在突尼西亞被俘，1943 年 9 月義大利停戰後出任義大利共同交戰軍參謀長，後當選義大利參議員。一戰時參與建立與訓練精銳步兵「突擊隊」。1968 年死於羅馬。',
    source: wikipediaFigureRev('Giovanni_Messe', 1382319082, 'Giovanni Messe', 'Born 10 December 1883, Mesagne, Kingdom of Italy — Died 18 December 1968, Rome', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_koca_popovic', name: '科查・波波維奇', faction: 'allies', role: '南斯拉夫游擊隊將領（第 1 無產者師師長）',
    birth: '1908', death: '1992', birthDeathDisplay: '1908 年 3 月 14 日 – 1992 年 10 月 20 日', birthplace: '塞爾維亞王國貝爾格勒',
    shortBio: '塞爾維亞與南斯拉夫政治人物，曾以共產黨志願者身分參加西班牙內戰，二戰時任南斯拉夫游擊隊第 1 無產者師師長。蘇捷斯卡戰役中看出軸心國防線的弱點並策劃突圍，救出狄托、其司令部與整個抵抗運動，因此有「拯救游擊隊的人」之稱。戰後任南斯拉夫人民軍總參謀長、外交部長與南斯拉夫副總統。1992 年死於貝爾格勒。',
    source: wikipediaFigureRev('Koča_Popović', 1378245369, 'Koča Popović', 'Born 14 March 1908, Belgrade, Kingdom of Serbia — Died 20 October 1992, Belgrade', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_dapcevic', name: '佩科・達普切維奇', faction: 'allies', role: '南斯拉夫游擊隊將領（第 1 無產者軍軍長）',
    birth: '1913', death: '1999', birthDeathDisplay: '1913 年 6 月 25 日 – 1999 年 2 月 10 日', birthplace: '蒙特內哥羅采蒂涅',
    shortBio: '南斯拉夫共產黨人，曾以志願者身分參加西班牙內戰，參與蒙特內哥羅的游擊隊起義，後任南斯拉夫第 1 無產者軍、第 1 與第 4 集團軍司令。率游擊隊與蘇聯紅軍於 1944 年 10 月 20 日解放貝爾格勒，是第一位獲頒貝爾格勒榮譽市民的人。1999 年死於貝爾格勒。',
    source: wikipediaFigureRev('Peko_Dapčević', 1379834077, 'Peko Dapčević', 'Born 25 June 1913, Cetinje, Montenegro — Died 10 February 1999, Belgrade', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_fw_mueller', name: '弗里德里希-威廉・穆勒', faction: 'axis', role: '德國陸軍將領（第 22 空降步兵師師長）',
    birth: '1897', death: '1947', birthDeathDisplay: '1897 年 8 月 29 日 – 1947 年 5 月 20 日', birthplace: '德意志帝國普魯士王國巴門',
    shortBio: '二戰期間的德國國防軍將領，1943 年任第 22 空降步兵師師長，所部對希臘平民犯下暴行。之後任佔領克里特島的司令，手段嚴酷，被稱為「克里特島屠夫」。戰後被希臘法庭以戰爭罪判處死刑，1947 年在雅典處決。',
    source: wikipediaFigureRev('Friedrich-Wilhelm_Müller', 1380751090, 'Friedrich-Wilhelm Müller', 'Born 29 August 1897, Barmen, Kingdom of Prussia — Died 20 May 1947, Athens', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_kleemann', name: '克萊曼', faction: 'axis', role: '德國陸軍將領（羅得島突擊師師長）',
    birth: '1892', death: '1963', birthDeathDisplay: '1892 年 3 月 23 日 – 1963 年 1 月 1 日', birthplace: '德意志帝國普魯士王國薩克森省朗根薩爾察',
    shortBio: '二戰期間的德國將領，1942 年在北非指揮第 90 輕型非洲師。多德卡尼斯群島戰役中率 7,500 人的「羅得島」突擊師攻擊羅得島的義大利守軍，兩天內在英軍援兵抵達前擊敗義軍；英軍登陸薩摩斯、勒羅斯與科斯島後，他反擊並在兩個月內攻下這三處英軍據點。1963 年死於西德奧伯烏瑟爾。',
    source: wikipediaFigureRev('Ulrich_Kleemann', 1380342512, 'Ulrich Kleemann', 'Born 23 March 1892, Langensalza, Province of Saxony — Died 1 January 1963, Oberursel, Hesse', '2026-11-28'),
  }),
  // 指揮官人物卡第 9 批（規劃 v23 第二十八節，2026-11-28 Ivan 核准，6 位）。內迪奇、阿夫拉梅斯庫出場的戰役都在羅馬尼亞 1944 年 8 月倒戈之前、
  // 站在軸心國一方，陣營標 axis（P5）。阿夫拉梅斯庫的死亡地點資訊框（匈牙利亞斯貝雷尼）與導言（斯洛伐克）不一致，簡介不寫。
  figure({
    id: 'fig_ew_haase', name: '哈澤', faction: 'axis', role: '德國陸軍將領（第 302 步兵師師長）',
    birth: '1888', death: '1963', birthDeathDisplay: '1888 年 8 月 29 日 – 1963 年 1 月 25 日', birthplace: '德國德勒斯登',
    shortBio: '二戰期間的德國將領，主要以指揮第 302 步兵師成功擊退第厄普突襲而為人所知。一戰時任砲兵軍官，獲一級鐵十字勳章；戰後未獲留用於威瑪共和國陸軍，1919 年轉任警官，五年後任德勒斯登警察局長。1963 年死於西德哈恩施泰滕。',
    source: wikipediaFigureRev('Konrad_Haase', 1380321854, 'Konrad Haase', 'Born 29 August 1888, Dresden — Died 25 January 1963, Hahnstätten, West Germany', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_prasca', name: '普拉斯卡', faction: 'axis', role: '義大利陸軍將領',
    birth: '1883', death: '1961', birthDeathDisplay: '1883 年 2 月 27 日 – 1961 年 2 月 25 日', birthplace: '義大利羅馬',
    shortBio: '義大利將領，參加過義土戰爭與一戰。1940 年指揮希義戰爭的最初攻勢，兩週後因無能被解除指揮權，由索杜接替。出身維斯康提家族。1961 年死於蒙特波爾齊奧卡托內。',
    source: wikipediaFigureRev('Sebastiano_Visconti_Prasca', 1353504802, 'Sebastiano Visconti Prasca', 'Born 27 February 1883, Rome — Died 25 February 1961, Monte Porzio Catone', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_soddu', name: '索杜', faction: 'axis', role: '義大利陸軍將領（陸軍副參謀長）',
    birth: '1883', death: '1949', birthDeathDisplay: '1883 年 7 月 23 日 – 1949 年 7 月 25 日', birthplace: '義大利薩萊諾',
    shortBio: '義大利法西斯將領與政治人物，二戰初期任陸軍副參謀長與陸軍部次長。1940 年 11 月 8 日接替普拉斯卡指揮希義戰爭的阿爾巴尼亞高級部隊司令部，因 11 月 22 至 23 日的失利，四週後由陸軍參謀長卡瓦萊羅接替。1949 年死於羅馬。',
    source: wikipediaFigureRev('Ubaldo_Soddu', 1383379254, 'Ubaldo Soddu', 'Born 23 July 1883, Salerno — Died 25 July 1949, Rome', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_rb_williams', name: '羅伯特・威廉斯', faction: 'allies', role: '美國陸軍航空軍將領',
    birth: '1901', death: '1977', birthDeathDisplay: '1901 年 11 月 9 日 – 1977 年 2 月 10 日', birthplace: '美國德克薩斯州奧爾巴尼',
    shortBio: '美國陸軍航空軍少將，二戰時的傑出作戰指揮官。1943 年 8 月 17 日親自率領 B-17 轟炸施韋因富特的滾珠軸承工廠，這是對德國第一次大規模縱深轟炸。戰前戰後也負責訓練重轟炸部隊。1977 年死於德克薩斯州聖安東尼奧。',
    source: wikipediaFigureRev('Robert_B._Williams_(general)', 1381708721, 'Robert B. Williams', 'Born November 9, 1901, Albany, Texas — Died February 10, 1977, San Antonio, Texas', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_nedic', name: '內迪奇', faction: 'axis', role: '塞爾維亞合作政權總理',
    birth: '1878', death: '1946', birthDeathDisplay: '1878 年 9 月 2 日 – 1946 年 2 月 4 日', birthplace: '塞爾維亞公國格羅茨卡',
    shortBio: '南斯拉夫與塞爾維亞的陸軍將領與政治人物，曾任南斯拉夫王國陸軍總參謀長與戰爭部長。二戰期間與納粹德國合作，任德國佔領下塞爾維亞的傀儡「救國政府」總理。戰後被南斯拉夫共產黨當局監禁，依官方說法於 1946 年自殺。塞爾維亞法院至今駁回所有為他平反的申請。',
    source: wikipediaFigureRev('Milan_Nedić', 1385236523, 'Milan Nedić', 'Born 2 September 1878, Grocka, Principality of Serbia — Died 4 February 1946, Belgrade', '2026-11-28'),
  }),
  figure({
    id: 'fig_ew_avramescu', name: '阿夫拉梅斯庫', faction: 'axis', role: '羅馬尼亞陸軍將領',
    birth: '1884', death: '1945', birthDeathDisplay: '1884 年 1 月 26 日 – 1945 年 3 月 3 日', birthplace: '羅馬尼亞王國博托沙尼',
    shortBio: '二戰期間的羅馬尼亞陸軍中將。1945 年遭蘇聯內務人民委員部逮捕期間，在德軍空襲中身亡。',
    source: wikipediaFigureRev('Gheorghe_Avramescu', 1380220307, 'Gheorghe Avramescu', 'Born 26 January 1884, Botoșani, Kingdom of Romania — Died 3 March 1945 (infobox: Jászberény, Hungary; lead: Slovakia)', '2026-11-28'),
  }),
];
