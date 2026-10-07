export type SharePayload = {
  /** Absolute URL of the page being shared */
  url: string;
  title: string;
  description?: string;
};

export type ShareNetworkId =
  "telegram" | "facebook" | "whatsapp" | "linkedin" | "x";

export type ShareNetwork = {
  id: ShareNetworkId;
  label: string;
  /** Brand color on hover */
  hoverClass: string;
  /** 24×24 SVG path */
  iconPath: string;
  iconFillRule?: "evenodd";
  buildUrl: (payload: SharePayload) => string;
};
