// Exact local-file matches against the archived baseline; not a license verdict.
// Raw data and original files stay unchanged. Apply after all normalization.
const ARCHIVED_AVATAR_MATCHES = [
  {
    "path": "images/figures/bai_gui.jpg",
    "sha256": "744dc79e1e8ea5be185913cf7b9cd58361cbd9c6b6680372f9198199a76db436"
  },
  {
    "path": "images/figures/baili_xi.jpg",
    "sha256": "16723e65802792e64f90d32f34a62afeff5dabab79fec708881ea6039d61e199"
  },
  {
    "path": "images/figures/cao_gui.jpg",
    "sha256": "e010c9501d91b44fcb81ff4964e19a7509c2742560374a1726f460489215d1d7"
  },
  {
    "path": "images/figures/chu_huaiwang.jpg",
    "sha256": "effb7d59562f951aa75f8ed890118fe349386b486a0e06dd6d21333352925b49"
  },
  {
    "path": "images/figures/chu_long.jpg",
    "sha256": "ca0504a469812723c542d0ac7eccfbe1012e312f1cf3363a7154046def0839ff"
  },
  {
    "path": "images/figures/dou_xian.jpg",
    "sha256": "b04deff0b512a5e720541b564b43b4a6f046a78866cd769a21463432d6d3aab4"
  },
  {
    "path": "images/figures/gongsun_shu.jpg",
    "sha256": "4ffa246bfa03b1dfde8ac8bfe0b7f0fdedeac631c6d7bcd1bbf14428dc215a21"
  },
  {
    "path": "images/figures/jie_zitui.jpg",
    "sha256": "8a97a0a5cbba3a7971120576519b69a5c639b21cb4f80f90c8e5397e3a894175"
  },
  {
    "path": "images/figures/li_xin.jpg",
    "sha256": "5bcdde16ca42ca7291d63f77bce1401f560e3f06cf3d33428308d5fd66ffbf6b"
  },
  {
    "path": "images/figures/liu_bi.jpg",
    "sha256": "8fa4ebe78e1f6a1d59e4a46b9cb4e106088942319cd6377132f69399ba498831"
  },
  {
    "path": "images/figures/meng_ao.jpg",
    "sha256": "772f611a34475daa720978d9999e03f28d0f242642ace5a3d452d3cc00337f77"
  },
  {
    "path": "images/figures/mou_sui.jpg",
    "sha256": "67763c2da162a08314e96fe6a3d2524c7fa24ac15983d10aa029ca59e2dd2da9"
  },
  {
    "path": "images/figures/pang_nuan.jpg",
    "sha256": "772f611a34475daa720978d9999e03f28d0f242642ace5a3d452d3cc00337f77"
  },
  {
    "path": "images/figures/qin_xiaogong.jpg",
    "sha256": "01db9de987d7884600b56952a396e435c1ae586db66b79e4ab300cbf6f3d2c7a"
  },
  {
    "path": "images/figures/sima_cuo.jpg",
    "sha256": "b5ed42cfad0c27bf33ad21151b00c75543b8fd467b9eecfd17b437592cf72b9e"
  },
  {
    "path": "images/figures/wang_ben.jpg",
    "sha256": "5bcdde16ca42ca7291d63f77bce1401f560e3f06cf3d33428308d5fd66ffbf6b"
  },
  {
    "path": "images/figures/wei_ran.jpg",
    "sha256": "df6c169f0fb79c5e55bece809d61cd0e85b442724798b503dbc4f615eaa3c550"
  },
  {
    "path": "images/figures/wen_zhong.jpg",
    "sha256": "49382c6d02a87459c84274dfbaf2deadf1718dc93953f3c02b484366d38ebf61"
  },
  {
    "path": "images/figures/wu_helv.jpg",
    "sha256": "45b22437cc57cb2e8346ed6c70ae48d95cd1746ef3348225c5434b0a0724655a"
  },
  {
    "path": "images/figures/xiang_yan.jpg",
    "sha256": "168334dea75a910aa962b75e5dac777607e3bdceb45f329bd9152a6028d9105e"
  },
  {
    "path": "images/figures/ximen_bao.jpg",
    "sha256": "e010c9501d91b44fcb81ff4964e19a7509c2742560374a1726f460489215d1d7"
  },
  {
    "path": "images/figures/zhao_kuo.jpg",
    "sha256": "cfc3c60f77ce64eb8ab1db551507f9b4665c21b22f86b962b6d39ce920566f68"
  },
  {
    "path": "images/figures/zhuan_zhu.jpg",
    "sha256": "ca688a19dab03b6d86a3b6e75346ec799321eb19686c40be4ca0da86674687fd"
  },
  {
    "path": "images/figures/zou_ji.jpg",
    "sha256": "8a97a0a5cbba3a7971120576519b69a5c639b21cb4f80f90c8e5397e3a894175"
  },
  {
    "path": "images/figures/zou_yan.jpg",
    "sha256": "cfc3c60f77ce64eb8ab1db551507f9b4665c21b22f86b962b6d39ce920566f68"
  }
];
const blockedPaths = new Map(ARCHIVED_AVATAR_MATCHES.map(entry=>[entry.path,entry.sha256]));
export function normalizeAvatarPath(value) {
  return typeof value==='string' && !/^https?:\/\//i.test(value) ? value.replace(/^\.\//,'').replace(/^\//,'').split(/[?#]/)[0].replaceAll('\\','/') : null;
}
export function applyImagePolicy(datasets) {
  return datasets.map(dataset=>({...dataset,figures:(dataset.figures||[]).map(figure=>{
    const avatarPath=normalizeAvatarPath(figure.avatar);
    if(!blockedPaths.has(avatarPath))return figure;
    return {...figure,avatar:'',originalAvatar:figure.originalAvatar||figure.avatar,imageReview:{status:'quarantined-archive-match',reason:'與舊光榮圖庫備份檔相同，來源待核對，暫以姓名占位',sha256:blockedPaths.get(avatarPath),matchedLocalPath:avatarPath}};
  })}));
}
export const QUARANTINED_AVATAR_PATHS = Object.freeze([...blockedPaths.keys()]);
