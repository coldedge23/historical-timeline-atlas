// 二戰歐洲戰場人物（規劃 v6 第 9.4 節，批次 1）。生卒日期來自 Encyclopaedia Britannica 傳記條目的開頭（輔助來源，
// 第 9.5 節），每筆以 claims 標出 birthDeathDisplay。本模組人物的 abilities 明設為 null，不計算娛樂性評分，人物彈窗不顯示雷達圖。
// 查不到生卒日期的人物（例如 Britannica 只有短條目的帕克、利斯特、雷茲-希米格維）暫不建立，戰役中以純文字列名。
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
];
