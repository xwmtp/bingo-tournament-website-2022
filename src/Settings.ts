export const tournamentSettings = {
  RACETIME_CATEGORY: "oot",
  FORFEIT_TIME: 4 * 3600,
} as const;

export const websiteSettings = {
  DEFAULT_AVATAR:
    "https://github.com/xwmtp/bingo2022/blob/assets/images/avatars/neutralAvatar.png?raw=true",
  LOGIN_URL: process.env.REACT_APP_LOGIN_URL,
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA_FALLBACK,
} as const;
