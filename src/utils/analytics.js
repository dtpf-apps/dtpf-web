import gtag from '../utils/gtag';

export const gaEvent = (action, category, label, non_interaction = false) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    non_interaction: non_interaction,
  });
};
