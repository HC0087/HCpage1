(function () {
  const STORAGE_KEY = 'hc-team-roster-v1';
  const groups = {
    5: ['뉴비에요', 'DEN', 'BOM', 'pigs', '은가누', '이매망량', '쭈노킹', '미끼'],
    4: ['tldud0707', '김건희', '마크', '진가', '리락쿠쿠쿠', '왇마', '탁탁탁', '작은다홍오우거', '냥냥펀치', '벅초', 'SoLoMoN', 'coocoocoo', '김태윤', 'Soooo123'],
    3: ['뉴스공장', 'appleNaDa', 'diodiablo', '지존', '만해', '호동이돈까스', 'greenday', '엉망', 'Oreo', '놀자', '화랑라이더', '어퓨굿맨'],
    2: ['서대문구청장', '라루', 'jiongkui', '노궁', '순한양', 'afrocuban', '마라나타', '쩡모', '겨털도사', '영쓰', '몰바임마'],
    1: ['설레임', '슈퍼맘순', '레데', '칸타', '나탱', '로웬', '조로헌터', '기본만하자', 'pooh4982', '불타는궁댕', '비기스트원', 'JIHOON', '매트와패트', '단홍사자', '밍키련']
  };
  const defaults = Object.entries(groups).flatMap(([score, names]) => names.map(name => ({ name, score: Number(score) })));

  function clean(entries) {
    if (!Array.isArray(entries)) return [];
    const names = new Set();
    return entries.flatMap(entry => {
      const name = String(entry?.name || '').trim();
      const score = Number(entry?.score);
      const key = name.toLocaleLowerCase();
      if (!name || names.has(key) || !Number.isInteger(score) || score < 1 || score > 5) return [];
      names.add(key);
      return [{ name, score }];
    });
  }

  function load() {
    try {
      const saved = clean(JSON.parse(localStorage.getItem(STORAGE_KEY)));
      return saved.length ? saved : defaults.map(person => ({ ...person }));
    } catch {
      return defaults.map(person => ({ ...person }));
    }
  }

  function save(entries) {
    const cleaned = clean(entries);
    if (!cleaned.length) throw new Error('한 명 이상의 유효한 구성원이 필요합니다.');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    return cleaned;
  }

  function reset() {
    localStorage.removeItem(STORAGE_KEY);
    return load();
  }

  window.HCRoster = { defaults, load, save, reset };
}());