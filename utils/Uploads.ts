//dynamic toast
export const dataPathChangeForToast = (data: string): string => {
  let toastNotifData = "";
  switch (data) {
    case "Articles":
      toastNotifData = "article";
      break;

    case "Medical Equipment":
      toastNotifData = "medical equipment";
      break;

    case "Medical Specialization":
      toastNotifData = "medical specialization";
      break;

    default:
      toastNotifData = "data";
      break;
  }

  return toastNotifData;
};
