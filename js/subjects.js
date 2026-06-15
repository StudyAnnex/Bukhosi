/**
 * Subjects Selection Module
 * Handles subject selection and enrollment functionality
 */

/**
 * Toggle subject selection
 * @param {HTMLElement} el - The subject button element that was clicked
 */
function selectSubject(el) {
  // Toggle active state on clicked subject
  el.classList.toggle('active');

  // Get all currently selected subjects
  const selected = Array.from(document.querySelectorAll('.stag.active'))
    .map(b => b.textContent.trim());

  const btn = document.getElementById('enrolBtn');
  const hint = document.getElementById('enrolHint');

  // Update button state and hint text based on selection
  if (selected.length > 0) {
    btn.disabled = false;
    btn.classList.add('enabled');
    hint.textContent = selected.join(', ') + ' selected';
  } else {
    btn.disabled = true;
    btn.classList.remove('enabled');
    hint.textContent = 'Select a subject above to continue';
  }
}

/**
 * Initialize enrollment button click handler
 * Sends WhatsApp message with selected subjects
 */
document.addEventListener('DOMContentLoaded', function() {
  const enrolBtn = document.getElementById('enrolBtn');

  if (enrolBtn) {
    enrolBtn.addEventListener('click', function() {
      const selected = Array.from(document.querySelectorAll('.stag.active'))
        .map(b => b.textContent.trim());

      if (selected.length === 0) return;

      // Format subject list for message
      const subjectList = selected.length === 1
        ? selected[0]
        : selected.slice(0, -1).join(', ') + ' and ' + selected[selected.length - 1];

      // Create WhatsApp message
      const message = `Hi, I would like to sign up my child to join Bukhosi for ${subjectList} tuition. Are there slots available?`;
      const encoded = encodeURIComponent(message);

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/27649883150?text=${encoded}`, '_blank');
    });
  }
});
