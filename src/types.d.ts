export interface Room {
  id: number;
  title: string;
  description: string;
  facilities: string[];
  rate: number;
  underMaintenance: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedRoom extends Room {
  images: {
    id: number;
    name: string;
    url: string;
  }[];
  thumbnail: {
    name: string;
    url: string;
  };
  facilityIds: number[];
}

export type Facility = {
  id: number;
  name: string;
};

export type FileLinkObject = {
  id?: number;
  name: string;
  url: string;
  removed?: boolean;
};
