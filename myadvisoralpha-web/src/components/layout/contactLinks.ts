// "Talk to expert" calls this number directly
export const EXPERT_PHONE = '+918655387834';
export const EXPERT_PHONE_HREF = `tel:${EXPERT_PHONE}`;

// Goes to the contact page through a real link click, so hosts that serve the
// site below a sub-path (like the shared preview) can resolve the address
export function openContactPage() {
  const link = document.createElement('a');
  link.href = '/contact';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
