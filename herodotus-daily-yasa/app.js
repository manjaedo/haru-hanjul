function formatYear(y) { return y < 0 ? '기원전 ' + Math.abs(y) + '년' : y + '년'; }
// 오늘의 헤로도토스 《역사》 — 24절기 기반 리더 (터키 야사 네비게이션 호환)

function storyMetaLine(s, cat) {
  const term = (typeof getSolarTermByIndex === 'function' && s.term !== undefined)
    ? getSolarTermByIndex(s.term)
    : null;
  const termTag = term ? ` · ${term.name}(${term.hanja})` : '';
  return `${formatYear(s.year)} 무렵${termTag} · ${s.king} · ${cat.shortLabel}`;
}

const state = {
  currentDate: new Date(),
  viewMode: 'date',
  category: 'all',
  shuffleSalt: 0,
  theme: localStorage.getItem('herodotus_theme') || 'light',
  favorites: new Set(JSON.parse(localStorage.getItem('herodotus_favorites') || '[]')),
  memos: JSON.parse(localStorage.getItem('herodotus_memos') || '{}'),
  openMemoIds: new Set(),
  isQuickListOpen: false
};

let _storyMapCache = null;
function getStoryMap() {
  if (_storyMapCache) return _storyMapCache;
  const map = new Map();
  if (typeof getAllHerodotusStories === 'function') {
    getAllHerodotusStories().forEach(item => {
      if (!map.has(item.id)) map.set(item.id, item);
    });
  }
  if (typeof CURATED_STORIES !== 'undefined') {
    Object.values(CURATED_STORIES).forEach(list => {
      list.forEach(item => {
        if (!map.has(item.id)) map.set(item.id, item);
      });
    });
  }
  if (typeof getAllLegendStories === 'function') {
    getAllLegendStories().forEach(item => {
      if (!map.has(item.id)) map.set(item.id, item);
    });
  }
  _storyMapCache = map;
  return map;
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function saveFavorites() {
  localStorage.setItem('herodotus_favorites', JSON.stringify([...state.favorites]));
  updateTabCounts();
  window.yasaCloudSync?.pushState(state.favorites, state.memos);
}

function saveMemosStorage() {
  localStorage.setItem('herodotus_memos', JSON.stringify(state.memos));
  updateTabCounts();
  window.yasaCloudSync?.pushState(state.favorites, state.memos);
}

window.applyCloudState = function (favoritesArr, memosObj) {
  state.favorites = new Set(Array.isArray(favoritesArr) ? favoritesArr : []);
  state.memos = memosObj && typeof memosObj === 'object' ? memosObj : {};
  localStorage.setItem('herodotus_favorites', JSON.stringify([...state.favorites]));
  localStorage.setItem('herodotus_memos', JSON.stringify(state.memos));
  updateTabCounts();
  render();
};

function updateTabCounts() {
  const favTab = document.getElementById('tabFavorites');
  const memoTab = document.getElementById('tabMemos');
  if (favTab) {
    favTab.textContent = state.favorites.size > 0 ? `⭐ 즐겨찾기 (${state.favorites.size})` : '⭐ 즐겨찾기';
  }
  const memoCount = Object.keys(state.memos).length;
  if (memoTab) {
    memoTab.textContent = memoCount > 0 ? `📝 메모 (${memoCount})` : '📝 메모';
  }
}

const elMonthDay = document.getElementById('displayMonthDay');
const elSolarTerm = document.getElementById('displaySolarTerm');
const elDatePicker = document.getElementById('datePicker');
const elQuickTitleList = document.getElementById('quickTitleList');
const elContainer = document.getElementById('storiesContainer');

function init() {
  if ('caches' in window) {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k))).catch(() => {});
  }
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister())).catch(() => {});
  }

  applyTheme(state.theme);
  updateTabCounts();
  syncDateInput();
  bindEvents();
  render();
}

function bindEvents() {
  document.getElementById('btnHome')?.addEventListener('click', () => {
    state.currentDate = new Date();
    state.viewMode = 'date';
    state.category = 'all';
    state.shuffleSalt = 0;
    syncDateInput();
    updateViewModeUI();
    setActiveCategoryUI('all');
    render();
  });

  document.getElementById('btnPrevDay')?.addEventListener('click', () => shiftDate(-1));
  document.getElementById('btnNextDay')?.addEventListener('click', () => shiftDate(1));
  document.getElementById('btnToday')?.addEventListener('click', () => {
    state.currentDate = new Date();
    state.viewMode = 'date';
    state.shuffleSalt = 0;
    syncDateInput();
    updateViewModeUI();
    render();
  });

  document.getElementById('btnShuffleTerm')?.addEventListener('click', () => {
    state.viewMode = 'date';
    state.shuffleSalt += 1;
    updateViewModeUI();
    render();
  });

  document.getElementById('btnRandomDate')?.addEventListener('click', () => {
    const start = new Date(2024, 0, 1).getTime();
    const end = new Date(2024, 11, 31).getTime();
    const rand = new Date(start + Math.random() * (end - start));
    state.currentDate = rand;
    state.viewMode = 'date';
    state.shuffleSalt = Math.floor(Math.random() * 1000);
    syncDateInput();
    updateViewModeUI();
    render();
  });

  document.getElementById('btnOpenDatePicker')?.addEventListener('click', () => {
    if (!elDatePicker) return;
    try {
      if (typeof elDatePicker.showPicker === 'function') {
        elDatePicker.showPicker();
      } else {
        elDatePicker.focus();
        elDatePicker.click();
      }
    } catch {
      elDatePicker.focus();
      elDatePicker.click();
    }
  });

  elDatePicker?.addEventListener('change', (e) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-').map(Number);
    state.currentDate = new Date(y, m - 1, d);
    state.viewMode = 'date';
    state.shuffleSalt = 0;
    updateViewModeUI();
    render();
  });

  document.getElementById('btnModeDate')?.addEventListener('click', () => {
    state.viewMode = 'date';
    if (state.category === 'legends' || state.category === 'favorites' || state.category === 'memos') {
      state.category = 'all';
      setActiveCategoryUI('all');
    }
    updateViewModeUI();
    render();
  });

  document.getElementById('btnModeCategory')?.addEventListener('click', () => {
    state.viewMode = 'category';
    if (state.category === 'legends' || state.category === 'favorites' || state.category === 'memos') {
      state.category = 'all';
      setActiveCategoryUI('all');
    }
    updateViewModeUI();
    render();
  });

  const catBar = document.getElementById('categoryBar');
  const btnCatPrev = document.getElementById('btnCatPrev');
  const btnCatNext = document.getElementById('btnCatNext');

  function updateCatArrows() {
    if (!catBar || !btnCatPrev || !btnCatNext) return;
    const maxScroll = catBar.scrollWidth - catBar.clientWidth;
    btnCatPrev.style.opacity = catBar.scrollLeft > 4 ? '1' : '0.25';
    btnCatNext.style.opacity = catBar.scrollLeft < maxScroll - 4 ? '1' : '0.25';
  }

  btnCatPrev?.addEventListener('click', () => {
    catBar?.scrollBy({ left: -160, behavior: 'smooth' });
  });
  btnCatNext?.addEventListener('click', () => {
    catBar?.scrollBy({ left: 160, behavior: 'smooth' });
  });
  catBar?.addEventListener('scroll', updateCatArrows);
  window.addEventListener('resize', updateCatArrows);
  setTimeout(updateCatArrows, 50);

  catBar?.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-link');
    if (!btn) return;
    const cat = btn.dataset.cat;
    state.category = cat;
    setActiveCategoryUI(cat);
    if (cat === 'legends' || cat === 'favorites' || cat === 'memos') {
      updateViewModeUI();
    }
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    render();
  });

  document.getElementById('btnToggleTheme')?.addEventListener('click', () => {
    const next = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  document.getElementById('btnCloseToast')?.addEventListener('click', hideToast);

  elContainer?.addEventListener('click', (e) => {
    const actionBtn = e.target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    const id = actionBtn.dataset.id;

    if (action === 'toggle-expand') {
      const targetId = actionBtn.dataset.target;
      const bodyEl = document.getElementById(targetId);
      if (bodyEl) {
        const isCollapsed = bodyEl.classList.toggle('is-collapsed');
        const labelEl = actionBtn.querySelector('.expand-label');
        if (labelEl) labelEl.textContent = isCollapsed ? '펼쳐보기 ▾' : '간략히 ▴';
        actionBtn.setAttribute('aria-expanded', String(!isCollapsed));
      }
      return;
    }

    if (action === 'toggle-fav') {
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
        showToast('즐겨찾기에서 제거했습니다.');
      } else {
        state.favorites.add(id);
        showToast('즐겨찾기에 저장했습니다.');
      }
      saveFavorites();
      render();
      return;
    }

    if (action === 'toggle-memo' || action === 'edit-memo') {
      if (state.openMemoIds.has(id)) state.openMemoIds.delete(id);
      else state.openMemoIds.add(id);
      render();
      if (state.openMemoIds.has(id)) {
        const card = elContainer.querySelector(`[data-story-id="${CSS.escape(id)}"]`);
        card?.querySelector('.memo-textarea')?.focus();
      }
      return;
    }

    if (action === 'cancel-memo') {
      state.openMemoIds.delete(id);
      render();
      return;
    }

    if (action === 'save-memo') {
      const card = actionBtn.closest('.story-item');
      const textarea = card?.querySelector('.memo-textarea');
      const text = (textarea?.value || '').trim();
      if (!text) {
        delete state.memos[id];
        showToast('빈 메모여서 삭제했습니다.');
      } else {
        state.memos[id] = { text, updatedAt: new Date().toISOString() };
        showToast('메모를 저장했습니다.');
      }
      state.openMemoIds.delete(id);
      saveMemosStorage();
      render();
      return;
    }

    if (action === 'delete-memo') {
      delete state.memos[id];
      state.openMemoIds.delete(id);
      saveMemosStorage();
      showToast('메모를 삭제했습니다.');
      render();
    }
  });
}

function setActiveCategoryUI(cat) {
  document.querySelectorAll('.cat-link').forEach(b => {
    b.classList.toggle('active', b.dataset.cat === cat);
  });
}

function updateViewModeUI() {
  const btnDate = document.getElementById('btnModeDate');
  const btnCat = document.getElementById('btnModeCategory');
  const dateBar = document.querySelector('.date-bar');
  const isSpecial = state.category === 'legends' || state.category === 'favorites' || state.category === 'memos';
  const isCatMode = state.viewMode === 'category' && !isSpecial;
  if (btnDate) {
    btnDate.classList.toggle('active', !isCatMode && !isSpecial);
    btnDate.setAttribute('aria-selected', String(!isCatMode && !isSpecial));
  }
  if (btnCat) {
    btnCat.classList.toggle('active', isCatMode);
    btnCat.setAttribute('aria-selected', String(isCatMode));
  }
  if (dateBar) {
    dateBar.classList.toggle('is-dimmed', isCatMode || isSpecial);
  }
}

function shiftDate(days) {
  const next = new Date(state.currentDate);
  next.setDate(next.getDate() + days);
  state.currentDate = next;
  state.viewMode = 'date';
  state.shuffleSalt = 0;
  syncDateInput();
  updateViewModeUI();
  render();
}

function syncDateInput() {
  if (!elDatePicker) return;
  const y = state.currentDate.getFullYear();
  const m = String(state.currentDate.getMonth() + 1).padStart(2, '0');
  const d = String(state.currentDate.getDate()).padStart(2, '0');
  elDatePicker.value = `${y}-${m}-${d}`;
}

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('herodotus_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('btnToggleTheme');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function showToast(msg) {
  const toast = document.getElementById('simpleToast');
  const textEl = document.getElementById('toastMessage');
  if (!toast || !textEl) return;
  textEl.textContent = msg;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(hideToast, 2400);
}

function hideToast() {
  document.getElementById('simpleToast')?.classList.remove('show');
}

function getStoriesToRender(month, day) {
  const all = typeof getAllHerodotusStories === 'function' ? getAllHerodotusStories() : [];

  if (state.category === 'favorites') {
    const map = getStoryMap();
    const list = [];
    state.favorites.forEach(id => {
      if (map.has(id)) list.push(map.get(id));
    });
    return list;
  }

  if (state.category === 'memos') {
    const map = getStoryMap();
    const list = [];
    Object.keys(state.memos).forEach(id => {
      if (map.has(id)) list.push(map.get(id));
    });
    return list;
  }

  if (state.category === 'legends') {
    if (typeof getAllLegendStories === 'function') return getAllLegendStories();
    return [...all].sort((a, b) => (b.interestScore || 0) - (a.interestScore || 0)).slice(0, 24);
  }

  if (state.viewMode === 'category') {
    if (state.category === 'all') {
      return [...all].sort((a, b) => (a.term - b.term) || (a.year - b.year));
    }
    return all
      .filter(s => s.category === state.category)
      .sort((a, b) => (b.interestScore || 0) - (a.interestScore || 0));
  }

  // 절기별 오늘의 이야기: 해당 절기 풀에서 날짜 시드/셔플로 3~4편 추출
  const term = typeof getSolarTermForDate === 'function' ? getSolarTermForDate(month, day) : null;
  const termPool = term ? all.filter(s => s.term === term.index) : all;

  let filtered = state.category === 'all'
    ? termPool
    : termPool.filter(s => s.category === state.category);

  // Deterministic pseudo-random shuffle seeded by month, day, and shuffleSalt
  const seedBase = month * 100 + day + state.shuffleSalt * 37;
  const seeded = [...filtered].map((item, i) => {
    const x = Math.sin(seedBase + i * 19.17) * 10000;
    return { item, r: x - Math.floor(x) };
  }).sort((a, b) => a.r - b.r).map(x => x.item);

  const count = (state.category === 'all')
    ? (((month + day + state.shuffleSalt) % 2 === 0) ? 4 : 3)
    : seeded.length;
  return seeded.slice(0, Math.min(count, seeded.length));
}

function render() {
  const month = state.currentDate.getMonth() + 1;
  const day = state.currentDate.getDate();
  const term = typeof getSolarTermForDate === 'function' ? getSolarTermForDate(month, day) : null;

  if (elMonthDay) elMonthDay.textContent = `${month}월 ${day}일`;
  if (elSolarTerm && term) {
    elSolarTerm.textContent = `${term.name}(${term.hanja})`;
    elSolarTerm.title = `${term.name} · ${term.range}`;
  }

  const stories = getStoriesToRender(month, day);

  if (!stories.length) {
    if (elQuickTitleList) elQuickTitleList.style.display = 'none';
    if (state.category === 'favorites') {
      elContainer.innerHTML = `
        <div class="empty-state-box">
          <p class="empty-state-msg">⭐ 아직 즐겨찾기한 이야기가 없습니다.</p>
          <p class="empty-state-sub">마음에 드는 이야기 오른쪽 위의 ☆ 버튼을 눌러 모아보세요.</p>
        </div>
      `;
      return;
    }
    if (state.category === 'memos') {
      elContainer.innerHTML = `
        <div class="empty-state-box">
          <p class="empty-state-msg">📝 아직 작성한 메모가 없습니다.</p>
          <p class="empty-state-sub">이야기 오른쪽 위의 '📝 메모' 버튼을 눌러 나만의 감상이나 기록을 남겨보세요.</p>
        </div>
      `;
      return;
    }
    elContainer.innerHTML = `
      <div class="empty-state-box">
        <p class="empty-state-msg">${term ? term.name : `${month}월 ${day}일`} 절기에는 해당 주제 이야기가 없습니다.</p>
        <div class="empty-state-actions">
          <button type="button" class="empty-action-btn" id="btnShowAllCats">전체 주제 보기</button>
          <button type="button" class="empty-action-btn secondary" id="btnGoRandomRecord">다른 날짜 보기</button>
        </div>
      </div>
    `;
    document.getElementById('btnShowAllCats')?.addEventListener('click', () => {
      state.category = 'all';
      setActiveCategoryUI('all');
      render();
    });
    document.getElementById('btnGoRandomRecord')?.addEventListener('click', () => {
      document.getElementById('btnRandomDate')?.click();
    });
    return;
  }

  if (elQuickTitleList) {
    elQuickTitleList.style.display = 'block';
    let listTitle = term
      ? `📜 ${term.name}(${term.hanja}) 무렵의 헤로도토스 이야기 (${stories.length}편)`
      : `📜 오늘의 헤로도토스 이야기 (${stories.length}편)`;
    if (state.viewMode === 'category') {
      const catObj = CATEGORIES[state.category];
      listTitle = catObj ? `📚 ${catObj.label} 전체 이야기 (${stories.length}편)` : `📚 《역사》 전체 모아보기 (${stories.length}편)`;
    } else if (state.category === 'legends') listTitle = `📜 명장면 모음 (${stories.length}편)`;
    else if (state.category === 'favorites') listTitle = `⭐ 즐겨찾기한 이야기 (${stories.length}편)`;
    else if (state.category === 'memos') listTitle = `📝 메모가 있는 이야기 (${stories.length}편)`;

    elQuickTitleList.innerHTML = `
      <button type="button" class="quick-title-toggle" id="btnToggleQuickList" aria-expanded="${state.isQuickListOpen}">
        <span>${listTitle}</span>
        <span class="quick-toggle-icon">${state.isQuickListOpen ? '▴ 접기' : '▾ 목차 보기'}</span>
      </button>
      <ol class="quick-title-items ${state.isQuickListOpen ? '' : 'collapsed'}">
        ${stories.map((s, idx) => {
          const cat = CATEGORIES[s.category] || CATEGORIES.mystery;
          return `
            <li>
              <button type="button" class="quick-title-btn" data-target="story-card-${idx}">
                <span class="quick-text">${s.title}</span>
                <span class="quick-sub">${formatYear(s.year)} · ${s.king} · ${cat.shortLabel}</span>
              </button>
            </li>
          `;
        }).join('')}
      </ol>
    `;

    document.getElementById('btnToggleQuickList')?.addEventListener('click', () => {
      state.isQuickListOpen = !state.isQuickListOpen;
      const itemsEl = elQuickTitleList.querySelector('.quick-title-items');
      const iconEl = elQuickTitleList.querySelector('.quick-toggle-icon');
      const toggleBtn = document.getElementById('btnToggleQuickList');
      if (itemsEl) itemsEl.classList.toggle('collapsed', !state.isQuickListOpen);
      if (iconEl) iconEl.textContent = state.isQuickListOpen ? '▴ 접기' : '▾ 목차 보기';
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(state.isQuickListOpen));
    });

    elQuickTitleList.querySelectorAll('.quick-title-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetEl = document.getElementById(btn.dataset.target);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetEl.classList.remove('highlight-flash');
          void targetEl.offsetWidth;
          targetEl.classList.add('highlight-flash');
        }
      });
    });
  }

  const termBanner = (state.viewMode === 'date' && state.category === 'all' && term)
    ? `<div class="fallback-notice">🌿 <strong>${term.name}(${term.hanja}, ${term.range})</strong> 절기 모음에서 고른 <strong>${stories.length}편</strong>입니다. 상단 <strong>🎲 다시 뽑기</strong>로 같은 절기의 다른 조합을 볼 수 있습니다.</div>`
    : '';

  elContainer.innerHTML = termBanner + stories.map((s, idx) => {
    const cat = CATEGORIES[s.category] || CATEGORIES.mystery;
    const isFav = state.favorites.has(s.id);
    const memoObj = state.memos[s.id];
    const hasMemo = Boolean(memoObj && memoObj.text);
    const isEditorOpen = state.openMemoIds.has(s.id);
    const isLongStory = (s.yasaStory && s.yasaStory.length > 420);

    return `
      <article class="story-item" id="story-card-${idx}" data-story-id="${escapeHtml(s.id)}">
        <div class="story-meta-row">
          <div class="story-meta">${storyMetaLine(s, cat)}</div>
          <div class="story-actions">
            <button type="button" class="action-pill fav-btn ${isFav ? 'active' : ''}" data-action="toggle-fav" data-id="${escapeHtml(s.id)}" aria-label="즐겨찾기">
              ${isFav ? '★ 저장됨' : '☆ 즐겨찾기'}
            </button>
            <button type="button" class="action-pill memo-btn ${hasMemo ? 'has-memo' : ''}" data-action="toggle-memo" data-id="${escapeHtml(s.id)}" aria-label="메모">
              ${hasMemo ? '📝 메모됨' : '📝 메모'}
            </button>
          </div>
        </div>
        <h2 class="story-title">${s.title}</h2>
        ${s.imageUrl ? `
          <figure class="story-figure">
            <img src="${escapeHtml(s.imageUrl)}" alt="${escapeHtml(s.title)}" loading="lazy" onerror="this.parentElement.style.display='none'" />
            <figcaption>${escapeHtml(s.source)} · ${escapeHtml(s.king)}</figcaption>
          </figure>
        ` : ''}
        <div class="story-body-wrap">
          <div class="story-body ${isLongStory ? 'is-collapsed' : ''}" id="story-body-${idx}">${s.yasaStory}</div>
          ${isLongStory ? `
            <button type="button" class="btn-toggle-expand" data-action="toggle-expand" data-target="story-body-${idx}" aria-expanded="false">
              <span class="expand-label">펼쳐보기 ▾</span>
            </button>
          ` : ''}
        </div>
        <div class="sillok-quote">
          <strong>원전 한 줄 · ${s.source}</strong>
          ${s.officialRecord}
          ${s.sillokUrl ? `
            <div class="sillok-link-wrap">
              <a href="${escapeHtml(s.sillokUrl)}" target="_blank" rel="noopener noreferrer" class="sillok-link">
                📖 원전·사료 더 읽어보기 ↗
              </a>
            </div>
          ` : ''}
        </div>
        ${hasMemo && !isEditorOpen ? `
          <div class="memo-box">
            <div class="memo-box-head">
              <span>📝 내 메모</span>
              <div class="memo-box-btns">
                <button type="button" class="memo-link-btn" data-action="edit-memo" data-id="${escapeHtml(s.id)}">수정</button>
                <button type="button" class="memo-link-btn danger" data-action="delete-memo" data-id="${escapeHtml(s.id)}">삭제</button>
              </div>
            </div>
            <p class="memo-box-text">${escapeHtml(memoObj.text)}</p>
          </div>
        ` : ''}
        ${isEditorOpen ? `
          <div class="memo-editor">
            <textarea class="memo-textarea" rows="3" placeholder="이 헤로도토스 기록에 대한 나만의 메모나 감상을 남겨보세요...">${hasMemo ? escapeHtml(memoObj.text) : ''}</textarea>
            <div class="memo-editor-actions">
              <button type="button" class="memo-save-btn" data-action="save-memo" data-id="${escapeHtml(s.id)}">저장</button>
              <button type="button" class="memo-cancel-btn" data-action="cancel-memo" data-id="${escapeHtml(s.id)}">취소</button>
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', init);
