// Toggle dropdown menu on click
document.querySelector(".default-lang").addEventListener("click", () => {
  const menu = document.querySelector(".dropdown-menu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
});

// Close dropdown when clicking elsewhere
window.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown")) {
    document.querySelector(".dropdown-menu").style.display = "none";
  }
});

// JS/script.js

// open detail panel
document.querySelectorAll('.read-more').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    link.closest('.tip-card').querySelector('.detail').style.display = 'block';
  });
});

// close detail panel
document.querySelectorAll('.close-detail').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.tip-card').querySelector('.detail').style.display = 'none';
  });
});


// open achievements modal
document.querySelector('.view-achievements').addEventListener('click', () => {
  document.getElementById('achievements-modal').style.display = 'flex';
});

// close modal
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('achievements-modal').style.display = 'none';
});

// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
  const circles = document.querySelectorAll('.circle');
  
  circles.forEach(circle => {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const percentage = parseFloat(circle.dataset.percentage);

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference - (percentage / 100 * circumference);
    
    // Update text if needed
    const text = circle.parentElement.querySelector('.circle-text');
    if(text) text.textContent = `${percentage}%`;
  });
});