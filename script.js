  // script.js 
  var DEFAULT_GROUPS = [
  { category: 'Backend',  cls: 'backend',  items: ['Python', 'Django', 'Flask', 'Custom APIs', 'JSON'] },
  { category: 'Frontend', cls: 'frontend', items: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
  { category: 'Database', cls: 'database', items: ['SQLite'] }
];

function renderSkills(groups) {
  var skillsList = document.getElementById('skills');
  skillsList.innerHTML = '';
  skillsList.style.opacity = '0';
  skillsList.style.transform = 'translateY(8px)';
  skillsList.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

  groups.forEach(function(group) {
    var section = document.createElement('div');
    section.className = 'skill-group ' + group.cls;

    var label = document.createElement('div');
    label.className = 'group-label';
    label.innerText = group.category;
    section.appendChild(label);

    var chips = document.createElement('div');
    chips.className = 'chips';

    group.items.forEach(function(skill) {
      var chip = document.createElement('span');
      chip.className = 'chip';
      chip.innerText = skill;
      chips.appendChild(chip);
    });

    section.appendChild(chips);
    skillsList.appendChild(section);
  });

  requestAnimationFrame(function() {
    skillsList.style.opacity = '1';
    skillsList.style.transform = 'translateY(0)';
  });
}

function dismissBtn(btn) {
  btn.innerText = 'Loaded!';
  btn.style.opacity = '1';
  btn.style.background = '#93c5fd';
  btn.style.borderColor = '#93c5fd';
  btn.style.transition = 'background 0.3s ease, border-color 0.3s ease';

  setTimeout(function() {
    btn.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 1, 1), transform 0.7s cubic-bezier(0.4, 0, 1, 1)';
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(20px)';
    setTimeout(function() { btn.style.display = 'none'; }, 700);
  }, 900);
}

function loadProfile() {
  var btn = document.getElementById('updateBtn');
  btn.disabled = true;
  btn.innerText = 'Loading...';
  btn.style.opacity = '0.7';

  fetch('/api/profile')
    .then(function(res) {
      if (!res.ok) throw new Error('API status ' + res.status);
      return res.json();
    })
    .then(function(data) {
      document.getElementById('name').innerHTML =
        data.name ? data.name.replace(' ', '<br>') : 'Jakob<br>Lewis';
      document.getElementById('bio').innerText =
        data.bio || 'AI and Full stack oriented software engineering student with a 4.0 GPA';

      // Handle both old flat array and new skillGroups format
      var groups;
      if (data.skillGroups) {
        groups = data.skillGroups;
      } else if (data.skills) {
        groups = DEFAULT_GROUPS;
      } else {
        groups = DEFAULT_GROUPS;
      }

      renderSkills(groups);
      dismissBtn(btn);
    })
    .catch(function(err) {
      console.warn('API unavailable:', err.message);
      document.getElementById('name').innerHTML = 'Jakob<br>Lewis';
      document.getElementById('bio').innerText =
        'AI and Full stack oriented software engineering student with a 4.0 GPA';
      renderSkills(DEFAULT_GROUPS);
      dismissBtn(btn);
    });
}

function switchTab(tab, el) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.jl-panel').forEach(function(p) { p.classList.remove('jl-panel--active'); });
  document.getElementById('tab-' + tab).classList.add('jl-panel--active');
}

// clouds
window.addEventListener('load', function() {
  try {
    if (typeof VANTA !== 'undefined') {
      window.vantaEffect = VANTA.CLOUDS({
        el: '#vanta-canvas',
        mouseControls: true,
        touchControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        skyColor: 0x5b9bd5,
        cloudColor: 0xddeeff,
        cloudShadowColor: 0x4a7aaa,
        sunColor: 0xd0e8ff,
        sunGlareColor: 0xe0f0ff,
        sunlightColor: 0xf0f8ff,
        speed: 1.2,
        quantity: 3.0
      });
    }
  } catch(e) {
    console.error('Vanta error:', e.message);
  }
});