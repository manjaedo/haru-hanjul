// Firebase Google 로그인 & Firestore 실시간 동기화 모듈 (영국·알프레드 연대기 전용)
(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyDroq35SSRzp-oTmE4rtkjLpgQzbxqWfTo",
    authDomain: "haru-hanjul-f16fc.firebaseapp.com",
    projectId: "haru-hanjul-f16fc",
    storageBucket: "haru-hanjul-f16fc.firebasestorage.app",
    messagingSenderId: "6418622627",
    appId: "1:6418622627:web:551e87825217d28fa0b716"
  };

  if (typeof firebase === 'undefined') return;

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const db = firebase.firestore();

  let currentUser = null;
  let unsubscribeDoc = null;
  let isApplyingRemote = false;

  function getDocRef(uid) {
    return db.collection('users').doc(uid).collection('herodotus').doc('state');
  }

  function mergeStates(localFavs, localMemos, remoteData) {
    const mergedFavs = new Set(localFavs);
    if (Array.isArray(remoteData?.favorites)) {
      remoteData.favorites.forEach(id => mergedFavs.add(id));
    }

    const mergedMemos = { ...localMemos };
    if (remoteData?.memos && typeof remoteData.memos === 'object') {
      Object.entries(remoteData.memos).forEach(([id, rMemo]) => {
        const lMemo = mergedMemos[id];
        if (!lMemo || (rMemo?.updatedAt || 0) > (lMemo?.updatedAt || 0)) {
          mergedMemos[id] = rMemo;
        }
      });
    }

    return { favorites: [...mergedFavs], memos: mergedMemos };
  }

  function updateAuthButton(user) {
    const btn = document.getElementById('btnAuth');
    if (!btn) return;
    if (user) {
      const name = user.displayName || user.email?.split('@')[0] || '내 계정';
      btn.textContent = `☁️ ${name}`;
      btn.title = `${user.email || ''} 동기화 중 (클릭 시 로그아웃)`;
      btn.classList.add('logged-in');
    } else {
      btn.textContent = '🔐 로그인';
      btn.title = '구글 로그인으로 기기 간 즐겨찾기·메모 동기화';
      btn.classList.remove('logged-in');
    }
  }

  async function pushState(favoritesSet, memosObj) {
    if (!currentUser || isApplyingRemote) return;
    try {
      await getDocRef(currentUser.uid).set({
        favorites: [...favoritesSet],
        memos: memosObj,
        updatedAt: Date.now()
      });
    } catch (e) {
      console.warn('Firestore 저장 실패:', e.message);
    }
  }

  async function signInOrOut() {
    if (currentUser) {
      if (confirm('로그아웃하시겠습니까?\n(현재 기기의 즐겨찾기와 메모는 브라우저에 그대로 남습니다.)')) {
        await auth.signOut();
        if (typeof showToast === 'function') showToast('로그아웃되었습니다.');
      }
      return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/operation-not-supported-in-this-environment') {
        await auth.signInWithRedirect(provider);
      } else {
        alert('구글 로그인에 실패했습니다: ' + (err.message || err.code));
      }
    }
  }

  auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    updateAuthButton(user);

    if (unsubscribeDoc) {
      unsubscribeDoc();
      unsubscribeDoc = null;
    }

    if (!user) return;

    const docRef = getDocRef(user.uid);
    try {
      const snap = await docRef.get();
      const remoteData = snap.exists ? snap.data() : null;
      const localFavs = JSON.parse(localStorage.getItem('herodotus_favorites') || '[]');
      const localMemos = JSON.parse(localStorage.getItem('herodotus_memos') || '{}');

      const merged = mergeStates(localFavs, localMemos, remoteData);

      isApplyingRemote = true;
      if (typeof window.applyCloudState === 'function') {
        window.applyCloudState(merged.favorites, merged.memos);
      }
      isApplyingRemote = false;

      await docRef.set({ favorites: merged.favorites, memos: merged.memos, updatedAt: Date.now() });

      if (typeof showToast === 'function') {
        showToast('☁️ 구글 계정과 즐겨찾기·메모가 동기화되었습니다.');
      }

      unsubscribeDoc = docRef.onSnapshot((docSnap) => {
        if (!docSnap.exists || docSnap.metadata.hasPendingWrites) return;
        const data = docSnap.data();
        isApplyingRemote = true;
        if (typeof window.applyCloudState === 'function') {
          window.applyCloudState(data.favorites || [], data.memos || {});
        }
        isApplyingRemote = false;
      });
    } catch (e) {
      console.warn('Firestore 동기화 오류:', e.message);
    }
  });

  window.yasaCloudSync = {
    pushState,
    signInOrOut
  };
})();
