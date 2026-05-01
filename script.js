function loadProfile() {
    document.getElementById('name').innerHTML = "Jakob<br>Lewis";
    document.getElementById('bio').innerText = "AI Development and Full stack oriented software engineering student with a 4.0 GPA. Contact me at Jakoblewis3000@gmail.com or Jakob.Lewis@students.maestrocollege.edu Thank you! ";
    
    const skills = ['Python', 'JavaScript', 'Full-Stack'];
    const skillsList = document.getElementById('skills');
    
    skillsList.innerHTML = ''; 
    skills.forEach(skill => {
        let li = document.createElement('li');
        li.innerText = skill;
        skillsList.appendChild(li);
    });
}

function showSection(section) {
    const profile = document.getElementById('profile-section');
    const contact = document.getElementById('contact-section');

    if (section === 'profile') {
        profile.style.display = 'block';
        if (contact) contact.style.display = 'none';
    } else if (section === 'contact') {
        profile.style.display = 'none';
        if (contact) contact.style.display = 'block';
    }
}

function initSite() {
    try {
        if (window.VANTA) {
            VANTA.CLOUDS({
                el: "#vanta-canvas",
                mouseControls: true,
                touchControls: true,
                minHeight: 200.00,
                minWidth: 200.00,
                skyColor: 0x6ca0dc,     
                cloudColor: 0xffffff,  
                cloudShadowColor: 0x3d5a73,
                sunColor: 0xffffff,     
                sunGlareColor: 0xffffff, 
                sunlightColor: 0xffffff, 
                speed: 1.2,
                quantity: 3.0
            });
        }
    } catch (e) {
        console.log("Vanta loading issue:", e);
    }

    const btn = document.getElementById('myButton'); 
    if (btn) {
        btn.onclick = function() {
            showSection('profile');
            loadProfile();
        };
    }
}

window.onload = initSite;
