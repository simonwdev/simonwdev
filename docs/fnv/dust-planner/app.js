(() => {
  const SPECIAL_KEYS = ['strength','perception','endurance','charisma','intelligence','agility','luck'];
  const SPECIAL_ABBR = ['STR','PER','END','CHR','INT','AGL','LCK'];
  const SPECIAL_POOL = 40; // 7 stats * 5 base + 5 distributable
  const MIN_STAT = 1;
  const MAX_STAT = 10;

  const state = {
    level: 1,
    stats: [5, 5, 5, 5, 5, 5, 5],
    tagSkills: new Set(),
    skillValues: {},
    sanity: 250,
    rads: 0,
    perkRanks: {},
    filters: { search: '', category: 'all', availableOnly: false, sort: 'name' },
  };

  // Initialize skill values
  SKILLS.forEach(s => { state.skillValues[s.id] = 0; });

  const tooltip = document.getElementById('tooltip');
  let tooltipTarget = null;

  // --- Helpers ---

  function specialUsed() { return state.stats.reduce((a, b) => a + b, 0); }
  function specialRemaining() { return SPECIAL_POOL - specialUsed(); }

  function perkPointsTotal() { return Math.floor(state.level / 2); }
  function perkPointsUsed() {
    let count = 0;
    for (const id in state.perkRanks) count += state.perkRanks[id];
    return count;
  }
  function perkPointsRemaining() { return perkPointsTotal() - perkPointsUsed(); }

  function getStatValue(statName) {
    const idx = SPECIAL_KEYS.indexOf(statName);
    return idx >= 0 ? state.stats[idx] : 0;
  }

  function getSkillValue(skillId) {
    return state.skillValues[skillId] || 0;
  }

  function isInsane() { return state.sanity < 0; }

  // --- Requirement checking ---

  function meetsRequirements(perk, rankIndex) {
    const reqs = perk.requirements;
    if (!reqs) return true;

    // Level requirement
    if (perk.levelReq[rankIndex] > state.level) return false;

    // SPECIAL minimums
    if (reqs.special) {
      for (const stat in reqs.special) {
        if (getStatValue(stat) < reqs.special[stat]) return false;
      }
    }

    // SPECIAL maximums
    if (reqs.specialMax) {
      for (const stat in reqs.specialMax) {
        if (getStatValue(stat) > reqs.specialMax[stat]) return false;
      }
    }

    // Skill minimums
    if (reqs.skills) {
      for (const skill in reqs.skills) {
        if (getSkillValue(skill) < reqs.skills[skill]) return false;
      }
    }

    // Skill exact values
    if (reqs.skillsExact) {
      for (const skill in reqs.skillsExact) {
        if (getSkillValue(skill) < reqs.skillsExact[skill]) return false;
      }
    }

    // Sanity thresholds
    if (reqs.sanity) {
      if (reqs.sanity.min !== undefined && state.sanity < reqs.sanity.min) return false;
      if (reqs.sanity.max !== undefined && state.sanity > reqs.sanity.max) return false;
    }

    // Insanity requirement
    if (reqs.insanity && !isInsane()) return false;

    // Perk prerequisites
    if (reqs.perkReq) {
      for (const perkId of reqs.perkReq) {
        if (!state.perkRanks[perkId] || state.perkRanks[perkId] <= 0) return false;
      }
    }

    // Radiation thresholds
    if (reqs.rads) {
      if (reqs.rads.min !== undefined && state.rads < reqs.rads.min) return false;
      if (reqs.rads.max !== undefined && state.rads > reqs.rads.max) return false;
    }

    // Incompatible perks
    if (reqs.incompatible) {
      for (const perkId of reqs.incompatible) {
        if (state.perkRanks[perkId] && state.perkRanks[perkId] > 0) return false;
      }
    }

    return true;
  }

  function isLocked(perk) {
    const currentRank = state.perkRanks[perk.id] || 0;
    const nextRank = Math.min(currentRank, perk.ranks - 1);
    return !meetsRequirements(perk, nextRank);
  }

  // --- Constraints ---

  function enforceConstraints() {
    let changed = true;
    while (changed) {
      changed = false;
      for (const perk of DUST_PERKS) {
        const currentRank = state.perkRanks[perk.id] || 0;
        if (currentRank <= 0) continue;
        // Check if highest taken rank is still valid
        let validRanks = 0;
        for (let r = 0; r < currentRank; r++) {
          if (meetsRequirements(perk, r)) validRanks = r + 1;
          else break;
        }
        if (validRanks < currentRank) {
          state.perkRanks[perk.id] = validRanks;
          changed = true;
        }
      }
    }
    // Trim if over budget
    while (perkPointsRemaining() < 0) {
      trimLastPerkRank();
    }
  }

  function trimLastPerkRank() {
    // Remove from the last perk alphabetically that has ranks
    const perksWithRanks = DUST_PERKS.filter(p => (state.perkRanks[p.id] || 0) > 0);
    if (perksWithRanks.length === 0) return;
    const last = perksWithRanks[perksWithRanks.length - 1];
    state.perkRanks[last.id]--;
  }

  // --- Render ---

  function render() {
    renderSpecial();
    renderSkills();
    renderHeader();
    renderPerks();
  }

  function renderHeader() {
    const sRem = specialRemaining();
    const sDisplay = document.getElementById('special-display');
    sDisplay.innerHTML = `S.P.E.C.I.A.L.: <b>${sRem}</b> / ${SPECIAL_POOL - 7 * MIN_STAT}`;
    sDisplay.className = 'points-display' + (sRem < 0 ? ' over' : '');

    const pRem = perkPointsRemaining();
    const pDisplay = document.getElementById('perk-display');
    pDisplay.innerHTML = `Perks: <b>${pRem}</b> / ${perkPointsTotal()}`;
    pDisplay.className = 'points-display' + (pRem < 0 ? ' over' : '');
  }

  function renderSpecial() {
    const list = document.getElementById('special-list');
    list.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      const div = document.createElement('div');
      div.className = 'special-stat';
      div.innerHTML = `
        <span class="label">${SPECIAL_ABBR[i]}</span>
        <span class="value">${state.stats[i]}</span>
        <div class="controls">
          <button class="dec" ${state.stats[i] <= MIN_STAT ? 'disabled' : ''}>-</button>
          <button class="inc" ${state.stats[i] >= MAX_STAT || specialRemaining() <= 0 ? 'disabled' : ''}>+</button>
        </div>`;
      const idx = i;
      div.querySelector('.dec').addEventListener('click', () => {
        if (state.stats[idx] > MIN_STAT) { state.stats[idx]--; enforceConstraints(); render(); }
      });
      div.querySelector('.inc').addEventListener('click', () => {
        if (state.stats[idx] < MAX_STAT && specialRemaining() > 0) { state.stats[idx]++; render(); }
      });
      list.appendChild(div);
    }
  }

  function renderSkills() {
    const list = document.getElementById('skills-list');
    list.innerHTML = '';
    SKILLS.forEach(skill => {
      const row = document.createElement('div');
      row.className = 'skill-row';
      const isTagged = state.tagSkills.has(skill.id);
      const value = getSkillValue(skill.id);

      row.innerHTML = `
        <span class="skill-name">${skill.name}</span>
        <input class="skill-input" type="number" min="0" max="100" value="${value}">
        <button class="tag-btn ${isTagged ? 'active' : ''}" title="Tag skill (+15)">T</button>`;

      const input = row.querySelector('.skill-input');
      input.addEventListener('input', (e) => {
        const val = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
        state.skillValues[skill.id] = val;
        e.target.value = val;
        enforceConstraints();
        renderPerks();
        renderHeader();
      });

      const tagBtn = row.querySelector('.tag-btn');
      tagBtn.addEventListener('click', () => {
        if (state.tagSkills.has(skill.id)) {
          state.tagSkills.delete(skill.id);
          state.skillValues[skill.id] = Math.max(0, (state.skillValues[skill.id] || 0) - 15);
        } else if (state.tagSkills.size < 3) {
          state.tagSkills.add(skill.id);
          state.skillValues[skill.id] = (state.skillValues[skill.id] || 0) + 15;
        }
        enforceConstraints();
        render();
      });

      list.appendChild(row);
    });
  }

  function formatReqText(perk) {
    const parts = [];
    const reqs = perk.requirements;
    if (!reqs) return '';

    if (reqs.special) {
      for (const stat in reqs.special) {
        const abbr = SPECIAL_ABBR[SPECIAL_KEYS.indexOf(stat)];
        const met = getStatValue(stat) >= reqs.special[stat];
        parts.push(`<span class="${met ? 'met' : 'unmet'}">${abbr} ${reqs.special[stat]}</span>`);
      }
    }
    if (reqs.specialMax) {
      for (const stat in reqs.specialMax) {
        const abbr = SPECIAL_ABBR[SPECIAL_KEYS.indexOf(stat)];
        const met = getStatValue(stat) <= reqs.specialMax[stat];
        parts.push(`<span class="${met ? 'met' : 'unmet'}">${abbr} &le;${reqs.specialMax[stat]}</span>`);
      }
    }
    if (reqs.skills) {
      for (const skill in reqs.skills) {
        const sk = SKILLS.find(s => s.id === skill);
        const met = getSkillValue(skill) >= reqs.skills[skill];
        parts.push(`<span class="${met ? 'met' : 'unmet'}">${sk ? sk.name : skill} ${reqs.skills[skill]}</span>`);
      }
    }
    if (reqs.skillsExact) {
      for (const skill in reqs.skillsExact) {
        const sk = SKILLS.find(s => s.id === skill);
        const met = getSkillValue(skill) >= reqs.skillsExact[skill];
        parts.push(`<span class="${met ? 'met' : 'unmet'}">${sk ? sk.name : skill} =${reqs.skillsExact[skill]}</span>`);
      }
    }
    if (reqs.sanity) {
      if (reqs.sanity.min !== undefined) {
        const met = state.sanity >= reqs.sanity.min;
        parts.push(`<span class="${met ? 'met' : 'unmet'}">Sanity &ge;${reqs.sanity.min}</span>`);
      }
      if (reqs.sanity.max !== undefined) {
        const met = state.sanity <= reqs.sanity.max;
        parts.push(`<span class="${met ? 'met' : 'unmet'}">Sanity &le;${reqs.sanity.max}</span>`);
      }
    }
    if (reqs.insanity) {
      const met = isInsane();
      parts.push(`<span class="${met ? 'met' : 'unmet'}">Insanity</span>`);
    }
    if (reqs.perkReq) {
      for (const perkId of reqs.perkReq) {
        const dep = DUST_PERKS.find(p => p.id === perkId);
        const met = (state.perkRanks[perkId] || 0) > 0;
        parts.push(`<span class="${met ? 'met' : 'unmet'}">${dep ? dep.name : perkId}</span>`);
      }
    }
    if (reqs.rads) {
      if (reqs.rads.min !== undefined) {
        const met = state.rads >= reqs.rads.min;
        parts.push(`<span class="${met ? 'met' : 'unmet'}">Rads &ge;${reqs.rads.min}</span>`);
      }
      if (reqs.rads.max !== undefined) {
        const met = state.rads <= reqs.rads.max;
        parts.push(`<span class="${met ? 'met' : 'unmet'}">Rads &le;${reqs.rads.max}</span>`);
      }
    }
    return parts.join(' &middot; ');
  }

  function renderPerks() {
    const grid = document.getElementById('perk-grid');
    grid.innerHTML = '';
    const noPerks = perkPointsRemaining() <= 0;

    let perks = DUST_PERKS.slice();

    // Filter
    if (state.filters.search) {
      const q = state.filters.search.toLowerCase();
      perks = perks.filter(p => p.name.toLowerCase().includes(q));
    }
    if (state.filters.category !== 'all') {
      perks = perks.filter(p => p.category === state.filters.category);
    }
    if (state.filters.availableOnly) {
      perks = perks.filter(p => !isLocked(p));
    }

    // Sort
    if (state.filters.sort === 'name') {
      perks.sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.filters.sort === 'category') {
      perks.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    } else if (state.filters.sort === 'level') {
      perks.sort((a, b) => (a.levelReq[0] || 0) - (b.levelReq[0] || 0) || a.name.localeCompare(b.name));
    }

    perks.forEach(perk => {
      const locked = isLocked(perk);
      const currentRank = state.perkRanks[perk.id] || 0;
      const cat = PERK_CATEGORIES.find(c => c.id === perk.category);

      const card = document.createElement('div');
      card.className = `perk-card${locked ? ' locked' : ''}`;
      card.dataset.category = perk.category;

      const reqText = formatReqText(perk);
      const levelText = perk.levelReq[0] > 0 ? `Lvl ${perk.levelReq[0]}+` : '';

      card.innerHTML = `
        <div class="perk-header">
          <span class="perk-name">${perk.name}</span>
          <span class="perk-category" style="background:${cat ? cat.color : '#666'}">${cat ? cat.name : ''}</span>
        </div>
        ${reqText ? `<div class="perk-reqs">${reqText}</div>` : ''}
        <div class="perk-bottom">
          <div class="perk-ranks"></div>
          ${levelText ? `<span class="level-req">${levelText}</span>` : ''}
        </div>`;

      const ranksDiv = card.querySelector('.perk-ranks');
      for (let ri = 0; ri < perk.ranks; ri++) {
        const dot = document.createElement('div');
        const meetsLevel = state.level >= (perk.levelReq[ri] || 0);
        const filled = ri < currentRank;
        dot.className = `rank-dot${filled ? ' filled' : ''}${!meetsLevel ? ' level-locked' : ''}`;

        if (!locked && meetsLevel && (filled || !noPerks)) {
          const rankIdx = ri;
          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            if (rankIdx < currentRank) {
              // Clicking a filled dot: derank to this position
              state.perkRanks[perk.id] = rankIdx === currentRank - 1 ? rankIdx : rankIdx + 1;
            } else if (perkPointsRemaining() > 0 && meetsRequirements(perk, rankIdx)) {
              state.perkRanks[perk.id] = rankIdx + 1;
            }
            enforceConstraints();
            render();
          });
        }
        ranksDiv.appendChild(dot);
      }

      card.addEventListener('mouseenter', (e) => { showTooltip(e, perk); tooltipTarget = card; });
      card.addEventListener('mousemove', positionTooltip);
      card.addEventListener('mouseleave', hideTooltip);

      grid.appendChild(card);
    });
  }

  // --- Tooltip ---

  function showTooltip(e, perk) {
    const currentRank = state.perkRanks[perk.id] || 0;
    let html = `<div class="tt-name">${perk.name}</div>`;

    const reqText = formatReqText(perk);
    if (reqText) html += `<div class="tt-req">${reqText}</div>`;

    for (let i = 0; i < perk.ranks; i++) {
      const active = i < currentRank ? ' active' : '';
      const levelReq = perk.levelReq[i] || 0;
      const levelMet = state.level >= levelReq;
      const levelClass = levelMet ? '' : ' level-unmet';
      const levelStr = levelReq > 0 ? ` (Lvl ${levelReq}${!levelMet ? ' - too low' : ''})` : '';
      html += `<div class="tt-rank${active}${levelClass}">`;
      if (perk.ranks > 1) html += `<span class="rank-label">Rank ${i + 1}</span>`;
      if (levelStr) html += ` <span class="level-req">${levelStr}</span>`;
      if (perk.ranks > 1 || levelStr) html += '<br>';
      html += `${perk.descriptions[i]}</div>`;
    }
    tooltip.innerHTML = html;
    tooltip.classList.add('visible');
    positionTooltip(e);
  }

  function positionTooltip(e) {
    const pad = 12;
    let x = e.clientX + pad;
    let y = e.clientY + pad;
    const rect = tooltip.getBoundingClientRect();
    if (x + rect.width > window.innerWidth - pad) x = e.clientX - rect.width - pad;
    if (y + rect.height > window.innerHeight - pad) y = e.clientY - rect.height - pad;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }

  function hideTooltip() {
    tooltip.classList.remove('visible');
    tooltipTarget = null;
  }

  // --- Filters ---

  function initFilters() {
    const catSelect = document.getElementById('filter-category');
    PERK_CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      catSelect.appendChild(opt);
    });

    document.getElementById('filter-search').addEventListener('input', (e) => {
      state.filters.search = e.target.value;
      renderPerks();
    });
    catSelect.addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      renderPerks();
    });
    document.getElementById('filter-available').addEventListener('change', (e) => {
      state.filters.availableOnly = e.target.checked;
      renderPerks();
    });
    document.getElementById('filter-sort').addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      renderPerks();
    });
  }

  // --- Events ---

  document.getElementById('level-input').addEventListener('input', (e) => {
    state.level = Math.max(1, Math.min(50, parseInt(e.target.value) || 1));
    e.target.value = state.level;
    enforceConstraints();
    render();
  });

  document.getElementById('sanity-input').addEventListener('input', (e) => {
    state.sanity = Math.max(-1000, Math.min(1000, parseInt(e.target.value) || 0));
    e.target.value = state.sanity;
    enforceConstraints();
    renderPerks();
    renderHeader();
  });

  document.getElementById('rads-input').addEventListener('input', (e) => {
    state.rads = Math.max(0, Math.min(1000, parseInt(e.target.value) || 0));
    e.target.value = state.rads;
    enforceConstraints();
    renderPerks();
    renderHeader();
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    state.level = 1;
    state.stats = [5, 5, 5, 5, 5, 5, 5];
    state.tagSkills = new Set();
    SKILLS.forEach(s => { state.skillValues[s.id] = 0; });
    state.sanity = 250;
    state.rads = 0;
    state.perkRanks = {};
    state.filters = { search: '', category: 'all', availableOnly: false, sort: 'name' };
    document.getElementById('level-input').value = 1;
    document.getElementById('sanity-input').value = 250;
    document.getElementById('rads-input').value = 0;
    document.getElementById('filter-search').value = '';
    document.getElementById('filter-category').value = 'all';
    document.getElementById('filter-available').checked = false;
    document.getElementById('filter-sort').value = 'name';
    render();
  });

  // --- Share / URL serialization ---

  function encodeBuild() {
    const parts = [];
    parts.push('v1');
    parts.push(state.level);
    parts.push(state.stats.join('.'));
    parts.push(state.sanity);
    parts.push(state.rads);

    // Tag skills
    const tags = Array.from(state.tagSkills).sort().join(',');
    parts.push(tags || '-');

    // Skill values
    const skillVals = SKILLS.map(s => state.skillValues[s.id] || 0).join('.');
    parts.push(skillVals);

    // Perk ranks
    const perkParts = [];
    for (const perk of DUST_PERKS) {
      const r = state.perkRanks[perk.id] || 0;
      if (r > 0) perkParts.push(`${perk.id}:${r}`);
    }
    parts.push(perkParts.join(',') || '-');

    return btoa(parts.join('|')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decodeBuild(str) {
    try {
      let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      const decoded = atob(b64);
      const parts = decoded.split('|');
      if (parts[0] !== 'v1') return null;

      const level = parseInt(parts[1]) || 1;
      const stats = parts[2].split('.').map(Number);
      const sanity = parseInt(parts[3]) || 250;
      const rads = parseInt(parts[4]) || 0;

      const tagSkills = new Set();
      if (parts[5] && parts[5] !== '-') {
        parts[5].split(',').forEach(t => tagSkills.add(t));
      }

      const skillValues = {};
      if (parts[6]) {
        const vals = parts[6].split('.').map(Number);
        SKILLS.forEach((s, i) => { skillValues[s.id] = vals[i] || 0; });
      }

      const perkRanks = {};
      if (parts[7] && parts[7] !== '-') {
        parts[7].split(',').forEach(p => {
          const [id, r] = p.split(':');
          perkRanks[id] = parseInt(r) || 0;
        });
      }

      return { level, stats, sanity, rads, tagSkills, skillValues, perkRanks };
    } catch (e) { return null; }
  }

  function applyBuild(b) {
    state.level = b.level;
    state.stats = b.stats;
    state.sanity = b.sanity;
    state.rads = b.rads;
    state.tagSkills = b.tagSkills;
    state.skillValues = b.skillValues;
    state.perkRanks = b.perkRanks;
    document.getElementById('level-input').value = state.level;
    document.getElementById('sanity-input').value = state.sanity;
    document.getElementById('rads-input').value = state.rads;
    render();
  }

  document.getElementById('btn-share').addEventListener('click', () => {
    const encoded = encodeBuild();
    const url = location.origin + location.pathname + '#b=' + encoded;
    history.replaceState(null, '', '#b=' + encoded);
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('btn-share');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = '&#x1f517; Share'; btn.classList.remove('copied'); }, 2000);
    });
  });

  function loadFromHash() {
    const hash = location.hash;
    if (hash.startsWith('#b=')) {
      const build = decodeBuild(hash.slice(3));
      if (build) applyBuild(build);
    }
  }

  // --- Init ---
  initFilters();
  render();
  loadFromHash();
})();
