const tabs = document.querySelectorAll('.folder_tab');
const panels = document.querySelectorAll('.member_panel');
 
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
 
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
    });
});
