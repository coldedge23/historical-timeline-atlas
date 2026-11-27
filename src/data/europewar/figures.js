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

// 指揮官人物卡第 1 批（規劃 v15 第二十節，2026-11-27 Ivan 核准）：英文維基百科資訊框，網址固定到查閱時的版本（oldid）。
// 中文名稱沿用戰役指揮官欄已用的譯名（本專案慣用譯名，未對照官方譯名表）。
const wikipediaFigureRev = (article, revid, name, birthDeath) => ({
  ...wikipediaFigure(article, name, birthDeath),
  url: `https://en.wikipedia.org/w/index.php?title=${encodeURIComponent(article)}&oldid=${revid}`,
  reviewedAt: '2026-11-27', accessedAt: '2026-11-27',
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
];
