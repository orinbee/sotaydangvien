
export interface CloudinaryVideo {
  public_id: string;
  format: string;
  version: number;
  context?: {
    custom?: {
      caption?: string;
      alt?: string;
    }
  };
}

export type TabType = 'mobile' | 'pc';
