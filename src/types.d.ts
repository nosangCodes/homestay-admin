export interface Room {
  id: number;
  title: string;
  description: string;
  facilities: string[];
  rate: number;
  underMaintenance: boolean;
  createdAt: string;
}

export interface DetailedRoom extends Room {
  images: {
    name: string;
    url: string;
  }[];
  thumbnailName: {
    name: string;
    url: string;
  };
}
