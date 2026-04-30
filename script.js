
// This is your backend communication code - leave it as is
function loadProfile() {
    document.getElementById('name').innerHTML = "Jakob<br>Lewis";
    document.getElementById('bio').innerText = "AI Development and Full stack oriented software engineering student with a 4.0 GPA. Contact me at Jakoblewis3000@gmail.com or JakobLewis@students.maestrocollege.edu Thank you! ";
    
    const skills = ['Python', 'JavaScript', 'Full-Stack'];
    const skillsList = document.getElementById('skills');
    
    skillsList.innerHTML = ''; // Clear the list
    skills.forEach(skill => {
        let li = document.createElement('li');
        li.innerText = skill;
        skillsList.appendChild(li);
    });
}

// THIS IS THE NEW TOGGLE LOGIC
function showSection(section) {
    // 1. Grab the elements
    const profile = document.getElementById('profile-section');
    const contact = document.getElementById('contact-section');

    // 2. Logic to switch
    if (section === 'profile') {
        // Show profile, hide contact
        profile.style.display = 'block';
        contact.style.display = 'none';
    } else if (section === 'contact') {
        // Hide profile, show contact
        profile.style.display = 'none';
        
        // This line specifically overrides your style="display:none;"
        contact.style.display = 'block'; 
    }
}
