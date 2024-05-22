export const IMPORTANCE = ["low", "medium", "high"] as const;

export type Importance = (typeof IMPORTANCE)[number];
