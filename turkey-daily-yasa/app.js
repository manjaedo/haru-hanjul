function formatYear(y) { return y < 0 ? '기원전 ' + Math.abs(y) + '년' : y + '년'; }
// 오늘의 조선 야사 — 미니멀 리더 버전 (v6)

const state = {
  currentDate: new Date(),
  category: 'all',
  theme: localStorage.getItem('turkey_theme') || 'light',
  favorites: new Set(JSON.parse(localStorage.getItem('turkey_favorites') || '[]')),
  memos: JSON.parse(localStorage.getItem('turkey_memos') || '{}'),
  openMemoIds: new Set(),
  isQuickListOpen: false
};

let _storyMapCache = null;
function getStoryMap() {
  if (_storyMapCache) return _storyMapCache;
  const map = new Map();
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

function getSeasonalIllustration() { return null; }

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function saveFavorites() {
  localStorage.setItem('turkey_favorites', JSON.stringify([...state.favorites]));
  updateTabCounts();
  window.yasaCloudSync?.pushState(state.favorites, state.memos);
}

function saveMemosStorage() {
  localStorage.setItem('turkey_memos', JSON.stringify(state.memos));
  updateTabCounts();
  window.yasaCloudSync?.pushState(state.favorites, state.memos);
}

window.applyCloudState = function (favoritesArr, memosObj) {
  state.favorites = new Set(Array.isArray(favoritesArr) ? favoritesArr : []);
  state.memos = memosObj && typeof memosObj === 'object' ? memosObj : {};
  localStorage.setItem('turkey_favorites', JSON.stringify([...state.favorites]));
  localStorage.setItem('turkey_memos', JSON.stringify(state.memos));
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
  render();
  bindEvents();
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('turkey_theme', theme);
  const btn = document.getElementById('btnToggleTheme');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function syncDateInput() {
  const y = state.currentDate.getFullYear();
  const m = String(state.currentDate.getMonth() + 1).padStart(2, '0');
  const d = String(state.currentDate.getDate()).padStart(2, '0');
  if (elDatePicker) elDatePicker.value = `${y}-${m}-${d}`;
}

function render() {
  const month = state.currentDate.getMonth() + 1;
  const day = state.currentDate.getDate();

  let stories = [];
  if (state.category === 'legends') {
    elMonthDay.textContent = '명장면 모음';
    stories = getAllLegendStories();
  } else if (state.category === 'favorites') {
    elMonthDay.textContent = '⭐ 즐겨찾기';
    const map = getStoryMap();
    stories = [...state.favorites].map(id => map.get(id)).filter(Boolean);
    stories.sort((a, b) => (a.year - b.year) || (a.month - b.month) || (a.day - b.day));
  } else if (state.category === 'memos') {
    elMonthDay.textContent = '📝 메모';
    const map = getStoryMap();
    stories = Object.keys(state.memos).map(id => map.get(id)).filter(Boolean);
    stories.sort((a, b) => (state.memos[b.id]?.updatedAt || 0) - (state.memos[a.id]?.updatedAt || 0));
  } else {
    elMonthDay.textContent = `${month}월 ${day}일`;
    stories = getStoriesForDate(month, day);
    if (state.category !== 'all') {
      stories = stories.filter(s => s.category === state.category);
    }
  }

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
    const hasAnyForDate = state.category !== 'legends' && getStoriesForDate(month, day).length > 0;
    if (hasAnyForDate && state.category !== 'all') {
      elContainer.innerHTML = `
        <div class="empty-state-box">
          <p class="empty-state-msg">${month}월 ${day}일의 해당 주제 기록이 없습니다.</p>
          <div class="empty-state-actions">
            <button type="button" class="empty-action-btn" id="btnShowAllCats">전체 주제 보기</button>
          </div>
        </div>
      `;
      document.getElementById('btnShowAllCats')?.addEventListener('click', () => {
        state.category = 'all';
        document.querySelectorAll('.cat-link').forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
        render();
      });
    } else {
      const nearest = typeof getNearestRecordDate === 'function' ? getNearestRecordDate(month, day) : null;
      elContainer.innerHTML = `
        <div class="empty-state-box">
          <p class="empty-state-msg">📅 ${month}월 ${day}일에 등록된 오스만·터키 사료 기록이 아직 없습니다.</p>
          <p class="empty-state-sub">같은 이야기가 반복 노출되지 않도록 실제 날짜 기록만 표시합니다.</p>
          <div class="empty-state-actions">
            ${nearest ? `<button type="button" class="empty-action-btn primary" id="btnGoNearest">가까운 기록일 (${nearest.month}월 ${nearest.day}일 · ${nearest.count}편) 보기</button>` : ''}
            <button type="button" class="empty-action-btn" id="btnGoRandomRecord">기록 있는 랜덤 날짜</button>
          </div>
        </div>
      `;
      if (nearest) {
        document.getElementById('btnGoNearest')?.addEventListener('click', () => {
          state.category = 'all';
          document.querySelectorAll('.cat-link').forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
          state.currentDate = new Date(state.currentDate.getFullYear(), nearest.month - 1, nearest.day);
          syncDateInput();
          render();
        });
      }
      document.getElementById('btnGoRandomRecord')?.addEventListener('click', () => {
        document.getElementById('btnRandomDate')?.click();
      });
    }
    return;
  }

  if (elQuickTitleList) {
    elQuickTitleList.style.display = 'block';
    let listTitle = `📜 ${month}월 ${day}일 연도별 오스만·터키 사료 (${stories.length}편)`;
    if (state.category === 'legends') listTitle = `📜 명장면 야사 제목 바로가기 (${stories.length}편)`;
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

  elContainer.innerHTML = stories.map((s, idx) => {
    const cat = CATEGORIES[s.category] || CATEGORIES.mystery;
    const isFav = state.favorites.has(s.id);
    const memoObj = state.memos[s.id];
    const hasMemo = Boolean(memoObj && memoObj.text);
    const isEditorOpen = state.openMemoIds.has(s.id);
    const showIllust = idx === 0;
    const illust = showIllust ? getSeasonalIllustration(s.month || month) : null;

    return `
      <article class="story-item" id="story-card-${idx}" data-story-id="${escapeHtml(s.id)}">
        <div class="story-meta-row">
          <div class="story-meta">${formatYear(s.year)} · ${s.month}월 ${s.day}일 · ${s.king} · ${cat.shortLabel}</div>
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
        ${illust ? `
          <figure class="story-illust">
            <img src="${illust.src}" alt="${escapeHtml(illust.caption)}" loading="lazy" />
            <figcaption>${illust.caption}</figcaption>
          </figure>
        ` : ''}
        <div class="story-body">${s.yasaStory}</div>
        <div class="sillok-quote">
          <strong>오스만 사료 (${s.source})</strong>
          "${s.officialRecord}"
          ${s.sillokUrl ? `
            <div class="sillok-link-wrap">
              <a href="${escapeHtml(s.sillokUrl)}" target="_blank" rel="noopener noreferrer" class="sillok-link">
                📖 ${s.sillokUrl.includes('/id/') ? '터키·오스만 역사 백과 보기' : '터키·오스만 역사 백과 보기'} ↗
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
            <textarea class="memo-textarea" rows="3" placeholder="이 오스만·터키 사료에 대한 나만의 메모나 감상을 남겨보세요...">${hasMemo ? escapeHtml(memoObj.text) : ''}</textarea>
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

async function sendTodayBestAlert() {
  const month = state.currentDate.getMonth() + 1;
  const day = state.currentDate.getDate();
  const stories = getStoriesForDate(month, day);
  const best = stories[0];
  if (!best) return;

  showToast(`🔔 [${month}월 ${day}일 야사] 「${best.title}」 알림을 전송했습니다.`);

  try {
    const res = await fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        month: best.month,
        day: best.day,
        king: best.king,
        year: best.year,
        interestScore: best.interestScore,
        title: best.title,
        summary: best.summary,
        officialRecord: best.officialRecord
      })
    });
    if (res.ok) return;
  } catch (e) {}

  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    if (Notification.permission === 'granted') {
      new Notification(`[오늘의 조선 야사] ${month}월 ${day}일`, {
        body: `${best.title}\n(${best.king}, ${best.year}년)`
      });
    }
  }
}

function showToast(msg) {
  const toast = document.getElementById('simpleToast');
  const text = document.getElementById('toastMessage');
  if (!toast || !text) return;
  text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

function bindEvents() {
  document.getElementById('btnHome').addEventListener('click', () => {
    state.currentDate = new Date();
    state.category = 'all';
    document.querySelectorAll('.cat-link').forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
    syncDateInput();
    render();
  });

  document.getElementById('btnToggleTheme').addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  document.getElementById('btnAuth')?.addEventListener('click', () => {
    window.yasaCloudSync?.signInOrOut();
  });

  

  function resetSpecialTabIfNeeded() {
    if (['legends', 'favorites', 'memos'].includes(state.category)) {
      state.category = 'all';
      document.querySelectorAll('.cat-link').forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
    }
  }

  document.getElementById('btnPrevDay').addEventListener('click', () => {
    resetSpecialTabIfNeeded();
    state.currentDate.setDate(state.currentDate.getDate() - 1);
    syncDateInput();
    render();
  });

  document.getElementById('btnNextDay').addEventListener('click', () => {
    resetSpecialTabIfNeeded();
    state.currentDate.setDate(state.currentDate.getDate() + 1);
    syncDateInput();
    render();
  });

  document.getElementById('btnToday').addEventListener('click', () => {
    state.category = 'all';
    document.querySelectorAll('.cat-link').forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
    state.currentDate = new Date();
    syncDateInput();
    render();
  });

  document.getElementById('btnRandomDate').addEventListener('click', () => {
    const keys = Object.keys(CURATED_STORIES);
    const pick = keys[Math.floor(Math.random() * keys.length)];
    const [m, d] = pick.split('-').map(Number);
    state.category = 'all';
    document.querySelectorAll('.cat-link').forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
    state.currentDate = new Date(2026, m - 1, d);
    syncDateInput();
    render();
  });

  document.getElementById('btnOpenDatePicker').addEventListener('click', () => {
    if (typeof elDatePicker.showPicker === 'function') {
      try { elDatePicker.showPicker(); return; } catch (e) {}
    }
    elDatePicker.click();
  });

  elDatePicker.addEventListener('change', (e) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-').map(Number);
    resetSpecialTabIfNeeded();
    state.currentDate = new Date(y, m - 1, d);
    syncDateInput();
    render();
  });

  elContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    const id = btn.dataset.id;
    if (!id) return;

    if (action === 'toggle-fav') {
      if (state.favorites.has(id)) {
        state.favorites.delete(id);
        showToast('즐겨찾기에서 해제했습니다.');
      } else {
        state.favorites.add(id);
        showToast('⭐ 즐겨찾기에 저장했습니다.');
      }
      saveFavorites();
      render();
    } else if (action === 'toggle-memo' || action === 'edit-memo') {
      if (action === 'toggle-memo' && state.openMemoIds.has(id)) {
        state.openMemoIds.delete(id);
      } else {
        state.openMemoIds.add(id);
      }
      render();
      const card = elContainer.querySelector(`[data-story-id="${CSS.escape(id)}"]`);
      card?.querySelector('.memo-textarea')?.focus();
    } else if (action === 'cancel-memo') {
      state.openMemoIds.delete(id);
      render();
    } else if (action === 'save-memo') {
      const card = btn.closest('.story-item');
      const textarea = card?.querySelector('.memo-textarea');
      const text = (textarea?.value || '').trim();
      if (!text) {
        delete state.memos[id];
        showToast('빈 메모는 삭제되었습니다.');
      } else {
        state.memos[id] = { text, updatedAt: Date.now() };
        showToast('📝 메모를 저장했습니다.');
      }
      state.openMemoIds.delete(id);
      saveMemosStorage();
      render();
    } else if (action === 'delete-memo') {
      delete state.memos[id];
      state.openMemoIds.delete(id);
      saveMemosStorage();
      showToast('메모를 삭제했습니다.');
      render();
    }
  });

  const catBar = document.getElementById('categoryBar');
  const btnCatPrev = document.getElementById('btnCatPrev');
  const btnCatNext = document.getElementById('btnCatNext');

  function updateCatScrollButtons() {
    if (!catBar || !btnCatPrev || !btnCatNext) return;
    const maxScroll = catBar.scrollWidth - catBar.clientWidth;
    btnCatPrev.classList.toggle('hidden', catBar.scrollLeft <= 2);
    btnCatNext.classList.toggle('hidden', maxScroll <= 2 || catBar.scrollLeft >= maxScroll - 2);
  }

  catBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-link');
    if (!btn) return;
    document.querySelectorAll('.cat-link').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.category = btn.dataset.cat;
    btn.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    render();
  });

  catBar.addEventListener('scroll', updateCatScrollButtons, { passive: true });
  catBar.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      catBar.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });
  window.addEventListener('resize', updateCatScrollButtons);

  btnCatPrev?.addEventListener('click', () => {
    catBar.scrollBy({ left: -160, behavior: 'smooth' });
  });
  btnCatNext?.addEventListener('click', () => {
    catBar.scrollBy({ left: 160, behavior: 'smooth' });
  });
  setTimeout(updateCatScrollButtons, 50);

  document.getElementById('btnCloseToast').addEventListener('click', () => {
    document.getElementById('simpleToast').classList.remove('show');
  });
}

document.addEventListener('DOMContentLoaded', init);
