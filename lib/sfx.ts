let PositiveNotificationAudio: HTMLAudioElement | null = null;
let NegativeNotificationAudio: HTMLAudioElement | null = null;

export function LoadSfx() {
  if (!PositiveNotificationAudio || !NegativeNotificationAudio) {
    PositiveNotificationAudio = new Audio("/sfx/positive_notification.mp3");
    NegativeNotificationAudio = new Audio("/sfx/negative_notification.mp3");

    PositiveNotificationAudio.preload = "auto";
    NegativeNotificationAudio.preload = "auto";
  }
}

export function PositiveNotification() {
  if (!PositiveNotificationAudio) return;

  PositiveNotificationAudio.currentTime = 0;
  PositiveNotificationAudio.play().catch(() => {});
}

export function NegativeNotification() {
  if (!NegativeNotificationAudio) return;

  NegativeNotificationAudio.currentTime = 0;
  NegativeNotificationAudio.play().catch(() => {});
}
