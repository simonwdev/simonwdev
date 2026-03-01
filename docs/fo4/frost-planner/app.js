(() => {
  const KEYS = ['strength','perception','endurance','charisma','intelligence','agility','luck'];
  const CSS_KEYS = ['str','per','end','chr','int','agi','lck'];
  const SPECIAL_POOL = 28; // 7 base (1 each) + 21 distributable
  const MIN_STAT = 1;
  const MAX_STAT = 10;

  let stats = [1,1,1,1,1,1,1];
  let bobbles = [false,false,false,false,false,false,false];
  let youreSpecial = false;
  let playerLevel = 0;
  let perkRanks = {};
  KEYS.forEach(k => { perkRanks[k] = new Array(10).fill(0); });
  let nsRanks = new Array(NON_SPECIAL_PERKS.length).fill(0);

  const tooltip = document.getElementById('tooltip');
  let tooltipTarget = null;

  function bobbleCount() { return bobbles.filter(b => b).length; }
  function specialTotal() { return SPECIAL_POOL + bobbleCount() + (youreSpecial ? 1 : 0); }
  function specialUsed() { return stats.reduce((a,b) => a + b, 0); }
  function specialRemaining() { return specialTotal() - specialUsed(); }
  function effectiveStat(i) { return stats[i] + (bobbles[i] ? 1 : 0); }

  function perkPointsTotal() { return playerLevel; }
  function perkPointsUsed() {
    let count = 0;
    KEYS.forEach(k => { perkRanks[k].forEach(r => count += r); });
    nsRanks.forEach(r => count += r);
    return count;
  }
  function perkPointsRemaining() { return perkPointsTotal() - perkPointsUsed(); }

  function enforceLevel() {
    KEYS.forEach(key => {
      const perks = PERKS[key];
      perks.forEach((perk, pi) => {
        while (perkRanks[key][pi] > 0 && perk.ranks[perkRanks[key][pi] - 1].level > playerLevel) {
          perkRanks[key][pi]--;
        }
      });
    });
    NON_SPECIAL_PERKS.forEach((perk, pi) => {
      if (playerLevel < perk.levelReq) nsRanks[pi] = 0;
    });
    while (perkPointsRemaining() < 0) trimLastPerkRank();
  }

  function trimLastPerkRank() {
    for (let i = NON_SPECIAL_PERKS.length - 1; i >= 0; i--) {
      if (nsRanks[i] > 0) { nsRanks[i]--; return; }
    }
    for (let ki = KEYS.length - 1; ki >= 0; ki--) {
      const perks = PERKS[KEYS[ki]];
      for (let pi = perks.length - 1; pi >= 0; pi--) {
        if (perkRanks[KEYS[ki]][pi] > 0) { perkRanks[KEYS[ki]][pi]--; return; }
      }
    }
  }

  function render() {
    renderSpecial();
    renderPerks();
    renderNonSpecial();
    renderHeader();
  }

  function renderHeader() {
    const sRem = specialRemaining();
    const sDisplay = document.getElementById('special-display');
    sDisplay.innerHTML = `S.P.E.C.I.A.L.: <b>${sRem}</b> / ${specialTotal() - 7}`;
    sDisplay.className = 'points-display' + (sRem < 0 ? ' over' : '');

    const pRem = perkPointsRemaining();
    const pDisplay = document.getElementById('perk-display');
    pDisplay.innerHTML = `Perks: <b>${pRem}</b> / ${perkPointsTotal()}`;
    pDisplay.className = 'points-display' + (pRem < 0 ? ' over' : '');
  }

  function renderSpecial() {
    const row = document.getElementById('special-row');
    row.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      const eff = effectiveStat(i);
      const div = document.createElement('div');
      div.className = `special-stat ${CSS_KEYS[i]}`;
      div.innerHTML = `
        <div class="label">${SPECIAL_ABBR[i]}</div>
        <div class="value">${eff}</div>
        <button class="bobble-btn ${bobbles[i] ? 'active' : ''}" title="Toggle Bobblehead">B</button>
        <div class="controls">
          <button class="dec" ${stats[i] <= MIN_STAT ? 'disabled' : ''}>-</button>
          <button class="inc" ${stats[i] >= MAX_STAT || specialRemaining() <= 0 ? 'disabled' : ''}>+</button>
        </div>`;
      div.querySelector('.bobble-btn').addEventListener('click', () => { bobbles[i] = !bobbles[i]; render(); });
      div.querySelector('.dec').addEventListener('click', () => { if (stats[i] > MIN_STAT) { stats[i]--; render(); }});
      div.querySelector('.inc').addEventListener('click', () => { if (stats[i] < MAX_STAT && specialRemaining() > 0) { stats[i]++; render(); }});
      row.appendChild(div);
    }
  }

  function renderPerks() {
    const grid = document.getElementById('perk-grid');
    grid.innerHTML = '';
    const noPerks = perkPointsRemaining() <= 0;
    KEYS.forEach((key, col) => {
      const colDiv = document.createElement('div');
      colDiv.className = `perk-col ${CSS_KEYS[col]}`;
      const perks = PERKS[key];
      perks.forEach((perk, pi) => {
        const eff = effectiveStat(col);
        const locked = eff < perk.req;
        const cell = document.createElement('div');
        cell.className = `perk-cell${locked ? ' locked' : ''}`;

        const header = document.createElement('div');
        header.className = 'perk-header';
        header.innerHTML = `<span class="perk-name">${perk.name}</span><span class="perk-req">${perk.req}</span>`;
        cell.appendChild(header);

        const ranksDiv = document.createElement('div');
        ranksDiv.className = 'perk-ranks';
        const currentRanks = perkRanks[key][pi];
        perk.ranks.forEach((rank, ri) => {
          const dot = document.createElement('div');
          const meetsLevel = playerLevel >= rank.level;
          const filled = ri < currentRanks;
          dot.className = `rank-dot${filled ? ' filled' : ''}${!meetsLevel ? ' level-locked' : ''}`;
          if (!locked && meetsLevel && (filled || !noPerks)) {
            dot.addEventListener('click', (e) => {
              e.stopPropagation();
              if (ri < currentRanks) {
                perkRanks[key][pi] = ri === currentRanks - 1 ? ri : ri + 1;
              } else if (perkPointsRemaining() > 0) {
                perkRanks[key][pi] = ri + 1;
              }
              render();
            });
          }
          ranksDiv.appendChild(dot);
        });
        cell.appendChild(ranksDiv);

        cell.addEventListener('mouseenter', (e) => { showTooltip(e, perk, perkRanks[key][pi], col); tooltipTarget = cell; });
        cell.addEventListener('mousemove', positionTooltip);
        cell.addEventListener('mouseleave', hideTooltip);

        colDiv.appendChild(cell);
      });
      grid.appendChild(colDiv);
    });
  }

  function renderNonSpecial() {
    const grid = document.getElementById('ns-grid');
    grid.innerHTML = '';
    const noPerks = perkPointsRemaining() <= 0;
    NON_SPECIAL_PERKS.forEach((perk, pi) => {
      const locked = playerLevel < perk.levelReq;
      const cell = document.createElement('div');
      cell.className = `ns-cell${locked ? ' locked' : ''}`;
      const info = document.createElement('div');
      info.className = 'ns-info';
      info.innerHTML = `<span class="ns-name">${perk.name}</span><span class="ns-req">Lvl ${perk.levelReq}+</span>`;
      cell.appendChild(info);

      const ranksDiv = document.createElement('div');
      ranksDiv.className = 'perk-ranks';
      const currentRanks = nsRanks[pi];
      perk.ranks.forEach((rank, ri) => {
        const dot = document.createElement('div');
        const filled = ri < currentRanks;
        dot.className = `rank-dot${filled ? ' filled' : ''}`;
        if (!locked && (filled || !noPerks)) {
          dot.addEventListener('click', (e) => {
            e.stopPropagation();
            if (ri < currentRanks) {
              nsRanks[pi] = ri === currentRanks - 1 ? ri : ri + 1;
            } else if (perkPointsRemaining() > 0) {
              nsRanks[pi] = ri + 1;
            }
            render();
          });
        }
        ranksDiv.appendChild(dot);
      });
      cell.appendChild(ranksDiv);

      cell.addEventListener('mouseenter', (e) => { showNsTooltip(e, perk, nsRanks[pi]); tooltipTarget = cell; });
      cell.addEventListener('mousemove', positionTooltip);
      cell.addEventListener('mouseleave', hideTooltip);

      grid.appendChild(cell);
    });
  }

  function showTooltip(e, perk, taken, colIndex) {
    let html = `<div class="tt-name">${perk.name}</div>`;
    html += `<div class="tt-req">Requires ${SPECIAL_NAMES[colIndex]} ${perk.req}</div>`;
    perk.ranks.forEach((r, i) => {
      const active = i < taken ? ' active' : '';
      const levelMet = playerLevel >= r.level;
      const levelClass = levelMet ? '' : ' level-unmet';
      html += `<div class="tt-rank${active}${levelClass}"><span class="rank-label">Rank ${i+1}</span> <span class="level-req">(Lvl ${r.level}${!levelMet ? ' - too low' : ''})</span><br>${r.desc}</div>`;
    });
    tooltip.innerHTML = html;
    tooltip.classList.add('visible');
    positionTooltip(e);
  }

  function showNsTooltip(e, perk, taken) {
    let html = `<div class="tt-name">${perk.name}</div>`;
    const levelMet = playerLevel >= perk.levelReq;
    html += `<div class="tt-req">Requires Level ${perk.levelReq}${!levelMet ? ' - too low' : ''}</div>`;
    perk.ranks.forEach((r, i) => {
      const active = i < taken ? ' active' : '';
      html += `<div class="tt-rank${active}"><span class="rank-label">Rank ${i+1}</span><br>${r.desc}</div>`;
    });
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

  function resetAll() {
    stats = [1,1,1,1,1,1,1];
    bobbles = [false,false,false,false,false,false,false];
    youreSpecial = false;
    document.getElementById('youre-special-check').checked = false;
    KEYS.forEach(k => { perkRanks[k] = new Array(10).fill(0); });
    nsRanks = new Array(NON_SPECIAL_PERKS.length).fill(0);
    document.getElementById('level-input').value = 0;
    playerLevel = 0;
    render();
  }

  document.getElementById('youre-special-check').addEventListener('change', (e) => {
    youreSpecial = e.target.checked;
    render();
  });

  document.getElementById('level-input').addEventListener('input', (e) => {
    playerLevel = Math.max(0, Math.min(50, parseInt(e.target.value) || 0));
    e.target.value = playerLevel;
    enforceLevel();
    render();
  });

  document.getElementById('btn-reset').addEventListener('click', resetAll);

  render();
})();
