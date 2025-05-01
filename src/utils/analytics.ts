import gtag from './gtag';

export const gaEvent = (action: string, category: string, label: string, non_interaction = false) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    non_interaction: non_interaction,
  });
};
