  // script.js 
  function loadProfile() {
  fetch('/api/profile')
    .then(function(res) {
      if (!res.ok) throw new Error('API status ' + res.status);
      return res.json();
    })
    // if not res.ok throw err 
// basic information snd skills
    .then(function(data) {
      document.getElementById('name').innerHTML =
        data.name ? data.name.replace(' ', '<br>') : 'Jakob<br>Lewis';
      document.getElementById('bio').innerText =
        data.bio || 'AI Development and Full Stack oriented software engineering student with a 4.0 GPA.';
      var skillsList = document.getElementById('skills');
      skillsList.innerHTML = '';
      (data.skills || ['Python', 'JavaScript', 'Full-Stack']).forEach(function(skill) {
        var li = document.createElement('li');
        li.innerText = skill;
        skillsList.appendChild(li);
      });
      var btn = document.getElementById('updateBtn');
      if (btn) btn.style.display = 'none';
    })
    .catch(function(err) {
      // if API unreachable
      console.warn('API unavailable:', err.message);
      document.getElementById('name').innerHTML = 'Jakob<br>Lewis';
      document.getElementById('bio').innerText =
        'AI Development and Full Stack oriented software engineering student with a 4.0 GPA.';
      var skillsList = document.getElementById('skills');
      skillsList.innerHTML = '';
      ['Python', 'JavaScript', 'API Development','Full-Stack'].forEach(function(skill) {
        var li = document.createElement('li');
        li.innerText = skill;
        skillsList.appendChild(li);
      });
      var btn = document.getElementById('updateBtn');
      if (btn) btn.style.display = 'none';
    });
}
// btn
function switchTab(tab, el) {
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.jl-panel').forEach(function(p) { p.classList.remove('jl-panel--active'); });
  document.getElementById('tab-' + tab).classList.add('jl-panel--active');
}
// clouds section
window.addEventListener('load', function() {
  try {
    if (typeof VANTA !== 'undefined') {
      VANTA.CLOUDS({
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